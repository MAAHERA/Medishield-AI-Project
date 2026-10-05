/**
 * MediShield AI - Types and Schemas
 */

export type ScreeningStatus = 'LOW CONCERN' | 'VERIFY' | 'HIGH CONCERN';

export type CheckStatus = 'pass' | 'warning' | 'fail';

export interface WarningSignCheck {
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface ExtractedMedicineDetails {
  medicineName: string;
  strength: string;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  manufacturer: string;
  dosageForm?: string;
  packagingType?: string;
  activeIngredients?: string;
}

export interface PackagingWarningSigns {
  imageQuality: WarningSignCheck;
  printClarity: WarningSignCheck;
  essentialInfoCompleteness: WarningSignCheck;
  packagingCondition: WarningSignCheck;
  informationConsistency: WarningSignCheck;
}

export interface ScreeningReport {
  id: string;
  timestamp: number;
  imageUrl: string;
  extractedDetails: ExtractedMedicineDetails;
  warningSigns: PackagingWarningSigns;
  screeningResult: ScreeningStatus;
  whyResult: string;
  warnings: string[];
  recommendedAction: string;
  safetyDisclaimer: string;
  notes?: string;
}

export type PageId = 'home' | 'scan' | 'analysis' | 'result' | 'history' | 'about';
