import { MessageCircle, Phone } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "./Header";

export default function MobileStickyBar() {
  return (
    <div
      data-testid="mobile-sticky-bar"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl"
    >
      <div className="flex gap-3">
        <a
          href={CALL_URL}
          data-testid="sticky-call-btn"
          className="flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border-2 border-slate-200 text-[#0F172A] font-semibold text-sm hover:border-[#0284C7] transition-all min-h-[48px]"
        >
          <Phone size={16} />
          Call
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="sticky-whatsapp-btn"
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-xl shadow-[#25D366]/30 hover:bg-[#1db954] transition-all min-h-[48px]"
        >
          <MessageCircle size={17} />
          Book Now on WhatsApp
        </a>
      </div>
    </div>
  );
}
