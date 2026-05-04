import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Eye, EyeOff, Lock } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO = "https://customer-assets.emergentagent.com/job_spotless-dubai/artifacts/cc7ml2yl_344218683_613601974024677_2410243060976620143_n.jpg";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem("fixd_admin_token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-100 p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <img src={LOGO} alt="Fixd" className="h-12 w-auto object-contain" />
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: "Outfit, sans-serif" }}>
                Admin Panel
              </h1>
              <p className="text-sm text-[#64748B] mt-1">Sign in to manage your business</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                <Lock size={13} className="inline mr-1.5 text-[#0284C7]" />Admin Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  data-testid="admin-password-input"
                  className="w-full px-4 py-3 pr-11 bg-white border border-slate-200 rounded-xl text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all placeholder:text-slate-400"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-100 px-3 py-2 rounded-xl" data-testid="admin-login-error">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} data-testid="admin-login-btn"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0284C7] text-white font-semibold text-sm hover:bg-[#0272a8] transition-all shadow-lg shadow-[#0284C7]/25 disabled:opacity-60">
              {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-[#94a3b8] mt-6">
            Forgot your password? Contact your developer to reset it.
          </p>
        </div>

        <a href="/" className="block text-center text-sm text-[#64748B] hover:text-[#0284C7] mt-6 transition-colors">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
