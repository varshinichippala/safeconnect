import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_EMERGENCY_NUMBERS } from '../data/emergencyData';
import {
  PhoneCall,
  Copy,
  Check,
  Star,
  Search,
  ShieldCheck,
  Info,
  Phone,
  HelpCircle,
  Bookmark
} from 'lucide-react';

export const EmergencyContactsPage: React.FC = () => {
  const { savedContactNumbers, toggleSaveContact } = useApp();
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'saved' | 'primary'>('all');

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filtered = OFFICIAL_EMERGENCY_NUMBERS.filter((contact) => {
    if (filterMode === 'saved' && !savedContactNumbers.includes(contact.number)) {
      return false;
    }
    if (filterMode === 'primary' && !contact.isPrimary) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        contact.name.toLowerCase().includes(q) ||
        contact.number.includes(q) ||
        contact.category.toLowerCase().includes(q) ||
        contact.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Phone className="w-4 h-4" />
          <span>Official Helplines Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Emergency Contact Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          One-tap direct calling, easy number copying, and quick bookmarking for elderly or high-stress situations.
        </p>
      </div>

      {/* Primary 112 Unified Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
            Unified National Single Emergency Number
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-1">
            Dial 112 (Universal Emergency SOS)
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-2 max-w-2xl leading-relaxed">
            The single integrated number in India (and internationally standard) linking Police (100), Fire (101), Health/Ambulance (108), and Disaster Management directly to the nearest GPS-dispatched emergency vehicle.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:112"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-amber-300 text-rose-950 font-black text-base shadow-lg flex items-center gap-2 transition-transform active:scale-95"
          >
            <PhoneCall className="w-5 h-5 text-rose-600" />
            <span>Call 112 Now</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hotline (e.g. 108, Childline, Cyber, Poison)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'all'
                ? 'bg-rose-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Contacts ({OFFICIAL_EMERGENCY_NUMBERS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('primary')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'primary'
                ? 'bg-rose-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Primary Dispatch Only
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('saved')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterMode === 'saved'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Saved Quick Contacts ({savedContactNumbers.length})</span>
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isSaved = savedContactNumbers.includes(item.number);
          const isCopied = copiedNumber === item.number;

          return (
            <div
              key={item.number}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top line: classification and star button */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.isPrimary
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.isPrimary ? 'Official Emergency Dispatch' : 'Specialized Helpline'}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleSaveContact(item.number)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors"
                    title={isSaved ? 'Remove from saved contacts' : 'Save contact'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isSaved ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Big Hotline Number */}
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {item.number}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {item.region}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons: Dial + Copy */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={`tel:${item.number.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {item.number}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(item.number)}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  title="Copy number to clipboard"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
