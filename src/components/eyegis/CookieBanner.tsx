import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/context";

const STORAGE_KEY = "eyegis-cookies-accepted";

const COPY = {
  EN: {
    text: "This site uses cookies to improve your experience.",
    accept: "Accept",
    learn: "Learn more",
  },
  PT: {
    text: "Este site usa cookies para melhorar sua experiência.",
    accept: "Aceitar",
    learn: "Saiba mais",
  },
  FR: {
    text: "Ce site utilise des cookies pour améliorer votre expérience.",
    accept: "Accepter",
    learn: "En savoir plus",
  },
} as const;

export function CookieBanner() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {
      /* noop */
    }
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const copy = COPY[lang] ?? COPY.EN;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* noop */
    }
    setLeaving(true);
    setTimeout(() => setVisible(false), 320);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
        leaving ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ animation: leaving ? undefined : "eyegis-cookie-in 300ms ease-out both" }}
    >
      <style>{`@keyframes eyegis-cookie-in{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div className="w-full" style={{ background: "#1D252D" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-3 text-white sm:flex-row sm:justify-between">
          <p className="text-center font-sans text-[13px] font-light text-white/80 sm:text-left">
            {copy.text}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="small-caps text-[11px] text-mint underline underline-offset-4 hover:text-white"
            >
              {copy.learn}
            </a>
            <button
              type="button"
              onClick={accept}
              className="small-caps rounded-full bg-teal px-5 py-2 text-[11px] font-medium text-white transition-colors hover:bg-teal/90"
            >
              {copy.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
