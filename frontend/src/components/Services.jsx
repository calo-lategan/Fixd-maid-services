import { Home, Layers, Truck, Building2, Sofa, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "./Header";

const services = [
  {
    icon: Home,
    title: "Home Cleaning",
    desc: "Regular cleaning for your apartment or villa — kitchens, bathrooms, living areas & more.",
    img: "https://images.unsplash.com/photo-1721932423849-e9033192b190?w=500&q=80",
  },
  {
    icon: Layers,
    title: "Deep Cleaning",
    desc: "Thorough top-to-bottom cleaning reaching every corner, behind appliances and inside cabinets.",
    img: "https://images.unsplash.com/photo-1661107259637-4e1c55462428?w=500&q=80",
  },
  {
    icon: Truck,
    title: "Move-in / Move-out",
    desc: "Get your property spotless before moving in or after moving out — full deep clean included.",
    img: null,
  },
  {
    icon: Building2,
    title: "Office Cleaning",
    desc: "Professional office and commercial space cleaning — daily, weekly, or as needed.",
    img: "https://images.unsplash.com/photo-1697463624716-cd2f0423d9d9?w=500&q=80",
  },
  {
    icon: Sofa,
    title: "Sofa & Carpet Cleaning",
    desc: "Deep extraction cleaning for sofas, carpets, mattresses — removes stains and allergens.",
    img: "https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?w=500&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">What We Do</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto">
            From quick home cleans to deep commercial cleans — we've got Dubai covered.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-testid={`service-card-${i}`}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {s.img ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] flex items-center justify-center">
                    <Icon size={48} className="text-[#0284C7] opacity-60" />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center">
                    <Icon size={18} className="text-[#0284C7]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed flex-1">{s.desc}</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`service-book-btn-${i}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284C7] hover:gap-3 transition-all duration-200 mt-1"
                  >
                    Book this service <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
