import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  EyeOff,
  Globe,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { SUPPORTED_LOCATIONS, VERIFIED_PIN_CODES } from '../data/emergencyData';

export const LocationPicker: React.FC = () => {
  const {
    userLocation,
    setUserLocation,
    detectUserLocation,
    stopSharingLocation,
    searchLocationByQuery,
    locationLoading,
    locationError,
    t
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected State Object in SUPPORTED_LOCATIONS
  const currentStateObj =
    SUPPORTED_LOCATIONS.find((s) => s.state.toLowerCase() === (userLocation.state || '').toLowerCase()) ||
    SUPPORTED_LOCATIONS[0];

  const currentDistrictObj =
    currentStateObj.districts.find(
      (d) => d.district.toLowerCase() === (userLocation.district || '').toLowerCase()
    ) || currentStateObj.districts[0];

  const currentCityObj =
    currentDistrictObj.cities.find(
      (c) => c.city.toLowerCase() === (userLocation.city || '').toLowerCase()
    ) || currentDistrictObj.cities[0];

  const handleStateChange = (stateName: string) => {
    const sObj = SUPPORTED_LOCATIONS.find((s) => s.state === stateName) || SUPPORTED_LOCATIONS[0];
    const dObj = sObj.districts[0];
    const cObj = dObj.cities[0];
    const area = cObj.areas[0] || 'Center';
    const pinMatch = area.match(/\((\d{6})\)/);
    const pin = pinMatch ? pinMatch[1] : '';

    setUserLocation({
      country: 'India',
      state: sObj.state,
      district: dObj.district,
      city: cObj.city,
      area,
      pincode: pin,
      formattedAddress: `${area}, ${cObj.city}, ${sObj.state}`,
      isGpsActive: false,
      isManualOverride: true
    });
  };

  const handleDistrictChange = (districtName: string) => {
    const dObj = currentStateObj.districts.find((d) => d.district === districtName) || currentStateObj.districts[0];
    const cObj = dObj.cities[0];
    const area = cObj.areas[0] || 'Center';
    const pinMatch = area.match(/\((\d{6})\)/);
    const pin = pinMatch ? pinMatch[1] : '';

    setUserLocation({
      ...userLocation,
      district: dObj.district,
      city: cObj.city,
      area,
      pincode: pin,
      formattedAddress: `${area}, ${cObj.city}, ${currentStateObj.state}`,
      isGpsActive: false,
      isManualOverride: true
    });
  };

  const handleCityChange = (cityName: string) => {
    const cObj = currentDistrictObj.cities.find((c) => c.city === cityName) || currentDistrictObj.cities[0];
    const area = cObj.areas[0] || 'Center';
    const pinMatch = area.match(/\((\d{6})\)/);
    const pin = pinMatch ? pinMatch[1] : '';

    setUserLocation({
      ...userLocation,
      city: cObj.city,
      area,
      pincode: pin,
      formattedAddress: `${area}, ${cObj.city}, ${currentStateObj.state}`,
      isGpsActive: false,
      isManualOverride: true
    });
  };

  const handleAreaChange = (areaName: string) => {
    const pinMatch = areaName.match(/\((\d{6})\)/);
    const pin = pinMatch ? pinMatch[1] : (userLocation.pincode || '');

    setUserLocation({
      ...userLocation,
      area: areaName,
      pincode: pin,
      formattedAddress: `${areaName}, ${userLocation.city}, ${userLocation.state}`,
      isGpsActive: false,
      isManualOverride: true
    });
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await searchLocationByQuery(searchQuery.trim());
  };

  const handleQuickChipClick = (query: string) => {
    setSearchQuery(query);
    searchLocationByQuery(query);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm transition-colors space-y-4">
      {/* 1. Header Bar: Location status & main GPS actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Active Location Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Emergency Coverage Area
              </span>
              {userLocation.isGpsActive ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  GPS Live (~{userLocation.accuracyMeters || 15}m)
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  Manual Area Selection
                </span>
              )}
            </div>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {userLocation.area}, {userLocation.city}
              {userLocation.pincode ? ` - ${userLocation.pincode}` : ''} ({userLocation.state}, {userLocation.country || 'India'})
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={detectUserLocation}
            disabled={locationLoading}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-transform active:scale-95 disabled:opacity-60"
          >
            {locationLoading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Navigation className="w-3.5 h-3.5" />
            )}
            <span>Use My Current Location</span>
          </button>

          {userLocation.isGpsActive && (
            <button
              type="button"
              onClick={stopSharingLocation}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              title="Stop sharing live GPS location"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Stop Sharing</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors"
          >
            {isExpanded ? 'Hide Manual Select' : 'Select Manually'}
          </button>
        </div>
      </div>

      {/* 2. Direct Search Box: “Enter your location, city, or PIN code” */}
      <div className="pt-2">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your location, city, or PIN code (e.g. Visakhapatnam, Vijayawada, Hyderabad, 530001)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <button
            type="submit"
            disabled={locationLoading || !searchQuery.trim()}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs transition-colors disabled:opacity-50"
          >
            Locate
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Quick Select:</span>
          {['Visakhapatnam (530001)', 'Vijayawada (520001)', 'Hyderabad (500001)', 'New Delhi (110001)', 'Bengaluru (560001)', 'Mumbai (400001)'].map(
            (label) => {
              const query = label.split(' ')[0];
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickChipClick(query)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition-colors"
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Error Notice */}
      {locationError && (
        <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-3 rounded-xl border border-amber-200 dark:border-amber-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {/* 3. Manual Hierarchy Selection: Country → State → District → City/Area → PIN Code */}
      {isExpanded && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Manual Geographic Hierarchy Selection:</span>
            <span className="text-slate-400">Country &rarr; State &rarr; District &rarr; City &rarr; Area/PIN</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. Country */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                Country
              </label>
              <select
                disabled
                value="India"
                className="w-full text-xs font-bold bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 cursor-not-allowed"
              >
                <option value="India">🇮🇳 India</option>
              </select>
            </div>

            {/* 2. State */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                State
              </label>
              <select
                value={userLocation.state}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                {SUPPORTED_LOCATIONS.map((s) => (
                  <option key={s.state} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. District */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                District
              </label>
              <select
                value={userLocation.district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                {currentStateObj.districts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. City */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                City / Town
              </label>
              <select
                value={userLocation.city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                {currentDistrictObj.cities.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Area & PIN Code */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                Area &amp; PIN Code
              </label>
              <select
                value={userLocation.area}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                {currentCityObj.areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 4. Privacy and Verification Footnote */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>
          <strong>Privacy:</strong> Your location is used only to find nearby emergency services. Ask for location permission before accessing GPS data.
        </span>
      </div>
    </div>
  );
};
