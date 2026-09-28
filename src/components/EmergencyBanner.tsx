import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, PhoneCall, ChevronRight, X } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const { t, setActivePage, setActiveSosCategory } = useApp();
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="bg-rose-700 text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          <span>Active Emergency? Call 112 / 108 directly.</span>
        </div>
        <button
          onClick={() => setMinimized(false)}
          className="text-rose-200 hover:text-white underline text-[11px]"
        >
          View Full Disclaimer
        </button>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 text-white border-b border-rose-950 px-4 py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full bg-rose-700 text-amber-300 shrink-0 mt-0.5 sm:mt-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide">
              {t.emergencyDisclaimer}
            </p>
            <p className="text-[11px] text-rose-200 mt-0.5">
              {t.disclaimerDetail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
          <a
            href="tel:112"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-rose-950 font-bold text-xs shadow-sm transition-transform active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dial 112 SOS</span>
          </a>

          <button
            onClick={() => setActivePage('contacts')}
            className="text-xs text-rose-200 hover:text-white underline flex items-center gap-0.5 whitespace-nowrap"
          >
            All Hotlines
            <ChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMinimized(true)}
            className="text-rose-300 hover:text-white p-1 rounded transition-colors"
            title="Minimize disclaimer"
            aria-label="Minimize disclaimer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
