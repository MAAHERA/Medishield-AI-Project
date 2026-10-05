import React, { useState } from 'react';
import { ScreeningReport, PageId } from '../types/medishield';
import { SafetyBanner } from './SafetyBanner';
import {
  Search,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Calendar,
  Hash,
  Camera,
  Download,
} from 'lucide-react';

interface HistoryPageProps {
  history: ScreeningReport[];
  onSelectReport: (report: ScreeningReport) => void;
  onDeleteReport: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (page: PageId) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectReport,
  onDeleteReport,
  onClearAll,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState<'ALL' | 'LOW CONCERN' | 'VERIFY' | 'HIGH CONCERN'>('ALL');

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.extractedDetails.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.extractedDetails.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.extractedDetails.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterResult === 'ALL' || item.screeningResult === filterResult;
    return matchesSearch && matchesFilter;
  });

  const getResultBadge = (result: 'LOW CONCERN' | 'VERIFY' | 'HIGH CONCERN') => {
    switch (result) {
      case 'LOW CONCERN':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            LOW CONCERN
          </span>
        );
      case 'VERIFY':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            VERIFY
          </span>
        );
      case 'HIGH CONCERN':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            HIGH CONCERN
          </span>
        );
    }
  };

  const exportHistoryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `medishield_scan_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4 pb-24 max-w-3xl mx-auto px-4 sm:px-6 pt-3">
      <SafetyBanner compact />

      {/* Header and Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">
              Scan History & Screening Records
            </h2>
            <p className="text-xs text-slate-500">
              {history.length} {history.length === 1 ? 'medicine packaging record' : 'medicine packaging records'} stored locally.
            </p>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={exportHistoryJSON}
                className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                title="Export History"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Clear all stored scan history records?')) {
                    onClearAll();
                  }
                }}
                className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 border border-rose-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                title="Clear All"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by medicine name, batch number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          {/* Result Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0">
            {(['ALL', 'LOW CONCERN', 'VERIFY', 'HIGH CONCERN'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterResult(filter)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                  filterResult === filter
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter === 'ALL' ? 'All' : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-2.5">
          {filteredHistory.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 transition-all shadow-xs flex items-center justify-between gap-3 group"
            >
              <div
                onClick={() => onSelectReport(report)}
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {report.imageUrl ? (
                    <img
                      src={report.imageUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">IMG</span>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {report.extractedDetails.medicineName}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {report.extractedDetails.strength}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-mono">
                      Batch: {report.extractedDetails.batchNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {new Date(report.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <div onClick={() => onSelectReport(report)} className="cursor-pointer">
                  {getResultBadge(report.screeningResult)}
                </div>

                <button
                  onClick={() => onDeleteReport(report.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">No Scan Records Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              {searchQuery || filterResult !== 'ALL'
                ? 'No scans match your search or filter criteria.'
                : 'Scanned medicine packaging reports will be automatically saved here for quick reference.'}
            </p>
          </div>
          <div>
            <button
              onClick={() => onNavigate('scan')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Scan Medicine Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
