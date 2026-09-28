import React, { useState } from 'react';
import { SAFETY_GUIDES } from '../data/safetyGuides';
import {
  CloudRain,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HeartPulse,
  Flame,
  Waves,
  Wind,
  Activity,
  SunMedium,
  UserX,
  ShieldQuestion,
  LifeBuoy
} from 'lucide-react';

export const DisasterSafetyPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'disaster' | 'medical' | 'fire' | 'accident' | 'safety'>('all');

  const filteredGuides = SAFETY_GUIDES.filter((g) => {
    if (selectedFilter === 'all') return true;
    return g.category === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <LifeBuoy className="w-4 h-4" />
          <span>Preparedness & Survival Protocols</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Disaster Safety & Step-by-Step Guidance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Standardized life-safety protocols for natural calamities, road trauma, cardiac collapse, and high-wind storms.
        </p>
      </div>

      {/* Disaster Authority Hotlines Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            National Disaster Helplines
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-0.5">
            NDRF (1078) & State Disaster Control (1070)
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            For boat rescues during flash floods, cyclone relief camps, structural collapses, and earthquake search and rescue.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:1078"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1078 NDRF</span>
          </a>
          <a
            href="tel:1070"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20"
          >
            Call 1070 State
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          All Situations ({SAFETY_GUIDES.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('disaster')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'disaster'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Natural Disasters (Floods / Cyclones / Quakes)
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('medical')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'medical'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Medical & Cardiac
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('fire')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'fire'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Fire & Smoke
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('accident')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'accident'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Road Accidents
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('safety')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            selectedFilter === 'safety'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Safety & Suspicious Events
        </button>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Category: {guide.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {guide.summary}
                  </p>
                </div>

                {guide.criticalHotline && (
                  <a
                    href={`tel:${guide.criticalHotline.number}`}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{guide.criticalHotline.number}</span>
                  </a>
                )}
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Step-by-Step Response Protocol:
                </h4>
                {guide.steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {s.step}
                    </span>
                    <div className="text-xs">
                      <strong className="text-slate-900 dark:text-white block text-sm">
                        {s.title}
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dos and Don'ts */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl p-3.5 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    CRITICAL DOs
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-emerald-900 dark:text-emerald-200">
                    {guide.dos.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl p-3.5 border border-rose-100 dark:border-rose-900/40">
                  <span className="text-xs font-extrabold text-rose-800 dark:text-rose-300 flex items-center gap-1 mb-2">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    CRITICAL DON'Ts
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-rose-900 dark:text-rose-200">
                    {guide.donts.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
