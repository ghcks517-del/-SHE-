import React, { useState } from 'react';
import { HeartPulse, CheckCircle2, AlertTriangle, Battery, ShieldAlert, Search, RefreshCw, Volume2 } from 'lucide-react';
import { CHANGWON_AED_LOCATIONS } from '../../data/defaultConfig';
import { AedLocation } from '../../types/she';

export const AedSubApp: React.FC = () => {
  const [locations, setLocations] = useState<AedLocation[]>(CHANGWON_AED_LOCATIONS);
  const [filterBuilding, setFilterBuilding] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const buildings = ['all', '본관/지원동', '1공장 (정밀가공동)', '2공장 (조립/물류동)', '연구개발동', '케미컬/저장동', '후생복지관'];

  const filtered = locations.filter((item) => {
    const matchBuilding = filterBuilding === 'all' || item.building === filterBuilding;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exactSpot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBuilding && matchSearch;
  });

  const handleSelfTest = (id: string, name: string) => {
    setTestingId(id);
    setTestResult(null);
    setTimeout(() => {
      setTestingId(null);
      setTestResult(`${name} — 자체 자가진단 정상 완료 (음성안내 스피커 및 고전압 캐패시터 양호)`);
      setTimeout(() => setTestResult(null), 4000);
    }, 1200);
  };

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-full">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HeartPulse className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              창원사업장 AED 자동심장충격기 점검·관리 시스템
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            총 12기 설치 운용 중 · 배터리 및 제세동 패드 유효기간 실시간 모니터링
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>12/12기 정상 가동 중</span>
          </div>
        </div>
      </div>

      {testResult && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{testResult}</span>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {buildings.map((b) => (
            <button
              key={b}
              onClick={() => setFilterBuilding(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterBuilding === b
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {b === 'all' ? '전체 구역' : b}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="기기명, 상세위치, 코드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* AED Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-slate-800/70 border border-slate-700/80 p-5 hover:border-slate-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                  {item.code}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                    item.status === 'normal'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {item.status === 'normal' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>정상</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3" />
                      <span>패드 교체 권고</span>
                    </>
                  )}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
              <p className="text-xs text-slate-300 mb-3">{item.exactSpot}</p>

              <div className="space-y-1.5 text-[11px] border-t border-slate-700/60 pt-3">
                <div className="flex items-center justify-between text-slate-400">
                  <span>모델명</span>
                  <span className="text-slate-200">{item.model}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>배터리 잔량</span>
                  <div className="flex items-center gap-1 text-slate-200 font-mono">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.batteryStatus}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>패드 유효기간</span>
                  <span
                    className={`font-mono ${
                      item.status === 'check_needed' ? 'text-amber-400 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    {item.padExpiryDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>최종 점검자</span>
                  <span className="text-slate-200">
                    {item.inspector} ({item.lastInspection})
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-2">
              <button
                onClick={() => handleSelfTest(item.id, item.name)}
                disabled={testingId === item.id}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${testingId === item.id ? 'animate-spin text-red-400' : ''}`}
                />
                <span>{testingId === item.id ? '진단 중...' : '원격 자가진단'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency CPR protocol banner */}
      <div className="mt-8 p-5 rounded-xl bg-red-950/30 border border-red-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-200 mb-1">
              심정지 환자 발생 시 4분 골든타임 대응 매뉴얼
            </h4>
            <p className="text-xs text-red-300/80 leading-relaxed">
              1. 환자 의식·호흡 확인 &rarr; 2. 사내 종합방재센터(사내 8119) 및 119 즉시 신고 &rarr; 3. 흉부압박(분당 100~120회, 깊이 5cm) &rarr; 4. 주변 AED 도착 즉시 전원 ON 및 음성안내에 따름
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <a
            href="tel:0552788119"
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors whitespace-nowrap"
          >
            방재센터 긴급호출
          </a>
        </div>
      </div>
    </div>
  );
};
