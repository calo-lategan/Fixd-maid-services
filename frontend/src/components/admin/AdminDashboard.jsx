import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LayoutDashboard, Settings, Calendar, LogOut, Phone, Mail, Clock, MapPin,
  CheckCircle2, AlertCircle, RefreshCw, Trash2, ChevronDown, ChevronUp, Key, ExternalLink, Loader2
} from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO = "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/cc7ml2yl_344218683_613601974024677_2410243060976620143_n.jpg";

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem("fixd_admin_token")}` };
}

// ─── Contacts Tab ──────────────────────────────────────────────────────────────
function ContactsTab() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/admin/contacts`, { headers: authHeaders() });
      setContacts(data);
    } catch { } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    await axios.put(`${API}/admin/contacts/${id}`, { status }, { headers: authHeaders() });
    setContacts(cs => cs.map(c => c.id === id ? { ...c, status } : c));
  };

  const statusColor = { new: "bg-amber-100 text-amber-700", confirmed: "bg-green-100 text-green-700", done: "bg-slate-100 text-slate-600" };

  return (
    <div data-testid="contacts-tab">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
          Booking Requests <span className="text-[#0284C7] text-base font-normal">({contacts.length})</span>
        </h2>
        <button onClick={load} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-sm text-[#64748B] hover:border-[#0284C7] transition-colors" data-testid="refresh-contacts-btn">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-[#0284C7]" size={24} /></div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 text-[#64748B]">No bookings yet. They'll appear here when customers submit the form.</div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div key={c.id} data-testid={`contact-row-${c.id}`} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0284C7] font-bold text-sm">{c.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0F172A] text-sm truncate">{c.name}</p>
                    <p className="text-xs text-[#64748B] truncate">{c.service} {c.preferred_date ? `· ${c.preferred_date}` : ""} {c.preferred_time ? `· ${c.preferred_time}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[c.status] || statusColor.new}`}>{c.status || "new"}</span>
                  {expanded === c.id ? <ChevronUp size={15} className="text-[#64748B]" /> : <ChevronDown size={15} className="text-[#64748B]" />}
                </div>
              </div>
              {expanded === c.id && (
                <div className="border-t border-slate-100 p-4 bg-slate-50 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-[#64748B]">Phone: </span><a href={`tel:${c.phone}`} className="font-medium text-[#0284C7]">{c.phone}</a></div>
                    {c.message && <div><span className="text-[#64748B]">Notes: </span><span>{c.message}</span></div>}
                    <div><span className="text-[#64748B]">Submitted: </span><span>{new Date(c.created_at).toLocaleString()}</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a href={`https://wa.me/${c.phone?.replace(/[^0-9]/g, "")}?text=Hi+${c.name?.replace(" ", "+")}%2C+confirming+your+Fixd+booking`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1db954] transition-colors">
                      Reply on WhatsApp
                    </a>
                    {["confirmed", "done", "new"].filter(s => s !== (c.status || "new")).map(s => (
                      <button key={s} onClick={() => setStatus(c.id, s)}
                        className="px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-[#0F172A] hover:border-[#0284C7] transition-colors capitalize">
                        Mark as {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Settings Tab ──────────────────────────────────────────────────────────────
function SettingsTab() {
  const [form, setForm] = useState({ phone: "", whatsapp: "", notification_email: "", business_hours: "", address: "" });
  const [pwForm, setPwForm] = useState({ new_password: "", confirm: "" });
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/admin/settings`, { headers: authHeaders() }).then(r => setForm(r.data)).catch(() => {});
  }, []);

  const saveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API}/admin/settings`, form, { headers: authHeaders() });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { } finally { setLoading(false); }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm) return alert("Passwords don't match");
    if (pwForm.new_password.length < 6) return alert("Password must be at least 6 characters");
    try {
      await axios.post(`${API}/admin/change-password`, { new_password: pwForm.new_password }, { headers: authHeaders() });
      setPwSaved(true);
      setPwForm({ new_password: "", confirm: "" });
      setTimeout(() => setPwSaved(false), 3000);
    } catch { }
  };

  const fields = [
    { key: "phone", label: "Business Phone", icon: Phone, placeholder: "050 924 4492" },
    { key: "whatsapp", label: "WhatsApp Number (digits only)", icon: Phone, placeholder: "971509244492" },
    { key: "notification_email", label: "Notification Email", icon: Mail, placeholder: "you@example.com" },
    { key: "business_hours", label: "Business Hours", icon: Clock, placeholder: "Open · Closes 8 PM" },
    { key: "address", label: "Address", icon: MapPin, placeholder: "Stadium Point Building, Office 512..." },
  ];

  return (
    <div className="space-y-8" data-testid="settings-tab">
      {/* Business Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0F172A] mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
          Business Information
        </h3>
        <form onSubmit={saveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                  <Icon size={12} className="inline mr-1.5 text-[#0284C7]" />{label}
                </label>
                <input type="text" value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder} data-testid={`settings-${key}`}
                  className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" disabled={loading} data-testid="save-settings-btn"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0284C7] text-white text-sm font-semibold hover:bg-[#0272a8] transition-all shadow-md disabled:opacity-60">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              Save Settings
            </button>
            {saved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle2 size={14} /> Saved!</span>}
          </div>
          <p className="text-xs text-[#94a3b8]">Changes to phone & WhatsApp numbers update live across the website.</p>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0F172A] mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
          <Key size={14} className="inline mr-1.5 text-[#0284C7]" />Change Admin Password
        </h3>
        <form onSubmit={changePassword} className="space-y-3 max-w-sm">
          <input type="password" value={pwForm.new_password} onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })}
            placeholder="New password (min 6 chars)" data-testid="new-password-input"
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
          <input type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
            placeholder="Confirm new password" data-testid="confirm-password-input"
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
          <div className="flex items-center gap-3">
            <button type="submit" data-testid="change-password-btn"
              className="px-6 py-2.5 rounded-full bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition-all">
              Update Password
            </button>
            {pwSaved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle2 size={14} /> Updated!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Calendar Tab ──────────────────────────────────────────────────────────────
function CalendarTab() {
  const [calStatus, setCalStatus] = useState({ credentials_set: false, connected: false });
  const [credForm, setCredForm] = useState({ client_id: "", client_secret: "" });
  const [credSaved, setCredSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("fixd_admin_token") || "";
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${API}/admin/calendar/status`, { headers: authHeaders() })
      .then(r => setCalStatus(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (searchParams.get("cal_connected") === "true") {
      setCalStatus(s => ({ ...s, connected: true }));
    }
  }, [searchParams]);

  const saveCreds = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/admin/calendar/credentials`, credForm, { headers: authHeaders() });
      setCalStatus(s => ({ ...s, credentials_set: true }));
      setCredSaved(true);
      setTimeout(() => setCredSaved(false), 3000);
    } catch { } finally { setLoading(false); }
  };

  const disconnect = async () => {
    await axios.delete(`${API}/admin/calendar/disconnect`, { headers: authHeaders() });
    setCalStatus(s => ({ ...s, connected: false }));
  };

  return (
    <div className="space-y-6" data-testid="calendar-tab">
      {/* Status */}
      <div className={`flex items-center gap-3 p-4 rounded-2xl border ${calStatus.connected ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
        {calStatus.connected
          ? <><CheckCircle2 size={18} className="text-green-600" /><span className="text-sm font-medium text-green-700">Google Calendar is connected! Bookings will be automatically added.</span></>
          : <><AlertCircle size={18} className="text-amber-600" /><span className="text-sm font-medium text-amber-700">Google Calendar not connected. Connect to auto-create calendar events from bookings.</span></>
        }
      </div>

      {/* Step 1: Google Cloud Setup */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Step 1 — Get Google OAuth Credentials
        </h3>
        <div className="space-y-2 text-sm text-[#64748B]">
          <p>1. Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-[#0284C7] underline">Google Cloud Console <ExternalLink size={11} className="inline" /></a></p>
          <p>2. Create a project → Enable <strong>Google Calendar API</strong></p>
          <p>3. Go to <strong>APIs & Services → Credentials → Create OAuth 2.0 Client ID</strong></p>
          <p>4. Add authorized redirect URI:</p>
          <code className="block bg-slate-100 px-3 py-2 rounded-lg text-xs text-slate-700 break-all">
            {process.env.REACT_APP_BACKEND_URL}/api/admin/calendar/callback
          </code>
          <p>5. Copy your <strong>Client ID</strong> and <strong>Client Secret</strong> below</p>
        </div>
      </div>

      {/* Step 2: Enter Credentials */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Step 2 — Enter Your Credentials
        </h3>
        <form onSubmit={saveCreds} className="space-y-3">
          <input type="text" value={credForm.client_id} onChange={e => setCredForm({ ...credForm, client_id: e.target.value })}
            placeholder="Google Client ID (ends with .apps.googleusercontent.com)" data-testid="gcal-client-id"
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
          <input type="password" value={credForm.client_secret} onChange={e => setCredForm({ ...credForm, client_secret: e.target.value })}
            placeholder="Google Client Secret" data-testid="gcal-client-secret"
            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all" />
          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} data-testid="save-gcal-creds-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0284C7] text-white text-sm font-semibold hover:bg-[#0272a8] transition-all disabled:opacity-60">
              {loading ? <Loader2 size={14} className="animate-spin" /> : "Save Credentials"}
            </button>
            {credSaved && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><CheckCircle2 size={14} /> Saved!</span>}
          </div>
        </form>
      </div>

      {/* Step 3: Connect */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-[#0F172A] mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Step 3 — Connect Your Google Account
        </h3>
        {calStatus.connected ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
              <CheckCircle2 size={16} /> Connected successfully
            </div>
            <button onClick={disconnect} data-testid="disconnect-calendar-btn"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors">
              <Trash2 size={13} /> Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[#64748B]">After saving credentials above, click to authorise Fixd to access your Google Calendar.</p>
            <a href={calStatus.credentials_set ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/calendar/connect?token=${token}` : "#"}
              data-testid="connect-calendar-btn"
              onClick={!calStatus.credentials_set ? (e) => { e.preventDefault(); alert("Please save your Google credentials first (Step 2)."); } : undefined}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${calStatus.credentials_set ? "bg-[#4285F4] text-white hover:bg-[#3367d6] shadow-md" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
              <Calendar size={15} /> Connect Google Calendar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState("contacts");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const t = localStorage.getItem("fixd_admin_token");
    if (!t) { navigate("/admin"); return; }
    if (searchParams.get("cal_connected") || searchParams.get("cal_error")) {
      setTab("calendar");
    }
  }, [navigate, searchParams]);

  const logout = () => {
    localStorage.removeItem("fixd_admin_token");
    navigate("/admin");
  };

  const tabs = [
    { id: "contacts", label: "Bookings", icon: LayoutDashboard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]" data-testid="admin-dashboard">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Fixd" className="h-9 w-auto object-contain" />
            <span className="text-sm font-semibold text-[#0F172A] hidden sm:block" style={{ fontFamily: "Outfit, sans-serif" }}>
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} data-testid={`tab-${id}`}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${tab === id ? "bg-[#0284C7] text-white shadow-sm" : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100"}`}>
                <Icon size={14} /><span className="hidden sm:inline">{label}</span>
              </button>
            ))}
            <button onClick={logout} data-testid="logout-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[#64748B] text-xs sm:text-sm hover:text-red-600 hover:bg-red-50 transition-all ml-1">
              <LogOut size={14} /><span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === "contacts" && <ContactsTab />}
        {tab === "settings" && <SettingsTab />}
        {tab === "calendar" && <CalendarTab />}
      </main>
    </div>
  );
}
