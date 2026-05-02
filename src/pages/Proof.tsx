import { PageShell } from "@/components/SiteChrome";
import { PageHeader, Section, Placeholder, PullQuote } from "@/components/Editorial";
import atmosNotebook from "@/assets/atmos-notebook.jpg";

const Proof = () => (
  <PageShell>
    <PageHeader
      number="✦"
      kicker="Bonus / Secret Page"
      title="Proof of Curiosity."
      lede="Notebook scans. Marginalia. Half-finished sketches. The work behind the work."
    />

    <Section number="✦.1" title="Notebook Scans" intro="Random pages — physics derivations, story outlines, observations.">
      <div className="grid md:grid-cols-3 gap-2">
        <img src={atmosNotebook} alt="" width={1600} height={1000} loading="lazy" className="w-full aspect-[3/4] object-cover" />
        <Placeholder label="Notebook scan #2" ratio="aspect-[3/4]" />
        <Placeholder label="Notebook scan #3" ratio="aspect-[3/4]" />
        <Placeholder label="Sketch — detector geometry" ratio="aspect-[3/4]" />
        <Placeholder label="Margin note — open question" ratio="aspect-[3/4]" />
        <Placeholder label="Story outline — multiverse map" ratio="aspect-[3/4]" />
      </div>
    </Section>

    <PullQuote>I keep these because future me deserves to know what past me was actually thinking.</PullQuote>
  </PageShell>
);
export default Proof;
