import React, { useState, useEffect } from 'react';
import { SafetyBanner } from './SafetyBanner';
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Scan,
  ShieldAlert,
} from 'lucide-react';

interface AnalysisPageProps {
  imagePreview: string;
  isReady: boolean;
  onComplete: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  imagePreview,
  isReady,
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(10);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = [
    'Evaluating image quality & resolution...',
    'Performing optical typography & print inspection...',
    'Extracting medicine name, strength, batch & dates...',
    'Checking visible packaging warning signs...',
    'Synthesizing preliminary screening result...',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          const next = prev + Math.floor(Math.random() * 12) + 5;
          const stepIdx = Math.min(Math.floor((next / 90) * steps.length), steps.length - 1);
          setCurrentStepIndex(stepIdx);
          return Math.min(next, 90);
        }
        if (isReady && prev < 100) {
          setCurrentStepIndex(steps.length - 1);
          return 100;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [isReady]);

  // When 100% and isReady, complete after slight delay
  useEffect(() => {
    if (progress >= 100 && isReady) {
      const delay = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [progress, isReady, onComplete]);

  return (
    <div className="space-y-4 pb-24 max-w-xl mx-auto px-4 sm:px-6 pt-4">
      <SafetyBanner compact />

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 sm:p-6 text-center space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
            <span>AI Vision Analysis in Progress</span>
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Screening Medicine Packaging
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing visible text, batch markers, and physical indicators.
          </p>
        </div>

        {/* Scanned Image with Laser Scan Line Animation */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-md">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Scanning packaging"
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500">
              <Scan className="w-12 h-12" />
            </div>
          )}

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

          {/* Animated Laser Scanning Beam */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-teal-200 to-teal-500 shadow-[0_0_12px_#14b8a6] animate-scanline pointer-events-none"></div>

          {/* Corner marks */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-teal-400"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-teal-400"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-teal-400"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-teal-400"></div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 max-w-sm mx-auto">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">
              {steps[currentStepIndex]}
            </span>
            <span className="font-mono text-teal-700 font-bold tabular-nums">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-left space-y-2 max-w-sm mx-auto text-xs">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 transition-colors ${
                  isCompleted
                    ? 'text-teal-900 font-medium'
                    : isCurrent
                    ? 'text-slate-900 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-teal-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"></div>
                )}
                <span className="truncate">{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
