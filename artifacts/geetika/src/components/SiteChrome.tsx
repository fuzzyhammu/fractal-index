import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Menu, X } from "lucide-react";
import { CLUSTERS } from "@/data/clusters";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const topLinks = [
  { to: "/", label: "Home", num: "00" },
  { to: "/dashboard", label: "Pages", num: "✦✦" },
];

function forceNav(to: string) {
  if (to === window.location.pathname) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  window.dispatchEvent(
    new CustomEvent("gg-force-nav", { detail: { to, reload: false } })
  );
}

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-4 z-[70] flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-navy-deep/80 text-gold shadow-[0_10px_24px_-14px_hsl(220_60%_4%/0.65)] backdrop-blur-md transition-all duration-300 ${
        visible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
};

export const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`force-light fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy-deep/85 backdrop-blur-md border-b border-paper/10 shadow-[0_8px_24px_-12px_hsl(220_60%_4%/0.5)]"
            : "bg-navy-deep/55 backdrop-blur-md border-b border-paper/10 shadow-[0_8px_24px_-12px_hsl(220_60%_4%/0.5)]"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => forceNav("/")}
            className="flex items-center gap-3 group bg-transparent border-0 p-0 cursor-pointer"
            aria-label="Go to homepage"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold [text-shadow:0_2px_8px_hsl(220_60%_4%/0.65),0_1px_2px_hsl(220_60%_4%/0.8)]">
              GG
            </span>
            <span className="hidden sm:inline font-display [text-shadow:0_2px_8px_hsl(220_60%_4%/0.65),0_1px_2px_hsl(220_60%_4%/0.8)] text-xl text-[#faee6e] bg-[#91262600]">
              Geetika Gehlot
            </span>
          </button>

          <div className="flex items-center gap-3 text-paper">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 group px-2 py-1 text-paper hover:text-gold shadow-[0_6px_18px_-4px_hsl(220_60%_4%/0.55)]"
              aria-label="Open menu"
            >
              <span className="hidden md:inline eyebrow !text-paper group-hover:!text-gold transition-colors [text-shadow:0_2px_8px_hsl(220_60%_4%/0.65),0_1px_2px_hsl(220_60%_4%/0.8)]">
                Index
              </span>
              <Menu className="w-5 h-5 !text-paper group-hover:!text-gold transition-colors drop-shadow-[0_2px_6px_hsl(220_60%_4%/0.65)]" />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-navy-deep/85 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-paper text-ink shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="eyebrow">Site Index</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5 text-ink hover:text-gold transition-colors" />
            </button>
          </div>
          <nav className="p-6">
            <ol className="space-y-0">
              {topLinks.map((s) => (
                <li key={s.to}>
                  <button
                    onClick={() => { setOpen(false); forceNav(s.to); }}
                    className={`w-full text-left flex items-baseline gap-6 py-4 border-b border-border/60 group transition-colors bg-transparent border-0 ${
                      pathname === s.to ? "text-gold" : "text-ink hover:text-gold"
                    }`}
                  >
                    <span className="font-mono text-[0.7rem] tracking-widest text-muted-foreground w-8">{s.num}</span>
                    <span className="font-display text-xl">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-6 mb-2"><span className="eyebrow">Pages</span></div>
            <ul className="border-t border-border/60">
              {CLUSTERS.map((c) => {
                const CI = c.icon;
                return (
                  <li key={c.slug} className="border-b border-border/60">
                    <button
                      onClick={() => { setOpen(false); forceNav(`/${c.slug}`); }}
                      className={`w-full text-left flex items-baseline gap-4 py-3 transition-colors bg-transparent border-0 ${
                        pathname === `/${c.slug}` ? "text-gold" : "text-ink hover:text-gold"
                      }`}
                    >
                      <CI className="w-3.5 h-3.5 text-gold shrink-0 self-center" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground w-8">{c.num}</span>
                      <span className="font-display text-base">{c.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export const SiteFooter = forwardRef<HTMLElement>((_, ref) => (
  <footer ref={ref} className="force-light bg-navy-deep text-paper relative overflow-hidden grain">
    <div className="container py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <p className="label-gold mb-4">Colophon</p>
        <p className="font-display text-2xl text-balance leading-tight">
          A living dossier of one curious mind, updated as the work continues.
        </p>
      </div>
      <div>
        <p className="eyebrow text-paper/60 mb-4">Navigate</p>
        <ul className="space-y-2 font-mono text-xs">
          <li>
            <button onClick={() => forceNav("/")} className="link-underline hover:text-gold bg-transparent border-0 p-0 cursor-pointer text-left">
              00 · Home
            </button>
          </li>
          <li>
            <button onClick={() => forceNav("/dashboard")} className="link-underline hover:text-gold bg-transparent border-0 p-0 cursor-pointer text-left">
              ✦✦ · Pages
            </button>
          </li>
          {CLUSTERS.map((c) => (
            <li key={c.slug}>
              <button onClick={() => forceNav(`/${c.slug}`)} className="link-underline hover:text-gold bg-transparent border-0 p-0 cursor-pointer text-left">
                {c.num} · {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-paper/10">
      <div className="container py-3 flex flex-col md:flex-row justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-paper/50">
        <span>© {new Date().getFullYear()} Geetika Gehlot · Montréal</span>
        <span>Edition I · Volume One · Ongoing</span>
      </div>
    </div>
  </footer>
));

SiteFooter.displayName = "SiteFooter";

export const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-paper text-foreground">
    <SiteNav />
    <ScrollProgressBar />
    <ScrollToTopButton />
    <main className="pt-16">{children}</main>
    <SiteFooter />
  </div>
);
