import type { LucideIcon } from "lucide-react";
import { User, GraduationCap, Wand as Wand2, FileText, Mail, Sparkles } from "lucide-react";

/* ── New data model ── */

export type TopicData = {
  slug: string;
  label: string;
  blurb: string;
  detail: string;
  embed?: {
    type: "youtube" | "image";
    src: string;
    caption?: string;
  };
};

export type Cluster = {
  num: string;
  slug: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  topics: TopicData[];
};

const topic = (label: string, blurb: string, detail: string, embed?: TopicData["embed"]): TopicData => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  blurb,
  detail,
  embed,
});

export const CLUSTERS: Cluster[] = [
  {
    num: "01", slug: "about", label: "About", icon: User,
    tagline: "Who I am, where I come from, and where I am headed.",
    topics: [
      topic("Personal Profile", "The basics at a glance.", "Born in India, raised between continents, now based in Montréal. A 15-year-old multidisciplinary mind driven by curiosity across every domain — from physics to fiction, from robotics to ragas. This is the short version of a long story."),
      topic("Identity Timeline", "How I got here.", "A timeline of moves, milestones, and moments that shaped the way I think. From early childhood in India to navigating new cultures in Canada, each chapter added a layer to the lens I see the world through."),
      topic("Languages & Culture", "Four tongues, two continents.", "English, French, Hindi, and Marwari — each language carries its own worldview. Growing up between Indian and North American cultures taught me to code-switch not just linguistically but intellectually."),
      topic("Education Goals", "Where the compass points.", "AP track, olympiad preparation, and a long-term vision that bridges STEM research with creative practice. The goal isn't a single career — it's a life where every discipline feeds the others."),
      topic("Career Vision", "What I'm building toward.", "I don't have a single dream job — I have a working model of how disciplines intersect. Whether it's research, design, engineering, or storytelling, the thread is the same: build things that matter, and prove they work."),
      topic("What I Am Building", "The dossier itself.", "This site is the artifact. It's not a portfolio in the traditional sense — it's a living dossier where every claim has evidence, every skill has a receipt, and every curiosity has a paper trail."),
    ],
  },
  {
    num: "02", slug: "academics", label: "Academics, STEM & Research", icon: GraduationCap,
    tagline: "Education timeline, exams, awards, physics, and research interests.",
    topics: [
      topic("Education Timeline", "Schools, moves, and academic chapters.", "From early schooling in India to the AP track in Montréal — every transition brought new challenges and new ways of thinking. The timeline maps the academic journey with grades, transitions, and key turning points."),
      topic("Subject Strengths", "Where the numbers back the curiosity.", "Mathematics, physics, and computer science form the core. But strengths aren't limited to STEM — writing, languages, and the humanities round out the picture. Each subject has evidence, not just claims."),
      topic("Awards Vault", "Every ribbon, every certificate.", "Academic competitions, olympiad placements, honor rolls, and subject awards — catalogued with context, not just titles. Each award tells a story about what was happening when it was earned."),
      topic("Growth Notes", "Where I struggled and what I learned.", "Not every subject came easy. Growth notes document the gaps, the comebacks, and the lessons that stuck. Honest self-assessment is more valuable than a perfect transcript."),
      topic("Physics Journey", "From curiosity to self-taught practice.", "Physics started as questions at the dinner table and became a disciplined self-study practice. From classical mechanics to quantum concepts, this is the log of a mind learning to think in equations."),
      topic("Research Interests", "What I want to investigate next.", "Interdisciplinary research at the intersection of physics, computation, and design. Current interests include quantum information, complex systems, and the mathematics of creative processes."),
      topic("Independent Archive", "Self-directed projects and explorations.", "Beyond the classroom — independent research papers, self-designed experiments, and open-ended explorations that didn't fit a syllabus but demanded attention."),
      topic("Mentorship", "Learning from those ahead.", "Mentors in physics, mathematics, and engineering who shaped the way I approach problems. Mentorship is a two-way street — this section also covers peer mentoring and teaching."),
      topic("Future STEM Goals", "The long arc.", "Graduate research, interdisciplinary programs, and the vision for a career that doesn't fit in a single department. The goal is to keep building at the edges where fields meet."),
    ],
  },
  {
    num: "03", slug: "works", label: "Works", icon: Wand2,
    tagline: "Every craft under one roof — robotics, writing, music, screen, design, art, leadership, sport.",
    topics: [
      topic("FRC Team 7700", "Build seasons and competition robotics.", "From CAD reviews at midnight to driver-station nerves on game day — Team 7700 is where I learned to design under deadline, debug under pressure, and trust a team. Multiple build seasons, competition records, and engineering logs.", { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "FRC Team 7700 — Competition Highlights" }),
      topic("Engineering Skills", "CAD, fabrication, and systems thinking.", "Onshape, SolidWorks, hand fabrication, wiring, and pneumatic systems. Engineering skills built through robotics seasons and independent projects — each skill earned through shipping, not just studying."),
      topic("Robotics Build Log", "Season-by-season documentation.", "Detailed build logs from each FRC season — design decisions, iteration notes, failure analysis, and the lessons that carried forward. The log is the proof that the process was real."),
      topic("Novel Series Archive", "A multi-book story world.", "Years of worldbuilding, character development, and narrative architecture. The novel cycle isn't a single manuscript — it's an entire fictional universe with maps, languages, and histories spanning multiple volumes."),
      topic("Writing Samples", "Excerpts, essays, and experiments.", "Selected passages from the novel cycle, analytical essays, creative nonfiction, and experimental prose. Each sample is chosen to show range, not just polish."),
      topic("Podcast", "Conversations and monologues.", "A podcast exploring the intersections of creativity, science, and culture. Episode logs, show notes, and behind-the-scenes on production and editing."),
      topic("Creative Method", "How the work happens.", "The process behind the output — from morning pages to revision workflows, from research rabbit holes to the discipline of finishing. Method is the bridge between curiosity and craft."),
      topic("Vocal Performance", "Hindustani classical on stage.", "Years of training in Hindustani classical vocal — raagas, taals, and the discipline of daily riyaaz. Stage performances, guru-shishya tradition, and the ongoing practice of a living art form.", { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Hindustani Vocal Performance" }),
      topic("Instrumental", "Keys, strings, and self-taught paths.", "Keyboard, harmonium, and explorations into other instruments. Self-taught approaches that complement formal vocal training and feed into composition and arrangement."),
      topic("Performance Portfolio", "Stage time, documented.", "Concerts, recitals, school performances, and informal sessions — every stage is a data point. The portfolio tracks growth over years of live performance."),
      topic("Repertoire", "The catalog of what I perform.", "A living list of raagas, compositions, and pieces — classical and contemporary. Repertoire is the map of what the voice can do."),
      topic("Child Artist Archive", "Years on screen.", "Film and television credits from childhood — acting roles, voice work, and the experience of growing up on set. The archive includes stills, credits, and reflections on early media work."),
      topic("Acting Reel", "Selected scenes and performances.", "A curated reel of acting work — dramatic scenes, comedic timing, and the craft of becoming someone else on camera."),
      topic("Voice & Screen", "Voice acting and on-camera work.", "Voice-over credits, dubbing work, and the particular discipline of performing with just your voice. Separate from on-camera acting, this is a distinct craft with its own techniques."),
      topic("Media Credits", "The full filmography.", "Every credit, every production, every role — catalogued with context. From lead roles to ensemble work, the credits tell the story of a decade on screen."),
      topic("Zionaxelle", "A multimedia universe, built from scratch.", "Zionaxelle is a self-designed multimedia brand — web presence, visual identity, content strategy, and production pipeline. It's the proof that I can build something from nothing and make it coherent.", { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Zionaxelle — Brand Overview" }),
      topic("Multimedia Production", "Edit, shoot, score.", "Video editing, sound design, graphic design, and content production. The toolkit behind every piece of media I ship — from short-form content to long-form documentary style."),
      topic("Tech Skills", "The stack I work with.", "React, TypeScript, Python, Git, and the modern web stack. Tech skills aren't separate from creative work — they're how I build the platforms my ideas live on."),
      topic("Tech Build Log", "Shipped projects and experiments.", "Every app, site, and tool I've built — from hackathon prototypes to production deployments. The build log is the receipt that the skills are real."),
      topic("Canvas Art", "Paintings, drawings, and visual experiments.", "Oil, acrylic, watercolor, and mixed media on canvas. Each piece is documented with process notes and context — not just the finished work, but the thinking behind it."),
      topic("Embroidery", "Thread as medium.", "Hand embroidery — traditional patterns and contemporary designs. A meditative practice that doubles as visual art, with its own techniques, materials, and aesthetic vocabulary."),
      topic("Mixed Media", "When one material isn't enough.", "Collage, assemblage, and experiments that cross material boundaries. Mixed media work is where the different creative threads literally come together."),
      topic("YMCA Youth Co-op", "Leadership by example.", "Vice President of the YMCA Youth Co-op — organizing events, mentoring younger members, and building community programs. Leadership isn't a title; it's a practice."),
      topic("Mentoring", "Passing it forward.", "Peer mentoring in academics, robotics, and music. Teaching is the fastest way to learn — and the most honest way to prove you understand something."),
      topic("Community & Family", "Roots and responsibilities.", "Family roles, community involvement, and the cultural work of bridging worlds. This section is personal but not private — it's the context that makes everything else make sense."),
      topic("Cultural Integration", "Two continents, one mind.", "Navigating Indian and North American cultures isn't just about language — it's about values, expectations, and the creative tension of belonging everywhere and nowhere simultaneously."),
      topic("Badminton", "Court sport, court discipline.", "Competitive badminton — training, tournaments, and the physical discipline that complements intellectual work. The court teaches timing, anticipation, and recovery."),
      topic("Table Tennis", "Reflex over reach.", "Speed, spin, and split-second decisions. Table tennis is the fastest racket sport and a masterclass in processing under pressure."),
      topic("Chess", "Pattern obsession on the board.", "Tournament chess and the study of patterns. Chess is where strategic thinking becomes tangible — every move is a hypothesis, every game is an experiment."),
      topic("Strategic Thinking", "The thread between games and life.", "The strategic mindset that connects chess, badminton, robotics, and research. Pattern recognition, risk assessment, and the discipline of thinking several moves ahead."),
      topic("Karate", "Years on the mat.", "Martial arts training — discipline, forms, and the philosophy of controlled power. Karate is where physical discipline meets mental clarity.", { type: "youtube", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Karate Training — Belt Progression" }),
      topic("Abacus", "Lightning arithmetic.", "Mental math training from the elementary years — abacus competitions, speed calculations, and the numerical intuition that still shapes how I approach mathematics."),
      topic("Side Quests", "Things that don't fit a category.", "Random projects, one-off experiments, and curiosities that didn't become obsessions but absolutely shaped the way I think. Side quests are the spice."),
      topic("Random Wins", "Unexpected victories.", "Competitions, certificates, and achievements that came from left field. Not every win is planned — some come from showing up and being ready."),
      topic("Childhood Trophies", "The early evidence.", "From spelling bees to art contests — the trophies and certificates from the years before the dossier. They're small, but they're the first receipts."),
    ],
  },
  {
    num: "04", slug: "vault", label: "CV & Document Vault", icon: FileText,
    tagline: "CV, certificates, transcripts, recognition — every receipt, open for inspection.",
    topics: [
      topic("Certificates", "Every certificate, catalogued.", "Academic certificates, competition awards, extracurricular recognitions, and professional credentials — each one scanned, dated, and contextualized. The vault is the paper trail."),
      topic("Transcripts", "The academic record, unredacted.", "Official transcripts, grade reports, and standardized test scores. Not just the highlights — the full record, including the semesters that taught the most."),
      topic("Recognition", "Honors, nominations, and acknowledgments.", "Beyond certificates — community recognition, nominations, and acknowledgments that don't fit a frame but matter. Letters, mentions, and the informal receipts."),
    ],
  },
  {
    num: "05", slug: "contact", label: "Contact & Links", icon: Mail,
    tagline: "Open correspondence and links to everywhere else.",
    topics: [
      topic("Channels", "Where to find me.", "Email, LinkedIn, GitHub, and other platforms — the official channels for professional and creative correspondence. Each channel has its purpose."),
      topic("Links", "The wider web.", "External projects, collaborations, publications, and platforms where my work lives beyond this site. The links section is the map of my digital footprint."),
    ],
  },
];

export const findCluster = (slug: string) => CLUSTERS.find((c) => c.slug === slug);

/* ── Backward-compatible types for FractalPage / ClusterShell ── */

export type Subpage = {
  slug: string;
  label: string;
  kind?: "overview" | "highlights" | "evidence" | "media" | "reflection" | "related" | "topic";
};

export const findSubpage = (cluster: Cluster, slug: string) =>
  cluster.topics.find((t) => t.slug === slug);

/* Derive subpages from topics for backward compat */
export function getSubpages(cluster: Cluster): Subpage[] {
  return [
    { slug: "overview", label: "Overview", kind: "overview" },
    { slug: "highlights", label: "Highlights", kind: "highlights" },
    { slug: "media", label: "Media", kind: "media" },
    ...cluster.topics.map((t) => ({ slug: t.slug, label: t.label, kind: "topic" as const })),
    { slug: "evidence", label: "Evidence", kind: "evidence" },
    { slug: "reflection", label: "Reflection", kind: "reflection" },
    { slug: "related", label: "Related", kind: "related" },
  ];
}

/* PROOF_CLUSTER stub — no longer a real page, kept for import compat */
export const PROOF_CLUSTER: Cluster = {
  num: "06", slug: "proof", label: "Proof of Curiosity", icon: Sparkles,
  tagline: "Notebook scans, sketches, half-formed ideas.",
  topics: [],
};

export const LEGACY_REDIRECTS: Record<string, string> = {
  "/academic": "/academics",
  "/research": "/academics",
  "/film": "/works",
  "/technology": "/works",
  "/cv": "/vault",
  "/future": "/about",
  "/stem": "/academics",
  "/robotics": "/works",
  "/writing": "/works",
  "/music": "/works",
  "/acting": "/works",
  "/tech": "/works",
  "/art": "/works",
  "/leadership": "/works",
  "/athletics": "/works",
  "/curiosities": "/works",
  "/vision": "/about",
  "/proof": "/works",
};
