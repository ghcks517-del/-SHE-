import React, { useState } from 'react';
import {
  ShieldAlert,
  Bell,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
  Building2,
} from 'lucide-react';
import { SheService, ServiceId } from '../types/she';
import { ServiceTabs } from './ServiceTabs';
import { PLANT_NOTICES, EMERGENCY_CONTACTS, PLANT_METRICS } from '../data/defaultConfig';

interface DashboardOverviewProps {
  services: SheService[];
  onSelectService: (id: ServiceId) => void;
  onOpenExternal: (url: string) => void;
  onShowQr: (service: SheService) => void;
  onNavigateToMap: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  services,
  onSelectService,
  onOpenExternal,
  onShowQr,
  onNavigateToMap,
}) => {
  // Checklist state
  const [checklist, setChecklist] = useState([
    { id: 'chk-1', text: '1·2공장 비상탈출로 및 피난구 유도등 점등 상태 확인', checked: true },
    { id: 'chk-2', text: '위험물 옥외저장소 접지 저항 및 소화약제 압력 게이지 점검', checked: true },
    { id: 'chk-3', text: '가공라인 분진 흡입 국소배기장치 차압 및 풍속 측정', checked: true },
    { id: 'chk-4', text: '사업장 내 12개소 AED 외관 손상 및 경보장치 정상 여부', checked: true },
    { id: 'chk-5', text: '금일 고위험(화기/고소) 작업허가서 현장 안전조치 이행 확인', checked: false },
  ]);

  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    );
  };

  const checkedCount = checklist.filter((c) => c.checked).length;

  return (
    <div className="space-y-8">
      {/* 1. Core Primary 3 Menu Tabs (Prominently displayed on dashboard launch) */}
      <ServiceTabs
        services={services}
        onSelectService={onSelectService}
        onOpenExternal={onOpenExternal}
        onShowQr={onShowQr}
      />

      {/* 2. Plant SHE KPI Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-[11px] text-slate-400 mb-1">무재해 달성 기록</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {PLANT_METRICS.accidentFreeDays}
            </span>
            <span className="text-xs text-slate-400">일째 순항</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            목표: 500일 달성 (D-88)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-[11px] text-slate-400 mb-1">일일 안전순찰 진행률</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {Math.round((checkedCount / checklist.length) * 100)}
            </span>
            <span className="text-xs text-slate-400">%</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            {checkedCount}/{checklist.length} 항목 완료
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-[11px] text-slate-400 mb-1">금일 고위험 작업허가</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-orange-400 tabular-nums">
              {PLANT_METRICS.openPermitsCount}
            </span>
            <span className="text-xs text-slate-400">건 승인</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            화기 4건 · 고소 2건 · 밀폐 1건
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-[11px] text-slate-400 mb-1">보호구 적정재고율</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-blue-400 tabular-nums">
              {PLANT_METRICS.ppeInventoryHealth}
            </span>
            <span className="text-xs text-slate-400">%</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            관리 28종 중 26종 적정
          </div>
        </div>
      </section>

      {/* 3. Middle Two-Column Grid: Daily Safety Checklist & Safety Notices */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Daily Inspection Checklist */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-bold text-white">
                  창원사업장 일일 현장 안전점검 체크리스트
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {checkedCount}/{checklist.length} 완료
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              관리감독자 및 현장 안전순찰자가 당일 점검 항목을 확인하고 서명합니다.
            </p>

            <div className="space-y-2.5">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    item.checked
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-slate-800/90 border-slate-600 text-white hover:border-orange-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {}}
                    className="mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-0 bg-slate-900 border-slate-700 shrink-0"
                  />
                  <span className={item.checked ? 'line-through text-slate-500' : 'font-medium'}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
            <span>오늘의 순찰자: EHS안전팀 김창원 과장</span>
            <button
              onClick={() => onSelectService('she-kiosk')}
              className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1"
            >
              <span>SHE오스크 서명 연동</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Plant Safety Notices */}
        <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-bold text-white">
                  창원사업장 안전보건 환경 공지사항
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">최신 3건</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              현장 작업자 및 협력사 필독 안전 공지 및 법정의무 이행 사항입니다.
            </p>

            <div className="space-y-3">
              {PLANT_NOTICES.map((n) => {
                const isSelected = selectedNoticeId === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNoticeId(isSelected ? null : n.id)}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/70 hover:border-slate-600 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-orange-400">
                        [{n.category}]
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {n.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-snug">
                      {n.title}
                    </h4>

                    {isSelected && (
                      <p className="text-xs text-slate-300 mt-2.5 pt-2.5 border-t border-slate-800 leading-relaxed">
                        {n.content}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{n.author}</span>
                      <span className="text-orange-400 hover:text-orange-300">
                        {isSelected ? '접기' : '자세히 보기'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
            <span>환경안전보건팀 공람 문서</span>
            <button
              onClick={onNavigateToMap}
              className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1"
            >
              <span>사업장 구역도 확인</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Bottom Row: Emergency Hotline Directory Card & Facility Map Callout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Contacts Directory */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-800/60 border border-slate-700/80">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-bold text-white">
                사업장 비상대응 직통 핫라인 (Emergency Hotlines)
              </h3>
            </div>
            <span className="text-xs text-red-400 font-medium">24시간 관제</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {EMERGENCY_CONTACTS.map((ec) => (
              <div
                key={ec.id}
                className="p-3.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">
                    {ec.department}
                  </div>
                  <div className="text-[11px] text-slate-400 mb-2">{ec.role}</div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-400">사내:</span>
                    <a
                      href={`tel:${ec.internalPhone}`}
                      className="text-orange-400 font-bold hover:underline"
                    >
                      {ec.internalPhone}
                    </a>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-300">{ec.directPhone}</span>
                  </div>
                </div>

                <a
                  href={`tel:${ec.directPhone}`}
                  title="전화 걸기"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Safety Map Banner */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-orange-400 font-semibold text-xs">
              <Building2 className="w-4 h-4" />
              <span>창원사업장 시설 배치도</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              구역별 AED 및 안전설비 실시간 위치
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              1공장(정밀가공동), 2공장(조립물류동), 본관, R&D연구동 및 위험물저장소에 배치된 12개소 AED 위치와 점검 상태를 한눈에 파악합니다.
            </p>
          </div>

          <button
            onClick={onNavigateToMap}
            className="w-full mt-6 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>배치도 상세 열기</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </section>
    </div>
  );
};
