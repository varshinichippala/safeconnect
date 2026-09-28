import React from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCard } from '../components/ServiceCard';
import { LocationPicker } from '../components/LocationPicker';
import {
  Shield,
  HeartHandshake,
  Baby,
  Laptop,
  PhoneCall,
  AlertTriangle,
  Lock,
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const PoliceSafetyPage: React.FC = () => {
  const { services, userLocation } = useApp();
  const policeStations = services.filter((s) => s.category === 'police');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <Shield className="w-4 h-4" />
          <span>Law Enforcement & Citizen Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Police Stations & Public Safety Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Direct lines to patrol stations, women distress cells, child emergency outreach, and cyber fraud reporting.
        </p>
      </div>

      {/* Quick SOS Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
            Immediate Police Control Room
          </span>
          <h2 className="text-2xl font-black mt-0.5">
            Dial 100 / 112 for Police Patrol
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            For active crimes in progress, suspicious activity, physical assault, or traffic accidents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:100"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-slate-950" />
            <span>Call 100 Police</span>
          </a>
          <a
            href="tel:112"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20"
          >
            Dial 112 SOS
          </a>
        </div>
      </div>

      {/* Specialized Safety Protection Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Women Safety */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Women Safety Helpline
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Confidential, round-the-clock emergency support, rapid PCR patrol escort, and legal counseling for women in distress.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Dedicated Women Police Desk in all stations</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero-FIR registration at any station</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Night drop and patrol support</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xl font-black text-rose-600">1091</span>
            <a
              href="tel:1091"
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
            >
              Call 1091
            </a>
          </div>
        </div>

        {/* Child Protection */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Baby className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Childline Emergency Outreach
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Toll-free 24/7 hotline for lost children, runaways, child abuse, and minors requiring shelter or immediate rescue.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>No 24-hr waiting requirement for missing children</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Immediate broadcast to railway & transit police</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Child Welfare Committee intervention</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xl font-black text-indigo-600">1098</span>
            <a
              href="tel:1098"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
            >
              Call 1098
            </a>
          </div>
        </div>

        {/* Cybercrime Reporting */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Cybercrime & Online Fraud
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Golden-hour reporting of financial scams, unauthorized card transactions, blackmail, or identity theft.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Call within 2 hours to freeze beneficiary account</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Official portal: cybercrime.gov.in</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Block debit/credit cards immediately</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xl font-black text-purple-600">1930</span>
            <a
              href="tel:1930"
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
            >
              Call 1930
            </a>
          </div>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker />

      {/* Police Stations Listing */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Verified Police Stations in {userLocation.city} ({policeStations.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policeStations.map((station) => (
            <ServiceCard key={station.service_id} service={station} />
          ))}
        </div>
      </div>
    </div>
  );
};
