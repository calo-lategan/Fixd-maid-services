import { CheckCircle2 } from "lucide-react";

const badges = [
  "Same-day service available",
  "Trained & verified cleaners",
  "100% satisfaction guarantee",
  "Affordable hourly rates",
];

export default function Trust() {
  return (
    <section data-testid="trust-section" className="bg-[#0284C7] py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 sm:gap-x-10">
          {badges.map((badge) => (
            <div key={badge} className="flex items-center gap-2.5 text-white" data-testid={`trust-badge-${badge.toLowerCase().replace(/\s+/g,"-")}`}>
              <CheckCircle2 size={17} className="text-[#7dd3fc] flex-shrink-0" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
