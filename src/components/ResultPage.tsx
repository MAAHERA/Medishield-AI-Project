import React, { useState } from 'react';
import { ScreeningReport, PageId } from '../types/medishield';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Camera,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Building,
  Calendar,
  Hash,
  Pill,
  ExternalLink,
  Shield,
} from 'lucide-react';

interface ResultPageProps {
  report: ScreeningReport;
  onNavigate: (page: PageId) => void;
  onScanAnother: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  report,
  onNavigate,
  onScanAnother,
}) => {
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const {
    extractedDetails,
    warningSigns,
    screeningResult,
    whyResult,
    warnings,
    recommendedAction,
    imageUrl,
  } = report;

  // Visual styling mapped to the 3 exact screening results
  const resultConfig = {
    'LOW CONCERN': {
      label: 'LOW CONCERN',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      headerBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white',
      accentColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      lightBg: 'bg-emerald-50/60',
      icon: ShieldCheck,
      summarySubtitle: 'Visible packaging markings appear standard and legible.',
    },
    VERIFY: {
      label: 'VERIFY',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
      headerBg: 'bg-gradient-to-br from-amber-600 to-orange-600 text-white',
      accentColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      lightBg: 'bg-amber-50/60',
      icon: AlertTriangle,
      summarySubtitle: 'Certain packaging details are unclear, missing or inconsistent. Verification recommended.',
    },
    'HIGH CONCERN': {
      label: 'HIGH CONCERN',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-300',
      headerBg: 'bg-gradient-to-br from-rose-700 to-red-800 text-white',
      accentColor: 'text-rose-700',
      borderColor: 'border-rose-200',
      lightBg: 'bg-rose-50/60',
      icon: AlertOctagon,
      summarySubtitle: 'Significant packaging irregularities, damaged packaging, or severe print anomalies observed.',
    },
  }[screeningResult];

  const ResultIcon = resultConfig.icon;

  const handleCopySummary = () => {
    const textToCopy = `MEDISHIELD AI PRELIMINARY SCREENING REPORT
==================================================
MEDICINE: ${extractedDetails.medicineName} ${extractedDetails.strength}
BATCH: ${extractedDetails.batchNumber}
EXPIRY: ${extractedDetails.expiryDate}
MANUFACTURING DATE: ${extractedDetails.manufacturingDate}
MANUFACTURER: ${extractedDetails.manufacturer}

SCREENING RESULT: ${screeningResult}

WHY THIS RESULT:
${whyResult}

${warnings.length > 0 ? `WARNING:\n${warnings.join('\n')}\n` : ''}
RECOMMENDED ACTION:
${recommendedAction}

IMPORTANT SAFETY REQUIREMENT:
${report.safetyDisclaimer}
==================================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Normal
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Check Needed
          </span>
        );
      case 'fail':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Irregularity
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-24 max-w-2xl mx-auto px-4 sm:px-6 pt-3">
      {/* Primary Result Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Color-Coded Header with Prominent Result */}
        <div className={`p-5 sm:p-6 ${resultConfig.headerBg}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                Preliminary Screening Result
              </span>
              <div className="flex items-center gap-2.5">
                <ResultIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {screeningResult}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md pt-1">
                {resultConfig.summarySubtitle}
              </p>
            </div>

            {imageUrl && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0 shadow-inner">
                <img
                  src={imageUrl}
                  alt="Scanned medicine thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Why Result Explanatory Section */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="space-y-1.5 bg-slate-50 border border-slate-200/90 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Why the Package Received This Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {whyResult}
            </p>
          </div>

          {/* Warnings Section (if any) */}
          {warnings.length > 0 && (
            <div className="space-y-2 bg-amber-50/80 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Warning Signs Identified</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                {warnings.map((warn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">·</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Action */}
          <div className="space-y-1.5 bg-teal-50/70 border border-teal-200 rounded-xl p-4">
            <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4 text-teal-700" />
              <span>Recommended Action</span>
            </div>
            <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
              {recommendedAction}
            </p>
          </div>

          {/* Extracted Visible Medicine Details Grid */}
          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Extracted Visible Packaging Details
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Pill className="w-3 h-3 text-slate-400" />
                  Medicine Name
                </span>
                <p className="font-bold text-slate-900 text-sm truncate">
                  {extractedDetails.medicineName}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Strength / Dosage
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {extractedDetails.strength}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3 text-slate-400" />
                  Batch Number
                </span>
                <p className="font-mono font-bold text-slate-900 text-sm">
                  {extractedDetails.batchNumber}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Expiry Date
                </span>
                <p className="font-bold text-slate-900 text-sm">
                  {extractedDetails.expiryDate}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Manufacturing Date
                </span>
                <p className="font-medium text-slate-800 text-xs">
                  {extractedDetails.manufacturingDate}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Building className="w-3 h-3 text-slate-400" />
                  Manufacturer
                </span>
                <p className="font-medium text-slate-800 text-xs truncate">
                  {extractedDetails.manufacturer}
                </p>
              </div>
            </div>
          </div>

          {/* Packaging Warning Signs Detailed Evaluation */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Packaging Warning Signs Evaluated
              </h3>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
              <div className="p-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900">1. Image Quality</span>
                  <p className="text-slate-500">{warningSigns.imageQuality.detail}</p>
                </div>
                <div>{getStatusBadge(warningSigns.imageQuality.status)}</div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900">2. Printing Clarity & Typography</span>
                  <p className="text-slate-500">{warningSigns.printClarity.detail}</p>
                </div>
                <div>{getStatusBadge(warningSigns.printClarity.status)}</div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900">3. Missing Important Information</span>
                  <p className="text-slate-500">{warningSigns.essentialInfoCompleteness.detail}</p>
                </div>
                <div>{getStatusBadge(warningSigns.essentialInfoCompleteness.status)}</div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900">4. Damaged-Looking Packaging</span>
                  <p className="text-slate-500">{warningSigns.packagingCondition.detail}</p>
                </div>
                <div>{getStatusBadge(warningSigns.packagingCondition.status)}</div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900">5. Inconsistent Visible Information</span>
                  <p className="text-slate-500">{warningSigns.informationConsistency.detail}</p>
                </div>
                <div>{getStatusBadge(warningSigns.informationConsistency.status)}</div>
              </div>
            </div>
          </div>

          {/* Mandatory Critical Safety Requirement */}
          <div className="bg-slate-900 text-white rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Safety Requirement</span>
            </div>
            <p className="font-medium text-slate-200 leading-relaxed">
              MediShield AI does not authenticate medicines or replace professional verification.
            </p>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              This preliminary screening system identifies visible surface-level anomalies. It cannot analyze chemical composition, active pharmaceutical ingredients (API), or internal tablet purity. Always consult a licensed pharmacist or healthcare professional.
            </p>
          </div>

          {/* Actions / Share Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={handleCopySummary}
              className="min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Report Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Screening Summary</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="min-h-[44px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View in Scan History</span>
            </button>

            <button
              onClick={onScanAnother}
              className="flex-1 min-h-[44px] px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Another Medicine</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
