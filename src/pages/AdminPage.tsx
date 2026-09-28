import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  User,
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Hospital,
  Activity,
  FileText,
  LogOut,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { EmergencyService, EmergencyAlert, LocalProblemReport, ServiceCategory, AlertSeverity } from '../types';

export const AdminPage: React.FC = () => {
  const {
    adminUser,
    adminLogin,
    adminLogout,
    services,
    alerts,
    reports,
    addNewService,
    deleteService,
    addNewAlert,
    deleteAlert,
    updateReportStatus
  } = useApp();

  // Login form state
  const [email, setEmail] = useState('admin@safeconnect.gov');
  const [password, setPassword] = useState('SafeAdmin#2026');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active admin tab
  const [adminTab, setAdminTab] = useState<'services' | 'alerts' | 'reports' | 'stats'>('stats');

  // Stats state from API
  const [stats, setStats] = useState<any>(null);

  // New Service Form
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<ServiceCategory>('hospital');
  const [newServiceSubCat, setNewServiceSubCat] = useState('Level-1 Emergency');
  const [newServicePhone, setNewServicePhone] = useState('');
  const [newServiceAddress, setNewServiceAddress] = useState('');
  const [newServiceCity, setNewServiceCity] = useState('New Delhi');
  const [newServiceArea, setNewServiceArea] = useState('South Extension');
  const [newServiceCapabilities, setNewServiceCapabilities] = useState('24/7 ICU, Trauma Bay, Blood Bank');

  // New Alert Form
  const [alertFormOpen, setAlertFormOpen] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertSeverity, setNewAlertSeverity] = useState<AlertSeverity>('Warning');
  const [newAlertDesc, setNewAlertDesc] = useState('');
  const [newAlertArea, setNewAlertArea] = useState('Central Zone, Metro City');
  const [newAlertSource, setNewAlertSource] = useState('State Emergency Operations Center');
  const [newAlertAction, setNewAlertAction] = useState('Stay indoors and avoid flooded roads.');
  const [isDemoAlert, setIsDemoAlert] = useState(false);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.warn('Failed to fetch admin stats:', e);
    }
  };

  useEffect(() => {
    if (adminUser) {
      fetchStats();
    }
  }, [adminUser, services.length, alerts.length, reports.length]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        adminLogin(data.user, data.token);
      } else {
        setLoginError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setLoginError('Could not reach backend authentication server.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newServicePhone || !newServiceAddress) return;

    await addNewService({
      service_name: newServiceName,
      category: newServiceCategory,
      sub_category: newServiceSubCat,
      phone: newServicePhone,
      address: newServiceAddress,
      state: 'Delhi',
      district: 'South Delhi',
      city: newServiceCity,
      area: newServiceArea,
      latitude: 28.57,
      longitude: 77.22,
      verification_status: 'verified',
      source: 'SafeConnect Command Center Admin Review',
      is_24x7: true,
      operating_status: 'Open 24/7',
      capabilities: newServiceCapabilities.split(',').map((c) => c.trim())
    });

    setServiceFormOpen(false);
    setNewServiceName('');
    setNewServicePhone('');
    setNewServiceAddress('');
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertTitle || !newAlertDesc || !newAlertArea) return;

    await addNewAlert({
      title: newAlertTitle,
      severity: newAlertSeverity,
      category: 'public_safety',
      description: newAlertDesc,
      affected_area: newAlertArea,
      source: newAlertSource,
      recommended_action: newAlertAction,
      expiry_time: new Date(Date.now() + 86400000).toISOString(),
      is_demo_data: isDemoAlert
    });

    setAlertFormOpen(false);
    setNewAlertTitle('');
    setNewAlertDesc('');
  };

  // If NOT logged in, show Admin Login view
  if (!adminUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white text-center">
            Authorized Personnel Login
          </h2>
          <p className="text-xs text-slate-500 text-center mt-1">
            Access portal control room, verify public health numbers, and review citizen reports.
          </p>

          {loginError && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-xs text-rose-700 dark:text-rose-300">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Admin Official Email
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Secure Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                Pre-configured Demo Credentials:
              </span>
              <p>Email: <code className="font-mono text-rose-600">admin@safeconnect.gov</code></p>
              <p>Password: <code className="font-mono text-rose-600">SafeAdmin#2026</code></p>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              {loggingIn ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar with Admin Profile & Logout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center font-black text-xl text-white">
            {adminUser.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black">{adminUser.name}</h2>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {adminUser.role.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {adminUser.email} • {adminUser.location}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={adminLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setAdminTab('stats')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              adminTab === 'stats'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            System Statistics
          </button>
          <button
            type="button"
            onClick={() => setAdminTab('services')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              adminTab === 'services'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Manage Services ({services.length})
          </button>
          <button
            type="button"
            onClick={() => setAdminTab('alerts')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              adminTab === 'alerts'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Manage Alerts ({alerts.length})
          </button>
          <button
            type="button"
            onClick={() => setAdminTab('reports')}
            className={`px-4 py-2 rounded-xl transition-colors ${
              adminTab === 'reports'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Review Citizen Reports ({reports.length})
          </button>
        </div>
      </div>

      {/* 1. STATS TAB */}
      {adminTab === 'stats' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Verified Services
              </span>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {stats?.totalServices || services.length}
              </p>
              <p className="text-xs text-emerald-600 mt-1 font-semibold">
                {stats?.verificationRate || 100}% Verified Compliance
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Live Alerts
              </span>
              <p className="text-3xl font-black text-amber-500 mt-1">
                {stats?.activeAlerts || alerts.length}
              </p>
              <p className="text-xs text-slate-400 mt-1">Meteorological & Civil</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Hazard Tickets
              </span>
              <p className="text-3xl font-black text-rose-600 mt-1">
                {reports.filter((r) => r.status === 'pending').length}
              </p>
              <p className="text-xs text-slate-400 mt-1">Require desk investigation</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Resolved Issues
              </span>
              <p className="text-3xl font-black text-emerald-600 mt-1">
                {reports.filter((r) => r.status === 'resolved').length}
              </p>
              <p className="text-xs text-slate-400 mt-1">Cleared from roadways</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. SERVICES TAB */}
      {adminTab === 'services' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Emergency Service Directory ({services.length})
            </h3>
            <button
              type="button"
              onClick={() => setServiceFormOpen(!serviceFormOpen)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{serviceFormOpen ? 'Close Form' : 'Add New Service'}</span>
            </button>
          </div>

          {serviceFormOpen && (
            <form
              onSubmit={handleCreateService}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-md"
            >
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Add New Emergency Facility
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Facility Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="E.g. District General Hospital Emergency Ward"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value as ServiceCategory)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="hospital">Hospital</option>
                    <option value="police">Police Station</option>
                    <option value="fire">Fire & Rescue</option>
                    <option value="ambulance">Ambulance Fleet</option>
                    <option value="pharmacy">24/7 Pharmacy</option>
                    <option value="blood_bank">Blood Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Direct Emergency Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={newServicePhone}
                    onChange={(e) => setNewServicePhone(e.target.value)}
                    placeholder="E.g. 011-26593677 or 108"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    City & Area
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newServiceCity}
                      onChange={(e) => setNewServiceCity(e.target.value)}
                      placeholder="City"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={newServiceArea}
                      onChange={(e) => setNewServiceArea(e.target.value)}
                      placeholder="Area"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Full Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={newServiceAddress}
                  onChange={(e) => setNewServiceAddress(e.target.value)}
                  placeholder="Street name, plot number, landmark..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Capabilities (Comma-separated)
                </label>
                <input
                  type="text"
                  value={newServiceCapabilities}
                  onChange={(e) => setNewServiceCapabilities(e.target.value)}
                  placeholder="E.g. Level-1 Trauma, Burn ICU, 24/7 Oxygen, Helipad"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                >
                  Save & Publish Service
                </button>
              </div>
            </form>
          )}

          {/* Table of services */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3.5">Facility Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Verified</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {services.map((s) => (
                    <tr key={s.service_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                        {s.service_name}
                      </td>
                      <td className="p-3.5 uppercase font-semibold text-rose-600">
                        {s.category}
                      </td>
                      <td className="p-3.5 font-mono">{s.phone}</td>
                      <td className="p-3.5 text-slate-500">{s.area}, {s.city}</td>
                      <td className="p-3.5 text-emerald-600 font-semibold">{s.last_verified}</td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => deleteService(s.service_id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                          title="Remove service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. ALERTS TAB */}
      {adminTab === 'alerts' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Civil Emergency Alerts ({alerts.length})
            </h3>
            <button
              type="button"
              onClick={() => setAlertFormOpen(!alertFormOpen)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{alertFormOpen ? 'Close Form' : 'Broadcast New Alert'}</span>
            </button>
          </div>

          {alertFormOpen && (
            <form
              onSubmit={handleCreateAlert}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-md"
            >
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                Create Public Safety Alert
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Alert Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAlertTitle}
                    onChange={(e) => setNewAlertTitle(e.target.value)}
                    placeholder="E.g. Flash Flood Advisory for Low-Lying Sectors"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Severity Level *
                  </label>
                  <select
                    value={newAlertSeverity}
                    onChange={(e) => setNewAlertSeverity(e.target.value as AlertSeverity)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Warning">Warning</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Affected Zone & Neighborhoods *
                </label>
                <input
                  type="text"
                  required
                  value={newAlertArea}
                  onChange={(e) => setNewAlertArea(e.target.value)}
                  placeholder="E.g. South Delhi, Yamuna River Banks"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newAlertDesc}
                  onChange={(e) => setNewAlertDesc(e.target.value)}
                  placeholder="Explain the hazard, expected duration, and danger..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Recommended Protective Action *
                </label>
                <input
                  type="text"
                  required
                  value={newAlertAction}
                  onChange={(e) => setNewAlertAction(e.target.value)}
                  placeholder="E.g. Move to upper levels, keep phones charged..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDemoAlert}
                    onChange={(e) => setIsDemoAlert(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded"
                  />
                  <span>Mark as [Demo Drill Data]</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Broadcast Alert Now
                </button>
              </div>
            </form>
          )}

          {/* List of alerts */}
          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.alert_id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {a.severity}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {a.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {a.affected_area} • Source: {a.source}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteAlert(a.alert_id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors shrink-0"
                  title="Remove alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. REPORTS TAB */}
      {adminTab === 'reports' && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Review Submitted Hazard Tickets ({reports.length})
          </h3>

          <div className="space-y-4">
            {reports.map((r) => (
              <div
                key={r.report_id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-600 text-sm">
                      {r.report_id}
                    </span>
                    <span className="font-bold text-xs uppercase text-slate-700 dark:text-slate-300">
                      {r.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status:</span>
                    <select
                      value={r.status}
                      onChange={(e) =>
                        updateReportStatus(r.report_id, e.target.value as LocalProblemReport['status'])
                      }
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="escalated">Escalated</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  {r.description}
                </p>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 gap-2">
                  <span>Location: <strong>{r.location}</strong></span>
                  <span>Reported by: <strong>{r.reporter_name || 'Anonymous'}</strong> ({r.contact_info || 'No phone'})</span>
                  <span>Date: {new Date(r.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
