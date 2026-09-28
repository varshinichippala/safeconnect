import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck, AlertTriangle } from 'lucide-react';

export const PrivacySafetyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <Lock className="w-4 h-4" />
          <span>Data Governance & Ethics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Privacy Policy & Safety Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Strict minimal-data collection standards, privacy-first geolocation handling, and citizen protection.
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Our Data Privacy Commitments
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <EyeOff className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-bold">
                1. No Unnecessary Personal Data Collection
              </strong>
              <p className="mt-1 leading-relaxed">
                SafeConnect does not require user registration or account creation to view emergency numbers, find nearby trauma centers, or read disaster guides. Access to emergency data is completely anonymous and unrestricted.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-bold">
                2. Client-Side Geolocation Only
              </strong>
              <p className="mt-1 leading-relaxed">
                When you click "Use My Location", your coordinates are calculated inside your device's browser exclusively to compute distance to nearby hospitals and police stations. Your GPS coordinates are never permanently logged on our remote servers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <UserCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-bold">
                3. Protection of Hazard Report Submissions
              </strong>
              <p className="mt-1 leading-relaxed">
                Hazard reports (e.g. fallen trees, water leaks) may be submitted anonymously. If you optionally provide contact information, it is visible only to authorized municipal dispatch administrators for ticket verification and is never sold or shared.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Sourcing Guarantee */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-amber-400">
          Anti-Fabrication Guarantee
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          SafeConnect enforces a strict rule: <strong>Never fabricate emergency numbers, hospitals, police stations, or alerts.</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In cases where simulated drill data is used for testing community sirens or evacuation drills, it is visibly and permanently stamped with <span className="font-bold text-amber-300">[DEMO DATA]</span> to prevent panic or confusion.
        </p>
      </section>
    </div>
  );
};
