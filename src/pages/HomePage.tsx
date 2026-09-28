import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuickActionPads } from '../components/QuickActionPads';
import { LocationPicker } from '../components/LocationPicker';
import { ServiceCard } from '../components/ServiceCard';
import { InteractiveEmergencyMap } from '../components/InteractiveEmergencyMap';
import { SAFETY_GUIDES } from '../data/safetyGuides';
import {
  Search,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Activity,
  HeartPulse,
  Flame,
  Shield,
  LifeBuoy,
  ChevronRight,
  Sparkles,
  Info,
  Navigation,
  RefreshCw,
  MapPin,
  Ambulance,
  Hospital,
  Pill,
  Droplets,
  Layers
} from 'lucide-react';
import { ReportProblemModal } from '../components/ReportProblemModal';

export const HomePage: React.FC = () => {
  const {
    t,
    services,
    alerts,
    setActivePage,
    userLocation,
    detectUserLocation,
    findNearestEmergencyHelp,
    locationLoading,
    locationError,
    setActiveSosCategory
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  // Filter services by category and search query, always sorted by distance
  const filteredServices = services
    .filter((s) => {
      if (selectedCategoryTab !== 'all' && s.category !== selectedCategoryTab) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.service_name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.area.toLowerCase().includes(q) ||
        (s.pincode && s.pincode.includes(q)) ||
        (s.capabilities && s.capabilities.some((c) => c.toLowerCase().includes(q)))
      );
    })
    .slice(0, 9);

  // Compute the single closest facility for each essential category
  const nearestAmbulance = services.find((s) => s.category === 'ambulance');
  const nearestHospital = services.find((s) => s.category === 'hospital');
  const nearestPolice = services.find((s) => s.category === 'police');
  const nearestFire = services.find((s) => s.category === 'fire');
  const nearestPharmacy = services.find((s) => s.category === 'pharmacy');
  const nearestBloodBank = services.find((s) => s.category === 'blood_bank');

  const nearestHighlights = [
    { label: 'Nearest Ambulance', icon: Ambulance, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900', service: nearestAmbulance },
    { label: 'Nearest Hospital', icon: Hospital, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900', service: nearestHospital },
    { label: 'Nearest Police', icon: Shield, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900', service: nearestPolice },
    { label: 'Nearest Fire & Rescue', icon: Flame, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900', service: nearestFire },
    { label: 'Nearest 24/7 Pharmacy', icon: Pill, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-900', service: nearestPharmacy },
    { label: 'Nearest Blood Bank', icon: Droplets, color: 'text-red-600 bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-900', service: nearestBloodBank },
  ];

  // Active verified alerts
  const activeAlerts = alerts.filter((a) => a.is_active);

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-900 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              Verified Local Emergency Portal &bull; Live GPS Ready
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              SafeConnect
            </h1>
            <p className="mt-2 text-lg sm:text-2xl font-black text-rose-600 dark:text-rose-400">
              “{t.tagline}”
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Instant access to verified local hospitals, ambulances, police stations, fire brigades, all-night pharmacies, and live civil protection advisories.
            </p>

            {/* Prominent High-Visibility Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={findNearestEmergencyHelp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base shadow-lg shadow-rose-600/30 transform hover:scale-[1.02] active:scale-95 transition-all border border-rose-400/50"
              >
                <Navigation className="w-5 h-5 fill-white" />
                <span>FIND NEAREST EMERGENCY HELP</span>
              </button>

              <button
                type="button"
                onClick={detectUserLocation}
                disabled={locationLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold text-sm shadow-md transition-all disabled:opacity-60"
              >
                {locationLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
                ) : (
                  <MapPin className="w-4 h-4 text-rose-500" />
                )}
                <span>Use My Current Location</span>
              </button>
            </div>
          </div>

          {/* Location Selector Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <LocationPicker />
          </div>

          {/* Large Emergency Buttons */}
          <div className="mt-8">
            <QuickActionPads />
          </div>
        </div>
      </section>

      {/* 2. Real-Time Interactive Emergency Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Activity className="w-4 h-4" />
              <span>Real-Time GIS Mapping</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Interactive Emergency Services Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live location pin with proximity radial zones around {userLocation.area}, {userLocation.city}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={detectUserLocation}
              disabled={locationLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xs transition-colors"
            >
              {locationLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-600" />
              ) : (
                <Navigation className="w-3.5 h-3.5 text-rose-600" />
              )}
              <span>Refresh GPS</span>
            </button>
          </div>
        </div>

        <InteractiveEmergencyMap
          height="540px"
          showSearchBar={true}
          showNearestButton={true}
        />
      </section>

      {/* 3. Nearest Emergency Services Highlights (Sorted by Distance) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Sorted by Proximity
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                Closest Verified Emergency Units Near You
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Immediately dispatched or reachable based on your location coordinates.
              </p>
            </div>

            <button
              type="button"
              onClick={findNearestEmergencyHelp}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm self-start sm:self-auto"
            >
              <span>View All Nearest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {nearestHighlights.map((item, idx) => {
              const Icon = item.icon;
              const svc = item.service;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-xl border ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                          {item.label}
                        </span>
                      </div>
                      {typeof svc?.distance === 'number' && (
                        <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                          {svc.distance} km
                        </span>
                      )}
                    </div>

                    {svc ? (
                      <>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {svc.service_name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {svc.address}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{svc.operating_status || 'Open 24/7'}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No facility registered in current zone.</p>
                    )}
                  </div>

                  {svc && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={`tel:${svc.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call {svc.phone}</span>
                      </a>
                      <a
                        href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${svc.latitude}%2C${svc.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs"
                        title="Directions"
                      >
                        Directions &rarr;
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Active Alerts Ticker (if any active alerts) */}
      {activeAlerts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-900/60 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Active Emergency Alerts ({activeAlerts.length})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Live meteorological warnings and civil safety announcements
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePage('alerts')}
                className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Full Alert Feed</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeAlerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.alert_id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-amber-200 dark:border-amber-900/40 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          alert.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                        }`}
                      >
                        {alert.severity} Severity
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(alert.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {alert.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 truncate max-w-[200px]">
                      Area: {alert.affected_area}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      Source: {alert.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Emergency Services Directory with Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Local Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {t.nearbyServicesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Showing verified emergency facilities sorted by closest distance to {userLocation.area}, {userLocation.city}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActivePage('services')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-extrabold transition-colors shadow-xs"
            >
              <span>Explore All {services.length} Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Pills & Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'ambulance', label: 'Ambulances' },
              { id: 'hospital', label: 'Hospitals' },
              { id: 'police', label: 'Police' },
              { id: 'fire', label: 'Fire & Rescue' },
              { id: 'pharmacy', label: 'Pharmacies' },
              { id: 'blood_bank', label: 'Blood Banks' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategoryTab === tab.id
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this view..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="font-bold text-slate-800 dark:text-slate-200">
              No services match "{searchQuery}" in {userLocation.city}.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Try switching your location or searching for general categories like "Hospital" or "Police".
            </p>
          </div>
        )}
      </section>

      {/* 6. Emergency Guidance & First Aid Step-by-Step Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Immediate Action Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {t.safetyTips}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Clear, step-by-step guidance designed for stress-free emergency response
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActivePage('disaster')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>All Disaster Safety Guides</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {SAFETY_GUIDES.slice(0, 3).map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  {guide.criticalHotline && (
                    <a
                      href={`tel:${guide.criticalHotline.number}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-extrabold shadow-xs"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{guide.criticalHotline.number}</span>
                    </a>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {guide.summary}
                </p>

                {/* Numbered Steps Preview */}
                <div className="mt-4 space-y-2">
                  {guide.steps.slice(0, 2).map((s) => (
                    <div key={s.step} className="flex items-start gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {s.step}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>{s.title}:</strong> {s.description.slice(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setActivePage('disaster')}
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Read Full Step Guide &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Community Report Hazard CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Community Public Safety Network
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Spotted a local hazard, fallen tree, or blocked road?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Help your neighbors and local municipal coordinators. Submit a hazard ticket with location and photos for administrative review.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
            >
              Report a Local Hazard
            </button>
            <button
              type="button"
              onClick={() => setActivePage('report')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              View Active Reports
            </button>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      <ReportProblemModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};
