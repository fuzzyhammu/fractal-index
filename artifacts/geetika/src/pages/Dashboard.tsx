import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, FileText } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { CLUSTERS } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";

const PAGE_BOXES = [
  { slug: "about", label: "About", num: "01", accent: "Foundations" },
  { slug: "academics", label: "Academics, STEM & Research", num: "02", accent: "Evidence" },
  { slug: "works", label: "Works", num: "03", accent: "Projects" },
  { slug: "vault", label: "CV & Document Vault", num: "04", accent: "Records" },
  { slug: "contact", label: "Contact & Links", num: "05", accent: "Reach out" },
];

const Dashboard = () => {
  useReveal();

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ ✦✦</span>
          <span className="eyebrow">Pages</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          One hub for every page.
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Choose a doorway into the dossier, or use the top-right index as usual.
        </p>
        <div className="rule-gold mt-12" />
      </section>

      <section className="container pb-12 md:pb-16" data-reveal>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PAGE_BOXES.map((page) => (
            <Link
              key={page.slug}
              to={`/${page.slug}`}
              className="group fancy-tile block border border-border bg-paper hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="grid md:grid-cols-[1.35fr,0.9fr] min-h-[320px]">
                <div className="p-7 md:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.3em] text-gold">{page.num}</p>
                      <h2 className="font-display text-2xl md:text-3xl leading-tight text-ink group-hover:text-gold transition-colors duration-300 mt-3">
                        {page.label}
                      </h2>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-ink-soft group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                  </div>
                  <p className="mt-8 max-w-sm text-sm md:text-base text-ink-soft leading-relaxed font-accent italic">
                    {page.slug === "vault"
                      ? "Open the CV, résumé, and document archive in one place."
                      : page.slug === "contact"
                        ? "Reach me by email and open the external profiles."
                        : `Go straight into ${page.accent.toLowerCase()} and the full section.`}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 border border-border px-3 py-1 text-[0.6rem] uppercase tracking-widest text-ink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {page.accent}
                    </span>
                    <span className="inline-flex items-center gap-2 border border-border px-3 py-1 text-[0.6rem] uppercase tracking-widest text-ink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                      Full page
                    </span>
                  </div>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-border bg-paper-deep p-6 md:p-7 relative overflow-hidden">
                  <div className="absolute inset-0 grain opacity-35 pointer-events-none" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <p className="label-gold mb-4">Peek</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/35 to-navy-deep/30 border border-border" />
                          <div>
                            <p className="font-display text-sm text-ink">{page.label}</p>
                            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-ink-soft">{page.accent}</p>
                          </div>
                        </div>
                        <div className="rule-gold opacity-60" />
                        <div className="space-y-2 text-ink-soft text-sm leading-relaxed">
                          <p>{page.slug === "about" ? "Identity, languages, timeline, and the through-line of the whole dossier." : page.slug === "academics" ? "Education, physics, awards, growth notes, and research interests." : page.slug === "works" ? "Robotics, writing, music, screen, design, art, leadership, and sports." : page.slug === "vault" ? "Large CV box, PDF embeds, downloads, and document receipts." : "Email, LinkedIn, GitHub, and a direct path to get in touch."}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ink-soft">Open page</span>
                      <ArrowUpRight className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-16 md:pb-20" data-reveal>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="mailto:geetikagehlot2009@gmail.com" className="group fancy-tile block border border-border bg-paper p-6 hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
            <p className="font-mono text-[0.65rem] tracking-[0.3em] text-gold">Email</p>
            <h3 className="mt-4 font-display text-xl text-ink group-hover:text-gold transition-colors">Send a message</h3>
            <p className="mt-3 text-sm text-ink-soft">Open the mail client directly.</p>
          </a>
          <Link to="/vault" className="group fancy-tile block border border-border bg-paper p-6 hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
            <p className="font-mono text-[0.65rem] tracking-[0.3em] text-gold">CV</p>
            <h3 className="mt-4 font-display text-xl text-ink group-hover:text-gold transition-colors">Open the CV page</h3>
            <p className="mt-3 text-sm text-ink-soft">The big CV box, downloads, and PDF views live there.</p>
          </Link>
          <Link to="/" className="group fancy-tile block border border-border bg-paper p-6 hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
            <p className="font-mono text-[0.65rem] tracking-[0.3em] text-gold">Home</p>
            <h3 className="mt-4 font-display text-xl text-ink group-hover:text-gold transition-colors">Return to home</h3>
            <p className="mt-3 text-sm text-ink-soft">Jump back to the hero slideshow and manifesto.</p>
          </Link>
        </div>
      </section>
    </PageShell>
  );
};

export default Dashboard;
