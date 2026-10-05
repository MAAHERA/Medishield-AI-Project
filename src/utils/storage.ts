import { ScreeningReport } from '../types/medishield';

const STORAGE_KEY = 'medishield_scan_history_v1';

export function getScanHistory(): ScreeningReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load scan history', e);
    return [];
  }
}

export function saveScanReport(report: ScreeningReport): void {
  try {
    const current = getScanHistory();
    // Prepend new report, limit to 50 items
    const updated = [report, ...current.filter((item) => item.id !== report.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save scan report', e);
  }
}

export function deleteScanReport(id: string): ScreeningReport[] {
  try {
    const current = getScanHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete scan report', e);
    return [];
  }
}

export function clearAllScans(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear scan history', e);
  }
}
