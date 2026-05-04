import { useState } from "react";
import { MessageCircle, Phone, User, Send, CheckCircle2, Calendar, Clock } from "lucide-react";
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

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];

const today = new Date().toISOString().split("T")[0];

function buildWhatsAppMsg(form) {
  let msg = `Hello, I'd like to book a cleaning service.\n\n`;
  msg += `Name: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}`;
  if (form.preferred_date) msg += `\nDate: ${form.preferred_date}`;
  if (form.preferred_time) msg += `\nTime: ${form.preferred_time}`;
  if (form.message) msg += `\nNotes: ${form.message}`;
  return encodeURIComponent(msg);
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "", phone: "", service: "", preferred_date: "", preferred_time: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { calendarLink }
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selectTime = (t) => setForm({ ...form, preferred_time: t });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      setError("Please fill in Name, Phone and Service.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/contact`, form);
      setResult({ calendarLink: res.data.calendar_link });
      setForm({ name: "", phone: "", service: "", preferred_date: "", preferred_time: "", message: "" });
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
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#0284C7] mb-3">Book a Clean</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            Need Cleaning Today?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Fill in your details and preferred time — we'll confirm your booking and add it to your calendar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Form */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-100" data-testid="contact-form-wrapper">
            {result ? (
              <div className="flex flex-col items-center py-10 gap-5 text-center" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-[#0284C7]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Booking Request Sent!
                </h3>
                <p className="text-[#64748B] text-sm max-w-xs">
                  We've received your request and will contact you shortly on WhatsApp to confirm.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  {result.calendarLink && (
                    <a
                      href={result.calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="add-to-calendar-btn"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#0284C7] text-[#0284C7] font-semibold text-sm hover:bg-[#E0F2FE] transition-colors"
                    >
                      <Calendar size={15} /> Add to Google Calendar
                    </a>
                  )}
                  <a
                    href={`https://wa.me/971509244492?text=${buildWhatsAppMsg(form)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-success-whatsapp"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1db954] transition-colors"
                  >
                    <MessageCircle size={15} /> Chat on WhatsApp
                  </a>
                </div>
                <button onClick={() => setResult(null)} className="text-sm text-[#64748B] underline hover:text-[#0284C7] transition-colors">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <h3 className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Book a Cleaning
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" data-testid="contact-name-input"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+971 50 XXX XXXX" data-testid="contact-phone-input"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400" />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Service Needed <span className="text-red-400">*</span></label>
                  <select name="service" value={form.service} onChange={handleChange} data-testid="contact-service-select"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all appearance-none">
                    <option value="">Select a service...</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      <Calendar size={13} className="inline mr-1.5 text-[#0284C7]" />Preferred Date
                    </label>
                    <input type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} min={today}
                      data-testid="contact-date-input"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      <Clock size={13} className="inline mr-1.5 text-[#0284C7]" />Preferred Time
                    </label>
                    <select name="preferred_time" value={form.preferred_time} onChange={handleChange} data-testid="contact-time-select"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all appearance-none">
                      <option value="">Any time</option>
                      {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Time slot quick-pick */}
                <div>
                  <p className="text-xs text-[#64748B] mb-2 flex items-center gap-1">
                    <Clock size={11} /> Quick pick a time:
                  </p>
                  <div className="flex flex-wrap gap-2" data-testid="time-slots-grid">
                    {["Morning (8–11AM)", "Afternoon (12–3PM)", "Evening (4–6PM)"].map((slot) => {
                      const map = { "Morning (8–11AM)": "09:00 AM", "Afternoon (12–3PM)": "01:00 PM", "Evening (4–6PM)": "05:00 PM" };
                      const active = form.preferred_time === map[slot];
                      return (
                        <button key={slot} type="button" onClick={() => selectTime(map[slot])}
                          data-testid={`time-slot-${slot}`}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${active ? "bg-[#0284C7] text-white border-[#0284C7]" : "bg-white text-[#64748B] border-slate-200 hover:border-[#0284C7]"}`}>
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Message (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={2} placeholder="Tell us about your space, special requirements..."
                    data-testid="contact-message-input"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400 resize-none" />
                </div>

                {error && <p className="text-red-500 text-sm" data-testid="contact-error">{error}</p>}

                <button type="submit" disabled={loading} data-testid="contact-submit-btn"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0284C7] text-white font-semibold text-sm hover:bg-[#0272a8] transition-all shadow-lg shadow-[#0284C7]/25 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <><Send size={14} /> Confirm Booking</>}
                </button>

                <div className="flex gap-3">
                  <a href={`https://wa.me/971509244492?text=${buildWhatsAppMsg(form)}`} target="_blank" rel="noopener noreferrer"
                    data-testid="contact-whatsapp-alt"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1db954] transition-colors">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a href={CALL_URL} data-testid="contact-call-alt"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 text-[#0F172A] text-sm font-semibold hover:border-[#0284C7] transition-colors">
                    <Phone size={14} /> Call 050 924 4492
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="space-y-5" data-testid="contact-map-wrapper">
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm h-80 sm:h-96">
              <iframe title="Fixd Maid Services Location"
                src="https://maps.google.com/maps?q=Stadium+Point+Building+Dubai+Sports+City+Dubai&output=embed&hl=en&z=15"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" data-testid="google-map-embed" />
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100 space-y-3">
              <p className="text-sm font-semibold text-[#0F172A]">Fixd Maid Services — Dubai</p>
              <p className="text-sm text-[#64748B]">Stadium Point Building, Office 512<br />Al Hebiah Fourth, Dubai Sports City<br />Dubai, UAE</p>
              <div className="flex flex-wrap gap-4 pt-1">
                <a href={CALL_URL} data-testid="contact-address-call" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0284C7] hover:underline">
                  <Phone size={13} /> 050 924 4492
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
