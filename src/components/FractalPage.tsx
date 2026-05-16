import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  ArrowUpRight, FileText, Mail, Linkedin, Github, Send, MapPin, Globe,
  Calendar, Briefcase, GraduationCap, Award, Eye, Plus,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClusterShell } from "./ClusterShell";
import { CLUSTERS, findCluster, type Cluster } from "@/data/clusters";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { toast } from "@/hooks/use-toast";

type IconCmp = React.ComponentType<{ className?: string }>;

function SubpageHeader({
  kicker, num, title, lede, portrait,
}: { kicker: string; num: string; title: string; lede?: string; portrait?: string }) {
  return (
    <header className="px-4 md:px-12 pt-10 md:pt-14 pb-8 max-w-6xl">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-xs tracking-[0.3em] text-gold">§ {num}</span>
        <span className="eyebrow">{kicker}</span>
      </div>
      <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
        <div>
          <h1 className="display-xl text-4xl md:text-6xl text-ink text-balance">{title}</h1>
          {lede && <p className="mt-6 text-lg text-ink-soft font-display italic max-w-2xl leading-relaxed">{lede}</p>}
        </div>
        {portrait && (
          <figure className="relative shrink-0 w-32 md:w-44 aspect-[3/4] overflow-hidden border border-border bg-paper-deep">
            <img
              src={portrait}
              alt="Geetika Gehlot — portrait"
              className="absolute inset-0 w-full h-full object-cover object-[60%_30%]"
              loading="lazy"
            />
            <span className="absolute inset-2 border border-paper/20 pointer-events-none" />
          </figure>
        )}
      </div>
      <div className="rule-gold mt-10" />
    </header>
  );
}

/* -------------------- Mosaic: one click-to-fill box per topic -------------------- */

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const TINTS = [
  "from-gold/15 via-paper to-paper",
  "from-paper via-paper to-navy-deep/10",
  "from-navy-deep/10 via-paper to-gold/10",
  "from-paper-deep via-paper to-paper",
  "from-gold/20 via-paper-deep to-paper",
  "from-paper via-gold/10 to-paper-deep",
];

