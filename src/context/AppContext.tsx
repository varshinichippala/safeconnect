import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EmergencyService,
  EmergencyAlert,
  LocalProblemReport,
  UserLocation,
  AdminUser
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_ALERTS,
  INITIAL_REPORTS
} from '../data/emergencyData';
import { SupportedLanguage, TRANSLATIONS, Translations } from '../data/translations';

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  userLocation: UserLocation;
  setUserLocation: (loc: UserLocation) => void;
  detectUserLocation: () => Promise<void>;
  locationLoading: boolean;
  locationError: string | null;
  stopSharingLocation: () => void;
  searchLocationByQuery: (query: string) => Promise<boolean>;
  findNearestEmergencyHelp: () => Promise<void>;
  locationAccuracyMeters?: number;
  services: EmergencyService[];
  alerts: EmergencyAlert[];
  reports: LocalProblemReport[];
  refreshData: () => Promise<void>;
  savedContactNumbers: string[];
  toggleSaveContact: (number: string) => void;
  adminUser: AdminUser | null;
  adminToken: string | null;
  adminLogin: (user: AdminUser, token: string) => void;
  adminLogout: () => void;
  addProblemReport: (report: Partial<LocalProblemReport>) => Promise<LocalProblemReport>;
  addNewService: (service: Partial<EmergencyService>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  addNewAlert: (alert: Partial<EmergencyAlert>) => Promise<boolean>;
  deleteAlert: (id: string) => Promise<boolean>;
  updateReportStatus: (id: string, status: LocalProblemReport['status']) => Promise<boolean>;
  activeSosCategory: string | null;
  setActiveSosCategory: (cat: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('home');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('safeconnect_dark') === 'true';
  });

  const [userLocation, setUserLocation] = useState<UserLocation>({
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    area: 'Maharani Peta',
    pincode: '530002',
    formattedAddress: 'Maharani Peta, Visakhapatnam, Andhra Pradesh',
    latitude: 17.7088,
    longitude: 83.3039,
    accuracyMeters: 25,
    isGpsActive: false,
    isManualOverride: false
  });

  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [services, setServices] = useState<EmergencyService[]>(INITIAL_SERVICES);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(INITIAL_ALERTS);
  const [reports, setReports] = useState<LocalProblemReport[]>(INITIAL_REPORTS);

  const [savedContactNumbers, setSavedContactNumbers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('safeconnect_saved_contacts');
      return saved ? JSON.parse(saved) : ['112', '108', '100', '101'];
    } catch {
      return ['112', '108', '100', '101'];
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const user = localStorage.getItem('safeconnect_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('safeconnect_admin_token') || null;
  });

  const [activeSosCategory, setActiveSosCategory] = useState<string | null>(null);

  // Client-side Haversine Distance helper
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  // Compute distances for services based on active coordinates and sort by distance
  const sortAndAugmentServices = (serviceList: EmergencyService[], lat?: number, lng?: number) => {
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
      return serviceList;
    }
    return serviceList
      .map((s) => ({
        ...s,
        distance: calculateDistanceKm(lat, lng, s.latitude, s.longitude)
      }))
      .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('safeconnect_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('safeconnect_dark', 'false');
    }
  }, [darkMode]);

  // Save contacts in localStorage
  useEffect(() => {
    localStorage.setItem('safeconnect_saved_contacts', JSON.stringify(savedContactNumbers));
  }, [savedContactNumbers]);

  const toggleSaveContact = (number: string) => {
    setSavedContactNumbers((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  };

  // Fetch initial data from Express backend
  const refreshData = async () => {
    try {
      const coordsQuery = userLocation.latitude && userLocation.longitude
        ? `&lat=${userLocation.latitude}&lng=${userLocation.longitude}`
        : '';
      const [resServices, resAlerts, resReports] = await Promise.all([
        fetch(`/api/services?city=${encodeURIComponent(userLocation.city)}${coordsQuery}`).then((r) => r.json()),
        fetch('/api/alerts').then((r) => r.json()),
        fetch('/api/reports').then((r) => r.json())
      ]);

      if (resServices?.success && resServices.data) {
        setServices(sortAndAugmentServices(resServices.data, userLocation.latitude, userLocation.longitude));
      } else {
        setServices(sortAndAugmentServices(INITIAL_SERVICES, userLocation.latitude, userLocation.longitude));
      }
      if (resAlerts?.success && resAlerts.data) {
        setAlerts(resAlerts.data);
      }
      if (resReports?.success && resReports.data) {
        setReports(resReports.data);
      }
    } catch (e) {
      console.warn('Backend fetch fallback to initial data:', e);
      setServices(sortAndAugmentServices(INITIAL_SERVICES, userLocation.latitude, userLocation.longitude));
    }
  };

  useEffect(() => {
    refreshData();
  }, [userLocation.city, userLocation.latitude, userLocation.longitude]);

  // Detect user GPS location using HTML5 Geolocation API with reverse geocoding
  const detectUserLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy || 15);

          let detectedCountry = 'India';
          let detectedState = 'Andhra Pradesh';
          let detectedDistrict = 'Visakhapatnam';
          let detectedCity = 'Visakhapatnam';
          let detectedArea = 'Current GPS Location';
          let detectedPincode = '';
          let formattedAddress = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;

          try {
            // Reverse geocode via OpenStreetMap Nominatim with 3s timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3200);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
              {
                signal: controller.signal,
                headers: { 'Accept-Language': 'en' }
              }
            );
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              const addr = data.address || {};
              detectedCountry = addr.country || 'India';
              detectedState = addr.state || detectedState;
              detectedDistrict = addr.state_district || addr.county || addr.district || addr.city || detectedDistrict;
              detectedCity = addr.city || addr.town || addr.municipality || addr.village || addr.county || detectedCity;
              detectedArea = addr.suburb || addr.neighbourhood || addr.residential || addr.road || detectedCity;
              detectedPincode = addr.postcode || '';
              formattedAddress = data.display_name || `${detectedArea}, ${detectedCity}, ${detectedState}`;
            }
          } catch {
            // Intelligent geometric proximity fallback among verified hubs
            const verifiedHubs = [
              { city: 'Visakhapatnam', state: 'Andhra Pradesh', district: 'Visakhapatnam', area: 'Maharani Peta', lat: 17.7088, lng: 83.3039, pin: '530002' },
              { city: 'Vijayawada', state: 'Andhra Pradesh', district: 'Krishna / NTR', area: 'Governorpet', lat: 16.5133, lng: 80.6241, pin: '520002' },
              { city: 'Hyderabad', state: 'Telangana', district: 'Hyderabad', area: 'Banjara Hills', lat: 17.4156, lng: 78.4358, pin: '500034' },
              { city: 'New Delhi', state: 'Delhi', district: 'New Delhi', area: 'Connaught Place', lat: 28.6304, lng: 77.2177, pin: '110001' },
              { city: 'Mumbai', state: 'Maharashtra', district: 'Mumbai City', area: 'Churchgate', lat: 18.9322, lng: 72.8264, pin: '400001' },
              { city: 'Bengaluru', state: 'Karnataka', district: 'Bengaluru Urban', area: 'Indiranagar', lat: 12.9784, lng: 77.6408, pin: '560038' }
            ];

            let bestHub = verifiedHubs[0];
            let bestDist = 999999;
            for (const hub of verifiedHubs) {
              const d = calculateDistanceKm(lat, lng, hub.lat, hub.lng);
              if (d < bestDist) {
                bestDist = d;
                bestHub = hub;
              }
            }

            detectedCity = bestHub.city;
            detectedState = bestHub.state;
            detectedDistrict = bestHub.district;
            detectedArea = bestHub.area;
            detectedPincode = bestHub.pin;
            formattedAddress = `${detectedArea}, ${detectedCity} (GPS Near ${bestDist} km)`;
          }

          const newLocation: UserLocation = {
            country: detectedCountry,
            state: detectedState,
            district: detectedDistrict,
            city: detectedCity,
            area: detectedArea,
            pincode: detectedPincode,
            formattedAddress,
            latitude: lat,
            longitude: lng,
            accuracyMeters: accuracy,
            isGpsActive: true,
            isManualOverride: false
          };

          setUserLocation(newLocation);
          setServices((prev) => sortAndAugmentServices(prev, lat, lng));
          setLocationLoading(false);
          resolve();
        },
        (error) => {
          console.warn('Geolocation error:', error);
          let errMsg = 'Location permission was denied or unavailable. You can search or select your area manually.';
          if (error.code === error.TIMEOUT) {
            errMsg = 'Location request timed out. Please try again or select manually.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errMsg = 'Position unavailable. Please search by City or PIN code.';
          }
          setLocationError(errMsg);
          setLocationLoading(false);
          resolve();
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    });
  };

  // Stop sharing location (privacy guarantee)
  const stopSharingLocation = () => {
    setUserLocation({
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      city: 'Visakhapatnam',
      area: 'Maharani Peta',
      pincode: '530002',
      formattedAddress: 'Manual Location Selected (GPS Inactive)',
      latitude: 17.7088,
      longitude: 83.3039,
      accuracyMeters: undefined,
      isGpsActive: false,
      isManualOverride: true
    });
    setLocationError(null);
  };

  // Search location by text: city, PIN code, area
  const searchLocationByQuery = async (queryText: string): Promise<boolean> => {
    const q = queryText.trim().toLowerCase();
    if (!q) return false;

    setLocationLoading(true);
    setLocationError(null);

    // 1. Check known PIN code lookup first (e.g. 530001, 520001, 500001, etc.)
    const { VERIFIED_PIN_CODES } = await import('../data/emergencyData');
    if (VERIFIED_PIN_CODES[q]) {
      const match = VERIFIED_PIN_CODES[q];
      const newLoc: UserLocation = {
        country: match.country,
        state: match.state,
        district: match.district,
        city: match.city,
        area: match.area,
        pincode: match.pincode,
        formattedAddress: `${match.area}, ${match.city}, ${match.state} - ${match.pincode}`,
        latitude: match.latitude,
        longitude: match.longitude,
        accuracyMeters: 50,
        isGpsActive: false,
        isManualOverride: true
      };
      setUserLocation(newLoc);
      setServices((prev) => sortAndAugmentServices(prev, match.latitude, match.longitude));
      setLocationLoading(false);
      return true;
    }

    // 2. Check known city names in VERIFIED_PIN_CODES
    const pinMatch = Object.values(VERIFIED_PIN_CODES).find(
      (v) => v.city.toLowerCase() === q || v.area.toLowerCase().includes(q)
    );
    if (pinMatch) {
      const newLoc: UserLocation = {
        country: pinMatch.country,
        state: pinMatch.state,
        district: pinMatch.district,
        city: pinMatch.city,
        area: pinMatch.area,
        pincode: pinMatch.pincode,
        formattedAddress: `${pinMatch.area}, ${pinMatch.city}, ${pinMatch.state}`,
        latitude: pinMatch.latitude,
        longitude: pinMatch.longitude,
        accuracyMeters: 100,
        isGpsActive: false,
        isManualOverride: true
      };
      setUserLocation(newLoc);
      setServices((prev) => sortAndAugmentServices(prev, pinMatch.latitude, pinMatch.longitude));
      setLocationLoading(false);
      return true;
    }

    // 3. Fallback to OpenStreetMap Nominatim search
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryText)}&format=json&addressdetails=1&limit=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      if (res.ok) {
        const results = await res.json();
        if (results && results.length > 0) {
          const item = results[0];
          const addr = item.address || {};
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const newLoc: UserLocation = {
            country: addr.country || 'India',
            state: addr.state || 'Detected State',
            district: addr.state_district || addr.county || addr.city || '',
            city: addr.city || addr.town || addr.municipality || addr.village || item.display_name.split(',')[0],
            area: addr.suburb || addr.neighbourhood || addr.road || item.display_name.split(',')[0],
            pincode: addr.postcode || '',
            formattedAddress: item.display_name,
            latitude: lat,
            longitude: lng,
            accuracyMeters: 150,
            isGpsActive: false,
            isManualOverride: true
          };
          setUserLocation(newLoc);
          setServices((prev) => sortAndAugmentServices(prev, lat, lng));
          setLocationLoading(false);
          return true;
        }
      }
    } catch (e) {
      console.warn('Geocoding search failed:', e);
    }

    setLocationError(`Could not find "${queryText}". Please try "Visakhapatnam", "530001", "Vijayawada", or "Hyderabad".`);
    setLocationLoading(false);
    return false;
  };

  // Large Emergency Action: "FIND NEAREST EMERGENCY HELP"
  const findNearestEmergencyHelp = async (): Promise<void> => {
    // If GPS not yet active, attempt quick detection
    if (!userLocation.isGpsActive && navigator.geolocation) {
      await detectUserLocation();
    }
    // Navigate immediately to Nearby Services page
    setActivePage('services');
  };

  const adminLogin = (user: AdminUser, token: string) => {
    setAdminUser(user);
    setAdminToken(token);
    localStorage.setItem('safeconnect_admin_user', JSON.stringify(user));
    localStorage.setItem('safeconnect_admin_token', token);
  };

  const adminLogout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('safeconnect_admin_user');
    localStorage.removeItem('safeconnect_admin_token');
  };

  const addProblemReport = async (reportData: Partial<LocalProblemReport>): Promise<LocalProblemReport> => {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reportData,
          city: userLocation.city,
          area: userLocation.area
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setReports((prev) => [data.data, ...prev]);
        return data.data;
      }
    } catch (e) {
      console.warn('Offline report submission fallback:', e);
    }

    const fallbackReport: LocalProblemReport = {
      report_id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: reportData.category || 'other',
      description: reportData.description || '',
      location: reportData.location || userLocation.area,
      city: userLocation.city,
      area: userLocation.area,
      image: reportData.image,
      created_at: new Date().toISOString(),
      status: 'pending',
      contact_info: reportData.contact_info,
      reporter_name: reportData.reporter_name || 'Community Member',
      priority: 'Medium'
    };
    setReports((prev) => [fallbackReport, ...prev]);
    return fallbackReport;
  };

  const addNewService = async (serviceData: Partial<EmergencyService>): Promise<boolean> => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setServices((prev) => [data.data, ...prev]);
        return true;
      }
    } catch (e) {
      console.warn('Failed to add service on server:', e);
    }
    return false;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.service_id !== id));
        return true;
      }
    } catch (e) {
      console.warn('Delete service failed:', e);
    }
    setServices((prev) => prev.filter((s) => s.service_id !== id));
    return true;
  };

  const addNewAlert = async (alertData: Partial<EmergencyAlert>): Promise<boolean> => {
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAlerts((prev) => [data.data, ...prev]);
        return true;
      }
    } catch (e) {
      console.warn('Failed to add alert on server:', e);
    }
    return false;
  };

  const deleteAlert = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAlerts((prev) => prev.filter((a) => a.alert_id !== id));
        return true;
      }
    } catch (e) {
      console.warn('Delete alert failed:', e);
    }
    setAlerts((prev) => prev.filter((a) => a.alert_id !== id));
    return true;
  };

  const updateReportStatus = async (id: string, status: LocalProblemReport['status']): Promise<boolean> => {
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setReports((prev) =>
          prev.map((r) => (r.report_id === id ? { ...r, status } : r))
        );
        return true;
      }
    } catch (e) {
      console.warn('Update report status failed:', e);
    }
    setReports((prev) =>
      prev.map((r) => (r.report_id === id ? { ...r, status } : r))
    );
    return true;
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        language,
        setLanguage,
        t,
        darkMode,
        setDarkMode,
        userLocation,
        setUserLocation,
        detectUserLocation,
        locationLoading,
        locationError,
        stopSharingLocation,
        searchLocationByQuery,
        findNearestEmergencyHelp,
        services,
        alerts,
        reports,
        refreshData,
        savedContactNumbers,
        toggleSaveContact,
        adminUser,
        adminToken,
        adminLogin,
        adminLogout,
        addProblemReport,
        addNewService,
        deleteService,
        addNewAlert,
        deleteAlert,
        updateReportStatus,
        activeSosCategory,
        setActiveSosCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
