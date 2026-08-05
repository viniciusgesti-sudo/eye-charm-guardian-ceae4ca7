export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export type JsonObject = { [key: string]: JsonValue };

export type ContentDocument = JsonObject | JsonValue[];

export type ContentDocuments = Record<string, ContentDocument>;

export type WordPressContentPayload = {
  version: string;
  generated_at: string;
  documents: ContentDocuments;
};

export type MediaOverride = {
  label?: string;
  match?: string;
  url?: string;
  mobileUrl?: string;
  alt?: string;
};

export type MediaDocument = Record<string, MediaOverride>;
