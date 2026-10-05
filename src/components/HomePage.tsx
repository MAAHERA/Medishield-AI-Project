import React from 'react';
import { PageId } from '../types/medishield';
import { SafetyBanner } from './SafetyBanner';
import {
  Camera,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  Eye,
  FileSearch,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectSample: (type: 'amoxicillin' | 'ibuprofen' | 'authentic' | 'suspicious' | 'verify') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectSample }) => {
  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 sm:px-6 pt-4">
      {/* Mandatory Safety Notice at Top */}
      <SafetyBanner />

      {/* Hero Section */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src="/src/assets/images/hero_medicine_scan_1790841919565.jpg"
            alt="Smartphone scanning medicine blister pack"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              // Graceful CSS fallback if image asset is unavailable
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent flex flex-col justify-end p-5 sm:p-7">
            <span className="text-teal-300 font-semibold text-xs tracking-wider uppercase mb-1">
              AI-Assisted Preliminary Screening
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              MediShield AI
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
              Detect visible packaging warning signs, extract batch & expiry details, and evaluate preliminary package integrity.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('scan')}
              className="flex-1 min-h-[48px] px-5 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Medicine Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="min-h-[48px] px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>About MediShield</span>
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <span>Instant Vision Analysis</span>
            <span aria-hidden="true">·</span>
            <span>Batch & Expiry Extraction</span>
            <span aria-hidden="true">·</span>
            <span>Educational Warning Checks</span>
          </div>
        </div>
      </section>

      {/* Quick Test Presets (Instant 1-Click Demo) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick Test Demonstrations
            </h2>
            <p className="text-xs text-slate-500">
              Try with pre-configured sample medicine packages to see how MediShield classifies each result.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Sample 1: Amoxicillin (Low Concern) */}
          <div
            onClick={() => onSelectSample('amoxicillin')}
            className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  LOW CONCERN
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-semibold text-xs text-slate-900">Amoxicillin 500 mg</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Blister foil, Batch AMX9821, Exp 11/2027, GlaxoSmithKline.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:text-emerald-800">
              <span>Test Amoxicillin</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Sample 2: Ibuprofen (Low Concern) */}
          <div
            onClick={() => onSelectSample('ibuprofen')}
            className="p-3.5 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  LOW CONCERN
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="font-semibold text-xs text-slate-900">Ibuprofen 400 mg</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Carton box, Batch IBU4402, Exp 09/2028, Apex Healthcare.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-emerald-700 group-hover:text-emerald-800">
              <span>Test Ibuprofen</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Sample 3: Paracetamol (Verify) */}
          <div
            onClick={() => onSelectSample('verify')}
            className="p-3.5 bg-white border border-slate-200 hover:border-amber-400 rounded-xl cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  VERIFY
                </span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="font-semibold text-xs text-slate-900">Paracetamol 500 mg</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Batch AB1234 visible, but manufacturer details missing on angle.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-amber-700 group-hover:text-amber-800">
              <span>Test Verify Example</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Sample 4: Suspicious (High Concern) */}
          <div
            onClick={() => onSelectSample('suspicious')}
            className="p-3.5 bg-white border border-slate-200 hover:border-rose-400 rounded-xl cursor-pointer transition-all hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  HIGH CONCERN
                </span>
                <AlertOctagon className="w-4 h-4 text-rose-600" />
              </div>
              <p className="font-semibold text-xs text-slate-900">Damaged Medicine Box</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Smudged printing, unreadable batch, worn corner creases.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-rose-700 group-hover:text-rose-800">
              <span>Test High Concern</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Three Screening Results Explanation */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Three Preliminary Screening Classifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every scanned medicine package is categorized into one of three standardized preliminary levels:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-xs uppercase tracking-wide">LOW CONCERN</h3>
            </div>
            <p className="text-xs text-emerald-950/80 leading-relaxed">
              Visible packaging markings, typography, batch codes, and regulatory text appear legible, standard, and uncompromised.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-xs uppercase tracking-wide">VERIFY</h3>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              Certain vital information (such as manufacturer name, batch stamp, or composition) is ambiguous, obscured, or missing. Professional verification with a pharmacist is recommended.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-xs uppercase tracking-wide">HIGH CONCERN</h3>
            </div>
            <p className="text-xs text-rose-950/80 leading-relaxed">
              Multiple packaging warning signs observed: severely smudged or garbled printing, evident physical damage, missing mandatory safety markings, or inconsistent typography.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Visible Warning Signs Checked */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          5 Visible Packaging Warning Signs Evaluated
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0 mt-0.5">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">1. Image Quality</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Checks whether blur, camera glare, or low lighting impairs reliable visual extraction.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0 mt-0.5">
              <FileSearch className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">2. Printing Clarity & Readability</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Screens for smudged lettering, misaligned text, irregular fonts, or ink bleeding.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">3. Completeness of Information</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Detects whether medicine name, strength, batch number, expiry date, and manufacturer are present.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-3">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">4. Packaging Condition</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Evaluates physical integrity, punctured foils, torn cartons, or evidence of tampering.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 sm:col-span-2 flex items-start gap-3">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">5. Visible Information Consistency</h4>
              <p className="text-slate-500 mt-0.5 leading-relaxed">
                Flags contradictory manufacturing/expiry dates, mismatched typography between blister and carton, or invalid batch patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 space-y-4 shadow-md">
        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider">
          How Preliminary Screening Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-teal-800 text-teal-200 font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Capture or Upload</h4>
            <p className="text-slate-300 leading-relaxed">
              Use your smartphone camera or upload a well-lit photo of the medicine box, blister pack, or label.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-teal-800 text-teal-200 font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Vision Analysis</h4>
            <p className="text-slate-300 leading-relaxed">
              AI vision scans typography, parses batch number, expiry date, strength, and checks for warning signs.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-7 h-7 rounded-full bg-teal-800 text-teal-200 font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Review Findings</h4>
            <p className="text-slate-300 leading-relaxed">
              Receive a clear classification (LOW CONCERN, VERIFY, HIGH CONCERN) with explanations and next steps.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('scan')}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Start Your First Scan
          </button>
        </div>
      </section>
    </div>
  );
};
