import { Phone, Instagram, Facebook, Globe, Sparkles, MessageCircle } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "./Header";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/fixduae/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/fixduae/", label: "Facebook" },
  { icon: Globe, href: "https://www.hidubai.com/businesses/fixd-cleaning-services-home-cleaning-services-dubai-sports-city-al-hebiah-4-dubai", label: "HiDubai" },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-[#0F172A] text-white pt-16 pb-24 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#0284C7] rounded-xl flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg block" style={{ fontFamily: "Outfit, sans-serif" }}>Fixd</span>
                <span className="text-slate-400 text-xs">Maid Services</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Dubai's trusted cleaning service. Professional, reliable, affordable cleaning for homes and offices.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase()}`}
                    className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0284C7] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={CALL_URL} data-testid="footer-call-link" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#0284C7]" /> 800 3493
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-link"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Address</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stadium Point Building<br />
              Office 512, Al Hebiah Fourth<br />
              Dubai Sports City<br />
              Dubai, UAE
            </p>
            <p className="text-sm text-slate-400 mt-2">Open · Closes 8 PM</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-slate-500">
            © {currentYear} Fixd Maid Services. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">Professional Cleaning Services in Dubai</p>
        </div>
      </div>
    </footer>
  );
}
