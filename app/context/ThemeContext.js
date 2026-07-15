import React, { createContext, useContext, useState } from 'react';

// ─────────────────────────────────────────────
// LIGHT THEME — Biru nyaman di mata
// ─────────────────────────────────────────────
export const lightTheme = {
  mode: 'light',
  // Background
  bg: '#EFF6FF',           // Blue-50 — sangat terang, nyaman
  bgSecondary: '#DBEAFE',  // Blue-100
  // Card
  card: '#FFFFFF',
  cardBorder: '#BFDBFE',   // Blue-200
  // Header
  headerBg: '#1D4ED8',     // Blue-700 — header deep blue
  headerText: '#FFFFFF',
  headerBorder: '#1E40AF',
  // Primary actions
  primary: '#2563EB',      // Blue-600
  primarySoft: '#DBEAFE',  // Blue-100
  primaryDark: '#1D4ED8',  // Blue-700
  // Typography
  text: '#1E3A5F',         // Deep navy
  subtext: '#64748B',      // Slate-500
  // Inputs
  inputBg: '#F8FAFF',
  inputBorder: '#93C5FD',  // Blue-300
  inputText: '#1E3A5F',
  inputPlaceholder: '#94A3B8',
  // Misc
  buttonText: '#FFFFFF',
  logoutBg: 'rgba(29, 78, 216, 0.08)',
  logoutBorder: 'rgba(29, 78, 216, 0.25)',
  logoutText: '#1D4ED8',
  statusBar: 'dark-content',
  divider: '#BFDBFE',
  price: '#2563EB',
  shadow: '#93C5FD',
  badge: '#EFF6FF',
  badgeText: '#1D4ED8',
};

// ─────────────────────────────────────────────
// DARK THEME — Slate gelap dengan aksen biru
// ─────────────────────────────────────────────
export const darkTheme = {
  mode: 'dark',
  // Background
  bg: '#0F172A',
  bgSecondary: '#1E293B',
  // Card
  card: '#1E293B',
  cardBorder: '#334155',
  // Header
  headerBg: '#0F172A',
  headerText: '#F8FAFC',
  headerBorder: '#1E293B',
  // Primary actions
  primary: '#3B82F6',      // Blue-500 — lebih cerah untuk dark mode
  primarySoft: 'rgba(59, 130, 246, 0.15)',
  primaryDark: '#2563EB',
  // Typography
  text: '#F8FAFC',
  subtext: '#94A3B8',
  // Inputs
  inputBg: '#1E293B',
  inputBorder: '#334155',
  inputText: '#F8FAFC',
  inputPlaceholder: '#64748B',
  // Misc
  buttonText: '#FFFFFF',
  logoutBg: 'rgba(59, 130, 246, 0.1)',
  logoutBorder: 'rgba(59, 130, 246, 0.3)',
  logoutText: '#60A5FA',
  statusBar: 'light-content',
  divider: '#334155',
  price: '#60A5FA',
  shadow: '#000000',
  badge: 'rgba(59, 130, 246, 0.15)',
  badgeText: '#60A5FA',
};

// ─────────────────────────────────────────────
// Context & Provider
// ─────────────────────────────────────────────
const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Diperlukan agar Expo Router tidak warning karena file ini di dalam folder app/context
export default function ThemeContextRoute() {
  return null;
}
