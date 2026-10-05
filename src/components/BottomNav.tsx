import React from 'react';
import { PageId } from '../types/medishield';
import { Home, Camera, History, Info } from 'lucide-react';

interface BottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
      <div className="grid grid-cols-4 items-center h-15 max-w-lg mx-auto px-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            currentPage === 'home' ? 'text-teal-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">Home</span>
        </button>

        <button
          onClick={() => onNavigate('scan')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            currentPage === 'scan' || currentPage === 'analysis'
              ? 'text-teal-600 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              currentPage === 'scan' || currentPage === 'analysis'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'bg-slate-100 text-slate-700'
            }`}>
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Scan</span>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            currentPage === 'history' ? 'text-teal-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">History</span>
        </button>

        <button
          onClick={() => onNavigate('about')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            currentPage === 'about' ? 'text-teal-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">About</span>
        </button>
      </div>
    </nav>
  );
};
