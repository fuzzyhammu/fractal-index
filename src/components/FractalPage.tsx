import { ReactNode, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowUpRight, FileText, Image as ImgIcon, Sparkles, Quote, Link2, BookOpen,
  Mail, Linkedin, Github, Send, MapPin,
} from "lucide-react";
import { ClusterShell } from "./ClusterShell";
import { PullQuote } from "./Editorial";
import { CLUSTERS, findCluster, type Cluster, type Subpage } from "@/data/clusters";
import heroFallback from "@/assets/atmos-notebook.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";
import texturePaper from "@/assets/texture-paper.jpg";
import { toast } from "@/hooks/use-toast";

function SubpageHeader({ kicker, num, title, lede, portrait }: { kicker: string; num: string; title: string; lede?: string; portrait?: string }) {
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

/** Always-expanded rail: no toggle, just an anchored block with header + content. */
type IconCmp = React.ComponentType<{ className?: string }>;

function Rail({
  id, icon: Icon, label, title, children,
}: { id: string; icon: IconCmp; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="px-4 md:px-12 border-t border-border scroll-mt-32 py-10 md:py-14">
      <header className="flex items-center gap-3 mb-8">
        <Icon className="w-4 h-4 text-gold shrink-0" />
        <span className="label-gold">{label}</span>
        <span className="flex-1 h-px bg-border" />
        <h2 className="font-display text-xl md:text-2xl text-ink text-right">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

function RelatedRail({ clusterSlug }: { clusterSlug: string }) {
  const others = CLUSTERS.filter((c) => c.slug !== clusterSlug).slice(0, 6);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {others.map((c) => {
        const I = c.icon;
        return (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            className="group dossier-card p-5 hover-lift flex items-start gap-3"
          >
            <I className="w-4 h-4 text-gold mt-1 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">§ {c.num}</p>
              <h3 className="font-display text-xl text-ink leading-tight">{c.label}</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed line-clamp-2">{c.tagline}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-ink-soft group-hover:text-gold transition-colors" />
          </Link>
        );
      })}
    </div>
  );
}

/* -------------------- Real facts per topic -------------------- */

type TopicFact = {
  lede?: string;
  bullets?: string[];
  youtube?: { kind: "video" | "playlist"; id: string; title: string };
};

const TOPIC_FACTS: Record<string, TopicFact> = {
  "personal-profile": {
    lede: "17 years old · born February 2009 · Indian-Canadian · based in Westmount, Montréal.",
    bullets: [
      "Moved from India to Montréal on October 10, 2024 with her family after her father's job promotion.",
      "Currently in Secondary 5 (Quebec system) — one year from graduation.",
      "Trilingual: English, Hindi, French.",
      "Down-to-earth, highly competitive, kind, and known for mentoring peers and managing difficult personalities.",
    ],
  },
  "identity-timeline": {
    lede: "From Rajasthani roots to Quebec school benches — a fast, recent transcontinental move.",
    bullets: [
      "Born February 2009 in India.",
      "Crowned 'School Princess' in grades 3 and 5; head girl of her entire school in grade 5.",
      "TCS IntelliGem (India) top-4 nationally in grade 5.",
      "Moved to Montréal, QC on October 10, 2024.",
    ],
  },
  "languages-culture": {
    lede: "Rajasthani heritage, raised across continents, fluent across three languages.",
    bullets: [
      "Languages: English, Hindi, French.",
      "Strong Rajasthani cultural roots — values leadership, communication, and cultural integration.",
      "Balances fitting in and standing out as uniquely herself.",
    ],
  },
  "education-goals": {
    lede: "Targeting elite admissions in Massachusetts, New York, and Boston via scholarships.",
    bullets: [
      "Aiming for prestigious U.S. high schools and universities, especially in MA, NY, and Boston.",
      "Plans a Bachelor's in engineering or physics, then a Master's in business / commerce.",
      "Limited family resources for college — actively pursuing scholarships and merit recognition.",
    ],
  },
  "career-vision": {
    lede: "Science, engineering, and business — built into a multibillion-dollar career.",
    bullets: [
      "Long-term aim: become a powerful, successful multibillionaire across science and business.",
      "Loves to engineer, invent, and innovate across tech design, science, sales, and marketing.",
      "Wants to master cybersecurity at an elite, offensive level — APT and RAT research-grade depth.",
    ],
  },
  "what-i-am-building": {
    lede: "Several long-running projects, all alive at once.",
    bullets: [
      "A 400+ chapter sci-fi/fantasy novel sequel about multiverses.",
      "An advanced rap project where every verse has a distinct rhythmic and phonetic identity.",
      "Independent physics research toward college-level work in particle physics and astrophysics.",
      "A path into elite cybersecurity — building from zero toward undetectable APTs and RATs.",
    ],
  },

  "education-timeline": {
    lede: "From Indian schooling and national olympiads to Quebec ministry exams.",
    bullets: [
      "Schooled in India through grade 9; head girl in grade 5.",
      "Now in Secondary 5 in Westmount, Quebec (EMSB).",
      "Grade 10 EMSB ministry exams: 100 in math, 100 in history, 97 in science.",
      "Plans to keep her GPA high until graduation.",
    ],
  },
  "subject-strengths": {
    lede: "Deep in physics, math, and pure sciences — strong across humanities too.",
    bullets: [
      "Self-completed first two years of university physics, chemistry, math, and biology.",
      "Passionate about supersymmetry (SUSY), relativity, quantum mechanics, and astronomy.",
      "Avid stargazing-app user; loves both theoretical and creative aspects of science.",
    ],
  },
  "awards-vault": {
    lede: "Hundreds of recognitions — most-awarded student in her school.",
    bullets: [
      "SOF Olympiad — multiple distinctions.",
      "IOQM (Indian Olympiad Qualifier in Mathematics) — high ranks.",
      "Junior Science Olympiad (JSO) and Regional Mathematics Olympiad (RMO) — high ranks.",
      "Several cash prizes across olympiads.",
      "TCS IntelliGem — top-4 nationally in grade 5.",
      "Whiz Kids Abacus — National Rank 3.",
    ],
  },
  "growth-notes": {
    lede: "Always pushing limits — every new field treated as a new craft to master.",
    bullets: [
      "Strives for excellence in every new skill she tries, in every field.",
      "Highly competitive but also kind — known for mentoring peers.",
      "Strong communication skills, especially with difficult people.",
    ],
  },
  "physics-journey": {
    lede: "Self-teaching high-energy physics since age 10–11.",
    bullets: [
      "Independently completed coursework equivalent to the first two years of university physics.",
      "Focus areas: quantum mechanics, particle physics, supersymmetry, relativity, astrophysics.",
      "Prepared for both AP Physics C tracks (Mechanics + E&M) and passed in grade 10.",
    ],
  },
  "research-interests": {
    lede: "Particle physics, astrophysics, quantum mechanics — and the people who do them.",
    bullets: [
      "Actively seeking research opportunities and professor collaborations.",
      "Met and contacted Prof. Mariana Frank (Concordia) for mentorship in particle physics.",
      "Building a young CV with lab experience to maximize chances at elite institutions.",
    ],
  },
  "independent-archive": {
    lede: "A homemade university — derivations, problem sets, notes, and reading.",
    bullets: [
      "Years of independent notes across physics, chem, math, and biology at university level.",
      "Olympiad problem sets: IOQM, RMO, JSO, JEE Mains & Advanced, NEET, AP Calc BC, SAT.",
    ],
  },
  "mentorship": {
    lede: "Guidance from a small circle of trusted mentors in Montréal.",
    bullets: [
      "Amandeep Bakshi — guidance and support.",
      "Arpi Hamalian — guidance and support.",
      "Ailie Cleghorn — guidance and support.",
      "Prof. Mariana Frank (Concordia) — particle-physics mentorship.",
    ],
  },
  "future-stem-goals": {
    lede: "Olympiad rounds, college-level research, and elite admissions.",
    bullets: [
      "Preparing for Physics & Math olympiads.",
      "Pursuing college-level physics research while still in high school.",
      "Aim: elite undergraduate program in engineering or physics in the U.S.",
    ],
  },

  "frc-team-7700": {
    lede: "FRC Team 7700 · 2025–26 season.",
    bullets: [
      "Member of the 2025–2026 FRC robotics team #7700.",
      "Sharing engineering and teamwork skills with peers across the build season.",
    ],
  },

  "novel-series-archive": {
    lede: "A 400+ chapter sci-fi / fantasy novel sequel.",
    bullets: [
      "Drafted 400+ chapters for a fantasy novel sequel.",
      "Themes: multiverses, fantasy, the architecture of universes.",
      "Blends storytelling with her curiosity about physics and cosmology.",
    ],
  },

  "vocal-performance": {
    lede: "Hindustani classical vocalist — competition-winning.",
    bullets: [
      "Trained in Indian classical singing.",
      "Won several classical singing competitions.",
    ],
    youtube: { kind: "video", id: "ztgyTb76WU0", title: "Geetika — classical singing performance" },
  },
  "instrumental": {
    lede: "Electric guitar (Polyphia in 6 months) and piano.",
    bullets: [
      "From never having touched an electric guitar to playing 'Goat' by Polyphia — including its polyrhythmic riffs — in 6 months.",
      "Also plays piano.",
    ],
  },
  "performance-portfolio": {
    lede: "Stages, screens, and recordings.",
    bullets: [
      "Classical vocal competition wins.",
      "Bollywood acting and dubbing work (see Child Artist Archive).",
    ],
  },
  "repertoire": {
    lede: "Hindustani raagas, contemporary covers, and an in-progress rap project.",
    bullets: [
      "Working on an advanced rap project: each verse with a distinct rhythmic, phonetic, and structural identity.",
      "Techniques: rhythmic foot changes, vowel-palette shifts, syllabic-density variation, vocal-character switches, phonetic mutation, and performance tricks (coughs, time-lapse flow, serpent speech, fourth-wall-breaking meta-rap).",
    ],
  },

  "child-artist-archive": {
    lede: "Bollywood acting and dubbing — full YouTube playlist below.",
    bullets: [
      "Years of on-screen acting work as a Bollywood child artist.",
      "Voice / dubbing experience alongside on-camera roles.",
    ],
    youtube: { kind: "playlist", id: "PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", title: "Geetika — acting playlist" },
  },
  "acting-reel": {
    lede: "A walk-through of on-screen highlights.",
    youtube: { kind: "playlist", id: "PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", title: "Geetika — acting reel playlist" },
  },
  "voice-screen": {
    lede: "Bollywood dubbing and voice work.",
    bullets: ["Dubbing experience alongside on-camera acting."],
  },

  "zionaxelle": {
    lede: "Multimedia universe and personal tech sandbox.",
    bullets: [
      "Computer enthusiast with expertise in advanced music-production software and image/video editing.",
      "Loves to engineer, invent, and ship across tech design, science, sales, and marketing.",
    ],
  },
  "tech-skills": {
    lede: "From multimedia stacks to offensive cybersecurity.",
    bullets: [
      "Advanced music-production software, image editing, video editing.",
      "Goal: master offensive cybersecurity — APT and RAT research-grade depth.",
    ],
  },

  "canvas-art": {
    lede: "Canvas painter — highly skilled, long practice.",
    bullets: ["Years of canvas painting; recognized as highly skilled."],
  },
  "embroidery": {
    lede: "Hand embroidery as a meditative second craft.",
  },

  "ymca-youth-co-op": {
    lede: "Vice President · YMCA Youth Co-op (NDG–Westmount, 2025).",
    bullets: [
      "Led a small team of 15 highly intelligent, ambitious teens.",
      "Built the co-op from scratch — finances, marketing, and HR run independently.",
      "Made the co-op's services known across Montréal.",
    ],
  },
  "cultural-integration": {
    lede: "Rajasthani heritage carried into Montréal classrooms.",
    bullets: [
      "Values leadership, communication, and cultural integration.",
      "Balances fitting in with standing out — uniquely herself.",
    ],
  },

  "badminton": { lede: "Recreational badminton — a long-running hobby." },
  "table-tennis": { lede: "Reflex sport — a steady hobby alongside badminton." },
  "chess": {
    lede: "State-level chess qualifier in India.",
    bullets: ["Qualified at state level in chess tournaments in India."],
  },
  "strategic-thinking": {
    lede: "Strategy as a daily training ground.",
    bullets: ["Chess tournaments and competitive math sharpen long-horizon decision-making."],
  },

  "karate": {
    lede: "Years of karate — multiple trophies and medals.",
    bullets: ["Won several trophies and medals across martial-arts competitions."],
  },
  "abacus": {
    lede: "Whiz Kids Abacus — National Rank 3.",
    bullets: ["Third nationally in Whiz Kids Abacus competition."],
  },
  "side-quests": {
    lede: "Random wins across years of school life.",
    bullets: [
      "Hundreds of certificates and medals.",
      "Most-awarded student in her school.",
    ],
  },
  "random-wins": {
    lede: "School Princess (grades 3 & 5), head girl, TCS IntelliGem top-4, and more.",
  },
  "childhood-trophies": {
    lede: "Olympiads, abacus, martial arts, classical singing — from elementary years onward.",
  },

  "channels": { lede: "Email, LinkedIn, GitHub — and the contact form above." },
  "links": { lede: "Acting and music samples." },
};

/* -------------------- Inner renderers -------------------- */

function YouTubeEmbed({ kind, id, title }: { kind: "video" | "playlist"; id: string; title: string }) {
  const src = kind === "playlist"
    ? `https://www.youtube.com/embed/videoseries?list=${id}`
    : `https://www.youtube.com/embed/${id}`;
  return (
    <div className="relative aspect-video w-full max-w-3xl border border-border bg-paper-deep overflow-hidden">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function FactBlock({ fact }: { fact: TopicFact }) {
  return (
    <div className="space-y-5 max-w-3xl">
      {fact.lede && (
        <p className="font-display text-xl md:text-2xl text-ink leading-relaxed drop-cap">
          {fact.lede}
        </p>
      )}
      {fact.bullets && fact.bullets.length > 0 && (
        <ul className="space-y-2.5">
          {fact.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-ink-soft text-base leading-relaxed font-accent">
              <span className="font-mono text-[0.65rem] text-gold mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {fact.youtube && <YouTubeEmbed {...fact.youtube} />}
    </div>
  );
}

function OverviewInner({ cluster }: { cluster: Cluster }) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden border border-border aspect-[21/9]">
        <img
          src={heroFallback}
          alt={`${cluster.label} — atmospheric hero`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-paper">
          <p className="label-gold mb-3">§ {cluster.num} · {cluster.label}</p>
          <h2 className="font-display text-3xl md:text-6xl leading-tight max-w-3xl text-balance">
            {cluster.tagline}
          </h2>
        </div>
      </div>
    </div>
  );
}

function HighlightsInner({ cluster }: { cluster: Cluster }) {
  const topics = cluster.subpages.filter((s) => s.kind === "topic").slice(0, 6);
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {topics.map((t) => {
        const fact = TOPIC_FACTS[t.slug];
        return (
          <div key={t.slug} className="border-l-2 border-gold/50 pl-5">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold mb-2">{t.label}</p>
            <p className="font-display text-lg text-ink leading-snug">
              {fact?.lede ?? "More inside the topic rail below."}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function EvidenceInner({ cluster }: { cluster: Cluster }) {
  const lines =
    cluster.slug === "academics"
      ? [
          "AP exams (grade 10): Chemistry · Biology · Environmental Science · Physics C Mechanics · Physics C E&M — all passed.",
          "EMSB ministry (grade 10): 100 math · 100 history · 97 science.",
          "SOF Olympiad · IOQM · JSO · RMO — high ranks, several cash prizes.",
          "TCS IntelliGem (India) — top-4 nationally, grade 5.",
          "Whiz Kids Abacus — National Rank 3.",
        ]
      : cluster.slug === "vault"
      ? [
          "Most-awarded student in her school — hundreds of trophies, medals, certificates.",
          "Karate trophies and medals across years.",
          "Classical singing competition wins.",
          "TCS IntelliGem top-4 (India).",
          "Head girl + School Princess (grades 3 & 5).",
          "AP, EMSB ministry, and Olympiad records.",
        ]
      : ["Detailed receipts live inside the topic rails below."];
  return (
    <ul className="space-y-2.5 max-w-3xl">
      {lines.map((l, i) => (
        <li key={i} className="flex gap-3 text-ink-soft font-accent leading-relaxed">
          <span className="font-mono text-[0.65rem] text-gold mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <span>{l}</span>
        </li>
      ))}
    </ul>
  );
}

function MediaInner({ cluster }: { cluster: Cluster }) {
  if (cluster.slug === "works") {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="label-gold">Acting · Bollywood</p>
          <YouTubeEmbed kind="playlist" id="PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f" title="Geetika — acting playlist" />
        </div>
        <div className="space-y-3">
          <p className="label-gold">Hindustani classical · competition</p>
          <YouTubeEmbed kind="video" id="ztgyTb76WU0" title="Geetika — classical singing performance" />
        </div>
      </div>
    );
  }
  return (
    <p className="font-accent italic text-ink-soft max-w-2xl leading-relaxed">
      Photos, video, audio, and external embeds connected to {cluster.label}.
    </p>
  );
}

function ReflectionInner({ cluster }: { cluster: Cluster }) {
  const text =
    cluster.slug === "about"
      ? "Despite the long ledger, I work to stay down-to-earth — fitting in while remaining uniquely myself."
      : cluster.slug === "academics"
      ? "Self-teaching at university level since age 10 taught me that the syllabus is the floor, never the ceiling."
      : cluster.slug === "works"
      ? "Every craft pays the others back — physics tightens my writing, music sharpens my code, leadership funds the time."
      : cluster.slug === "vault"
      ? "Awards are receipts, not goals. They prove the curiosity was here."
      : "If you're reading this, the door is open — start with an email.";
  return (
    <div className="max-w-3xl space-y-6">
      <p className="font-display text-xl text-ink leading-relaxed drop-cap">{text}</p>
      <PullQuote>Curiosity is not my hobby. It is my operating system.</PullQuote>
    </div>
  );
}

function TopicInner({ topicLabel, topicSlug }: { topicLabel: string; topicSlug: string }) {
  const fact = TOPIC_FACTS[topicSlug];
  if (!fact) {
    return (
      <p className="max-w-3xl text-ink-soft text-lg leading-relaxed font-display italic">
        More on <strong className="text-ink not-italic">{topicLabel}</strong> coming soon.
      </p>
    );
  }
  return <FactBlock fact={fact} />;
}

const KIND_META: Record<string, { icon: IconCmp; label: string; title: (cl: string) => string }> = {
  overview:    { icon: Sparkles, label: "Overview",   title: (cl) => `${cl} — at a glance` },
  highlights:  { icon: Sparkles, label: "Highlights", title: () => "Best-of, hand-picked" },
  evidence:    { icon: FileText, label: "Evidence",   title: () => "Documents, scores, certificates" },
  media:       { icon: ImgIcon,  label: "Media",      title: () => "Photos, video, audio, embeds" },
  reflection:  { icon: Quote,    label: "Reflection", title: () => "What I learned" },
  related:     { icon: Link2,    label: "Related",    title: () => "Where this connects" },
  topic:       { icon: BookOpen, label: "Topic",      title: () => "" },
};

function renderInner(s: Subpage, c: Cluster): ReactNode {
  switch (s.kind) {
    case "overview":   return <OverviewInner cluster={c} />;
    case "highlights": return <HighlightsInner cluster={c} />;
    case "evidence":   return <EvidenceInner cluster={c} />;
    case "media":      return <MediaInner cluster={c} />;
    case "reflection": return <ReflectionInner cluster={c} />;
    case "related":    return <RelatedRail clusterSlug={c.slug} />;
    case "topic":      return <TopicInner topicLabel={s.label} topicSlug={s.slug} />;
    default:           return null;
  }
}

/** Single-page cluster view: every rail rendered as an always-expanded section. */
export function FractalPage() {
  const { cluster = "", sub } = useParams();
  const c = findCluster(cluster);

  // If a sub is requested, drop a hash so the matching Rail scrolls into view.
  useEffect(() => {
    if (!c) return;
    if (sub && sub !== "overview") {
      window.location.hash = sub;
      setTimeout(() => {
        document.getElementById(sub)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else if (!sub) {
      if (window.location.hash) history.replaceState(null, "", window.location.pathname);
    }
  }, [sub, c]);

  if (!c) return <Navigate to="/" replace />;

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

      {c.slug === "works" && <WorksMoodBoard />}

      {c.slug === "contact" && (
        <Rail id="get-in-touch" icon={Mail} label="Get in touch" title="Open correspondence">
          <ContactBlock />
        </Rail>
      )}

      {c.subpages.map((s) => {
        const meta = KIND_META[s.kind ?? "topic"];
        const isTopic = s.kind === "topic";
        const title = isTopic ? s.label : meta.title(c.label);
        return (
          <Rail
            key={s.slug}
            id={s.slug}
            icon={meta.icon}
            label={isTopic ? "Topic" : meta.label}
            title={title}
          >
            {renderInner(s, c)}
          </Rail>
        );
      })}
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
      <form onSubmit={onSubmit} className="bg-paper-deep border border-border p-6 md:p-8 space-y-4 fancy-tile fibers stipple">
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
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft">
          Submitting opens your mail app — nothing is stored on this site.
        </p>
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

/* -------------------- Works mood board: an assortment of mismatched scraps -------------------- */

type Scrap =
  | { kind: "image"; src: string; label: string; tilt?: number; shape?: "square" | "tall" | "wide" | "circle" | "polaroid" | "diamond" | "arch"; size?: "sm" | "md" | "lg" | "xl" }
  | { kind: "quote"; text: string; tilt?: number; tone?: "ink" | "gold" | "navy" }
  | { kind: "tag"; text: string; tilt?: number; tone?: "ink" | "gold" | "navy" | "paper" }
  | { kind: "swatch"; color: string; label: string; tilt?: number; size?: "sm" | "md" | "lg" }
  | { kind: "stamp"; text: string; sub?: string; tilt?: number }
  | { kind: "ticket"; head: string; body: string; tilt?: number }
  | { kind: "asterism"; tilt?: number };

const MOOD_SCRAPS: Scrap[] = [
  { kind: "image", src: atmosTelescope, label: "Observation", shape: "tall", size: "lg", tilt: -2 },
  { kind: "tag", text: "Worldbuilding", tone: "gold", tilt: -4 },
  { kind: "image", src: atmosNotebook, label: "Notation", shape: "polaroid", size: "md", tilt: 3 },
  { kind: "quote", text: "Curiosity is not my hobby.", tone: "ink", tilt: -1 },
  { kind: "swatch", color: "hsl(var(--gold))", label: "Gold · 04", size: "md", tilt: 5 },
  { kind: "image", src: atmosMusic, label: "Resonance", shape: "circle", size: "md", tilt: 0 },
  { kind: "stamp", text: "Edition I", sub: "Volume One", tilt: -6 },
  { kind: "tag", text: "Robotics 7700", tone: "navy", tilt: 2 },
  { kind: "image", src: textureCosmos, label: "Cosmos plate", shape: "wide", size: "lg", tilt: 1 },
  { kind: "ticket", head: "FRC", body: "Build · Drive · Debug", tilt: -3 },
  { kind: "image", src: heroPortrait, label: "Self-portrait", shape: "polaroid", size: "sm", tilt: -5 },
  { kind: "swatch", color: "hsl(var(--navy-deep))", label: "Navy · 01", size: "sm", tilt: -2 },
  { kind: "asterism", tilt: 0 },
  { kind: "tag", text: "Hindustani vocal", tone: "ink", tilt: 4 },
  { kind: "image", src: texturePaper, label: "Paper field", shape: "diamond", size: "md", tilt: -3 },
  { kind: "quote", text: "Words before pixels.", tone: "gold", tilt: 2 },
  { kind: "image", src: atmosNotebook, label: "Drafting", shape: "arch", size: "md", tilt: -1 },
  { kind: "tag", text: "Zionaxelle", tone: "paper", tilt: -2 },
  { kind: "stamp", text: "Examined", sub: "in public", tilt: 4 },
  { kind: "image", src: atmosTelescope, label: "Optics", shape: "square", size: "sm", tilt: 3 },
  { kind: "swatch", color: "hsl(var(--paper-deep))", label: "Paper · 00", size: "sm", tilt: 6 },
  { kind: "tag", text: "Embroidery", tone: "gold", tilt: -3 },
  { kind: "image", src: atmosMusic, label: "Stage", shape: "tall", size: "md", tilt: 2 },
  { kind: "ticket", head: "YMCA", body: "Youth co-op · VP", tilt: -4 },
  { kind: "quote", text: "Every claim, open for inspection.", tone: "ink", tilt: -2 },
  { kind: "tag", text: "Karate · Abacus · Chess", tone: "navy", tilt: 3 },
];

const sizePx = { sm: 110, md: 170, lg: 230, xl: 300 } as const;

function shapeClasses(shape: NonNullable<Extract<Scrap, { kind: "image" }>["shape"]>) {
  switch (shape) {
    case "square":   return "aspect-square";
    case "tall":     return "aspect-[3/4]";
    case "wide":     return "aspect-[16/9]";
    case "circle":   return "aspect-square rounded-full";
    case "polaroid": return "aspect-[4/5] p-2 pb-8 bg-paper border border-border shadow-[0_8px_22px_-10px_hsl(220_60%_4%/0.4)]";
    case "diamond":  return "aspect-square rotate-45";
    case "arch":     return "aspect-[3/4] rounded-t-full";
  }
}

function ScrapCard({ scrap, idx }: { scrap: Scrap; idx: number }) {
  const tilt = scrap.tilt ?? 0;
  const baseTransform = `rotate(${tilt}deg)`;
  const hoverStyle: React.CSSProperties = { transform: baseTransform };

  const wrap = (children: ReactNode, extra = "") => (
    <div
      className={`shrink-0 transition-transform duration-500 hover:!rotate-0 hover:scale-[1.04] hover:z-10 will-change-transform ${extra}`}
      style={hoverStyle}
      data-reveal
      data-reveal-delay={String((idx % 12) * 40)}
    >
      {children}
    </div>
  );

  if (scrap.kind === "image") {
    const w = sizePx[scrap.size ?? "md"];
    const isPolaroid = scrap.shape === "polaroid";
    const isDiamond = scrap.shape === "diamond";
    const inner = (
      <figure
        className={`relative overflow-hidden ${shapeClasses(scrap.shape ?? "square")} ${isPolaroid ? "" : "border border-border bg-paper-deep"}`}
        style={{ width: w }}
      >
        <img
          src={scrap.src}
          alt={scrap.label}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover ${isDiamond ? "-rotate-45 scale-[1.42]" : ""} ${isPolaroid ? "!relative !inset-auto !h-auto aspect-[4/5]" : ""}`}
        />
        {!isPolaroid && (
          <span className="absolute inset-0 ring-1 ring-inset ring-paper/10 mix-blend-overlay pointer-events-none" />
        )}
        {isPolaroid && (
          <figcaption className="absolute left-0 right-0 bottom-1.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ink-soft">
            {scrap.label}
          </figcaption>
        )}
      </figure>
    );
    return wrap(inner);
  }

  if (scrap.kind === "quote") {
    const toneCls =
      scrap.tone === "gold" ? "text-gold border-gold/40"
      : scrap.tone === "navy" ? "text-paper bg-navy-deep border-navy-deep"
      : "text-ink border-border bg-paper";
    return wrap(
      <blockquote className={`max-w-[260px] border ${toneCls} p-4 font-display italic text-base md:text-lg leading-snug shadow-[0_8px_22px_-12px_hsl(220_60%_4%/0.35)]`}>
        “{scrap.text}”
      </blockquote>
    );
  }

  if (scrap.kind === "tag") {
    const toneCls =
      scrap.tone === "gold" ? "bg-gold text-navy-deep"
      : scrap.tone === "navy" ? "bg-navy-deep text-paper"
      : scrap.tone === "paper" ? "bg-paper-deep text-ink border border-border"
      : "bg-paper text-ink border border-border";
    return wrap(
      <span className={`inline-block px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.3em] ${toneCls} shadow-[0_4px_12px_-6px_hsl(220_60%_4%/0.4)]`}>
        {scrap.text}
      </span>
    );
  }

  if (scrap.kind === "swatch") {
    const w = sizePx[scrap.size ?? "md"];
    return wrap(
      <div className="bg-paper border border-border p-2 shadow-[0_6px_16px_-8px_hsl(220_60%_4%/0.4)]" style={{ width: w }}>
        <div className="aspect-square" style={{ background: scrap.color }} />
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-ink-soft mt-1.5 text-center">
          {scrap.label}
        </p>
      </div>
    );
  }

  if (scrap.kind === "stamp") {
    return wrap(
      <div className="border-2 border-dashed border-gold/70 px-3 py-2 text-center bg-paper">
        <p className="font-display text-lg text-gold leading-none">{scrap.text}</p>
        {scrap.sub && (
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-gold/80 mt-1">{scrap.sub}</p>
        )}
      </div>
    );
  }

  if (scrap.kind === "ticket") {
    return wrap(
      <div className="flex items-stretch shadow-[0_8px_22px_-12px_hsl(220_60%_4%/0.4)]">
        <div className="bg-navy-deep text-paper px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] flex items-center">
          {scrap.head}
        </div>
        <div className="bg-paper border border-l-0 border-border px-4 py-2 font-display text-sm text-ink">
          {scrap.body}
        </div>
      </div>
    );
  }

  // asterism
  return wrap(
    <div className="font-display text-3xl text-gold tracking-[0.35em] select-none">✦ ✶ ✦</div>
  );
}

function WorksMoodBoard() {
  return (
    <section
      id="mood-board"
      className="relative scroll-mt-32 px-4 md:px-12 pt-2 pb-12 border-t border-border crumpled-paper film-grain stipple"
    >
      <header className="flex items-center gap-3 mb-6">
        <Sparkles className="w-4 h-4 text-gold shrink-0" />
        <span className="label-gold">Mood board</span>
        <span className="flex-1 h-px bg-border" />
        <h2 className="font-display text-xl md:text-2xl text-ink text-right">A drawer of miscellany</h2>
      </header>
      <p className="max-w-2xl text-ink-soft text-sm md:text-base font-accent italic mb-6 leading-relaxed">
        Scraps, swatches, polaroids, half-tickets — the off-cuts that don't fit a single rail
        but together explain the room. Hover any piece to straighten it.
      </p>
      <div className="relative -mx-4 md:-mx-12 px-4 md:px-12 overflow-x-auto pb-4">
        <ul className="flex items-center gap-5 md:gap-7 min-w-max">
          {MOOD_SCRAPS.map((scrap, i) => (
            <li key={i} className="flex items-center">
              <ScrapCard scrap={scrap} idx={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