function MosaicBox({ storageKey, span, tint, index }: { storageKey: string; span: string; tint: string; index: number }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const v = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) ?? "" : "";
    setValue(v);
    setHasContent(v.trim().length > 0);
  }, [storageKey]);

  const save = () => {
    window.localStorage.setItem(storageKey, value);
    setHasContent(value.trim().length > 0);
    setOpen(false);
    toast({ title: "Saved" });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative ${span} min-h-[140px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${tint} transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_18px_40px_-24px_hsl(220_60%_4%/0.4)]`}
        aria-label={`Tile ${index + 1}`}
      >
        <span className="absolute inset-0 ring-1 ring-inset ring-paper/30 mix-blend-overlay pointer-events-none" />
        {hasContent ? (
          <span className="absolute inset-0 p-4 md:p-5 flex items-start text-left font-display text-ink text-sm md:text-base leading-snug whitespace-pre-wrap overflow-hidden">
            {value.slice(0, 240)}
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-ink-soft/50 group-hover:text-gold transition-colors">
            <Plus className="h-5 w-5" />
          </span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-paper">
          <DialogTitle className="font-display text-2xl text-ink">Add to this tile</DialogTitle>
          <DialogDescription className="text-ink-soft">
            Anything you like — a note, a link, a memory. Saved to this browser.
          </DialogDescription>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={10}
            className="w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-accent text-base text-ink resize-y rounded-md"
            placeholder="Write, paste a link, sketch an idea…"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setValue(""); window.localStorage.removeItem(storageKey); setHasContent(false); setOpen(false); }}
              className="px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft hover:text-gold"
            >
              Clear
            </button>
            <button
              onClick={save}
              className="inline-flex items-center gap-2 bg-navy-deep text-paper px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors rounded-md"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Mosaic({ cluster }: { cluster: Cluster }) {
  const topics = useMemo(
    () => cluster.subpages.filter((s) => s.kind === "topic"),
    [cluster],
  );
  return (
    <section className="px-4 md:px-12 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[120px] md:auto-rows-[140px] gap-3 md:gap-4">
        {topics.map((t, i) => (
          <MosaicBox
            key={t.slug}
            storageKey={`mosaic:${cluster.slug}:${t.slug}`}
            span={SPANS[i % SPANS.length]}
            tint={TINTS[i % TINTS.length]}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

/* -------------------- Page -------------------- */

export function FractalPage() {
  const { cluster = "" } = useParams();
  const c = findCluster(cluster);
  if (!c) return <Navigate to="/dashboard" replace />;

  const showPortrait = ["about", "works", "contact"].includes(c.slug);

  return (
    <ClusterShell>
      <SubpageHeader
        num={c.num}
        kicker={`Cluster · ${c.label}`}
        title={c.label}
        lede={c.tagline}
        portrait={showPortrait ? heroPortrait : undefined}
      />

      <Mosaic cluster={c} />

      {c.slug === "vault" && (
        <section className="px-4 md:px-12 pb-16">
          <CVLightbox />
        </section>
      )}

      {c.slug === "contact" && (
        <section className="px-4 md:px-12 pb-16">
          <ContactBlock />
        </section>
      )}

      <div className="h-24" />
    </ClusterShell>
  );
}

/* -------------------- Contact block: form + direct channels -------------------- */

const CONTACT_EMAIL = "geetika@example.com";

function ContactBlock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tn = name.trim(), te = email.trim(), tm = message.trim();
    if (!tn || tn.length > 100) { toast({ title: "Please add your name", description: "Up to 100 characters." }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(te) || te.length > 255) { toast({ title: "Please enter a valid email" }); return; }
    if (!tm || tm.length > 2000) { toast({ title: "Add a short message", description: "Up to 2000 characters." }); return; }
    setSending(true);
    const subject = encodeURIComponent(`Hello from ${tn}`);
    const body = encodeURIComponent(`${tm}\n\n— ${tn} (${te})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 800);
    toast({ title: "Opening your mail client…" });
  };

  const channels: Array<{ icon: IconCmp; label: string; value: string; href?: string }> = [
    { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Linkedin, label: "LinkedIn", value: "/in/geetika-gehlot", href: "https://www.linkedin.com/" },
    { icon: Github, label: "GitHub", value: "@geetika", href: "https://github.com/" },
    { icon: MapPin, label: "Based in", value: "Montréal, QC" },
  ];

  return (
    <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 items-start">
      <form onSubmit={onSubmit} className="bg-paper-deep border border-border p-6 md:p-8 space-y-4 rounded-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="eyebrow">Your name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required
              className="mt-2 w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-display text-base text-ink" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="eyebrow">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required
              className="mt-2 w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-display text-base text-ink" placeholder="you@domain.com" />
          </label>
        </div>
        <label className="block">
          <span className="eyebrow">Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} required rows={6}
            className="mt-2 w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-accent text-base text-ink resize-y"
            placeholder="Say hello, ask a question, or open a door." />
          <span className="block mt-1 font-mono text-[0.6rem] tracking-widest text-ink-soft text-right">{message.length}/2000</span>
        </label>
        <button type="submit" disabled={sending}
          className="inline-flex items-center gap-2 bg-navy-deep text-paper px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors disabled:opacity-50">
          <Send className="w-3.5 h-3.5" />
          {sending ? "Sending…" : "Send via email"}
        </button>
      </form>

      <ul className="space-y-3">
        {channels.map(({ icon: I, label, value, href }) => {
          const inner = (
            <div className="group dossier-card p-5 hover-lift flex items-start gap-3">
              <I className="w-4 h-4 text-gold mt-1 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">{label}</p>
                <p className="font-display text-lg text-ink truncate">{value}</p>
              </div>
              {href && <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-gold transition-colors" />}
            </div>
          );
          return (
            <li key={label}>
              {href ? (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
              ) : inner}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------- CV Lightbox -------------------- */

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
        <DialogTitle className="sr-only">Curriculum Vitae — Geetika Gehlot</DialogTitle>
        <DialogDescription className="sr-only">Full interactive CV with experience, education, skills, and contact.</DialogDescription>
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

// CLUSTERS import retained for type narrowing in earlier helpers; no-op reference:
void CLUSTERS;
