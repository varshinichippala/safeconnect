import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { LocationPicker } from '../components/LocationPicker';
import {
  Flame,
  PhoneCall,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const FireRescuePage: React.FC = () => {
  const { services, userLocation } = useApp();
  const fireStations = services.filter((s) => s.category === 'fire');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Flame className="w-4 h-4" />
          <span>Fire Suppression & Structural Rescue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Fire & Rescue Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Direct dispatch to municipal fire brigades, hazmat units, high-rise aerial ladder units, and disaster rescue.
        </p>
      </div>

      {/* Emergency Hotline Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
            Active Fire or Smoke Inhalation
          </span>
          <h2 className="text-2xl font-black mt-0.5">
            Dial 101 for Fire & Rescue Services
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Stay low to ground under smoke. Evacuate immediately via stairs. Never use elevators.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:101"
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call 101 Fire</span>
          </a>
          <a
            href="tel:112"
            className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow"
          >
            Dial 112 SOS
          </a>
        </div>
      </div>

      {/* Fire Evacuation & P.A.S.S. Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fire Extinguisher Guide (P.A.S.S.) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 font-extrabold text-xs">
              P.A.S.S. Rule
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              How to Operate a Fire Extinguisher
            </h3>
          </div>

          <div className="space-y-3 mt-3">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                P
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">PULL the pin:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Break the plastic tamper seal and pull the ring pin from the handle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                A
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">AIM low at the base:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Point the nozzle at the base of the fire where the fuel source is, not at the flames above.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                S
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">SQUEEZE the lever slowly:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Depress the handle lever smoothly to release the extinguishing agent.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                S
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">SWEEP side to side:</strong>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                  Sweep nozzle across the base of the fire until completely smothered. If fire flares, back away safely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Smoke & Evacuation Protocol */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 font-extrabold text-xs">
              Life Safety
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Smoke Evacuation & Dos & Don'ts
            </h3>
          </div>

          <div className="space-y-2 mt-3 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Crawl under smoke:</strong> Smoke and poisonous carbon monoxide rise. Cleaner air is within 30–60 cm of floor.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Check closed doors:</strong> Feel door surface and metal knob with back of hand. If warm, do NOT open.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Stop, Drop, and Roll:</strong> If your clothes catch fire, drop immediately and roll back and forth to smother flames.
              </p>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>NEVER use elevators:</strong> Electrical failure can strand elevators between burning floors.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>NEVER throw water on grease/oil fires:</strong> Water causes burning oil to explode in violent fireball. Smother with metal lid.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker />

      {/* Fire Stations Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Verified Fire & Rescue Stations in {userLocation.city} ({fireStations.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fireStations.map((station) => (
            <ServiceCard key={station.service_id} service={station} />
          ))}
        </div>
      </div>
    </div>
  );
};
