import { ReactNode, useState } from "react";
import {
  FileText, Eye, ArrowUpRight, Mail, Globe, Linkedin, Calendar, Briefcase,
  GraduationCap, Award, MapPin, Send,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageShell } from "@/components/SiteChrome";
import { MoodMosaic } from "@/components/MoodMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "@/hooks/use-toast";

type IconCmp = React.ComponentType<{ className?: string }>;

const Vault = () => {
  useReveal();
  const cluster = findCluster("vault")!;

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
          <h1 className="display-xl text-5xl md:text-7xl lg:text-8xl text-balance max-w-5xl animate-fade-up">
            Every receipt, open for inspection.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed font-display italic animate-fade-up">
          Open the full interactive CV below.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <MoodMosaic topics={cluster.topics} />

      <section className="container pb-16">
        <CVLightbox />
      </section>
    </PageShell>
  );
};

function CVLightbox() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 text-left shadow-sm transition hover:border-gold hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
            <Eye className="h-5 w-5" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-base text-ink">View CV</span>
            <span className="text-xs text-ink-soft">Open the full interactive résumé</span>
          </span>
          <ArrowUpRight className="ml-2 h-4 w-4 text-ink-soft transition group-hover:text-gold" />
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
