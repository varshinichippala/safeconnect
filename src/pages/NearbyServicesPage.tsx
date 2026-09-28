import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationPicker } from '../components/LocationPicker';
import { ServiceCard } from '../components/ServiceCard';
import { InteractiveEmergencyMap } from '../components/InteractiveEmergencyMap';
import { ServiceCategory } from '../types';
import {
  Search,
  Filter,
  Hospital,
  Shield,
  Flame,
  Ambulance,
  Pill,
  Droplets,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check,
  Map,
  List,
  Navigation,
  RefreshCw
} from 'lucide-react';

export const NearbyServicesPage: React.FC = () => {
  const {
    services,
    userLocation,
    detectUserLocation,
    findNearestEmergencyHelp,
    locationLoading
  } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [only24x7, setOnly24x7] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'cards' | 'map'>('split');

  const categories = [
    { id: 'all', label: 'All Services', icon: MapPin },
    { id: 'ambulance', label: 'Ambulance Units', icon: Ambulance },
    { id: 'hospital', label: 'Hospitals', icon: Hospital },
    { id: 'police', label: 'Police Stations', icon: Shield },
    { id: 'fire', label: 'Fire & Rescue', icon: Flame },
    { id: 'pharmacy', label: '24/7 Pharmacies', icon: Pill },
    { id: 'blood_bank', label: 'Blood Banks', icon: Droplets }
  ];

  const filtered = services.filter((s) => {
    // Category match
    if (selectedCategory !== 'all' && s.category !== selectedCategory) {
      return false;
    }
    // 24x7 match
    if (only24x7 && !s.is_24x7) {
      return false;
    }
    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.service_name.toLowerCase().includes(q);
      const matchAddr = s.address.toLowerCase().includes(q);
      const matchArea = s.area.toLowerCase().includes(q);
      const matchPin = s.pincode && s.pincode.includes(q);
      const matchCap = s.capabilities && s.capabilities.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchAddr && !matchArea && !matchPin && !matchCap) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header with Prominent Action CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Local Georeferenced Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Nearby Emergency Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official verified facilities near {userLocation.area}, {userLocation.city} &bull; Sorted by closest distance first.
          </p>
        </div>

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
        </div>
      </div>

      {/* Location Picker Component */}
      <LocationPicker />

      {/* View Mode Switcher: Split / Cards / Map */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Split View (Map + Cards)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'map'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-blue-600" />
            <span>Full Map View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cards Grid Only</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
          Showing <strong>{filtered.length}</strong> facilities sorted by distance
        </span>
      </div>

      {/* Interactive Map (Rendered when in 'split' or 'map' mode) */}
      {(viewMode === 'split' || viewMode === 'map') && (
        <div className="animate-fadeIn">
          <InteractiveEmergencyMap
            height={viewMode === 'map' ? '650px' : '480px'}
            showSearchBar={true}
            showNearestButton={false}
          />
        </div>
      )}

      {/* Filter and Search Bar (Rendered when in 'split' or 'cards' mode) */}
      {viewMode !== 'map' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by facility name, specialty, trauma unit, or street..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Category Filter Pills & 24/7 Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={only24x7}
                onChange={(e) => setOnly24x7(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
              <span>Open 24/7 Only</span>
            </label>
          </div>
        </div>
      )}

      {/* Results Count & Services Grid */}
      {viewMode !== 'map' && (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
            <span>
              Showing <strong>{filtered.length}</strong> verified locations
            </span>
            <span className="italic">Distances computed in real time from your coordinates</span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <ServiceCard key={service.service_id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-2">
              <MapPin className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200">
                No verified facilities found for this query.
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try expanding your search query, deselecting filters, or choosing a neighboring district in Andhra Pradesh, Telangana, Delhi, or Karnataka.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
