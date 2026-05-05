import type { LucideIcon } from "lucide-react";
import {
  User, GraduationCap, Wand2, FileText, Mail,
} from "lucide-react";

export type Subpage = {
  slug: string;
  label: string;
  kind?: "overview" | "highlights" | "evidence" | "media" | "reflection" | "related" | "topic";
};
export type Cluster = {
  num: string;
  slug: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  legacyOverviewPath?: string;
  subpages: Subpage[];
};

const HEAD: Subpage[] = [
  { slug: "overview", label: "Overview", kind: "overview" },
  { slug: "highlights", label: "Highlights", kind: "highlights" },
  { slug: "media", label: "Media", kind: "media" },
];
const TAIL: Subpage[] = [
  { slug: "evidence", label: "Evidence", kind: "evidence" },
  { slug: "reflection", label: "Reflection", kind: "reflection" },
  { slug: "related", label: "Related", kind: "related" },
];

const topic = (label: string): Subpage => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  kind: "topic",
});

const withTopics = (...topics: string[]): Subpage[] => [
  ...HEAD,
  ...topics.map(topic),
  ...TAIL,
];

export const CLUSTERS: Cluster[] = [
  {
    num: "01", slug: "about", label: "About", icon: User,
    tagline: "17, born February 2009 in India · moved to Montréal Oct 10, 2024 · Secondary 5 in Westmount · Rajasthani roots, trilingual (EN · HI · FR).",
    subpages: withTopics(
      "Personal Profile",
      "Identity Timeline",
      "Languages & Culture",
      "Education Goals",
      "Career Vision",
      "What I Am Building",
    ),
  },
  {
    num: "02", slug: "academics", label: "Academics, STEM & Research", icon: GraduationCap,
    tagline: "Self-taught high-energy physics since age 10. Five AP exams passed in grade 10. Olympiad finalist. Mentored by Profs. at Concordia.",
    subpages: withTopics(
      "Education Timeline",
      "Subject Strengths",
      "Awards Vault",
      "Growth Notes",
      "Physics Journey",
      "Research Interests",
      "Independent Archive",
      "Mentorship",
      "Future STEM Goals",
    ),
  },
  {
    num: "03", slug: "works", label: "Works", icon: Wand2,
    tagline: "Bollywood acting · Hindustani classical vocal · electric guitar (Polyphia in 6 months) · 400+ chapter sci-fi novel · FRC 7700 · YMCA VP.",
    subpages: withTopics(
      "FRC Team 7700",
      "Engineering Skills",
      "Robotics Build Log",
      "Novel Series Archive",
      "Writing Samples",
      "Podcast",
      "Creative Method",
      "Vocal Performance",
      "Instrumental",
      "Performance Portfolio",
      "Repertoire",
      "Child Artist Archive",
      "Acting Reel",
      "Voice & Screen",
      "Media Credits",
      "Zionaxelle",
      "Multimedia Production",
      "Tech Skills",
      "Tech Build Log",
      "Canvas Art",
      "Embroidery",
      "Mixed Media",
      "YMCA Youth Co-op",
      "Mentoring",
      "Community & Family",
      "Cultural Integration",
      "Badminton",
      "Table Tennis",
      "Chess",
      "Strategic Thinking",
      "Karate",
      "Abacus",
      "Side Quests",
      "Random Wins",
      "Childhood Trophies",
    ),
  },
  {
    num: "04", slug: "vault", label: "CV & Document Vault", icon: FileText,
    tagline: "Hundreds of awards — most-awarded student in her school. AP scores, Olympiad ranks, EMSB ministry results, certificates — open for inspection.",
    subpages: withTopics("Certificates", "Transcripts", "Recognition"),
  },
  {
    num: "05", slug: "contact", label: "Contact & Links", icon: Mail,
    tagline: "Open correspondence — research mentors, collaborators, scholarship committees welcome.",
    subpages: withTopics("Channels", "Links"),
  },
];

// PROOF_CLUSTER removed.

export const findCluster = (slug: string) => CLUSTERS.find((c) => c.slug === slug);
export const findSubpage = (cluster: Cluster, slug: string) =>
  cluster.subpages.find((s) => s.slug === slug);

/* Grouping removed — the site is flat: five pages + Proof. The exports below
   are kept as no-op stubs for any legacy imports that may still reference them. */
export type GrandGroup = {
  slug: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  clusterSlugs: string[];
};
export const GRAND_GROUPS: GrandGroup[] = [];
export const findGrandGroup = (_clusterSlug: string): GrandGroup | undefined => undefined;

/* Map of OLD URLs -> NEW canonical merged URLs. Topic anchors map to the
   matching section inside the new merged cluster page. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  // Old flat URLs
  "/academic": "/academics",
  "/research": "/academics#physics-journey",
  "/film": "/works#child-artist-archive",
  "/technology": "/works#zionaxelle",
  "/cv": "/vault",
  "/future": "/about#education-goals",

  // Old cluster slugs that were merged
  "/stem": "/academics#physics-journey",
  "/robotics": "/works#frc-team-7700",
  "/writing": "/works#novel-series-archive",
  "/music": "/works#vocal-performance",
  "/acting": "/works#child-artist-archive",
  "/tech": "/works#zionaxelle",
  "/art": "/works#canvas-art",
  "/leadership": "/works#ymca-youth-co-op",
  "/athletics": "/works#badminton",
  "/curiosities": "/works#karate",
  "/vision": "/about#education-goals",
};
