import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

export const WHATSAPP_URL =
  "https://wa.me/971551681111?text=Hello%2C%20I%27d%20like%20to%20book%20a%20cleaning%20service";
export const CALL_URL = "tel:+971551681111";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center" data-testid="logo">
            <img
              src="https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/cc7ml2yl_344218683_613601974024677_2410243060976620143_n.jpg"
              alt="Fixd Maid Services Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm font-medium">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CALL_URL}
              data-testid="header-call-btn"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 text-[#0F172A] text-sm font-medium hover:border-[#0284C7] hover:text-[#0284C7] transition-all"
            >
              <Phone size={13} /> +971 55 168 1111
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-whatsapp-btn"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1db954] transition-all shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#0F172A]"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-5 flex flex-col gap-3 shadow-lg" data-testid="mobile-menu">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#0F172A] font-medium py-2.5 border-b border-slate-100 last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href={CALL_URL} data-testid="mobile-call-btn" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#0F172A] font-medium text-sm">
              <Phone size={13} /> Call Us
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-whatsapp-menu-btn"
              className="flex-1 flex items-center justify-center py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
