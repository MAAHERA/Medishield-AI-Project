import React from 'react';
import { PageId } from '../types/medishield';
import { ShieldAlert, Camera, History, Info, Home as HomeIcon } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:bg-teal-700 transition-colors">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
            MediShield AI
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors py-1 cursor-pointer ${
              currentPage === 'home'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('scan')}
            className={`transition-colors py-1 cursor-pointer ${
              currentPage === 'scan' || currentPage === 'analysis'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            Scan Medicine
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`transition-colors py-1 cursor-pointer ${
              currentPage === 'history'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            Scan History
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors py-1 cursor-pointer ${
              currentPage === 'about'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('scan')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 shadow-sm shadow-teal-600/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Medicine</span>
          </button>
        </div>
      </div>
    </header>
  );
};
