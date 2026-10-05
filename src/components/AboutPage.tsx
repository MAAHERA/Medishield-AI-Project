import React from 'react';
import { SafetyBanner } from './SafetyBanner';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  FileSearch,
  Building2,
  ExternalLink,
  Info,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-4 pb-24 max-w-3xl mx-auto px-4 sm:px-6 pt-3">
      <SafetyBanner />

      {/* About Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-600/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-slate-900">
              About MediShield AI
            </h1>
            <p className="text-xs text-slate-500">
              AI-assisted preliminary packaging inspection & educational awareness.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          MediShield AI is designed to assist consumers and healthcare workers in conducting initial visual screenings of medicine packaging. By analyzing visible packaging print quality, batch numbers, expiry dates, and manufacturer markings, the system helps highlight potential irregularities before use.
        </p>

        {/* Boundary: What it Does vs What it Does NOT Do */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 space-y-2 text-xs">
            <h3 className="font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              What MediShield AI Does
            </h3>
            <ul className="space-y-1.5 text-teal-950/80 leading-relaxed">
              <li>· Reads & extracts visible medicine name, dosage, batch, and expiry.</li>
              <li>· Checks for typography smudging, missing fields, and blurred print.</li>
              <li>· Detects obvious signs of physical packaging damage or seal wear.</li>
              <li>· Provides educational recommendations on next verification steps.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 text-xs">
            <h3 className="font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              What MediShield AI Cannot Do
            </h3>
            <ul className="space-y-1.5 text-rose-950/80 leading-relaxed">
              <li>· Does NOT authenticate chemical ingredients or active drug purity.</li>
              <li>· Does NOT replace chromatography or laboratory spectrometry assays.</li>
              <li>· Does NOT certify a medicine as definitively genuine or counterfeit.</li>
              <li>· Does NOT replace professional clinical judgment from a pharmacist.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* The Three Screening Classifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider">
          Understanding the 3 Screening Results
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-800 uppercase">LOW CONCERN</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Standard Visuals</span>
            </div>
            <p className="text-emerald-950/80 leading-relaxed">
              All visible markings, brand fonts, lot numbers, and manufacturing indicators are clear, legible, and unblemished. Always ensure the original tamper-evident seal is intact.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-800 uppercase">VERIFY</span>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Incomplete / Obscured</span>
            </div>
            <p className="text-amber-950/80 leading-relaxed">
              Key details (such as manufacturer name, batch stamp, or composition) are missing, cut off, or unclear from the image. Verify with a pharmacist before taking the medication.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-800 uppercase">HIGH CONCERN</span>
              <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">Potential Irregularity</span>
            </div>
            <p className="text-rose-950/80 leading-relaxed">
              Multiple visual red flags detected: damaged packaging, smudged/inconsistent printing, missing batch code, or broken seals. Do not ingest the medication until professionally investigated.
            </p>
          </div>
        </div>
      </div>

      {/* Guidance: What to do if you suspect a medicine */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="font-display text-sm font-bold text-slate-900 uppercase tracking-wider">
          Action Guide: What to Do If You Suspect an Issue
        </h2>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
              1
            </div>
            <p>
              <strong className="text-slate-900">Do Not Ingest:</strong> If you notice unusual odors, discoloration, broken blister seals, or unreadable batch codes, set the package aside immediately.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
              2
            </div>
            <p>
              <strong className="text-slate-900">Consult Your Pharmacist:</strong> Show the original package and purchase receipt to your licensed dispensing pharmacist for batch verification.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
              3
            </div>
            <p>
              <strong className="text-slate-900">Report to Regulatory Authorities:</strong> Inquire with your national drug administration (e.g., FDA, MHRA, EMA, CDSCO) or report through the WHO Substandard and Falsified (SF) Medical Products surveillance network.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-2 text-xs">
        <h3 className="font-bold text-amber-400 uppercase tracking-wider">
          Legal & Medical Disclaimer
        </h3>
        <p className="text-slate-300 leading-relaxed">
          MediShield AI does not authenticate medicines or replace professional verification. All analyses produced by this application are preliminary computer vision evaluations intended for educational and alert screening purposes only.
        </p>
        <p className="text-slate-400 leading-relaxed text-[11px]">
          Always consult a licensed medical practitioner or pharmacist regarding any medication questions or concerns.
        </p>
      </div>
    </div>
  );
};
