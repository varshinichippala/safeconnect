import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Upload,
  X,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  ShieldCheck,
  Info
} from 'lucide-react';
import { ProblemCategory, LocalProblemReport } from '../types';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({ isOpen, onClose }) => {
  const { userLocation, addProblemReport } = useApp();

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

  if (!isOpen) return null;

  const categories: { id: ProblemCategory; label: string; icon: string }[] = [
    { id: 'road_accident', label: 'Road Traffic Accident', icon: '🚗' },
    { id: 'fire', label: 'Fire Outbreak / Smoke Hazard', icon: '🔥' },
    { id: 'water_leakage', label: 'Water Main Break / Pipe Rupture', icon: '💧' },
    { id: 'fallen_tree', label: 'Fallen Tree / Road Obstruction', icon: '🌳' },
    { id: 'electrical_hazard', label: 'Damaged Electrical Equipment / Live Wire', icon: '⚡' },
    { id: 'blocked_road', label: 'Blocked Route / Heavy Debris', icon: '🚧' },
    { id: 'unsafe_area', label: 'Unsafe Public Area / Broken Lighting', icon: '⚠️' },
    { id: 'medical_hazard', label: 'Hazardous Chemical / Biological Spill', icon: '☣️' },
    { id: 'other', label: 'Other Public Safety Issue', icon: '📋' }
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

  const handleReset = () => {
    setSubmittedReport(null);
    setDescription('');
    setImagePreview(null);
    setContactInfo('');
    setReporterName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Report a Local Emergency / Hazard
              </h3>
              <p className="text-xs text-slate-300">
                Community hazard submission & administrative review tracking
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Immediate Emergency Warning Box */}
        <div className="bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-900 p-4 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>
            <strong>Important Safety Notice:</strong> This reporting tool is for community hazard tracking and administrative queue review. It does <strong>not</strong> instantly dispatch first responders. For active fires, ongoing crimes, or life-threatening injuries, call <strong>112 / 108 / 101</strong> immediately.
          </p>
        </div>

        {/* Form Body or Success Confirmation */}
        {submittedReport ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">
                Report Logged Successfully
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your hazard report has been recorded in the local portal database for review.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-slate-500">Tracking Ticket ID:</span>
                <span className="font-mono font-extrabold text-rose-600 dark:text-rose-400">
                  {submittedReport.report_id}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
                  {submittedReport.category.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="font-bold text-slate-500">Location:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {submittedReport.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                  <Clock className="w-3 h-3" /> Under Review
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Note: Submitted reports are verified by municipal desk coordinators before publication on the live map.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
            >
              Done & Return to Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Problem Category *
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
                Location & Landmarks *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="Street name, landmark, intersection, or GPS pin..."
                  className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Detailed Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened, any immediate hazards, blocked lanes, or assistance needed..."
                className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Upload Photo Evidence (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-rose-500 rounded-xl p-3 text-xs text-slate-600 dark:text-slate-300 transition-colors">
                  <Upload className="w-4 h-4 text-slate-400" />
                  <span>Choose file or take picture</span>
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

            {/* Reporter Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="E.g. Resident / Citizen"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Phone or Email (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="For official verification"
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5"
              >
                {submitting ? 'Submitting Report...' : 'Submit Hazard Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
