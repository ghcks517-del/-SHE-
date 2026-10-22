import React, { useState } from 'react';
import {
  MapPin,
  HeartPulse,
  MonitorCheck,
  Boxes,
  Shield,
  Layers,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CHANGWON_AED_LOCATIONS } from '../data/defaultConfig';
import { AedLocation, ServiceId } from '../types/she';

interface PlantSafetyMapProps {
  onNavigateService: (id: ServiceId) => void;
}

export const PlantSafetyMap: React.FC<PlantSafetyMapProps> = ({ onNavigateService }) => {
  const [selectedAed, setSelectedAed] = useState<AedLocation | null>(CHANGWON_AED_LOCATIONS[0]);
  const [activeFacilityFilter, setActiveFacilityFilter] = useState<'all' | 'aed' | 'kiosk' | 'inventory'>('all');

  // Plant zones data
  const plantZones = [
    {
      id: 'z-admin',
      name: '본관 / 지원동',
      area: '지하 1층 ~ 지상 4층',
      description: '사내 종합방재센터, 의무실, EHS안전보건팀, 구내식당',
      aedCount: 3,
      kioskCount: 2,
      inventoryCount: 1,
      accent: 'border-slate-600',
    },
    {
      id: 'z-plant1',
      name: '1공장 (정밀가공동)',
      area: '지상 1층 (연면적 14,200㎡)',
      description: 'CNC 대형 머시닝 센터, 정밀 연삭/밀링 라인, 공구실',
      aedCount: 3,
      kioskCount: 2,
      inventoryCount: 2,
      accent: 'border-orange-500/60',
    },
    {
      id: 'z-plant2',
      name: '2공장 (조립/물류동)',
      area: '지상 1층 (연면적 18,500㎡)',
      description: '반도체/이차전지 자동화 물류 조립 라인, 출하시험장',
      aedCount: 3,
      kioskCount: 2,
      inventoryCount: 2,
      accent: 'border-blue-500/60',
    },
    {
      id: 'z-rnd',
      name: 'R&D 첨단기술연구동',
      area: '지상 3층',
      description: '메카트로닉스 시뮬레이션 랩, 제어계측 실험실',
      aedCount: 2,
      kioskCount: 1,
      inventoryCount: 1,
      accent: 'border-slate-600',
    },
    {
      id: 'z-storage',
      name: '위험물·케미컬 저장동',
      area: '옥외 특수방폭구역',
      description: '절삭유/윤활유 보관소, 폐유 저장조, 비상 대응고',
      aedCount: 1,
      kioskCount: 1,
      inventoryCount: 1,
      accent: 'border-red-500/60',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            한화모멘텀 창원사업장 안전 설비 배치도 (Plant SHE Map)
          </h2>
          <p className="text-xs text-slate-400">
            사업장 내 5개 구역별 AED, SHE오스크 부스, 안전보호구 보관함 위치 현황
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveFacilityFilter('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFacilityFilter === 'all'
                ? 'bg-orange-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            전체 시설
          </button>
          <button
            onClick={() => setActiveFacilityFilter('aed')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFacilityFilter === 'aed'
                ? 'bg-red-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-red-400" />
            <span>AED (12개소)</span>
          </button>
          <button
            onClick={() => setActiveFacilityFilter('kiosk')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFacilityFilter === 'kiosk'
                ? 'bg-orange-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MonitorCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>SHE오스크 (8개소)</span>
          </button>
          <button
            onClick={() => setActiveFacilityFilter('inventory')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeFacilityFilter === 'inventory'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Boxes className="w-3.5 h-3.5 text-blue-400" />
            <span>보호구보관함 (7개소)</span>
          </button>
        </div>
      </div>

      {/* Blueprint Visual Plant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant Map Graphic Container */}
        <div className="lg:col-span-2 rounded-xl bg-slate-950 border border-slate-800 p-6 relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Subtle blueprint grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#f37321 1px, transparent 1px), linear-gradient(90deg, #f37321 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-orange-400 font-bold">CHANGWON PLANT LAYOUT</span>
              <span aria-hidden="true">·</span>
              <span>경상남도 창원시 성산구 창원대로</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>전 구역 비상대응 태세 정상</span>
            </div>
          </div>

          {/* Plant Zone Blocks */}
          <div className="relative z-10 grid grid-cols-2 gap-4 my-auto">
            {/* Zone 1: 정밀가공동 */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-orange-500/40 hover:border-orange-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-[11px] text-orange-400 font-semibold mb-1">
                  <span>ZONE 01</span>
                  <span>14,200㎡</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">1공장 (정밀가공동)</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  CNC 가공, 부품 가공라인, 고전압 배전반
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedAed(CHANGWON_AED_LOCATIONS[1])}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] hover:bg-red-900/80"
                >
                  <HeartPulse className="w-3 h-3 text-red-400" />
                  <span>AED 2호기</span>
                </button>
                <button
                  onClick={() => onNavigateService('she-kiosk')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-orange-950/60 border border-orange-800/80 text-orange-300 text-[11px] hover:bg-orange-900/80"
                >
                  <MonitorCheck className="w-3 h-3 text-orange-400" />
                  <span>키오스크 #1</span>
                </button>
              </div>
            </div>

            {/* Zone 2: 조립/물류동 */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-500/40 hover:border-blue-500 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-[11px] text-blue-400 font-semibold mb-1">
                  <span>ZONE 02</span>
                  <span>18,500㎡</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">2공장 (조립·물류동)</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  이차전지 자동화 라인 조립, 무인 AGV 경로
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedAed(CHANGWON_AED_LOCATIONS[2])}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] hover:bg-red-900/80"
                >
                  <HeartPulse className="w-3 h-3 text-red-400" />
                  <span>AED 3호기</span>
                </button>
                <button
                  onClick={() => onNavigateService('inventory')}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-blue-950/60 border border-blue-800/80 text-blue-300 text-[11px] hover:bg-blue-900/80"
                >
                  <Boxes className="w-3 h-3 text-blue-400" />
                  <span>보호구 스테이션</span>
                </button>
              </div>
            </div>

            {/* Zone 3: 본관 및 복지관 */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
                  <span>ZONE 03</span>
                  <span>본관 4F / 복지동</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">본관 / 의무실 / 방재센터</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  사내 건강관리실, 방재관제센터, 구내식당
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedAed(CHANGWON_AED_LOCATIONS[0])}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] hover:bg-red-900/80"
                >
                  <HeartPulse className="w-3 h-3 text-red-400" />
                  <span>AED 1호기 (로비)</span>
                </button>
                <button
                  onClick={() => setSelectedAed(CHANGWON_AED_LOCATIONS[3])}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] hover:bg-red-900/80"
                >
                  <HeartPulse className="w-3 h-3 text-red-400" />
                  <span>AED 4호기 (식당)</span>
                </button>
              </div>
            </div>

            {/* Zone 4: R&D & 케미컬 저장고 */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-red-500/40 hover:border-red-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-red-400 font-semibold mb-1">
                  <span>ZONE 04 / 05</span>
                  <span>위험물 방폭구역</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">R&D연구동 & 위험물저장소</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  케미컬 옥외저장소, 유류탱크, 정밀 실험실
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedAed(CHANGWON_AED_LOCATIONS[5])}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 border border-red-800/80 text-red-300 text-[11px] hover:bg-red-900/80"
                >
                  <HeartPulse className="w-3 h-3 text-red-400" />
                  <span>AED 6호기 (방재)</span>
                </button>
                <button
                  onClick={() => onNavigateService('aed')}
                  className="text-[11px] text-slate-300 hover:text-white underline ml-auto"
                >
                  전체보기 &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span>* 각 구역을 클릭하여 비치된 안전장비 상세 제원을 확인할 수 있습니다.</span>
            <span>최근 시설 업데이트: 2026.10.15</span>
          </div>
        </div>

        {/* Selected Facility Inspector Panel */}
        <div className="rounded-xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-white">선택 장비 상세 정보</h3>
              </div>
              {selectedAed && (
                <span className="font-mono text-xs text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {selectedAed.code}
                </span>
              )}
            </div>

            {selectedAed ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {selectedAed.name}
                  </h4>
                  <p className="text-xs text-orange-400 font-medium">
                    {selectedAed.building} · {selectedAed.floor}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedAed.exactSpot}
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-700/70 pt-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>기기 모델</span>
                    <span className="text-slate-200">{selectedAed.model}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>배터리 상태</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {selectedAed.batteryStatus}% (정상)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>패드 유효기간</span>
                    <span
                      className={`font-mono ${
                        selectedAed.status === 'check_needed'
                          ? 'text-amber-400 font-bold'
                          : 'text-slate-200'
                      }`}
                    >
                      {selectedAed.padExpiryDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>최종 점검일</span>
                    <span className="text-slate-200 font-mono">
                      {selectedAed.lastInspection}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>점검 책임자</span>
                    <span className="text-slate-200">{selectedAed.inspector}</span>
                  </div>
                </div>

                {selectedAed.status === 'check_needed' && (
                  <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>제세동 패드 교체 주기가 2개월 이내 도래합니다. 신규 패드 신청 필요.</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                지도에서 확인하실 안전설비를 선택하세요.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-700 space-y-2">
            <button
              onClick={() => onNavigateService('aed')}
              className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <HeartPulse className="w-4 h-4" />
              <span>AED 관리 시스템 열기</span>
            </button>
            <button
              onClick={() => onNavigateService('she-kiosk')}
              className="w-full py-2 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
            >
              SHE오스크 키오스크 현황 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
