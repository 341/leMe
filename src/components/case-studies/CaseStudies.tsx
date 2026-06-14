import { caseStudies } from "@/lib/data/case-studies";
import { Section } from "@/components/ui/Section";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      label="Case Studies"
      title="Enterprise Delivery"
      description="High-impact projects across logistics, library systems, and secure real-time communications."
    >
      <div className="space-y-6">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
