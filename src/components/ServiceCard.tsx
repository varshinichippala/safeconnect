import React, { useState } from 'react';
import { EmergencyService } from '../types';
import {
  Hospital,
  Shield,
  Flame,
  Ambulance,
  Pill,
  Droplets,
  Phone,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Clock,
  Navigation2
} from 'lucide-react';

interface ServiceCardProps {
  service: EmergencyService & { distance?: number };
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [copied, setCopied] = useState(false);

  const getCategoryConfig = (category: EmergencyService['category']) => {
    switch (category) {
      case 'hospital':
        return {
          icon: Hospital,
          color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900',
          label: 'Hospital & Trauma'
        };
      case 'police':
        return {
          icon: Shield,
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900',
          label: 'Police & Safety'
        };
      case 'fire':
        return {
          icon: Flame,
          color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900',
          label: 'Fire & Rescue'
        };
      case 'ambulance':
        return {
          icon: Ambulance,
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900',
          label: 'Ambulance Unit'
        };
      case 'pharmacy':
        return {
          icon: Pill,
          color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-900',
          label: '24/7 Pharmacy'
        };
      case 'blood_bank':
        return {
          icon: Droplets,
          color: 'text-red-600 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900',
          label: 'Blood Bank'
        };
      default:
        return {
          icon: MapPin,
          color: 'text-slate-600 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
          label: 'Emergency Service'
        };
    }
  };

  const { icon: CategoryIcon, color, label } = getCategoryConfig(service.category);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openStreetMapUrl = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${service.latitude}%2C${service.longitude}#map=16/${service.latitude}/${service.longitude}`;

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Header row: category & operating status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl border ${color}`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {label}
              </span>
              {service.sub_category && (
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {service.sub_category}
                </p>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
              <Clock className="w-3 h-3" />
              {service.operating_status || 'Open 24/7'}
            </span>
            {typeof service.distance === 'number' && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1 flex items-center justify-end gap-1">
                <Navigation2 className="w-3 h-3 fill-rose-600 dark:fill-rose-400" />
                {service.distance} km away
              </p>
            )}
          </div>
        </div>

        {/* Service Name & Location */}
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
          {service.service_name}
        </h3>

        <div className="flex items-start gap-2 mt-2 text-xs text-slate-600 dark:text-slate-400">
          <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
          <p className="line-clamp-2">
            {service.address}
          </p>
        </div>

        {/* Capabilities or Blood Types */}
        {service.capabilities && service.capabilities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {service.capabilities.map((cap, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {cap}
              </span>
            ))}
          </div>
        )}

        {service.blood_types_available && service.blood_types_available.length > 0 && (
          <div className="mt-3 p-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900 text-xs">
            <span className="font-bold text-red-800 dark:text-red-300 block mb-1">
              Available Blood Units:
            </span>
            <div className="flex flex-wrap gap-1">
              {service.blood_types_available.map((b) => (
                <span
                  key={b}
                  className="font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 text-[10px] shadow-xs"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {service.notes && (
          <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 italic">
            Note: {service.notes}
          </p>
        )}
      </div>

      {/* Footer: Phone Call, Directions & Verification Source */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${service.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {service.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopy(service.phone)}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Copy Phone Number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <a
            href={openStreetMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400"
          >
            <span>Directions</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Verification Metadata Footnote */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-50 dark:border-slate-800/60">
          <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Verified: {service.last_verified}
          </span>
          <span className="truncate max-w-[170px]" title={service.source}>
            Source: {service.source}
          </span>
        </div>
      </div>
    </article>
  );
};
