import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Upload,
  X,
  CheckCircle,
  MapPin,
  Clock,
  Phone,
  User,
  ShieldCheck,
  Info,
  Calendar,
  Filter
} from 'lucide-react';
import { ProblemCategory, LocalProblemReport } from '../types';

export const ReportProblemPage: React.FC = () => {
  const { userLocation, reports, addProblemReport } = useApp();

  const [category, setCategory] = useState<ProblemCategory>('road_accident');
  const [locationText, setLocationText] = useState(
    `${userLocation.area}, ${userLocation.city}`
  );
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<LocalProblemReport | null>(null);

  const categories: { id: ProblemCategory; label: string; icon: string }[] = [
    { id: 'road_accident', label: 'Road Traffic Accident', icon: '🚗' },
    { id: 'fire', label: 'Fire Outbreak / Smoke Hazard', icon: '🔥' },
    { id: 'water_leakage', label: 'Water Leakage / Pipe Burst', icon: '💧' },
    { id: 'fallen_tree', label: 'Fallen Tree / Branch Obstructing Route', icon: '🌳' },
    { id: 'electrical_hazard', label: 'Damaged Electrical Equipment / Sparking Transformer', icon: '⚡' },
    { id: 'blocked_road', label: 'Blocked Road / Construction Debris', icon: '🚧' },
    { id: 'unsafe_area', label: 'Unsafe Public Area / Streetlight Failure', icon: '⚠️' },
    { id: 'medical_hazard', label: 'Chemical / Toxic Fume Spill', icon: '☣️' },
    { id: 'other', label: 'Other Public Safety Hazard', icon: '📋' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !locationText.trim()) return;

    setSubmitting(true);
    const result = await addProblemReport({
      category,
      description,
      location: locationText,
      contact_info: contactInfo,
      reporter_name: reporterName,
      image: imagePreview || undefined
    });

    setSubmittedReport(result);
    setSubmitting(false);
  };

  const getStatusBadge = (status: LocalProblemReport['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
      case 'escalated':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Civil Hazard Reporting</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          Report a Local Emergency or Hazard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Report water main breaks, fallen trees, downed wires, blocked streets, or dangerous public infrastructure for local coordination.
        </p>
      </div>

      {/* Critical Mandatory Disclaimer */}
      <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-2xl p-5 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <h4 className="font-bold text-sm text-rose-950 dark:text-rose-100">
            Emergency Dispatch Notice:
          </h4>
          <p className="mt-0.5">
            This citizen portal logs hazard tickets for community awareness and municipal administrative review. <strong>It is NOT an instantaneous emergency 911/112 dispatcher.</strong> If there is an active fire, medical trauma, violence, or live downed high-voltage line, call <strong>112, 108, or 101</strong> immediately from your telephone.
          </p>
        </div>
      </div>

      {/* Grid: Submission Form (Left) & Community Report Tracker (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          {submittedReport ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Hazard Report Confirmed
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your ticket has been assigned a tracking ID and stored for administrative review.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="font-bold text-slate-500">Tracking Ticket:</span>
                  <span className="font-mono font-black text-rose-600 dark:text-rose-400">
                    {submittedReport.report_id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="font-bold text-slate-500">Incident Category:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">
                    {submittedReport.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="font-bold text-slate-500">Incident Location:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {submittedReport.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Current Status:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Under Review
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmittedReport(null);
                  setDescription('');
                  setImagePreview(null);
                  setContactInfo('');
                  setReporterName('');
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold text-xs"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                New Hazard Submission
              </h3>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Hazard Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProblemCategory)}
                  className="w-full text-xs sm:text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Exact Location / Street / Landmarks *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    placeholder="E.g. Near Metro Pillar 140, Opposite City Hospital..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Hazard Description & Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the severity, whether vehicles are blocked, live wires, water depth, or immediate danger..."
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Photo Evidence (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-rose-500 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 transition-colors">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>Upload image from phone or computer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                      <img
                        src={imagePreview}
                        alt="Hazard preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-0 right-0 bg-rose-600 text-white p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Reporter Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Community Member"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone / Email (Optional)
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="In case municipal desk follows up"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
                >
                  {submitting ? 'Submitting Hazard...' : 'Submit Community Hazard Ticket'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Community Reports Tracker Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>Recent Community Hazard Tickets ({reports.length})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Public tracking of reported issues in your area.
            </p>

            <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {reports.map((r) => (
                <div
                  key={r.report_id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                      {r.report_id}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 dark:text-white">
                    {r.category.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">
                    {r.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="truncate max-w-[150px]">{r.location}</span>
                    <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
