import { SheService, AedLocation, EmergencyContact, SafetyNotice, SafetyMetric } from '../types/she';

export const STORAGE_KEY_SERVICES = 'hanwha_she_mobile_services_v4';

export const DEFAULT_SERVICES: SheService[] = [
  {
    id: 'aed',
    name: 'AED',
    buttonLabel: 'AED',
    tagline: '자동심장충격기 점검 및 관리 시스템',
    description: '공장 구역별 12기 AED의 배터리 잔량, 제세동 패드 유효기간, 월간 점검 이력 연동 시스템입니다.',
    url: 'https://ais-pre-k4qv4ckp6m3odu3auzvuga-82735808345.asia-northeast1.run.app/aed',
    category: '응급구조 / 심폐소생',
    badge: '12개소 정상',
    iconName: 'HeartPulse',
    accentColor: '#EF4444',
    bgGradient: 'from-red-50/80 via-white to-white',
    borderHover: 'hover:border-red-300 active:border-red-500',
    manager: '보건관리자 (사내 8120)',
    metrics: [
      { label: '설치 대수', value: '12', unit: '대', status: 'good' },
      { label: '가동률', value: '100', unit: '%', status: 'good' },
    ],
    quickFeatures: ['위치 추적', '패드 만료 알림'],
  },
  {
    id: 'she-kiosk',
    name: 'SHE오스크',
    buttonLabel: 'SHE오스크',
    tagline: 'SHE 오스크 목록 및 배치현황 관리 시스템',
    description: '작업장 출입 전 신규/일용 작업자 안전교육 이수 확인, 일일 안전작업허가(PTW) 등록 시스템입니다.',
    url: 'https://ais-pre-k4qv4ckp6m3odu3auzvuga-82735808345.asia-northeast1.run.app/she-kiosk',
    category: '안전교육 / 작업허가',
    badge: '교육인증',
    iconName: 'MonitorCheck',
    accentColor: '#F37321', // Hanwha Orange
    bgGradient: 'from-orange-50/80 via-white to-white',
    borderHover: 'hover:border-orange-300 active:border-orange-500',
    manager: '안전기획팀 (사내 8122)',
    metrics: [
      { label: '오늘 교육', value: '142', unit: '명', status: 'good' },
      { label: '허가 승인', value: '9', unit: '건', status: 'normal' },
    ],
    quickFeatures: ['출입자 교육 조회', '작업허가 승인'],
  },
  {
    id: 'inventory',
    name: '안전물품 관리',
    buttonLabel: '안전물품 관리',
    tagline: '안전보호구(PPE) 및 보건물품 재고관리',
    description: '사업장 필수 개인보호구(안전모, 보안경, 방진마스크, 안전화 등) 실시간 재고 관리 시스템입니다.',
    url: 'https://ais-pre-k4qv4ckp6m3odu3auzvuga-82735808345.asia-northeast1.run.app/inventory',
    category: '보호구 / 보건물품',
    badge: '재고 적정',
    iconName: 'Boxes',
    accentColor: '#3B82F6',
    bgGradient: 'from-blue-50/80 via-white to-white',
    borderHover: 'hover:border-blue-300 active:border-blue-500',
    manager: '자재/보건담당 (사내 8124)',
    metrics: [
      { label: '관리 품목', value: '28', unit: '종', status: 'good' },
      { label: '재고율', value: '96.4', unit: '%', status: 'good' },
    ],
    quickFeatures: ['보호구 실시간 재고', '출급 관리'],
  },
];

export const CHANGWON_AED_LOCATIONS: AedLocation[] = [
  {
    id: 'aed-01',
    code: 'CW-AED-01',
    name: '본관 1층 로비 안내데스크',
    building: '본관/지원동',
    floor: '1층',
    exactSpot: '주 출입문 안내데스크 우측 비상함',
    model: 'Zoll AED Plus (자동제세동기)',
    batteryStatus: 98,
    padExpiryDate: '2027.06.30',
    lastInspection: '2026.10.15',
    inspector: '김창원 대리',
    status: 'normal',
  },
  {
    id: 'aed-02',
    code: 'CW-AED-02',
    name: '1공장 가공라인 중앙 통로',
    building: '1공장 (정밀가공동)',
    floor: '1층',
    exactSpot: '가공 2라인 중앙 방재게시대',
    model: 'CU-SP1 Intelligent AED',
    batteryStatus: 95,
    padExpiryDate: '2027.04.15',
    lastInspection: '2026.10.15',
    inspector: '이안전 과장',
    status: 'normal',
  },
  {
    id: 'aed-03',
    code: 'CW-AED-03',
    name: '2공장 자동화조립동 1층 출입구',
    building: '2공장 (조립/물류동)',
    floor: '1층',
    exactSpot: '서측 작업자 출입구 비상게시대',
    model: 'Mindray BeneHeart D1',
    batteryStatus: 92,
    padExpiryDate: '2027.02.20',
    lastInspection: '2026.10.15',
    inspector: '박보건 차장',
    status: 'normal',
  },
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    department: '창원사업장 종합방재센터',
    role: '사내 24시간 비상관제',
    internalPhone: '8119',
    directPhone: '055-278-8119',
    mobile: '010-3456-8119',
    priority: 1,
  },
  {
    id: 'ec-2',
    department: '사내 건강관리실 (의무실)',
    role: '응급처치·보건관리자',
    internalPhone: '8120',
    directPhone: '055-278-8120',
    mobile: '010-4567-8120',
    priority: 1,
  },
];

export const PLANT_NOTICES: SafetyNotice[] = [
  {
    id: 'not-1',
    title: '[공지] 창원사업장 안전 최우선 작업 안내',
    category: '점검',
    date: '2026.10.19',
    author: '환경안전팀',
    isImportant: true,
    content: '보호구 100% 착용 및 작업 전 안전점검을 철저히 실시합시다.',
  },
];

export const PLANT_METRICS: SafetyMetric = {
  accidentFreeDays: 412,
  targetDays: 500,
  dailyInspectionRate: 100,
  openPermitsCount: 7,
  ppeInventoryHealth: 96.4,
};
