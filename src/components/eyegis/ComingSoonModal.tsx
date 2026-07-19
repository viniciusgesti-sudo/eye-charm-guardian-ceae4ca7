import { useEffect, useRef, useState, useCallback } from "react";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/context";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");


const COPY = {
  EN: {
    eyebrow: "Coming soon on Amazon",
    title: "Be first to know when Eyegis lands.",
    body: "Eyegis is preparing its Amazon launch. Leave your email and we'll notify you with priority access before general release.",
    placeholder: "your@email.com",
    submit: "Notify me",
    success: "You're on the list.",
    successBody: "We'll email you as soon as Eyegis is live on Amazon.",
    close: "Close",
    trust: "No spam · Unsubscribe in one click",
  },
  PT: {
    eyebrow: "Em breve na Amazon",
    title: "Seja o primeiro a saber quando Eyegis chegar.",
    body: "Os óculos Eyegis estarão disponíveis em breve na Amazon. Cadastre seu e-mail para ser avisado com prioridade.",
    placeholder: "seu@email.com",
    submit: "Notifique-me",
    success: "Você está na lista.",
    successBody: "Avisaremos por e-mail assim que Eyegis estiver disponível na Amazon.",
    close: "Fechar",
    trust: "Sem spam · Cancele em um clique",
  },
  FR: {
    eyebrow: "Bientôt sur Amazon",
    title: "Soyez informé du lancement Eyegis.",
    body: "Eyegis prépare son lancement sur Amazon. Laissez votre e-mail pour un accès prioritaire dès la sortie.",
    placeholder: "votre@email.com",
    submit: "Prévenez-moi",
    success: "Vous êtes inscrit.",
    successBody: "Nous vous enverrons un e-mail dès qu'Eyegis sera disponible sur Amazon.",
    close: "Fermer",
    trust: "Pas de spam · Désabonnement en un clic",
  },
} as const;

const STORAGE_KEY = "eyegis:coming-soon:emails";

export function ComingSoonModal() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.EN;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setError(null);
      setEmail("");
    }, 250);
  }, []);

  useEffect(() => {
    const openModal = () => setOpen(true);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href='#coming-soon'], a[href*='#coming-soon']");
      const trigger = target.closest<HTMLElement>("[data-coming-soon]");
      if (!anchor && !trigger) return;
      e.preventDefault();
      e.stopPropagation();
      openModal();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("eyegis:coming-soon", openModal as EventListener);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("eyegis:coming-soon", openModal as EventListener);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) && trimmed.length <= 254;
    if (!valid) {
      setStatus("error");
      setError("Invalid email");
      return;
    }
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
      if (!prev.includes(trimmed)) prev.push(trimmed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    } catch {
      /* ignore storage failure */
    }
    setStatus("sent");
    setError(null);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
    >
      <button
        type="button"
        aria-label={c.close}
        onClick={close}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-paper text-ink shadow-2xl ring-1 ring-ink/10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          aria-label={c.close}
          onClick={close}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink transition"
        >
          <X size={18} />
        </button>

        <div className="px-8 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ borderColor: "rgba(0,75,87,0.25)", color: "#004B57" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "#86D9D1" }}
            />
            {c.eyebrow}
          </div>

          {status === "sent" ? (
            <div className="mt-6">
              <div
                className="mb-4 grid h-12 w-12 place-items-center rounded-full"
                style={{ backgroundColor: "rgba(134,217,209,0.25)", color: "#004B57" }}
              >
                <CheckCircle2 size={24} />
              </div>
              <h2
                id="coming-soon-title"
                className="font-editorial text-3xl leading-tight md:text-4xl"
                style={{ color: "#004B57" }}
              >
                {c.success}
              </h2>
              <p className="mt-3 text-ink/70">{c.successBody}</p>
              <button
                type="button"
                onClick={close}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition hover:-translate-y-0.5"
                style={{ backgroundColor: "#004B57" }}
              >
                {c.close}
              </button>
            </div>
          ) : (
            <>
              <h2
                id="coming-soon-title"
                className="mt-5 font-editorial text-3xl leading-[1.05] md:text-4xl"
                style={{ color: "#004B57" }}
              >
                {c.title}
              </h2>
              <p className="mt-4 text-ink/70">{c.body}</p>

              <form onSubmit={submit} className="mt-6 space-y-3" noValidate>
                <label className="sr-only" htmlFor="coming-soon-email">
                  {c.placeholder}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="coming-soon-email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={c.placeholder}
                    className="w-full flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-base text-ink placeholder:text-ink/40 focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition hover:-translate-y-0.5"
                    style={{ backgroundColor: "#004B57" }}
                  >
                    {c.submit}
                    <span aria-hidden>→</span>
                  </button>
                </div>
                {status === "error" && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
              </form>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-ink/50">
                <ShieldCheck size={14} style={{ color: "#86D9D1" }} />
                {c.trust}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
