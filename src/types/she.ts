export type ServiceId = 'aed' | 'she-kiosk' | 'inventory';

export interface SheService {
  id: ServiceId;
  name: string;
  buttonLabel?: string;
  tagline: string;
  description?: string;
  url: string;
  category?: string;
  badge?: string;
  iconName: 'HeartPulse' | 'MonitorCheck' | 'Boxes';
  accentColor: string;
  bgGradient?: string;
  borderHover?: string;
  manager?: string;
  metrics?: {
    label: string;
    value: string;
    unit?: string;
    status: 'good' | 'warning' | 'normal';
  }[];
  quickFeatures?: string[];
}

export interface AedLocation {
  id: string;
  code: string;
  name: string;
  building: string;
  floor: string;
  exactSpot: string;
  model: string;
  batteryStatus: number;
  padExpiryDate: string;
  lastInspection: string;
  inspector: string;
  status: 'normal' | 'check_needed' | 'in_use';
}

export interface EmergencyContact {
  id: string;
  department: string;
  role: string;
  internalPhone: string;
  directPhone: string;
  mobile: string;
  priority: 1 | 2 | 3;
}

export interface SafetyNotice {
  id: string;
  title: string;
  category: '긴급' | '점검' | '교육' | '일반';
  date: string;
  author: string;
  isImportant: boolean;
  content: string;
}

export interface SafetyMetric {
  accidentFreeDays: number;
  targetDays: number;
  dailyInspectionRate: number;
  openPermitsCount: number;
  ppeInventoryHealth: number;
}
