import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  PhoneCall,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  Flame,
  Ambulance,
  Shield,
  Hospital,
  AlertTriangle,
  HelpCircle,
  Lock,
  MessageSquare
} from 'lucide-react';
import { SupportedLanguage } from '../data/translations';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    t,
    darkMode,
    setDarkMode,
    setActiveSosCategory,
    adminUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Emergency Dashboard' },
    { id: 'services', label: 'Nearby Services' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'police', label: 'Police & Safety' },
    { id: 'fire', label: 'Fire & Rescue' },
    { id: 'disaster', label: 'Disaster Safety' },
    { id: 'contacts', label: 'Contacts Directory' },
    { id: 'alerts', label: 'Local Alerts' },
    { id: 'report', label: 'Report Hazard' },
    { id: 'safeassist', label: 'SafeAssist AI' },
    { id: 'about', label: 'About' },
    { id: 'admin', label: adminUser ? 'Admin Portal' : 'Admin' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  SafeConnect
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                  Emergency Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs md:max-w-md">
                Quick Information When Every Second Matters
              </p>
            </div>
          </div>

          {/* Center-Right Quick Actions */}
          <div className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activePage === 'home'
                  ? 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activePage === 'dashboard'
                  ? 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activePage === 'services'
                  ? 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Nearby Services
            </button>
            <button
              onClick={() => handleNavClick('contacts')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activePage === 'contacts'
                  ? 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Contacts
            </button>
            <button
              onClick={() => handleNavClick('alerts')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activePage === 'alerts'
                  ? 'bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Alerts
            </button>
            <button
              onClick={() => handleNavClick('safeassist')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activePage === 'safeassist'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              SafeAssist AI
            </button>
          </div>

          {/* Right Utility Group */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative flex items-center">
              <label htmlFor="lang-select" className="sr-only">
                Language
              </label>
              <div className="flex items-center text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'en'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'hi'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="हिन्दी (Hindi)"
                >
                  HI
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === 'es'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  title="Español (Spanish)"
                >
                  ES
                </button>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Primary SOS Dial Button */}
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-all active:scale-95"
              title="Call 112 National Emergency Helpline"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>SOS 112</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <a
              href="tel:108"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs"
            >
              <Ambulance className="w-4 h-4 text-emerald-600" />
              <span>108 Ambulance</span>
            </a>
            <a
              href="tel:100"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              <span>100 Police</span>
            </a>
            <a
              href="tel:101"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs"
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>101 Fire & Rescue</span>
            </a>
            <a
              href="tel:112"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>112 Unified SOS</span>
            </a>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>SafeConnect v2.4 Verified</span>
            <button
              onClick={() => handleNavClick('privacy')}
              className="underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              Privacy & Disclaimer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
