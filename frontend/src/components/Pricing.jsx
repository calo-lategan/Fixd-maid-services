import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "./Header";

const plans = [
  {
    name: "Standard Clean",
    price: "AED 35",
    unit: "/hour",
    badge: null,
    desc: "You provide your own cleaning supplies. We bring the expertise.",
    featured: false,
    features: [
      "Client provides cleaning materials",
      "Dusting & vacuuming",
      "Kitchen & bathroom cleaning",
      "Mopping all floors",
      "Bedrooms & living areas",
      "Min. 3-hour booking",
    ],
  },
  {
    name: "Full Clean + Materials",
    price: "AED 45",
    unit: "/hour",
    badge: "We Bring Everything",
    desc: "Our team arrives fully equipped with all professional cleaning supplies.",
    featured: true,
    features: [
      "All cleaning materials included",
      "Professional-grade products",
      "Dusting, vacuuming & mopping",
      "Kitchen & bathroom deep clean",
      "Bedrooms & living areas",
      "Min. 3-hour booking",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" data-testid="pricing-section" className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Transparent Pricing</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Simple, Honest Rates
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            No hidden fees. No surprises. Just professional cleaning at fair Dubai prices.
          </p>
        </div>

        {/* Promo Banner */}
        <div className="mb-8 flex justify-center" data-testid="promo-banner">
          <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-300 rounded-2xl px-6 py-3 shadow-sm">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="text-sm font-bold text-amber-800 uppercase tracking-wide">Special Offer</p>
              <p className="text-base font-bold text-amber-900">Book 3 Hours — Get 1 Hour FREE!</p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-testid={`pricing-card-${plan.name.toLowerCase().replace(/\s+/g,"-")}`}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col gap-6 border transition-all duration-300 hover:shadow-xl ${
                plan.featured
                  ? "bg-[#0284C7] border-[#0284C7] shadow-xl shadow-[#0284C7]/20 relative overflow-hidden"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-5 right-5 bg-white/25 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3
                  className={`text-xl font-semibold ${plan.featured ? "text-white" : "text-[#0F172A]"}`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.featured ? "text-blue-100" : "text-[#64748B]"}`}>{plan.desc}</p>
              </div>

              <div>
                <span
                  className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-[#0F172A]"}`}
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {plan.price}
                </span>
                <span className={`text-base ${plan.featured ? "text-blue-100" : "text-[#64748B]"}`}>{plan.unit}</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2
                      size={16}
                      className={`flex-shrink-0 ${plan.featured ? "text-[#7dd3fc]" : "text-[#0284C7]"}`}
                    />
                    <span className={plan.featured ? "text-blue-50" : "text-[#64748B]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`pricing-whatsapp-btn-${plan.name.toLowerCase().replace(/\s+/g,"-")}`}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all ${
                    plan.featured
                      ? "bg-white text-[#0284C7] hover:bg-blue-50"
                      : "bg-[#25D366] text-white hover:bg-[#1db954] shadow-lg shadow-[#25D366]/25"
                  }`}
                >
                  <MessageCircle size={15} />
                  {plan.featured ? "Book Now — With Materials" : "Book Now — You Provide Materials"}
                </a>
                <a
                  href={CALL_URL}
                  data-testid={`pricing-call-btn-${plan.name.toLowerCase().replace(/\s+/g,"-")}`}
                  className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm transition-all border ${
                    plan.featured
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-slate-200 text-[#0F172A] hover:border-[#0284C7]"
                  }`}
                >
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#64748B] mt-8">
          Minimum 3-hour booking. All prices per cleaner. Custom quotes available for large spaces & offices.
        </p>
      </div>
    </section>
  );
}
