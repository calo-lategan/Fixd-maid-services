import { Star } from "lucide-react";

const reviews = [
  {
    name: "Leena Younis",
    role: "Local Guide · Dubai",
    avatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    text: "I had a great experience with Fixd! The ladies were incredibly professional, arrived on time, and worked efficiently without missing a spot. The place looked spotless in no time. Highly recommend — especially if you are new in Emaar South.",
    date: "10 months ago",
  },
  {
    name: "Shaira Fe Rivera",
    role: "Dubai Resident",
    avatar: "https://images.unsplash.com/photo-1592234789031-94bf65f630ed?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    text: "Very pleased with the work done! The speed, the tidiness are amazing. I recommend Anjoneth for amazing job and professionalism.",
    date: "1 year ago",
  },
  {
    name: "Evie M.",
    role: "Local Guide · Dubai",
    avatar: "https://images.unsplash.com/photo-1718895480108-37c0346792ed?w=80&h=80&fit=crop&crop=face&q=80",
    rating: 5,
    text: "Good day, I would like to express my appreciation for Leslie's fantastic work. She cleans very well, a great listener, and pays attention to every detail. I truly appreciate the company service and professionalism.",
    date: "1 year ago",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Client Reviews</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-[#0F172A] font-bold">4.7</span>
            <span className="text-[#64748B] text-sm">· 274 reviews on Google</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="testimonials-grid">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              data-testid={`review-card-${i}`}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed flex-1">"{r.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E0F2FE]"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{r.name}</p>
                  <p className="text-xs text-[#64748B]">{r.role} · {r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/search/Fixd+Cleaning+Services+Dubai+Sports+City"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="google-reviews-link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-[#0F172A] text-sm font-medium hover:border-[#0284C7] hover:text-[#0284C7] transition-all"
          >
            Read all 274 reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
