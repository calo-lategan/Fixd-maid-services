import { MessageCircle, Play } from "lucide-react";
import { WHATSAPP_URL } from "./Header";

export default function VideoShowcase() {
  return (
    <section data-testid="video-section" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Watch Us Work</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            See the Fixd Difference
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Watch our professional team transform spaces across Dubai — every job done with care and detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Facebook Reel embed */}
          <div className="flex justify-center" data-testid="facebook-video-wrapper">
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-100 bg-slate-50">
              <iframe
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F954074969206318%2F&show_text=false&width=267&t=0"
                width="267"
                height="476"
                style={{ border: "none", overflow: "hidden", display: "block" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                title="Fixd Maid Services Reel"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="space-y-7">
            <div className="space-y-5">
              {[
                {
                  icon: "✓",
                  title: "Attention to Every Detail",
                  desc: "Our cleaners are trained to notice what others miss — from skirting boards to ceiling corners.",
                },
                {
                  icon: "✓",
                  title: "Punctual & Professional",
                  desc: "We arrive on time, every time. Our team wears branded uniforms and follows a strict cleaning checklist.",
                },
                {
                  icon: "✓",
                  title: "Background Checked Staff",
                  desc: "All Fixd cleaners are verified, insured, and trusted by hundreds of Dubai families and businesses.",
                },
                {
                  icon: "✓",
                  title: "100% Satisfaction Guarantee",
                  desc: "Not happy with the result? We'll come back and make it right — at no extra cost.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0284C7] font-bold text-sm">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm sm:text-base" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {item.title}
                    </p>
                    <p className="text-sm text-[#64748B] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="video-whatsapp-btn"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1db954] transition-all shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5"
              >
                <MessageCircle size={16} />
                Book on WhatsApp
              </a>
              <a
                href="https://www.facebook.com/fixduae/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="video-facebook-btn"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-slate-200 text-[#0F172A] font-semibold text-sm hover:border-[#0284C7] hover:text-[#0284C7] transition-all"
              >
                <Play size={14} />
                Watch More on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
