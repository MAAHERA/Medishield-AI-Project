import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SafetyBannerProps {
  compact?: boolean;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 text-amber-950 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-900">Safety Notice: </strong>
          MediShield AI does not authenticate medicines or replace professional verification.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-amber-950 text-xs sm:text-sm">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-amber-900 text-xs sm:text-sm">
            Preliminary Packaging Screening Notice
          </h4>
          <p className="text-amber-800/95 leading-relaxed text-xs sm:text-sm">
            MediShield AI does not authenticate medicines or replace professional verification.
            This tool performs preliminary visual inspections of visible packaging text, print quality, and physical markers. Always verify medication authenticity and safety with a licensed pharmacist or healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};
