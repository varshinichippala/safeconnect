import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { LocationPicker } from '../components/LocationPicker';
import { InteractiveEmergencyMap } from '../components/InteractiveEmergencyMap';
import { SAFETY_GUIDES } from '../data/safetyGuides';
import {
  HeartPulse,
  Shield,
  Flame,
  CloudRain,
  PhoneCall,
  Activity,
  Hospital,
  Ambulance,
  Pill,
  Droplets,
  HelpCircle,
  AlertTriangle,
  Radio,
  FileText,
  LifeBuoy,
  Lock,
  Baby,
  HeartHandshake,
  Laptop,
  Navigation,
  RefreshCw,
  MapPin,
  Map
} from 'lucide-react';

export const EmergencyDashboardPage: React.FC = () => {
  const {
    services,
    userLocation,
    setActivePage,
    detectUserLocation,
    findNearestEmergencyHelp,
    locationLoading
  } = useApp();
  const [activeTab, setActiveTab] = useState<'medical' | 'police' | 'fire' | 'disasters'>('medical');
  const [showMap, setShowMap] = useState<boolean>(true);

  // Medical subset
  const medicalServices = services.filter(
    (s) => s.category === 'hospital' || s.category === 'ambulance' || s.category === 'pharmacy' || s.category === 'blood_bank'
  );

  // Police subset
  const policeServices = services.filter((s) => s.category === 'police');

  // Fire subset
  const fireServices = services.filter((s) => s.category === 'fire');

  // Disaster guides
  const disasterGuides = SAFETY_GUIDES.filter((g) => g.category === 'disaster');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header with Prominent Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Activity className="w-4 h-4" />
            <span>Unified Emergency Command</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Emergency Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive real-time directory and protocols segmented into four critical response categories.
          </p>
        </div>

        {/* Prominent Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={findNearestEmergencyHelp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md shadow-rose-600/30 transition-transform active:scale-95"
          >
            <Navigation className="w-4 h-4 fill-white" />
            <span>FIND NEAREST EMERGENCY HELP</span>
          </button>

          <button
            type="button"
            onClick={detectUserLocation}
            disabled={locationLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-xs transition-colors disabled:opacity-60"
          >
            {locationLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-500" />
            ) : (
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
            )}
            <span>Use My Current Location</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMap(!showMap)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
          >
            <Map className="w-4 h-4" />
            <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
          </button>
        </div>
      </div>

      {/* Location Selector */}
      <LocationPicker />

      {/* Embedded Interactive Map */}
      {showMap && (
        <div className="animate-fadeIn">
          <InteractiveEmergencyMap
            height="460px"
            showSearchBar={true}
            showNearestButton={false}
          />
        </div>
      )}

      {/* Category Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('medical')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'medical'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>1. Medical ({medicalServices.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('police')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'police'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>2. Police & Safety ({policeServices.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fire')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'fire'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>3. Fire & Rescue ({fireServices.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disasters')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'disasters'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>4. Natural Disasters ({disasterGuides.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MEDICAL */}
      {activeTab === 'medical' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Quick Numbers Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">
                  Ambulance Dispatch
                </span>
                <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-1">
                  108
                </p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Trauma & ALS fleet
                </p>
              </div>
              <a
                href="tel:108"
                className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center"
              >
                Call 108
              </a>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase">
                  Blood Bank Helpline
                </span>
                <p className="text-2xl font-black text-rose-900 dark:text-rose-100 mt-1">
                  104
                </p>
                <p className="text-[11px] text-rose-700 dark:text-rose-400">
                  National blood inventory
                </p>
              </div>
              <a
                href="tel:104"
                className="mt-3 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs text-center"
              >
                Call 104
              </a>
            </div>

            <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase">
                  Poison Center
                </span>
                <p className="text-xl sm:text-2xl font-black text-teal-900 dark:text-teal-100 mt-1 truncate">
                  1800-11-0031
                </p>
                <p className="text-[11px] text-teal-700 dark:text-teal-400">
                  Toxicology guidance
                </p>
              </div>
              <a
                href="tel:1800110031"
                className="mt-3 py-1.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs text-center"
              >
                Call Poison Help
              </a>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                  First Aid Protocols
                </span>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  CPR & Trauma
                </p>
                <p className="text-[11px] text-slate-500">
                  Immediate life-saving steps
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('disaster')}
                className="mt-3 py-1.5 px-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs text-center"
              >
                View Guides
              </button>
            </div>
          </div>

          {/* List of Hospitals and Medical facilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalServices.map((service) => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: POLICE & SAFETY */}
      {activeTab === 'police' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Police Special Resources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Women Safety Helpline
                  </h3>
                  <p className="text-xs text-slate-500">Immediate distress intervention</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                24/7 dedicated line for women facing harassment, violence, or stalking with immediate PCR patrol tracking.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black text-blue-700 dark:text-blue-300">1091</span>
                <a
                  href="tel:1091"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Call 1091
                </a>
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Childline Emergency
                  </h3>
                  <p className="text-xs text-slate-500">Child protection & rescue</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                24-hour toll-free emergency service for children in need of protection, runaways, or lost minors.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">1098</span>
                <a
                  href="tel:1098"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                >
                  Call 1098
                </a>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-600 text-white">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Cyber Financial Fraud
                  </h3>
                  <p className="text-xs text-slate-500">Golden hour reporting</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Instant reporting of unauthorized UPI/bank transfers to freeze funds before syndicate withdrawal.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-black text-purple-700 dark:text-purple-300">1930</span>
                <a
                  href="tel:1930"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                >
                  Call 1930
                </a>
              </div>
            </div>
          </div>

          {/* Police Stations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policeServices.map((service) => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FIRE & RESCUE */}
      {activeTab === 'fire' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Fire Safety Banner */}
          <div className="bg-amber-500 text-slate-950 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider">
                Emergency Fire Dispatch Hotlines
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-0.5">
                Fire Brigade (101) & Disaster Cell (1078)
              </h3>
              <p className="text-xs sm:text-sm font-medium mt-1">
                For active flames, building collapse, elevator entombment, or chemical leaks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:101"
                className="px-4 py-2 rounded-xl bg-slate-950 text-white font-extrabold text-xs shadow hover:bg-slate-800 transition-colors"
              >
                Dial 101 Fire
              </a>
              <a
                href="tel:1078"
                className="px-4 py-2 rounded-xl bg-white text-slate-950 font-extrabold text-xs shadow hover:bg-slate-100 transition-colors"
              >
                Dial 1078 NDRF
              </a>
            </div>
          </div>

          {/* Fire Stations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fireServices.map((service) => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NATURAL DISASTERS */}
      {activeTab === 'disasters' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disasterGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    {guide.title}
                  </h3>
                  {guide.criticalHotline && (
                    <a
                      href={`tel:${guide.criticalHotline.number}`}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                    >
                      Call {guide.criticalHotline.number}
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  {guide.summary}
                </p>

                {/* Steps */}
                <div className="space-y-2.5">
                  {guide.steps.map((st) => (
                    <div key={st.step} className="flex items-start gap-2.5 text-xs">
                      <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-extrabold flex items-center justify-center shrink-0">
                        {st.step}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>{st.title}:</strong> {st.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
