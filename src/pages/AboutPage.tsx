import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  HeartPulse,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <ShieldAlert className="w-4 h-4" />
          <span>About The Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          SafeConnect: Local Emergency Information Portal
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 mt-2 font-medium">
          “Quick Information When Every Second Matters”
        </p>
      </div>

      {/* Main Mission */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Our Primary Objective
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          In high-stress situations—whether an acute medical collapse, high-rise fire, severe traffic collision, or monsoon flood—citizens need instantaneous, unambiguous access to verified contact numbers and operating medical services. Searching through cluttered search engine results or unverified business listings costs precious golden minutes.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>SafeConnect</strong> was designed with extreme clarity in mind: high contrast, zero unnecessary clutter, large touch targets for elderly citizens or panicked hands, and strictly verified public records.
        </p>
      </section>

      {/* Verification Protocol & Sources of Truth */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <span>Verification Protocol & Sourcing</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          We strictly prohibit fabricated phone numbers or hallucinated hospitals. Every facility on SafeConnect undergoes a structured verification process:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
            <strong className="text-slate-900 dark:text-white font-bold block text-sm">
              Official Department Registries
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Cross-checked against the Directorate General of Health Services (DGHS), State Police Headquarters, Fire Services Commissions, and National Disaster Management Authority (NDMA).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
            <strong className="text-slate-900 dark:text-white font-bold block text-sm">
              Periodic Telephonic Auditing
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Each primary trauma center and emergency room hotline has an explicit "Last Verified" date stamped on the card. Outdated entries are flagged for administrative review.
            </p>
          </div>
        </div>
      </section>

      {/* Essential Disclaimer */}
      <section className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl border border-rose-200 dark:border-rose-900 p-6 sm:p-8 text-xs text-rose-900 dark:text-rose-200 space-y-3">
        <h3 className="font-extrabold text-base text-rose-950 dark:text-rose-100">
          Emergency Disclaimer & Legal Notice
        </h3>
        <p className="leading-relaxed">
          SafeConnect is an auxiliary public information tool designed to assist citizens in locating appropriate emergency infrastructure. <strong>SafeConnect does NOT replace official public safety answering points (PSAPs) or government dispatchers.</strong>
        </p>
        <p className="leading-relaxed">
          If you or someone around you is in an active life-or-death situation, you must contact official emergency services directly by telephone (<strong>112 / 108 / 100 / 101</strong>) without waiting for web responses.
        </p>
      </section>
    </div>
  );
};
