import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SettingsProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </SettingsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
