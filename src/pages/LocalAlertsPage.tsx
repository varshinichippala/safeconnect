import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LocationPicker } from '../components/LocationPicker';
import {
  AlertTriangle,
  CloudRain,
  Flame,
  Wind,
  SunMedium,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldAlert,
  Info,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { AlertSeverity } from '../types';

export const LocalAlertsPage: React.FC = () => {
  const { alerts, userLocation } = useApp();
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'live' | 'demo'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter !== 'all' && a.severity !== severityFilter) {
      return false;
    }
    if (viewMode === 'live' && a.is_demo_data) {
      return false;
    }
    if (viewMode === 'demo' && !a.is_demo_data) {
      return false;
    }
    return true;
  });

  const getSeverityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'Warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Advisory':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Civil Protection Bulletins</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Local Emergency & Weather Alerts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Active meteorological advisories, municipal road closures, and civil disaster response alerts.
        </p>
      </div>

      {/* Critical Verification Notice Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Verification Standard:</strong> SafeConnect strictly enforces verified sourcing for all published advisories. Simulated preparedness exercises and mock drills are explicitly marked with the <span className="text-amber-300 font-bold">[DEMO DATA]</span> tag so citizens are never misled.
          </p>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker />

      {/* Filters: Severity & Live vs Demo */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        {/* Severity filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Severity:
          </span>
          {['all', 'Critical', 'Warning', 'Advisory'].map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                severityFilter === sev
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {sev === 'all' ? 'All Severities' : sev}
            </button>
          ))}
        </div>

        {/* Live vs Demo Filter */}
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'all'
                ? 'bg-rose-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Bulletins ({alerts.length})
          </button>
          <button
            type="button"
            onClick={() => setViewMode('live')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'live'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Live Official Alerts Only
          </button>
          <button
            type="button"
            onClick={() => setViewMode('demo')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'demo'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Preparedness Drills [Demo]
          </button>
        </div>
      </div>

      {/* Alerts Stream */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <article
              key={alert.alert_id}
              className={`rounded-3xl border p-6 bg-white dark:bg-slate-900 shadow-xs transition-all ${
                alert.severity === 'Critical'
                  ? 'border-l-8 border-l-rose-600 border-slate-200 dark:border-slate-800'
                  : alert.severity === 'Warning'
                  ? 'border-l-8 border-l-amber-500 border-slate-200 dark:border-slate-800'
                  : 'border-l-8 border-l-blue-500 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getSeverityBadge(
                        alert.severity
                      )}`}
                    >
                      {alert.severity} Level
                    </span>

                    {alert.is_demo_data ? (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Demo Drill Data
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Live Notice
                      </span>
                    )}

                    <span className="text-xs text-slate-400">
                      ID: {alert.alert_id}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                    {alert.title}
                  </h3>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 sm:text-right shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued: {new Date(alert.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                    Valid Until: {new Date(alert.expiry_time).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description Body */}
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              {/* Recommended Action Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs">
                <span className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Recommended Public Safety Action:
                </span>
                <p className="text-amber-950 dark:text-amber-100 font-medium leading-relaxed">
                  {alert.recommended_action}
                </p>
              </div>

              {/* Footer: Area Affected & Source */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Affected Zone: <strong>{alert.affected_area}</strong>
                </span>
                <span className="italic text-slate-400">
                  Issuing Source: {alert.source}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              No Active Alerts Under Current Filter
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your selected area has no active civil emergency warnings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
