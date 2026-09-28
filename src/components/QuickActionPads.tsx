import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Ambulance,
  Shield,
  Flame,
  Hospital,
  Pill,
  ShieldAlert,
  PhoneCall
} from 'lucide-react';

interface QuickActionProps {
  onSelectAction?: (actionId: string) => void;
}

export const QuickActionPads: React.FC<QuickActionProps> = () => {
  const { setActivePage, setActiveSosCategory, t } = useApp();

  const handleAction = (id: string, hotline: string, pageTarget: string) => {
    setActiveSosCategory(id);
    setActivePage(pageTarget);
  };

  const actionButtons = [
    {
      id: 'ambulance',
      label: t.ambulance,
      subtext: 'Medical & Trauma Dispatch',
      number: '108',
      telHref: 'tel:108',
      targetPage: 'hospitals',
      bgGradient: 'from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600',
      activeRing: 'focus:ring-emerald-400',
      icon: Ambulance,
      tag: 'Free 24/7'
    },
    {
      id: 'police',
      label: t.police,
      subtext: 'Crime, PCR & Immediate Protection',
      number: '100 / 112',
      telHref: 'tel:100',
      targetPage: 'police',
      bgGradient: 'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600',
      activeRing: 'focus:ring-blue-400',
      icon: Shield,
      tag: 'Law Enforcement'
    },
    {
      id: 'fire',
      label: t.fire,
      subtext: 'Fire Suppression & Rescue Ops',
      number: '101',
      telHref: 'tel:101',
      targetPage: 'fire',
      bgGradient: 'from-orange-600 to-amber-700 hover:from-orange-500 hover:to-amber-600',
      activeRing: 'focus:ring-orange-400',
      icon: Flame,
      tag: 'Rescue Units'
    },
    {
      id: 'hospitals',
      label: t.hospitals,
      subtext: 'Emergency Rooms & Trauma Bays',
      number: 'View Beds',
      telHref: null,
      targetPage: 'hospitals',
      bgGradient: 'from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600',
      activeRing: 'focus:ring-rose-400',
      icon: Hospital,
      tag: 'Trauma Centers'
    },
    {
      id: 'pharmacies',
      label: t.pharmacies,
      subtext: '24/7 Emergency Chemists',
      number: 'All-Night',
      telHref: null,
      targetPage: 'services',
      bgGradient: 'from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600',
      activeRing: 'focus:ring-teal-400',
      icon: Pill,
      tag: 'Open Now'
    },
    {
      id: 'emergency_sos',
      label: t.emergencySos,
      subtext: 'Universal Crisis Coordination',
      number: '112',
      telHref: 'tel:112',
      targetPage: 'contacts',
      bgGradient: 'from-red-600 via-rose-700 to-red-800 hover:from-red-500 hover:to-rose-600',
      activeRing: 'focus:ring-red-400',
      icon: ShieldAlert,
      tag: 'High Priority',
      isPulsing: true
    }
  ];

  return (
    <section className="w-full" aria-label="Large Emergency Buttons">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {actionButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <div
              key={btn.id}
              className={`relative rounded-2xl bg-gradient-to-br ${btn.bgGradient} text-white p-4 sm:p-5 shadow-lg shadow-black/10 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between group cursor-pointer focus-within:ring-4 ${btn.activeRing} min-h-[145px] sm:min-h-[160px]`}
              onClick={() => handleAction(btn.id, btn.number, btn.targetPage)}
            >
              {/* Top Row: Icon + Tag */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white/90">
                  {btn.tag}
                </span>
              </div>

              {/* Bottom: Label, Subtext & Call Button */}
              <div className="mt-3">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug">
                  {btn.label}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5 hidden sm:block">
                  {btn.subtext}
                </p>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                  {btn.telHref ? (
                    <a
                      href={btn.telHref}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white text-slate-900 font-extrabold text-xs shadow hover:bg-amber-300 transition-colors"
                      title={`Call ${btn.number}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                      <span>Call {btn.number}</span>
                    </a>
                  ) : (
                    <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                      {btn.number}
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-white/90 group-hover:underline">
                    View &rarr;
                  </span>
                </div>
              </div>

              {btn.isPulsing && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
