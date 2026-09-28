import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, PhoneCall, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (p: string) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mandate */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                SafeConnect
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Local Emergency Information Portal. Quick, verified life-safety information when every second matters.
            </p>
            <div className="pt-2">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Unified SOS: 112</span>
              </a>
            </div>
          </div>

          {/* Col 2: Core Directory */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Emergency Hubs
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => handleNav('hospitals')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Hospitals & Trauma Bays
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('police')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Police & Women Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('fire')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Fire & High-Rise Rescue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-rose-600 transition-colors"
                >
                  24/7 Pharmacies & Blood Banks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('disaster')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Natural Disaster Preparedness
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Community */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Services & Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => handleNav('contacts')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Official Contacts Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('alerts')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Local Weather & Civil Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('report')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Report a Community Hazard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('safeassist')}
                  className="hover:text-rose-600 transition-colors"
                >
                  SafeAssist AI Triage Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-rose-600 transition-colors"
                >
                  Authorized Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Safety Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Legal & Verification
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              SafeConnect provides verified informational reference data and does not directly dispatch emergency crews. For life-threatening crises, dial <strong>112</strong> immediately.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleNav('about')}
                className="underline hover:text-slate-900 dark:hover:text-white text-xs"
              >
                About SafeConnect
              </button>
              <button
                onClick={() => handleNav('privacy')}
                className="underline hover:text-slate-900 dark:hover:text-white text-xs"
              >
                Privacy & Data
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 SafeConnect. Verified Public Safety Emergency Information System.</p>
          <p className="flex items-center gap-1">
            Built for civic protection & community resilience.
          </p>
        </div>
      </div>
    </footer>
  );
};
