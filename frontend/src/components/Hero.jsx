import { MessageCircle, ChevronDown, Star, Phone } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "./Header";

const HERO_IMG =
  "https://images.unsplash.com/photo-1721932423849-e9033192b190?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f8fafc 100%)" }}
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E0F2FE] rounded-full -translate-y-1/3 translate-x-1/3 opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left content */}
          <div className="space-y-7 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#E0F2FE] px-4 py-2 rounded-full shadow-sm" data-testid="hero-badge">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#0F172A]">4.7 / 274 Reviews</span>
              <span className="text-xs text-[#64748B]">— Google</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight tracking-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
              data-testid="hero-headline"
            >
              Professional{" "}
              <span className="text-[#0284C7]">Cleaning Services</span>{" "}
              in Dubai — Fast, Reliable &amp; Affordable
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-lg" data-testid="hero-subheadline">
              Book trusted cleaners in minutes. We make your home or office spotless — so you don't have to.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4" data-testid="hero-ctas">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-btn"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-base shadow-xl shadow-[#25D366]/30 hover:bg-[#1db954] hover:-translate-y-1 transition-all duration-200"
              >
                <MessageCircle size={18} />
                Book Now on WhatsApp
              </a>
              <a
                href="#pricing"
                data-testid="hero-quote-btn"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-[#0F172A] font-semibold text-base hover:border-[#0284C7] hover:text-[#0284C7] transition-all duration-200"
              >
                View Pricing
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Trust mini-badges */}
            <div className="flex flex-wrap gap-4 pt-2" data-testid="hero-trust-badges">
              {[
                "Same-day service",
                "Verified cleaners",
                "100% satisfaction",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <div className="w-4 h-4 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0284C7] text-[10px] font-bold">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            {/* Call pill */}
            <a
              href={CALL_URL}
              data-testid="hero-call-link"
              className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0284C7] transition-colors"
            >
              <Phone size={14} />
              Or call us: <strong className="text-[#0F172A]">800 3493</strong>
            </a>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-up delay-200" data-testid="hero-image-wrapper">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15">
              <img
                src={HERO_IMG}
                alt="Clean modern living room"
                className="w-full h-[420px] sm:h-[500px] object-cover"
                loading="eager"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60" data-testid="hero-floating-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Starting from</p>
                    <p className="text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                      AED 45<span className="text-sm font-normal text-[#64748B]">/hour</span>
                    </p>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hero-card-book-btn"
                    className="px-5 py-2.5 rounded-full bg-[#0284C7] text-white text-sm font-semibold hover:bg-[#0272a8] transition-colors shadow-md"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
