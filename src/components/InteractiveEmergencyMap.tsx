import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { EmergencyService, ServiceCategory } from '../types';
import {
  Navigation,
  RefreshCw,
  Search,
  MapPin,
  Phone,
  ExternalLink,
  ShieldCheck,
  Clock,
  Layers,
  Hospital,
  Shield,
  Flame,
  Ambulance,
  Pill,
  Droplets,
  EyeOff,
  AlertTriangle,
  LocateFixed,
  Compass
} from 'lucide-react';

interface InteractiveEmergencyMapProps {
  initialZoom?: number;
  height?: string;
  showSearchBar?: boolean;
  showNearestButton?: boolean;
  onServiceSelect?: (service: EmergencyService) => void;
}

export const InteractiveEmergencyMap: React.FC<InteractiveEmergencyMapProps> = ({
  initialZoom = 13,
  height = '520px',
  showSearchBar = true,
  showNearestButton = true,
  onServiceSelect
}) => {
  const {
    userLocation,
    setUserLocation,
    detectUserLocation,
    stopSharingLocation,
    searchLocationByQuery,
    findNearestEmergencyHelp,
    locationLoading,
    locationError,
    services
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userCircleRef = useRef<L.Circle | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchInput, setSearchInput] = useState('');
  const [isManualPicking, setIsManualPicking] = useState(false);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);

  // Category Colors and SVGs
  const getCategoryMarkerHtml = (category: ServiceCategory) => {
    switch (category) {
      case 'hospital':
        return `
          <div style="background-color: #e11d48; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(225, 29, 72, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 6v12M6 12h12"/>
            </svg>
          </div>
        `;
      case 'police':
        return `
          <div style="background-color: #2563eb; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        `;
      case 'fire':
        return `
          <div style="background-color: #d97706; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(217, 119, 6, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
            </svg>
          </div>
        `;
      case 'ambulance':
        return `
          <div style="background-color: #059669; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(5, 150, 105, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="16" height="12" x="2" y="6" rx="2"/>
              <path d="M10 9v6M7 12h6"/>
            </svg>
          </div>
        `;
      case 'pharmacy':
        return `
          <div style="background-color: #0d9488; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
              <path d="m8.5 8.5 7 7"/>
            </svg>
          </div>
        `;
      case 'blood_bank':
        return `
          <div style="background-color: #b91c1c; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(185, 28, 28, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
            </svg>
          </div>
        `;
      default:
        return `
          <div style="background-color: #475569; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2.5px solid white; box-shadow: 0 4px 10px rgba(71, 85, 105, 0.45); color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
        `;
    }
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = userLocation.latitude || 17.7088;
      const initialLng = userLocation.longitude || 83.3039;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: true,
        attributionControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Create group for markers
      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Handle map clicks for manual location placement
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setUserLocation({
          ...userLocation,
          latitude: lat,
          longitude: lng,
          area: 'Custom Map Pin',
          formattedAddress: `Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
          isGpsActive: false,
          isManualOverride: true
        });
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Update User Location Pin & Radius Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const lat = userLocation.latitude;
    const lng = userLocation.longitude;

    if (typeof lat !== 'number' || typeof lng !== 'number') return;

    // Pan map to new user location
    map.panTo([lat, lng], { animate: true });

    // User pin icon with pulsing halo
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(225, 29, 72, 0.25); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 20px; height: 20px; border-radius: 50%; background: #e11d48; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.35);"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([lat, lng]);
    } else {
      userMarkerRef.current = L.marker([lat, lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(map);

      userMarkerRef.current.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; padding: 2px;">
          <strong style="color: #e11d48; font-size: 13px;">📍 Your Location</strong><br/>
          <span>${userLocation.area}, ${userLocation.city}</span><br/>
          <span style="color: #64748b; font-size: 11px;">${userLocation.isGpsActive ? '✓ Active Live GPS' : 'Manual Location'}</span>
        </div>
      `);
    }

    // Accuracy Circle
    const accuracy = userLocation.accuracyMeters || 100;
    if (userCircleRef.current) {
      userCircleRef.current.setLatLng([lat, lng]);
      userCircleRef.current.setRadius(accuracy);
    } else {
      userCircleRef.current = L.circle([lat, lng], {
        radius: accuracy,
        color: '#e11d48',
        weight: 1,
        fillColor: '#e11d48',
        fillOpacity: 0.1
      }).addTo(map);
    }
  }, [userLocation.latitude, userLocation.longitude, userLocation.accuracyMeters, userLocation.isGpsActive]);

  // 3. Render Emergency Service Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const filtered = services.filter((s) => {
      if (activeCategory === 'all') return true;
      return s.category === activeCategory;
    });

    filtered.forEach((service) => {
      const icon = L.divIcon({
        className: `marker-${service.category}`,
        html: getCategoryMarkerHtml(service.category),
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([service.latitude, service.longitude], { icon });

      const popupContent = document.createElement('div');
      popupContent.className = 'custom-emergency-popup p-1';
      popupContent.innerHTML = `
        <div style="font-family: inherit; font-size: 12px; min-width: 220px; line-height: 1.4;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b;">
              ${service.category.toUpperCase().replace('_', ' ')}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 9999px;">
              ${service.operating_status || 'Open 24/7'}
            </span>
          </div>

          <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.2;">
            ${service.service_name}
          </h4>

          <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">
            ${service.address}
          </p>

          ${
            typeof service.distance === 'number'
              ? `<div style="font-size: 11px; font-weight: 800; color: #e11d48; margin-bottom: 8px;">
                  🚀 ${service.distance} km from your location
                </div>`
              : ''
          }

          <div style="display: flex; align-items: center; gap: 6px; margin-top: 8px; pt: 6px; border-top: 1px solid #f1f5f9;">
            <a href="tel:${service.phone.replace(/[^0-9+]/g, '')}" 
               style="flex: 1; background: #e11d48; color: white; padding: 6px 10px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 11px; text-align: center; display: inline-block;">
              📞 Call ${service.phone}
            </a>
            <a href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${service.latitude}%2C${service.longitude}" 
               target="_blank" 
               rel="noopener noreferrer" 
               style="background: #f1f5f9; color: #0f172a; padding: 6px 10px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 11px; text-align: center;">
              Route ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedService(service);
        if (onServiceSelect) onServiceSelect(service);
      });

      markersLayer.addLayer(marker);
    });
  }, [services, activeCategory, userLocation.latitude, userLocation.longitude]);

  // Search handler for City / PIN code
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const success = await searchLocationByQuery(searchInput.trim());
    if (success && mapInstanceRef.current && userLocation.latitude && userLocation.longitude) {
      mapInstanceRef.current.setView([userLocation.latitude, userLocation.longitude], 14, { animate: true });
    }
  };

  const handleCenterOnUser = () => {
    if (mapInstanceRef.current && userLocation.latitude && userLocation.longitude) {
      mapInstanceRef.current.setView([userLocation.latitude, userLocation.longitude], 14, { animate: true });
    }
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: Layers },
    { id: 'hospital', label: 'Hospitals', icon: Hospital },
    { id: 'ambulance', label: 'Ambulances', icon: Ambulance },
    { id: 'police', label: 'Police', icon: Shield },
    { id: 'fire', label: 'Fire & Rescue', icon: Flame },
    { id: 'pharmacy', label: 'Pharmacies', icon: Pill },
    { id: 'blood_bank', label: 'Blood Banks', icon: Droplets }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-all">
      {/* 1. Header Toolbar with Real-Time Location Controls & Search Box */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Active location indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Current Geo-Position
                </span>
                {userLocation.isGpsActive ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    GPS Live (Accurate to ~{userLocation.accuracyMeters || 15}m)
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    Manual Area Selected
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {userLocation.area}, {userLocation.city}
                {userLocation.pincode ? ` (${userLocation.pincode})` : ''} - {userLocation.state}, {userLocation.country || 'India'}
              </p>
            </div>
          </div>

          {/* Quick Location Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={detectUserLocation}
              disabled={locationLoading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-transform active:scale-95 disabled:opacity-60"
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
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                title="Privacy protection: stops sharing live GPS coordinates"
              >
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                <span>Stop Sharing Location</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCenterOnUser}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Center Map on My Location"
            >
              <LocateFixed className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location Search Bar: City or PIN Code */}
        {showSearchBar && (
          <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter your location, city, or PIN code (e.g. Visakhapatnam, Vijayawada, Hyderabad, 530001)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <button
              type="submit"
              disabled={locationLoading || !searchInput.trim()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-extrabold transition-colors disabled:opacity-50"
            >
              Search
            </button>
          </form>
        )}

        {/* Location Privacy Note & Error alerts */}
        {locationError && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Category Pills on Top of Map */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  active
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
      </div>

      {/* 2. Interactive Leaflet Map Container */}
      <div className="relative">
        <div
          ref={mapContainerRef}
          style={{ height }}
          className="w-full z-10"
        />

        {/* Floating Instruction Banner on Map bottom-left */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none max-w-sm hidden sm:block">
          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] p-2.5 rounded-xl border border-white/10 shadow-lg space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-rose-400">
              <MapPin className="w-3.5 h-3.5" /> Click anywhere on map to reposition manually
            </p>
            <p className="text-slate-300 text-[10px] leading-tight">
              Location is used strictly to compute nearest medical, police, fire & pharmacy facilities.
            </p>
          </div>
        </div>

        {/* Floating "FIND NEAREST EMERGENCY HELP" prominent CTA on map bottom-right */}
        {showNearestButton && (
          <div className="absolute bottom-4 right-4 z-20">
            <button
              type="button"
              onClick={findNearestEmergencyHelp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-600/30 transform hover:scale-105 active:scale-95 transition-all border border-rose-400"
            >
              <Navigation className="w-4 h-4 fill-white" />
              <span>FIND NEAREST EMERGENCY HELP</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Footer Privacy & Verification Guarantee */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Location Privacy Guarantee:</strong> Your location is used only to compute proximity to nearby emergency services and is never permanently stored without explicit consent.
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-[10px]">Data updated daily &bull; Source: Govt Health & Police Registries</span>
        </div>
      </div>
    </div>
  );
};
