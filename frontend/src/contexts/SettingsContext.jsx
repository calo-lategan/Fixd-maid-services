import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DEFAULT = {
  phone: "050 924 4492",
  whatsapp: "971509244492",
  business_hours: "Open · Closes 8 PM",
  address: "Stadium Point Building, Office 512, Dubai Sports City, Dubai",
};

const SettingsContext = createContext(DEFAULT);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT);

  useEffect(() => {
    axios.get(`${API}/settings`).then((r) => setSettings({ ...DEFAULT, ...r.data })).catch(() => {});
  }, []);

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function whatsappUrl(whatsapp, msg = "") {
  const txt = msg ? `?text=${encodeURIComponent(msg)}` : "?text=Hello%2C%20I%27d%20like%20to%20book%20a%20cleaning%20service";
  return `https://wa.me/${whatsapp}${txt}`;
}
