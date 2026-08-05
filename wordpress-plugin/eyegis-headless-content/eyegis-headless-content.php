<?php
/**
 * Plugin Name: Eyegis Headless Content
 * Description: Painel editorial e API de conteúdo para o front-end React da Eyegis.
 * Version: 2.0.0-beta.3
 * Author: Eyegis
 * Requires at least: 6.4
 * Requires PHP: 7.4
 * Text Domain: eyegis-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Eyegis_Headless_Content {
	const VERSION              = '2.0.0-beta.3';
	const DEFAULT_FRONTEND_URL = 'https://eyegis-eyewear.com';
	const FRONTEND_URL_OPTION  = 'eyegis_headless_frontend_url';
	const POST_TYPE            = 'eyegis_document';
	const META_KEY             = '_eyegis_document_json';
	const DRAFT_META_KEY       = '_eyegis_document_draft_json';
	const DRAFT_DATE_KEY       = '_eyegis_document_draft_date';
	const DOCUMENT_KEY         = '_eyegis_document_key';
	const NONCE_ACTION         = 'eyegis_save_document';
	const NONCE_NAME           = 'eyegis_document_nonce';
	const SCHEMA_OPTION        = 'eyegis_headless_schema_version';
	const CACHE_KEY            = 'eyegis_headless_content_payload';
	const CACHE_TTL            = 60;

	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'add_meta_boxes', array( $this, 'register_meta_box' ) );
		add_action( 'save_post_' . self::POST_TYPE, array( $this, 'save_document' ), 10, 2 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'column_value' ), 10, 2 );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
		add_action( 'admin_menu', array( $this, 'register_status_page' ) );
		add_action( 'admin_post_eyegis_seed_missing', array( $this, 'handle_seed_missing' ) );
		add_action( 'admin_post_eyegis_save_settings', array( $this, 'handle_save_settings' ) );
		add_action( 'admin_init', array( $this, 'maybe_upgrade_seed' ) );
	}

	public static function activate() {
		$plugin = new self();
		$plugin->register_post_type();
		$plugin->seed_missing_documents();
		flush_rewrite_rules();
	}

	public function register_post_type() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels' => array(
					'name'          => 'Conteúdo Eyegis',
					'singular_name' => 'Documento de conteúdo',
					'menu_name'     => 'Modo avançado',
					'edit_item'     => 'Editar conteúdo',
					'add_new_item'  => 'Adicionar documento',
				),
				'public'              => false,
				'show_ui'             => true,
				'show_in_menu'        => 'eyegis-editor',
				'show_in_rest'        => false,
				'menu_icon'           => 'dashicons-edit-page',
				'menu_position'       => 3,
				'supports'            => array( 'title' ),
				'capability_type'     => 'page',
				'map_meta_cap'        => true,
				'exclude_from_search' => true,
				'rewrite'             => false,
			)
		);
	}

	public function register_meta_box() {
		add_meta_box(
			'eyegis-content-fields',
			'Campos editáveis',
			array( $this, 'render_editor' ),
			self::POST_TYPE,
			'normal',
			'high'
		);
	}

	public function render_editor( $post ) {
		wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME );
		$document_key = (string) get_post_meta( $post->ID, self::DOCUMENT_KEY, true );
		$stored       = (string) get_post_meta( $post->ID, self::META_KEY, true );
		$content      = json_decode( $stored, true );
		if ( ! is_array( $content ) ) {
			$content = array();
		}

		echo '<div class="eyegis-edit-header">';
		echo '<div><span class="eyegis-kicker">EDITOR SIMPLIFICADO</span><p class="eyegis-editor-intro">Edite o conteúdo com nomes amigáveis. O layout, as cores e as animações continuam protegidos.</p></div>';
		echo '<a class="button" href="' . esc_url( admin_url( 'admin.php?page=eyegis-editor' ) ) . '">← Voltar às páginas</a>';
		echo '</div>';
		echo '<details class="eyegis-technical-info"><summary>Informações técnicas</summary><p>Chave do documento: <code>' . esc_html( $document_key ) . '</code></p></details>';
		echo '<div id="eyegis-content-editor" data-document-key="' . esc_attr( $document_key ) . '"></div>';
		echo '<textarea id="eyegis-document-json" name="eyegis_document_json" hidden>' . esc_textarea( wp_json_encode( $content, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) ) . '</textarea>';
	}

	public function save_document( $post_id, $post ) {
		if ( ! isset( $_POST[ self::NONCE_NAME ] ) ) {
			return;
		}
		$nonce = sanitize_text_field( wp_unslash( $_POST[ self::NONCE_NAME ] ) );
		if ( ! wp_verify_nonce( $nonce, self::NONCE_ACTION ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) || self::POST_TYPE !== $post->post_type ) {
			return;
		}
		if ( ! isset( $_POST['eyegis_document_json'] ) ) {
			return;
		}

		$decoded = json_decode( wp_unslash( $_POST['eyegis_document_json'] ), true );
		if ( JSON_ERROR_NONE !== json_last_error() || ! is_array( $decoded ) ) {
			return;
		}

		$clean = $this->sanitize_value( $decoded );
		update_post_meta(
			$post_id,
			self::META_KEY,
			wp_json_encode( $clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
		);
		delete_post_meta( $post_id, self::DRAFT_META_KEY );
		delete_post_meta( $post_id, self::DRAFT_DATE_KEY );
		delete_transient( self::CACHE_KEY );
	}

	private function sanitize_value( $value ) {
		if ( is_array( $value ) ) {
			$clean = array();
			foreach ( $value as $key => $item ) {
				$clean_key = is_int( $key ) ? $key : preg_replace( '/[^A-Za-z0-9_.-]/', '', (string) $key );
				$clean[ $clean_key ] = $this->sanitize_value( $item );
			}
			return $clean;
		}
		if ( is_bool( $value ) || is_int( $value ) || is_float( $value ) || is_null( $value ) ) {
			return $value;
		}
		return wp_kses_post( (string) $value );
	}

	public function enqueue_admin_assets( $hook ) {
		$screen = get_current_screen();
		$is_document   = $screen && self::POST_TYPE === $screen->post_type && in_array( $hook, array( 'post.php', 'post-new.php' ), true );
		$is_studio     = 'toplevel_page_eyegis-editor' === $hook;
		$is_plugin_page = $is_studio || false !== strpos( (string) $hook, 'eyegis-content-library' ) || false !== strpos( (string) $hook, 'eyegis-headless-status' );
		if ( ! $is_document && ! $is_plugin_page ) {
			return;
		}
		wp_enqueue_style(
			'eyegis-headless-admin',
			plugins_url( 'assets/admin.css', __FILE__ ),
			array(),
			self::VERSION
		);
		if ( $is_document ) {
			wp_enqueue_media();
			wp_enqueue_script(
				'eyegis-headless-admin',
				plugins_url( 'assets/admin.js', __FILE__ ),
				array(),
				self::VERSION,
				true
			);
		}
		if ( $is_studio ) {
			wp_enqueue_media();
			wp_enqueue_style(
				'eyegis-studio',
				plugins_url( 'assets/studio.css', __FILE__ ),
				array( 'eyegis-headless-admin' ),
				self::VERSION
			);
			wp_enqueue_script(
				'eyegis-studio',
				plugins_url( 'assets/studio.js', __FILE__ ),
				array(),
				self::VERSION,
				true
			);
			wp_localize_script( 'eyegis-studio', 'EyegisStudioConfig', $this->studio_config() );
		}
	}

	public function columns( $columns ) {
		return array(
			'cb'            => $columns['cb'],
			'title'         => 'Área editável',
			'eyegis_key'    => 'Chave técnica',
			'date'          => 'Última alteração',
		);
	}

	public function column_value( $column, $post_id ) {
		if ( 'eyegis_key' === $column ) {
			echo '<code>' . esc_html( (string) get_post_meta( $post_id, self::DOCUMENT_KEY, true ) ) . '</code>';
		}
	}

	public function register_rest_routes() {
		register_rest_route(
			'eyegis/v1',
			'/content',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_all_content' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			'eyegis/v1',
			'/content/(?P<key>[a-z0-9_-]+)',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_single_content' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'key' => array(
						'required'          => true,
						'sanitize_callback' => 'sanitize_key',
					),
				),
			)
		);
		register_rest_route(
			'eyegis/v1',
			'/studio/(?P<key>[a-z0-9_-]+)',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_studio_document' ),
				'permission_callback' => array( $this, 'can_edit_studio' ),
				'args'                => $this->studio_route_args(),
			)
		);
		register_rest_route(
			'eyegis/v1',
			'/studio/(?P<key>[a-z0-9_-]+)/draft',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'save_studio_draft' ),
				'permission_callback' => array( $this, 'can_edit_studio' ),
				'args'                => $this->studio_route_args( true ),
			)
		);
		register_rest_route(
			'eyegis/v1',
			'/studio/(?P<key>[a-z0-9_-]+)/publish',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'publish_studio_document' ),
				'permission_callback' => array( $this, 'can_edit_studio' ),
				'args'                => $this->studio_route_args( true ),
			)
		);
		register_rest_route(
			'eyegis/v1',
			'/studio/(?P<key>[a-z0-9_-]+)/draft',
			array(
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => array( $this, 'discard_studio_draft' ),
				'permission_callback' => array( $this, 'can_edit_studio' ),
				'args'                => $this->studio_route_args(),
			)
		);
	}

	public function can_edit_studio() {
		return current_user_can( 'edit_pages' );
	}

	private function studio_route_args( $requires_content = false ) {
		$args = array(
			'key' => array(
				'required'          => true,
				'sanitize_callback' => 'sanitize_key',
			),
		);
		if ( $requires_content ) {
			$args['content'] = array(
				'required'          => true,
				'validate_callback' => function ( $value ) {
					return is_array( $value );
				},
			);
		}
		return $args;
	}

	public function get_studio_document( WP_REST_Request $request ) {
		$document = $this->studio_document_state( sanitize_key( $request['key'] ) );
		if ( is_wp_error( $document ) ) {
			return $document;
		}
		return rest_ensure_response( $document );
	}

	public function save_studio_draft( WP_REST_Request $request ) {
		$key     = sanitize_key( $request['key'] );
		$post_id = $this->find_document_id( $key );
		if ( ! $post_id ) {
			return new WP_Error( 'eyegis_not_found', 'Documento não encontrado.', array( 'status' => 404 ) );
		}

		$content = $request->get_param( 'content' );
		if ( ! is_array( $content ) ) {
			return new WP_Error( 'eyegis_invalid_content', 'Conteúdo inválido.', array( 'status' => 400 ) );
		}

		$clean    = $this->sanitize_value( $content );
		$saved_at = gmdate( 'c' );
		update_post_meta(
			$post_id,
			self::DRAFT_META_KEY,
			wp_json_encode( $clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
		);
		update_post_meta( $post_id, self::DRAFT_DATE_KEY, $saved_at );

		return rest_ensure_response(
			array(
				'ok'       => true,
				'status'   => 'draft',
				'saved_at' => $saved_at,
				'content'  => $clean,
			)
		);
	}

	public function publish_studio_document( WP_REST_Request $request ) {
		$key     = sanitize_key( $request['key'] );
		$post_id = $this->find_document_id( $key );
		if ( ! $post_id ) {
			return new WP_Error( 'eyegis_not_found', 'Documento não encontrado.', array( 'status' => 404 ) );
		}

		$content = $request->get_param( 'content' );
		if ( ! is_array( $content ) ) {
			return new WP_Error( 'eyegis_invalid_content', 'Conteúdo inválido.', array( 'status' => 400 ) );
		}

		$clean = $this->sanitize_value( $content );
		update_post_meta(
			$post_id,
			self::META_KEY,
			wp_json_encode( $clean, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
		);
		delete_post_meta( $post_id, self::DRAFT_META_KEY );
		delete_post_meta( $post_id, self::DRAFT_DATE_KEY );
		wp_update_post(
			array(
				'ID'                => $post_id,
				'post_status'       => 'publish',
				'post_modified'     => current_time( 'mysql' ),
				'post_modified_gmt' => current_time( 'mysql', true ),
			)
		);
		delete_transient( self::CACHE_KEY );

		return rest_ensure_response(
			array(
				'ok'           => true,
				'status'       => 'published',
				'published_at' => gmdate( 'c' ),
				'content'      => $clean,
			)
		);
	}

	public function discard_studio_draft( WP_REST_Request $request ) {
		$key     = sanitize_key( $request['key'] );
		$post_id = $this->find_document_id( $key );
		if ( ! $post_id ) {
			return new WP_Error( 'eyegis_not_found', 'Documento não encontrado.', array( 'status' => 404 ) );
		}

		delete_post_meta( $post_id, self::DRAFT_META_KEY );
		delete_post_meta( $post_id, self::DRAFT_DATE_KEY );
		return $this->get_studio_document( $request );
	}

	private function studio_document_state( $key ) {
		$post_id = $this->find_document_id( $key );
		if ( ! $post_id ) {
			return new WP_Error( 'eyegis_not_found', 'Documento não encontrado.', array( 'status' => 404 ) );
		}

		$published = json_decode( (string) get_post_meta( $post_id, self::META_KEY, true ), true );
		$draft     = json_decode( (string) get_post_meta( $post_id, self::DRAFT_META_KEY, true ), true );
		return array(
			'key'          => $key,
			'post_id'      => $post_id,
			'published'    => is_array( $published ) ? $published : array(),
			'draft'        => is_array( $draft ) ? $draft : null,
			'has_draft'    => is_array( $draft ),
			'draft_date'   => (string) get_post_meta( $post_id, self::DRAFT_DATE_KEY, true ),
			'modified_gmt' => get_post_modified_time( 'c', true, $post_id ),
		);
	}

	public function get_all_content() {
		$cached = get_transient( self::CACHE_KEY );
		if ( is_array( $cached ) && isset( $cached['documents'] ) && is_array( $cached['documents'] ) ) {
			return $this->content_response( $cached );
		}

		$posts     = get_posts(
			array(
				'post_type'      => self::POST_TYPE,
				'post_status'    => 'publish',
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'ASC',
			)
		);
		$documents = array();
		$modified  = '';

		foreach ( $posts as $post ) {
			$key = (string) get_post_meta( $post->ID, self::DOCUMENT_KEY, true );
			if ( '' === $key ) {
				continue;
			}
			$content = json_decode( (string) get_post_meta( $post->ID, self::META_KEY, true ), true );
			if ( is_array( $content ) ) {
				$documents[ $key ] = $content;
			}
			if ( $post->post_modified_gmt > $modified ) {
				$modified = $post->post_modified_gmt;
			}
		}

		$payload = array(
			'version'      => self::VERSION . '-' . md5( $modified . wp_json_encode( $documents ) ),
			'generated_at' => gmdate( 'c' ),
			'documents'    => $documents,
		);
		set_transient( self::CACHE_KEY, $payload, self::CACHE_TTL );
		return $this->content_response( $payload );
	}

	private function content_response( $payload ) {
		$response = rest_ensure_response( $payload );
		$response->header( 'Cache-Control', 'public, max-age=60, stale-while-revalidate=300' );
		return $response;
	}

	public function get_single_content( WP_REST_Request $request ) {
		$key   = sanitize_key( $request['key'] );
		$posts = get_posts(
			array(
				'post_type'      => self::POST_TYPE,
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'meta_key'       => self::DOCUMENT_KEY,
				'meta_value'     => $key,
			)
		);
		if ( empty( $posts ) ) {
			return new WP_Error( 'eyegis_not_found', 'Documento não encontrado.', array( 'status' => 404 ) );
		}
		$content = json_decode( (string) get_post_meta( $posts[0]->ID, self::META_KEY, true ), true );
		return rest_ensure_response( is_array( $content ) ? $content : array() );
	}

	public function register_status_page() {
		add_menu_page(
			'Editor do site Eyegis',
			'Editor do site',
			'edit_pages',
			'eyegis-editor',
			array( $this, 'render_studio_page' ),
			'dashicons-welcome-widgets-menus',
			3
		);
		add_submenu_page(
			'eyegis-editor',
			'Eyegis Studio',
			'Studio',
			'edit_pages',
			'eyegis-editor',
			array( $this, 'render_studio_page' )
		);
		add_submenu_page(
			'eyegis-editor',
			'Conteúdos e páginas',
			'Conteúdos e páginas',
			'edit_pages',
			'eyegis-content-library',
			array( $this, 'render_dashboard_page' )
		);
		add_submenu_page(
			'eyegis-editor',
			'Integração React',
			'Integração React',
			'manage_options',
			'eyegis-headless-status',
			array( $this, 'render_status_page' )
		);
	}

	private function studio_config() {
		$state = $this->studio_document_state( 'home' );
		if ( is_wp_error( $state ) ) {
			$state = array(
				'key'       => 'home',
				'published' => array(),
				'draft'     => null,
				'has_draft' => false,
			);
		}

		return array(
			'version'      => self::VERSION,
			'documentKey'  => 'home',
			'document'     => $state,
			'frontendUrl'  => $this->frontend_url(),
			'localeRoutes' => array(
				'PT' => '/br/',
				'EN' => '/en/',
				'FR' => '/fr/',
			),
			'restUrl'      => rest_url( 'eyegis/v1/studio/home' ),
			'restNonce'    => wp_create_nonce( 'wp_rest' ),
			'manifest'     => $this->home_studio_manifest(),
		);
	}

	private function home_studio_manifest() {
		return array(
			array(
				'id'          => 'manifesto',
				'label'       => 'Mensagem principal',
				'description' => 'Os textos centrais apresentados sobre as duas imagens.',
				'fields'      => array(
					array(
						'path'  => 'heroEyebrow',
						'label' => 'Texto acima do título',
						'type'  => 'text',
						'limit' => 42,
					),
					array(
						'path'  => 'heroTitle',
						'label' => 'Título principal',
						'type'  => 'textarea',
						'limit' => 95,
					),
					array(
						'path'        => 'heroManifesto',
						'label'       => 'Texto de apresentação',
						'type'        => 'textarea',
						'limit'       => 150,
						'viewport'    => 'desktop',
						'recommended' => 'Este texto aparece somente em telas grandes.',
					),
				),
			),
			array(
				'id'          => 'men',
				'label'       => 'Lado masculino',
				'description' => 'Imagem, chamada e botão da coleção masculina.',
				'fields'      => array(
					array(
						'path'  => 'men.tag',
						'label' => 'Local e momento',
						'type'  => 'text',
						'limit' => 35,
					),
					array(
						'path'  => 'men.product',
						'label' => 'Nome da coleção',
						'type'  => 'text',
						'limit' => 38,
					),
					array(
						'path'  => 'men.cta',
						'label' => 'Texto do botão',
						'type'  => 'text',
						'limit' => 24,
					),
					array(
						'path'        => 'men.image',
						'label'       => 'Imagem para computador',
						'type'        => 'image',
						'recommended' => 'Retrato 2:3 · mínimo 1280 × 1920 px',
					),
					array(
						'path'         => 'men.mobileImage',
						'preview_path' => 'men.image',
						'label'        => 'Imagem para celular (opcional)',
						'type'         => 'image',
						'recommended'  => 'Retrato 4:5 · mínimo 1080 × 1350 px',
					),
					array(
						'path'  => 'men.imageAlt',
						'label' => 'Descrição da imagem',
						'type'  => 'text',
						'limit' => 160,
					),
				),
			),
			array(
				'id'          => 'women',
				'label'       => 'Lado feminino',
				'description' => 'Imagem, chamada e botão da coleção feminina.',
				'fields'      => array(
					array(
						'path'  => 'women.tag',
						'label' => 'Local e momento',
						'type'  => 'text',
						'limit' => 35,
					),
					array(
						'path'  => 'women.product',
						'label' => 'Nome da coleção',
						'type'  => 'text',
						'limit' => 38,
					),
					array(
						'path'  => 'women.cta',
						'label' => 'Texto do botão',
						'type'  => 'text',
						'limit' => 24,
					),
					array(
						'path'        => 'women.image',
						'label'       => 'Imagem para computador',
						'type'        => 'image',
						'recommended' => 'Retrato 2:3 · mínimo 1280 × 1920 px',
					),
					array(
						'path'         => 'women.mobileImage',
						'preview_path' => 'women.image',
						'label'        => 'Imagem para celular (opcional)',
						'type'         => 'image',
						'recommended'  => 'Retrato 4:5 · mínimo 1080 × 1350 px',
					),
					array(
						'path'  => 'women.imageAlt',
						'label' => 'Descrição da imagem',
						'type'  => 'text',
						'limit' => 160,
					),
				),
			),
		);
	}

	public function render_studio_page() {
		if ( ! current_user_can( 'edit_pages' ) ) {
			wp_die( 'Sem permissão.' );
		}
		?>
		<div class="wrap eyegis-studio-page">
			<div class="eyegis-studio-heading">
				<div>
					<span class="eyegis-kicker">EYEGIS STUDIO 2.0 · PROVA FUNCIONAL</span>
					<h1>Edite a Home e veja o resultado ao lado</h1>
					<p>As alterações ficam privadas até você clicar em Publicar.</p>
				</div>
				<a class="button" href="<?php echo esc_url( admin_url( 'admin.php?page=eyegis-content-library' ) ); ?>">Todos os conteúdos</a>
			</div>
			<div id="eyegis-studio-root" aria-live="polite">
				<div class="eyegis-studio-loading"><span class="spinner is-active"></span> Preparando editor e preview…</div>
			</div>
			<noscript>Ative o JavaScript para usar o Eyegis Studio.</noscript>
		</div>
		<?php
	}

	public function render_dashboard_page() {
		if ( ! current_user_can( 'edit_pages' ) ) {
			wp_die( 'Sem permissão.' );
		}

		$posts = get_posts(
			array(
				'post_type'      => self::POST_TYPE,
				'post_status'    => 'any',
				'posts_per_page' => -1,
			)
		);
		$documents = array();
		foreach ( $posts as $post ) {
			$key = (string) get_post_meta( $post->ID, self::DOCUMENT_KEY, true );
			if ( '' !== $key ) {
				$documents[ $key ] = $post;
			}
		}

		$groups = $this->editor_groups();
		$media_post = isset( $documents['media'] ) ? $documents['media'] : null;
		$media_count = 0;
		if ( $media_post ) {
			$media_content = json_decode( (string) get_post_meta( $media_post->ID, self::META_KEY, true ), true );
			$media_count = is_array( $media_content ) ? count( $media_content ) : 0;
		}
		$frontend_url = $this->frontend_url();
		?>
		<div class="wrap eyegis-dashboard">
			<div class="eyegis-dashboard-hero">
				<div>
					<span class="eyegis-kicker">PAINEL EDITORIAL</span>
					<h1>O que você quer alterar?</h1>
					<p>Escolha uma página ou abra a galeria de imagens. Você edita o conteúdo; o design do site permanece protegido.</p>
				</div>
				<a class="button button-secondary" href="<?php echo esc_url( $frontend_url ); ?>" target="_blank" rel="noopener noreferrer">Abrir front-end configurado ↗</a>
			</div>

			<div class="eyegis-dashboard-stats" aria-label="Resumo do conteúdo">
				<span><strong><?php echo esc_html( count( $documents ) ); ?></strong> áreas editáveis</span>
				<span><strong><?php echo esc_html( $media_count ); ?></strong> imagens substituíveis</span>
				<span><strong>3</strong> idiomas: PT, EN e FR</span>
			</div>

			<?php if ( $media_post ) : ?>
				<section class="eyegis-image-spotlight">
					<div class="eyegis-image-spotlight-icon dashicons dashicons-format-gallery" aria-hidden="true"></div>
					<div>
						<h2>Imagens do site</h2>
						<p>Troque imagens de computador e celular pela Biblioteca de Mídia, veja a prévia e altere o texto alternativo.</p>
					</div>
					<a class="button button-primary button-hero" href="<?php echo esc_url( get_edit_post_link( $media_post->ID ) ); ?>">Gerenciar <?php echo esc_html( $media_count ); ?> imagens</a>
				</section>
			<?php endif; ?>

			<h2 class="eyegis-section-heading">Páginas e áreas do site</h2>
			<div class="eyegis-dashboard-grid">
				<?php foreach ( $groups as $group ) : ?>
					<?php
					$available = array();
					foreach ( $group['keys'] as $key ) {
						if ( isset( $documents[ $key ] ) ) {
							$available[] = $documents[ $key ];
						}
					}
					if ( empty( $available ) ) {
						continue;
					}
					?>
					<section class="eyegis-dashboard-card">
						<div class="eyegis-dashboard-card-icon dashicons <?php echo esc_attr( $group['icon'] ); ?>" aria-hidden="true"></div>
						<h3><?php echo esc_html( $group['title'] ); ?></h3>
						<p><?php echo esc_html( $group['description'] ); ?></p>
						<div class="eyegis-dashboard-links">
							<?php foreach ( $available as $document ) : ?>
								<a href="<?php echo esc_url( get_edit_post_link( $document->ID ) ); ?>">
									<span><?php echo esc_html( $this->friendly_document_title( $document->post_title ) ); ?></span>
									<span aria-hidden="true">→</span>
								</a>
							<?php endforeach; ?>
						</div>
					</section>
				<?php endforeach; ?>
			</div>

			<details class="eyegis-advanced-link">
				<summary>Manutenção técnica</summary>
				<p>Use esta área somente quando solicitado por um desenvolvedor.</p>
				<a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=' . self::POST_TYPE ) ); ?>">Abrir modo avançado</a>
			</details>
		</div>
		<?php
	}

	private function editor_groups() {
		return array(
			array(
				'title'       => 'Página inicial',
				'description' => 'Hero, benefícios, ciência, coleções, FAQ e chamadas da Home.',
				'icon'        => 'dashicons-admin-home',
				'keys'        => array( 'home', 'home-how-it-works', 'home-honest-science', 'trust-strip', 'home-universe', 'home-faq', 'collection_comp', 'lifestyle', 'shoponamazon', 'whatsinthebox', 'faq' ),
			),
			array(
				'title'       => 'Coleções',
				'description' => 'Páginas e mensagens das coleções Homem, Mulher e Kids.',
				'icon'        => 'dashicons-products',
				'keys'        => array( 'men', 'women', 'kids' ),
			),
			array(
				'title'       => 'Produtos',
				'description' => 'Meridian, Atelier, Marais, Solene e comparativo de modelos.',
				'icon'        => 'dashicons-cart',
				'keys'        => array( 'products-meridian', 'product-meridian-page', 'products-atelier-page', 'products-marais-page', 'products-solene-page', 'product-comparison' ),
			),
			array(
				'title'       => 'Lentes e tecnologia',
				'description' => 'EyegisGuard, Honest Science, espectro e conteúdo sobre lentes.',
				'icon'        => 'dashicons-visibility',
				'keys'        => array( 'lenses', 'lenses_page', 'technology-overview', 'technology-spectrum', 'technology-guard', 'honest-science' ),
			),
			array(
				'title'       => 'Sobre e contato',
				'description' => 'História da marca, informações institucionais e atendimento.',
				'icon'        => 'dashicons-businessperson',
				'keys'        => array( 'about', 'about-details', 'contact', 'coming-soon' ),
			),
			array(
				'title'       => 'Ajuda e políticas',
				'description' => 'FAQ completo, envio, garantia, privacidade e conformidade.',
				'icon'        => 'dashicons-shield-alt',
				'keys'        => array( 'faq-page', 'shipping', 'warranty', 'privacy', 'legal', 'compliance' ),
			),
			array(
				'title'       => 'Menu e rodapé',
				'description' => 'Navegação, redes sociais, contatos, rodapé e banner de cookies.',
				'icon'        => 'dashicons-menu-alt3',
				'keys'        => array( 'global', 'translations', 'footer', 'footer-trust', 'cookie-banner' ),
			),
		);
	}

	private function friendly_document_title( $title ) {
		$parts = preg_split( '/\s+[—·]\s+/u', (string) $title );
		return trim( (string) end( $parts ) );
	}

	public function render_status_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Sem permissão.' );
		}

		$endpoint          = rest_url( 'eyegis/v1/content' );
		$seed_url          = wp_nonce_url( admin_url( 'admin-post.php?action=eyegis_seed_missing' ), 'eyegis_seed_missing' );
		$frontend_url      = $this->frontend_url();
		$is_preview        = self::DEFAULT_FRONTEND_URL !== $frontend_url;
		$settings_feedback = isset( $_GET['frontend-updated'] ) && is_string( $_GET['frontend-updated'] ) ? sanitize_key( wp_unslash( $_GET['frontend-updated'] ) ) : '';
		?>
		<div class="wrap">
			<h1>Integração React</h1>
			<?php if ( 'saved' === $settings_feedback ) : ?>
				<div class="notice notice-success is-dismissible"><p>Endereço do front-end salvo.</p></div>
			<?php elseif ( 'default' === $settings_feedback ) : ?>
				<div class="notice notice-success is-dismissible"><p>O Studio voltou a usar o site de produção.</p></div>
			<?php elseif ( 'invalid' === $settings_feedback ) : ?>
				<div class="notice notice-error"><p>Informe um endereço HTTP ou HTTPS válido.</p></div>
			<?php endif; ?>

			<h2>Endereço do preview do Studio</h2>
			<p>O iframe do Studio e o atalho do painel usam este endereço. Isso não troca o domínio público nem publica alterações no site.</p>
			<?php if ( $is_preview ) : ?>
				<div class="notice notice-warning inline"><p><strong>Ambiente de teste ativo:</strong> o Studio está conectado a <?php echo esc_html( $frontend_url ); ?>.</p></div>
			<?php endif; ?>
			<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<input type="hidden" name="action" value="eyegis_save_settings">
				<?php wp_nonce_field( 'eyegis_save_settings' ); ?>
				<p>
					<label class="screen-reader-text" for="eyegis-frontend-url">Endereço do front-end</label>
					<input id="eyegis-frontend-url" name="eyegis_frontend_url" type="url" class="large-text code" required value="<?php echo esc_attr( $frontend_url ); ?>" placeholder="https://eyegis-eyewear.com">
				</p>
				<p class="submit">
					<button type="submit" class="button button-primary">Salvar endereço</button>
					<?php if ( $is_preview ) : ?>
						<button type="submit" class="button" name="eyegis_use_default" value="1">Usar produção</button>
					<?php endif; ?>
				</p>
			</form>

			<hr>
			<h2>API pública de conteúdo</h2>
			<p>Este é o endereço público de leitura usado pelo site React. Nenhuma senha é exposta.</p>
			<p><input type="text" class="large-text code" readonly value="<?php echo esc_attr( $endpoint ); ?>"></p>
			<p><a class="button button-primary" href="<?php echo esc_url( $endpoint ); ?>" target="_blank" rel="noopener noreferrer">Testar API</a></p>
			<hr>
			<h2>Documentos iniciais</h2>
			<p>O botão abaixo cria documentos ausentes e repara documentos que não estão publicados ou perderam os dados iniciais. Conteúdo válido já editado não é sobrescrito.</p>
			<p><a class="button" href="<?php echo esc_url( $seed_url ); ?>">Criar ou reparar documentos</a></p>
		</div>
		<?php
	}

	public function handle_save_settings() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Sem permissão.' );
		}
		check_admin_referer( 'eyegis_save_settings' );

		if ( isset( $_POST['eyegis_use_default'] ) ) {
			delete_option( self::FRONTEND_URL_OPTION );
			$this->redirect_to_status_page( 'default' );
		}

		$submitted = isset( $_POST['eyegis_frontend_url'] ) && is_string( $_POST['eyegis_frontend_url'] ) ? wp_unslash( $_POST['eyegis_frontend_url'] ) : '';
		$normalized = $this->normalize_frontend_url( $submitted );
		if ( '' === $normalized ) {
			$this->redirect_to_status_page( 'invalid' );
		}

		if ( self::DEFAULT_FRONTEND_URL === $normalized ) {
			delete_option( self::FRONTEND_URL_OPTION );
		} else {
			update_option( self::FRONTEND_URL_OPTION, $normalized );
		}
		$this->redirect_to_status_page( 'saved' );
	}

	private function frontend_url() {
		$stored     = get_option( self::FRONTEND_URL_OPTION, self::DEFAULT_FRONTEND_URL );
		$configured = $this->normalize_frontend_url( $stored );
		if ( '' === $configured ) {
			$configured = self::DEFAULT_FRONTEND_URL;
		}

		$filtered = apply_filters( 'eyegis_frontend_url', $configured );
		$filtered = $this->normalize_frontend_url( $filtered );
		return '' !== $filtered ? $filtered : self::DEFAULT_FRONTEND_URL;
	}

	private function normalize_frontend_url( $url ) {
		$url = esc_url_raw( trim( (string) $url ), array( 'http', 'https' ) );
		if ( '' === $url || ! wp_http_validate_url( $url ) ) {
			return '';
		}
		return untrailingslashit( $url );
	}

	private function redirect_to_status_page( $status ) {
		$url = add_query_arg(
			array(
				'page'             => 'eyegis-headless-status',
				'frontend-updated' => sanitize_key( $status ),
			),
			admin_url( 'admin.php' )
		);
		wp_safe_redirect( $url );
		exit;
	}

	public function handle_seed_missing() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( 'Sem permissão.' );
		}
		check_admin_referer( 'eyegis_seed_missing' );
		$count = $this->seed_missing_documents();
		$url   = add_query_arg(
			array(
				'post_type' => self::POST_TYPE,
				'seeded'    => $count,
			),
			admin_url( 'edit.php' )
		);
		wp_safe_redirect( $url );
		exit;
	}

	public function maybe_upgrade_seed() {
		$seed = $this->read_seed();
		if ( empty( $seed['schema_version'] ) ) {
			return;
		}
		$current = (int) get_option( self::SCHEMA_OPTION, 0 );
		if ( $current < (int) $seed['schema_version'] ) {
			$this->seed_missing_documents();
		}
	}

	private function seed_missing_documents() {
		$seed = $this->read_seed();
		if ( empty( $seed['documents'] ) || ! is_array( $seed['documents'] ) ) {
			return 0;
		}
		$created = 0;
		foreach ( $seed['documents'] as $document ) {
			if ( empty( $document['key'] ) || ! isset( $document['content'] ) ) {
				continue;
			}
			$key = sanitize_key( $document['key'] );
			$existing_id = $this->find_document_id( $key );
			if ( $existing_id ) {
				$changed = false;
				if ( 'publish' !== get_post_status( $existing_id ) ) {
					$result = wp_update_post(
						array(
							'ID'          => $existing_id,
							'post_status' => 'publish',
						),
						true
					);
					$changed = ! is_wp_error( $result );
				}
				$stored = json_decode( (string) get_post_meta( $existing_id, self::META_KEY, true ), true );
				if ( ! is_array( $stored ) ) {
					update_post_meta(
						$existing_id,
						self::META_KEY,
						wp_json_encode( $document['content'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
					);
					$changed = true;
				} else {
					$merged = $this->merge_missing_values( $stored, $document['content'] );
					$merged = $this->apply_seed_migrations( $key, $merged, $document['content'] );
					if ( $merged !== $stored ) {
						update_post_meta(
							$existing_id,
							self::META_KEY,
							wp_json_encode( $merged, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
						);
						$changed = true;
					}

					$draft = json_decode( (string) get_post_meta( $existing_id, self::DRAFT_META_KEY, true ), true );
					if ( is_array( $draft ) ) {
						$migrated_draft = $this->apply_seed_migrations( $key, $draft, $document['content'] );
						if ( $migrated_draft !== $draft ) {
							update_post_meta(
								$existing_id,
								self::DRAFT_META_KEY,
								wp_json_encode( $migrated_draft, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
							);
							$changed = true;
						}
					}
				}
				if ( $changed ) {
					$created++;
				}
				continue;
			}
			$post_id = wp_insert_post(
				array(
					'post_type'   => self::POST_TYPE,
					'post_status' => 'publish',
					'post_title'  => sanitize_text_field( $document['title'] ?? $key ),
				),
				true
			);
			if ( is_wp_error( $post_id ) ) {
				continue;
			}
			update_post_meta( $post_id, self::DOCUMENT_KEY, $key );
			update_post_meta(
				$post_id,
				self::META_KEY,
				wp_json_encode( $document['content'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
			);
			$created++;
		}
		if ( isset( $seed['schema_version'] ) ) {
			update_option( self::SCHEMA_OPTION, (int) $seed['schema_version'] );
		}
		if ( $created > 0 ) {
			delete_transient( self::CACHE_KEY );
		}
		return $created;
	}

	private function merge_missing_values( $stored, $defaults ) {
		if ( ! is_array( $stored ) || ! is_array( $defaults ) || $this->is_list_array( $defaults ) ) {
			return $stored;
		}

		$merged = $stored;
		foreach ( $defaults as $key => $default_value ) {
			if ( ! array_key_exists( $key, $merged ) ) {
				$merged[ $key ] = $default_value;
				continue;
			}
			if ( is_array( $merged[ $key ] ) && is_array( $default_value ) ) {
				$merged[ $key ] = $this->merge_missing_values( $merged[ $key ], $default_value );
			}
		}
		return $merged;
	}

	private function apply_seed_migrations( $document_key, $stored, $defaults ) {
		$migrations = array(
			'women' => array(
				'FR.eyebrow'     => 'Collection · Women',
				'FR.title'        => "Women's Collection",
				'FR.titleAccent'  => 'for those who create.',
				'FR.subtitle'     => 'A cat-eye in tortoise acetate with a discreet gold shield-G on the temple.',
				'FR.ctaLabel'     => 'Shop on Amazon',
			),
			'kids' => array(
				'FR.eyebrow'     => 'Collection · Kids & Teens',
				'FR.title'        => 'Protection',
				'FR.titleAccent'  => 'for the screen generation.',
				'FR.subtitle'     => 'Lightweight, flexible, impact-resistant frames — for study, gaming and remote learning.',
				'FR.ctaLabel'     => 'Shop the Kids collection',
			),
			'about' => array(
				'FR.title'   => 'Our Story',
				'FR.mission' => 'We believe design and engineering should walk together.',
			),
			'faq' => array(
				'FR.questions.0.q' => 'What is Eyegis?',
				'FR.questions.0.a' => 'Eyegis is an eyewear brand focused on digital protection and premium design.',
			),
		);

		if ( empty( $migrations[ $document_key ] ) ) {
			return $stored;
		}

		$migrated = $stored;
		foreach ( $migrations[ $document_key ] as $path => $obsolete_value ) {
			$this->replace_seed_value_if_unchanged( $migrated, $defaults, $path, $obsolete_value );
		}
		return $migrated;
	}

	private function replace_seed_value_if_unchanged( &$stored, $defaults, $path, $obsolete_value ) {
		$segments       = explode( '.', $path );
		$stored_cursor  =& $stored;
		$default_cursor = $defaults;

		foreach ( $segments as $index => $segment ) {
			$is_last = count( $segments ) - 1 === $index;
			if ( ! is_array( $stored_cursor ) || ! is_array( $default_cursor ) ) {
				return;
			}
			if ( ! array_key_exists( $segment, $stored_cursor ) || ! array_key_exists( $segment, $default_cursor ) ) {
				return;
			}
			if ( $is_last ) {
				if ( $stored_cursor[ $segment ] === $obsolete_value ) {
					$stored_cursor[ $segment ] = $default_cursor[ $segment ];
				}
				return;
			}
			$stored_cursor  =& $stored_cursor[ $segment ];
			$default_cursor = $default_cursor[ $segment ];
		}
	}

	private function is_list_array( $value ) {
		if ( ! is_array( $value ) || empty( $value ) ) {
			return true;
		}
		return array_keys( $value ) === range( 0, count( $value ) - 1 );
	}

	private function find_document_id( $key ) {
		$posts = get_posts(
			array(
				'post_type'      => self::POST_TYPE,
				'post_status'    => 'any',
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => self::DOCUMENT_KEY,
				'meta_value'     => $key,
			)
		);
		return empty( $posts ) ? 0 : (int) $posts[0];
	}

	private function read_seed() {
		$file = plugin_dir_path( __FILE__ ) . 'seed-content.json';
		if ( ! is_readable( $file ) ) {
			return array();
		}
		$seed = json_decode( (string) file_get_contents( $file ), true );
		return is_array( $seed ) ? $seed : array();
	}
}

new Eyegis_Headless_Content();
register_activation_hook( __FILE__, array( 'Eyegis_Headless_Content', 'activate' ) );
