const BEFORE_IMG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80";
const AFTER_IMG =
  "https://images.unsplash.com/photo-1661107259637-4e1c55462428?w=700&q=80";
const AFTER_LIVING =
  "https://images.unsplash.com/photo-1721932423849-e9033192b190?w=700&q=80";
const PRO_IMG =
  "https://images.unsplash.com/photo-1680728334131-220313e30370?w=700&q=80";

const pairs = [
  { before: BEFORE_IMG, after: AFTER_IMG, label: "Bathroom" },
  { before: PRO_IMG, after: AFTER_LIVING, label: "Living Room" },
];

export default function BeforeAfter() {
  return (
    <section data-testid="before-after-section" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">The Proof</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Real Cleaning Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            See the difference our professional cleaners make — every single time.
          </p>
        </div>

        {/* Pairs */}
        <div className="space-y-8">
          {pairs.map((pair, i) => (
            <div
              key={i}
              data-testid={`before-after-pair-${i}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl shadow-slate-900/8 border border-slate-100"
            >
              {/* Before */}
              <div className="relative group">
                <img
                  src={pair.before}
                  alt={`Before ${pair.label}`}
                  className="w-full h-64 sm:h-80 object-cover filter grayscale-[40%] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute top-4 left-4 bg-slate-900/70 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  Before
                </div>
              </div>

              {/* After */}
              <div className="relative group">
                <img
                  src={pair.after}
                  alt={`After ${pair.label}`}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#25D366]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  After
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#0F172A] text-xs font-bold px-3 py-1.5 rounded-full">
                  {pair.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-[#64748B] mt-8">
          All results are from real Fixd Maid Services clients in Dubai.
        </p>
      </div>
    </section>
  );
}
