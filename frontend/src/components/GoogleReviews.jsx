import { Star, ExternalLink, ThumbsUp } from "lucide-react";

const GOOGLE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";

const reviews = [
  {
    name: "Leena Younis",
    handle: "Local Guide · 14 reviews",
    avatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    date: "10 months ago",
    text: "I had a great experience with Fixd! The ladies were incredibly professional, arrived on time, and worked efficiently without missing a spot. The place looked spotless in no time. Highly recommend their services — especially if you are new in Emaar South.",
  },
  {
    name: "Shaira Fe Rivera",
    handle: "2 reviews · 1 photo",
    avatar: "https://images.unsplash.com/photo-1592234789031-94bf65f630ed?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    date: "1 year ago",
    text: "Very pleased with the work done! The speed, the tidiness are amazing. I recommend Anjoneth for amazing job and professionalism.",
  },
  {
    name: "Evie M.",
    handle: "Local Guide · 14 reviews",
    avatar: "https://images.unsplash.com/photo-1718895480108-37c0346792ed?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    date: "1 year ago",
    text: "I would like to express my appreciation for Leslie's fantastic work. She cleans very well, a great listener, and pays attention to every detail. Hard worker and I truly appreciate the company service and professionalism.",
  },
];

const PLACE_URL = "https://www.google.com/maps/place/Fixd+Cleaning+Services/@25.0326,55.2076,17z/";

export default function GoogleReviews() {
  return (
    <section data-testid="google-reviews-section" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12 animate-fade-up">
          <div className="flex items-center gap-2">
            <img src={GOOGLE_LOGO} alt="Google" className="h-6 w-auto" />
            <span className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>Reviews</span>
          </div>

          {/* Rating summary */}
          <div className="flex flex-col items-center gap-2" data-testid="google-rating-summary">
            <span className="text-6xl font-black text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>4.7</span>
            <div className="flex gap-1">
              {[1,2,3,4].map(i => <Star key={i} size={22} className="fill-[#FBBC04] text-[#FBBC04]" />)}
              <Star size={22} className="fill-[#FBBC04] text-[#FBBC04] opacity-60" />
            </div>
            <p className="text-sm text-[#64748B]">Based on <strong className="text-[#0F172A]">274 reviews</strong></p>

            {/* Rating bars */}
            <div className="space-y-1 w-48 mt-2">
              {[
                { stars: 5, pct: 80 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 2 },
                { stars: 1, pct: 2 },
              ].map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="w-2 text-right">{stars}</span>
                  <Star size={10} className="fill-[#FBBC04] text-[#FBBC04] flex-shrink-0" />
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#FBBC04] h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-6">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href={PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="write-review-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#4285F4] text-[#4285F4] text-sm font-semibold hover:bg-[#EEF2FF] transition-colors"
          >
            Write a review
          </a>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10" data-testid="google-reviews-grid">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              data-testid={`google-review-card-${i}`}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Author */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border border-slate-100" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A] leading-tight">{r.name}</p>
                    <p className="text-xs text-[#64748B]">{r.handle}</p>
                  </div>
                </div>
                <img src={GOOGLE_LOGO} alt="Google" className="h-4 w-auto mt-1 opacity-70 flex-shrink-0" />
              </div>

              {/* Stars + date */}
              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex gap-0.5">
                  {[...Array(r.rating)].map((_, j) => <Star key={j} size={13} className="fill-[#FBBC04] text-[#FBBC04]" />)}
                </div>
                <span className="text-xs text-[#94a3b8]">{r.date}</span>
              </div>

              {/* Text */}
              <p className="text-sm text-[#64748B] leading-relaxed">"{r.text}"</p>

              {/* Like */}
              <div className="flex items-center gap-1.5 mt-3 text-xs text-[#94a3b8]">
                <ThumbsUp size={12} /> Helpful
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <a
            href={PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="view-all-reviews-btn"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border-2 border-slate-200 text-[#0F172A] text-sm font-semibold hover:border-[#4285F4] hover:text-[#4285F4] transition-all shadow-sm"
          >
            <img src={GOOGLE_LOGO} alt="Google" className="h-4 w-auto" />
            View all 274 reviews on Google
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
