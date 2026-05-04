const COMPANY_PHOTOS = [
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/e01uk3wj_unnamed.jpg",
    caption: "Villa Deep Clean — Living Room",
    tag: "Deep Clean",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/tduuu7p5_unnamed%20%281%29.jpg",
    caption: "Outdoor & Villa Cleaning",
    tag: "Exterior",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/buquxsrw_2023-07-05.jpg",
    caption: "Our Team — Ready to Clean",
    tag: "The Fixd Team",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/xws0oc8n_unnamed%20%282%29.jpg",
    caption: "Commercial & Gym Cleaning",
    tag: "Commercial",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/p36n375k_DSC_0141.JPG",
    caption: "Window & Curtain Cleaning",
    tag: "Detail Work",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/5nm5yfdn_481904813_625592250227700_3285734683162219122_n.jpg",
    caption: "Our Trained & Verified Team",
    tag: "The Team",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/bqaevblu_5f55970c-b90b-400b-9186-03f8d0a67f35.jpeg",
    caption: "Professional Cleaning in Action",
    tag: "At Work",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/jw3e2ets_2bfd0cc0-b885-4d48-9715-06f03754692b.jpeg",
    caption: "Detailed Home Cleaning",
    tag: "Home Clean",
  },
];

export default function BeforeAfter() {
  return (
    <section data-testid="gallery-section" className="py-20 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">The Real Deal</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Team in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Real photos from real Fixd cleaners working in Dubai homes and offices every day.
          </p>
        </div>

        {/* Photo Grid — 4 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="gallery-grid">
          {COMPANY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              data-testid={`gallery-photo-${i}`}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-slate-900/15 hover:-translate-y-1 transition-all duration-300 border border-slate-100"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              {/* Top tag */}
              <div className="absolute top-4 left-4 bg-[#4ade80]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                {photo.tag}
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-semibold leading-snug drop-shadow-md">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-[#64748B] mt-8">
          All photos are from real Fixd Maid Services jobs across Dubai.
        </p>
      </div>
    </section>
  );
}

