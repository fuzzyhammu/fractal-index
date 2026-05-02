import { ReactNode, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowUpRight, FileText, Image as ImgIcon, Sparkles, Quote, Link2,
  ChevronDown, BookOpen,
} from "lucide-react";
import { ClusterShell } from "./ClusterShell";
import { Card, Placeholder, PullQuote, Marginalia, Embed, Stat } from "./Editorial";
import { CLUSTERS, findCluster, type Cluster, type Subpage } from "@/data/clusters";

function SubpageHeader({ kicker, num, title, lede }: { kicker: string; num: string; title: string; lede?: string }) {
  return (
    <header className="px-4 md:px-12 pt-10 md:pt-14 pb-8 max-w-5xl">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-xs tracking-[0.3em] text-gold">§ {num}</span>
        <span className="eyebrow">{kicker}</span>
      </div>
      <h1 className="display-xl text-4xl md:text-6xl text-ink text-balance">{title}</h1>
      {lede && <p className="mt-6 text-lg text-ink-soft font-display italic max-w-2xl leading-relaxed">{lede}</p>}
      <div className="rule-gold mt-10" />
    </header>
  );
}

/** Collapsible section: everything in view, expandable for comfort. */
type IconCmp = React.ComponentType<{ className?: string }>;

function Section({
  id, icon: Icon, label, title, defaultOpen = true, children,
}: { id: string; icon: IconCmp; label: string; title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    const handler = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true);
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [id]);
  return (
    <section id={id} className="px-4 md:px-12 border-t border-border scroll-mt-32">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 py-6 md:py-8 text-left group"
        aria-expanded={open}
      >
        <Icon className="w-4 h-4 text-gold shrink-0" />
        <span className="label-gold">{label}</span>
        <span className="flex-1 h-px bg-border" />
        <h2 className="font-display text-xl md:text-2xl text-ink group-hover:text-gold transition-colors text-right">
          {title}
        </h2>
        <ChevronDown
          className={`w-4 h-4 text-ink-soft transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-10 md:pb-14" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
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
            to={`/${c.slug}/overview`}
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

/** Bodies (no Block wrapper — Section provides framing). */
function OverviewInner({ cluster }: { cluster: Cluster }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Stat value={String(cluster.subpages.length)} label="Sub-rails" />
      <Stat value="6" label="Fractal rails" />
      <Stat value={cluster.num} label="Cluster #" />
      <Stat value="∞" label="Open threads" />
    </div>
  );
}

function HighlightsInner() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
        {[1,2,3,4,5,6].map((n) => (
          <Card key={n} eyebrow={`Highlight ${n}`} title={`Featured item ${n}`} meta="TODO · Replace with real entry">
            One paragraph: what it is, when it happened, why it matters, what came of it.
          </Card>
        ))}
    </div>
  );
}

function EvidenceInner() {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Placeholder key={i} label={`Evidence document ${i+1} — drop image, scan, or PDF`} />
        ))}
      </div>
      <Marginalia>Each evidence item should answer: who issued it, when, what it certifies.</Marginalia>
    </>
  );
}

function MediaInner() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Placeholder key={i} label={`Media item ${i+1}`} ratio="aspect-video" />
        ))}
      </div>
      <Embed title="Embed slot" todo="YouTube, Vimeo, podcast feed, or external player URL goes here." />
    </>
  );
}

function ReflectionInner() {
  return (
    <div className="max-w-3xl space-y-6">
        <p className="font-display text-xl text-ink leading-relaxed drop-cap">
          A short reflection paragraph. What was hard, what surprised me, what I want to keep doing,
          and what I would no longer do the same way.
        </p>
        <PullQuote>One honest sentence I learned the hard way.</PullQuote>
    </div>
  );
}

function TopicInner({ topicLabel }: { topicLabel: string }) {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-ink-soft text-lg leading-relaxed font-display italic">
        A clear statement of scope for <strong className="text-ink not-italic">{topicLabel}</strong>: what's in,
        what's out, and why it deserves its own thread.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {[1,2,3,4].map((n) => (
          <Card key={n} eyebrow="Item" title={`Anchor ${n}`} meta="TODO">Replace with the real entry.</Card>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Placeholder key={i} label={`${topicLabel} — media ${i+1}`} ratio="aspect-video" />
        ))}
      </div>
    </div>
  );
}

const KIND_META: Record<string, { icon: IconCmp; label: string; title: (cl: string) => string }> = {
  overview:    { icon: Sparkles, label: "Overview",   title: (cl) => `${cl} — at a glance` },
  highlights:  { icon: Sparkles, label: "Highlights", title: () => "Best-of, six selected items" },
  evidence:    { icon: FileText, label: "Evidence",   title: () => "Documents, scores, certificates" },
  media:       { icon: ImgIcon,  label: "Media",      title: () => "Photos, video, audio, embeds" },
  reflection:  { icon: Quote,    label: "Reflection", title: () => "What I learned" },
  related:     { icon: Link2,    label: "Related",    title: () => "Where this connects" },
  topic:       { icon: BookOpen, label: "Topic",      title: () => "" },
};

function renderInner(s: Subpage, c: Cluster): ReactNode {
  switch (s.kind) {
    case "overview":   return <OverviewInner cluster={c} />;
    case "highlights": return <HighlightsInner />;
    case "evidence":   return <EvidenceInner />;
    case "media":      return <MediaInner />;
    case "reflection": return <ReflectionInner />;
    case "related":    return <RelatedRail clusterSlug={c.slug} />;
    case "topic":      return <TopicInner topicLabel={s.label} />;
    default:           return null;
  }
}

/** Single-page cluster view: every rail rendered as a collapsible section. */
export function FractalPage() {
  const { cluster = "", sub } = useParams();
  const c = findCluster(cluster);

  // If a sub is requested, drop a hash so the matching Section auto-opens & scrolls.
  useEffect(() => {
    if (!c) return;
    if (sub && sub !== "overview") {
      window.location.hash = sub;
    } else if (!sub) {
      // strip hash on bare overview
      if (window.location.hash) history.replaceState(null, "", window.location.pathname);
    }
  }, [sub, c]);

  if (!c) return <Navigate to="/dashboard" replace />;

  return (
    <ClusterShell>
      <SubpageHeader
        num={c.num}
        kicker={`Cluster · ${c.label}`}
        title={c.label}
        lede={c.tagline}
      />
      {c.subpages.map((s) => {
        const meta = KIND_META[s.kind ?? "topic"];
        const isTopic = s.kind === "topic";
        const title = isTopic ? s.label : meta.title(c.label);
        return (
          <Section
            key={s.slug}
            id={s.slug}
            icon={meta.icon}
            label={isTopic ? "Topic" : meta.label}
            title={title}
            defaultOpen={s.kind === "overview" || s.kind === "highlights"}
          >
            {renderInner(s, c)}
          </Section>
        );
      })}
      <div className="h-24" />
    </ClusterShell>
  );
}