import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { LocationPicker } from '../components/LocationPicker';
import {
  Hospital,
  HeartPulse,
  Ambulance,
  Pill,
  Droplets,
  PhoneCall,
  Activity,
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const HospitalsPage: React.FC = () => {
  const { services, userLocation } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'ambulance' | 'pharmacy' | 'blood_bank'>('all');

  const medicalList = services.filter((s) => {
    if (filterType === 'all') {
      return (
        s.category === 'hospital' ||
        s.category === 'ambulance' ||
        s.category === 'pharmacy' ||
        s.category === 'blood_bank'
      );
    }
    return s.category === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Hospital className="w-4 h-4" />
          <span>Medical Triage & Acute Care Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Hospitals & Emergency Medical Facilities
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Level-1 trauma bays, 24/7 ICU beds, government ambulance dispatch, all-night chemists, and verified blood banks in {userLocation.city}.
        </p>
      </div>

      {/* Critical Medical Hotlines Card */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 text-white rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
            Immediate Cardiac / Trauma Call
          </span>
          <h2 className="text-2xl font-black mt-0.5">
            Dial 108 for Emergency Ambulance
          </h2>
          <p className="text-xs text-rose-100 mt-1 max-w-xl">
            Free government ambulance network equipped with Advanced Life Support (ALS), oxygen cylinders, and trained paramedics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:108"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-rose-950 font-black text-xs sm:text-sm shadow flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 108 Ambulance</span>
          </a>
          <a
            href="tel:112"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/30 transition-colors"
          >
            Dial 112 SOS
          </a>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker />

      {/* Sub-Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            filterType === 'all'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          All Medical Facilities ({services.filter((s) => ['hospital', 'ambulance', 'pharmacy', 'blood_bank'].includes(s.category)).length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('hospital')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            filterType === 'hospital'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Hospital className="w-3.5 h-3.5" />
          <span>Hospitals & Trauma Bays</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('ambulance')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            filterType === 'ambulance'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Ambulance className="w-3.5 h-3.5" />
          <span>Ambulance Dispatch</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('pharmacy')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            filterType === 'pharmacy'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          <span>24/7 Pharmacies</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType('blood_bank')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
            filterType === 'blood_bank'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>Blood Banks</span>
        </button>
      </div>

      {/* Grid of Medical facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicalList.map((service) => (
          <ServiceCard key={service.service_id} service={service} />
        ))}
      </div>
    </div>
  );
};
