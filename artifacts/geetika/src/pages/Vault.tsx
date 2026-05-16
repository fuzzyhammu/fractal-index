import { ReactNode, useState } from "react";
import {
  FileText, Eye, ArrowUpRight, Mail, Globe, Linkedin, Calendar, Briefcase,
  GraduationCap, Award, MapPin, Download, BookOpen, ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageShell } from "@/components/SiteChrome";
import { useReveal } from "@/hooks/useReveal";

type IconCmp = React.ComponentType<{ className?: string }>;

const CV_PDF_URL = "https://www.guelphhumber.ca/sites/default/files/page_files/Sample_CV-new2.pdf";

const Vault = () => {
  useReveal();

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">004</span>
          <span className="eyebrow">CV & Documents</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-start gap-5 mb-6 animate-fade-in">
          <FileText className="w-6 h-6 text-gold shrink-0 mt-2" />
          <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
            Every receipt, open for inspection.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          The full record — interactive CV, downloadable PDF, and a printable résumé.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <section className="container pb-16 space-y-8">
        <CVFeatureBlock />
        <CVDocumentGrid />
      </section>
    </PageShell>
  );
};

function CVFeatureBlock() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group fancy-tile w-full text-left border border-border bg-paper hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-[1.005] overflow-hidden"
        >
          <div className="grid md:grid-cols-[1fr,380px]">
            {/* Left — CTA */}
            <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
              <div>
                <p className="label-gold mb-4">Curriculum Vitae · 2025</p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink group-hover:text-gold transition-colors duration-500 leading-tight">
                  Geetika Gehlot
                </h2>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
                  Multidisciplinary creator · Montréal, QC
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Robotics", "STEM Research", "Music", "Writing", "Leadership", "Visual Art"].map((tag) => (
                  <span key={tag} className="inline-block border border-border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft group-hover:border-gold/60 transition-colors duration-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/30">
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg text-ink group-hover:text-gold transition-colors duration-300">Open Interactive CV</p>
                  <p className="text-xs text-ink-soft font-mono tracking-wide">Click to expand the full record</p>
                </div>
                <ArrowUpRight className="ml-auto h-5 w-5 text-ink-soft group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
              </div>
            </div>

            {/* Right — mini peek preview */}
            <div className="hidden md:block border-l border-border bg-paper-deep p-6 overflow-hidden relative">
              <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
              <p className="label-gold mb-4 text-[0.55rem]">Preview</p>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-gold/40 to-navy-deep/30 border border-border shrink-0" />
                  <div>
                    <p className="font-display text-sm text-ink">Geetika Gehlot</p>
                    <p className="font-mono text-[0.55rem] text-ink-soft">Student · she/her</p>
                  </div>
                </div>
                <div className="rule-gold opacity-60" />
                <div className="space-y-2">
                  {[
                    { label: "STEM & Robotics", sub: "FRC Team 7700" },
                    { label: "VP, YMCA Youth Co-op", sub: "Leadership" },
                    { label: "Hindustani Vocals", sub: "Classical performer" },
                    { label: "AP Track · Montréal", sub: "Education" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start gap-2 opacity-70">
                      <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                      <div>
                        <p className="font-display text-xs text-ink leading-tight">{row.label}</p>
                        <p className="font-mono text-[0.5rem] uppercase tracking-wider text-ink-soft">{row.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-paper-deep to-transparent" />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[calc(100vw-1.25rem)] sm:w-[calc(100vw-2rem)] max-h-[calc(100vh-1.25rem)] sm:max-h-[calc(100vh-2rem)] p-0 overflow-hidden bg-paper">
        <DialogTitle className="sr-only">Curriculum Vitae: Geetika Gehlot</DialogTitle>
        <DialogDescription className="sr-only">Full CV with experience, education, skills, and contact.</DialogDescription>
        <div className="overflow-y-auto max-h-[calc(100vh-1.25rem)] sm:max-h-[calc(100vh-2rem)]">
          <CVContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PDFEmbedBox({
  title,
  subtitle,
  badge,
  pdfUrl,
  icon: Icon,
  footerMeta,
}: {
  title: string;
  subtitle: string;
  badge: string;
  pdfUrl: string;
  icon: IconCmp;
  footerMeta: string;
}) {
  return (
    <div className="fancy-tile border border-border bg-paper overflow-hidden">
      {/* Header bar */}
      <div className="border-b border-border p-4 md:p-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest border border-gold text-gold bg-gold/10">
            <Icon className="w-3 h-3" />
            {title}
          </span>
        </div>

        <span className="flex-1" />

        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft hover:text-gold transition-colors"
        >
          <Download className="w-3 h-3" />
          Download {title}
        </a>
        <span className="text-ink-soft/40">·</span>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-ink-soft hover:text-gold transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Open in new tab
        </a>
        <span className="font-mono text-[0.55rem] uppercase tracking-widest border border-border px-2 py-0.5 text-ink-soft">
          {badge}
        </span>
      </div>

      {/* PDF embed */}
      <div className="relative w-full" style={{ height: "45vh", minHeight: "320px" }}>
        <iframe
          src={pdfUrl}
          title={`${title} PDF`}
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>

      {/* Footer info */}
      <div className="border-t border-border p-4 md:p-5 flex flex-wrap items-center gap-3 text-ink-soft">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest">
          <span>📄</span> {subtitle}
        </span>
        <span className="text-ink-soft/30">|</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest">
          <span>📐</span> {badge}
        </span>
        <span className="text-ink-soft/30">|</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest">
          <span>🔍</span> Scroll to browse
        </span>
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest">
          <span>✨</span> {footerMeta}
        </span>
      </div>
    </div>
  );
}

function CVDocumentGrid() {
  return (
    <div className="space-y-6">
      {/* CV + Résumé side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        <PDFEmbedBox
          title="CV"
          subtitle="Full curriculum vitae"
          badge="PDF · A4"
          pdfUrl={CV_PDF_URL}
          icon={FileText}
          footerMeta="Updated 2025"
        />
        <PDFEmbedBox
          title="Résumé"
          subtitle="One-page condensed version"
          badge="PDF · Letter"
          pdfUrl={CV_PDF_URL}
          icon={BookOpen}
          footerMeta="Updated 2025"
        />
      </div>

      {/* LinkedIn tile */}
      <a
        href="https://www.linkedin.com/in/geetika-gehlot"
        target="_blank"
        rel="noreferrer"
        className="fancy-tile group block border border-border bg-paper hover:border-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 overflow-hidden p-6"
      >
        <div className="flex items-start justify-between mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20">
            <Linkedin className="h-4 w-4" />
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-widest border border-border px-2 py-1 text-ink-soft group-hover:border-gold/50 transition-colors duration-500">
            External
          </span>
        </div>
        <p className="font-display text-lg text-ink group-hover:text-gold transition-colors duration-300 leading-tight">LinkedIn Profile</p>
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">Connect or view professional timeline</p>
        <ArrowUpRight className="mt-4 h-4 w-4 text-ink-soft group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
      </a>
    </div>
  );
}

function CVContent() {
  const skills = [
    "Full-stack Web Designing", "React", "Python", "Git", "Agile", "CI/CD",
    "Node.js", "Docker", "MongoDB", "Typescript", "AWS", "JavaScript",
  ];
  const languages = ["English", "French", "Hindi", "Marwari"];

  const experience = [
    { role: "Frontend Lead", date: "Jan 24 — Present", org: "Alpha", place: "Cupertino, CA",
      desc: "Spearheaded development of a suite of progressive web applications using React, Swift, and GraphQL." },
    { role: "Frontend Engineer", date: "Sep 22 — Dec 23", org: "Sigma", place: "New York, NY",
      desc: "Enhanced UI for the Sigma Web Player using React and Redux, achieving a 25% increase in engagement." },
    { role: "Junior Software Engineer", date: "Feb 20 — Dec 23", org: "Omega", place: "Menlo Park, CA",
      desc: "Owned feature lifecycle from concept to deployment with a focus on responsive design and accessibility." },
  ];

  const education = [
    { role: "Master of Science in Computer Science", date: "Sep 18 — Jun 20", org: "Astra University", place: "Stanford, CA",
      desc: "Specialized in Software Engineering. Thesis: Scalable Architectures for Real-Time Web Applications. Distinction." },
    { role: "Bachelor of Science in Software Engineering", date: "Sep 15 — Sep 18", org: "Nova University", place: "Providence, RI",
      desc: "Honors. Coursework: Advanced Algorithms, Web Development, UI Design." },
  ];

  const certs = [
    { title: "Alpha Certified Developer Associate", date: "Issued 2019" },
    { title: "Beta Certified Developer Associate", date: "Issued 2023" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] bg-paper text-ink">
      <aside className="border-b md:border-b-0 md:border-r border-border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-14 w-14 rounded-full bg-gradient-to-br from-gold/40 to-primary/30 border border-border" />
          <div>
            <h2 className="font-display text-xl text-ink leading-tight">Geetika Gehlot</h2>
            <p className="text-xs text-ink-soft">she/her</p>
          </div>
        </div>

        <CVSection label="About"><p className="text-sm">Student</p></CVSection>

        <CVSection label="Contact">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /><a className="hover:text-gold break-all" href="mailto:geetikagehlot2009@gmail.com">geetikagehlot2009@gmail.com</a></li>
            <li className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-gold" /><span>geetikagehlot.com</span></li>
            <li className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-gold" /><span>linkedin.com</span></li>
          </ul>
        </CVSection>

        <CVSection label="Skills">
          <div className="flex flex-wrap gap-1.5">{skills.map((s) => <CVPill key={s}>{s}</CVPill>)}</div>
        </CVSection>

        <CVSection label="Languages">
          <div className="flex flex-wrap gap-1.5">{languages.map((s) => <CVPill key={s}>{s}</CVPill>)}</div>
        </CVSection>
      </aside>

      <main className="p-6 md:p-10 space-y-12">
        <section>
          <CVEyebrow>Intro</CVEyebrow>
          <div className="space-y-4 text-base leading-relaxed max-w-2xl">
            <p>I'm Geetika Gehlot — a student-builder working across academics, STEM research, art, robotics, and youth leadership. I focus on intuitive design and rigorous craft.</p>
            <p>Currently exploring computer science, design, and interdisciplinary research while serving as Vice President of the YMCA Youth Co-op and contributing to robotics teams.</p>
          </div>
        </section>

        <section>
          <CVEyebrow>Experience</CVEyebrow>
          <div className="space-y-3">{experience.map((e) => <CVEntry key={e.role} icon={Briefcase} {...e} />)}</div>
        </section>

        <section>
          <CVEyebrow>Education</CVEyebrow>
          <div className="space-y-3">{education.map((e) => <CVEntry key={e.role} icon={GraduationCap} {...e} />)}</div>
        </section>

        <section>
          <CVEyebrow>License & Certification</CVEyebrow>
          <div className="grid sm:grid-cols-2 gap-3">
            {certs.map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold"><Award className="h-4 w-4" /></span>
                <div>
                  <p className="font-display text-sm text-ink">{c.title}</p>
                  <p className="text-xs text-ink-soft mt-0.5">{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CVSection({ label, children }: { label: string; children: ReactNode }) {
  return <div className="mb-6"><p className="eyebrow mb-2">{label}</p>{children}</div>;
}
function CVEyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-4">{children}</p>;
}
function CVPill({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full border border-border bg-card px-2.5 py-1 text-xs text-ink">{children}</span>;
}
function CVEntry({ icon: Icon, role, date, org, place, desc }: { icon: IconCmp; role: string; date: string; org: string; place: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold"><Icon className="h-4 w-4" /></span>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-base text-ink">{role}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{date}</span>
            <span>{org}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{place}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Vault;
