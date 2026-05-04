import { MessageCircle, Clock, Users, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Request a Quote",
    desc: "Reach out on WhatsApp or fill our form. Tell us your space size and preferred time.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Choose Your Time",
    desc: "Pick any day, including same-day service. We work around your schedule.",
  },
  {
    number: "03",
    icon: Users,
    title: "We Arrive & Clean",
    desc: "Our trained, verified team arrives on time and transforms your space.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Enjoy a Spotless Space",
    desc: "Relax and enjoy your perfectly clean home or office. Guaranteed satisfaction.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Simple Process</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            How It Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Booking a cleaner in Dubai has never been easier. Four simple steps to a spotless space.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="steps-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-testid={`step-${i + 1}`}
                className="relative flex flex-col gap-4 p-6 rounded-3xl border border-slate-100 bg-[#F8FAFC] hover:border-[#BAE6FD] hover:bg-[#F0F9FF] transition-all duration-300"
              >
                {/* Large background number */}
                <span
                  className="absolute top-4 right-5 text-7xl font-black text-slate-100 select-none pointer-events-none"
                  style={{ fontFamily: "Outfit, sans-serif", lineHeight: 1 }}
                >
                  {step.number}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-[#0284C7] flex items-center justify-center shadow-md shadow-[#0284C7]/25 z-10">
                  <Icon size={20} className="text-white" />
                </div>

                <h3 className="text-lg font-semibold text-[#0F172A] z-10" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed z-10">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
