import { useState } from "react";
import { MessageCircle, Phone, User, Send, CheckCircle2 } from "lucide-react";
import { WHATSAPP_URL, CALL_URL } from "./Header";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const services = [
  "Home Cleaning",
  "Deep Cleaning",
  "Move-in / Move-out Cleaning",
  "Office Cleaning",
  "Sofa & Carpet Cleaning",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API}/contact`, form);
      setSuccess(true);
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch {
      setError("Something went wrong. Please try WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Get In Touch</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Need Cleaning Today?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Contact us now and get a quick quote. We respond within minutes on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Form */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-100" data-testid="contact-form-wrapper">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-[#0284C7]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Message Received!
                </h3>
                <p className="text-[#64748B] text-sm max-w-xs">
                  Thank you! We'll contact you shortly. For faster response, message us on WhatsApp.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1db954] transition-colors"
                  data-testid="contact-success-whatsapp"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Send Us a Message
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      data-testid="contact-name-input"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+971 50 XXX XXXX"
                      data-testid="contact-phone-input"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                    Service Needed <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    data-testid="contact-service-select"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all appearance-none"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Message (optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your space, preferred time..."
                    data-testid="contact-message-input"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm" data-testid="contact-error">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0284C7] text-white font-semibold text-sm hover:bg-[#0272a8] transition-all shadow-lg shadow-[#0284C7]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-spin">◌</span>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>

                <div className="flex gap-3 pt-1">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp-alt"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1db954] transition-colors"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a
                    href={CALL_URL}
                    data-testid="contact-call-alt"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#0F172A] text-sm font-semibold hover:border-[#0284C7] transition-colors"
                  >
                    <Phone size={15} /> Call +971 55 168 1111
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="space-y-6" data-testid="contact-map-wrapper">
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm h-72 sm:h-96">
              <iframe
                title="Fixd Maid Services Location"
                src="https://maps.google.com/maps?q=Stadium+Point+Building+Dubai+Sports+City+Dubai&output=embed&hl=en&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                data-testid="google-map-embed"
              />
            </div>

            {/* Address card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100 space-y-3">
              <p className="text-sm font-semibold text-[#0F172A]">Fixd Maid Services — Dubai</p>
              <p className="text-sm text-[#64748B]">
                Stadium Point Building, Office 512<br />
                Al Hebiah Fourth, Dubai Sports City<br />
                Dubai, UAE
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href={CALL_URL} data-testid="contact-address-call" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0284C7] hover:underline">
                  <Phone size={13} /> +971 55 168 1111
                </a>
                <span className="text-slate-300">|</span>
                <span className="text-sm text-[#64748B]">Open · Closes 8 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
