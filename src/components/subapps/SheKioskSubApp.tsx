import React, { useState } from 'react';
import {
  MonitorCheck,
  UserCheck,
  FileText,
  AlertOctagon,
  CheckCircle2,
  Search,
  Plus,
  Send,
  Camera,
  Calendar,
  Building2,
  Clock,
} from 'lucide-react';

interface WorkerRecord {
  id: string;
  name: string;
  company: string;
  workType: string;
  trainingDate: string;
  trainingStatus: 'completed' | 'expired' | 'pending';
  badgeNumber: string;
}

const INITIAL_WORKERS: WorkerRecord[] = [
  {
    id: 'w-1',
    name: '김철수',
    company: '한화모멘텀 (정밀가공팀)',
    workType: 'CNC 머시닝 가공',
    trainingDate: '2026.10.18',
    trainingStatus: 'completed',
    badgeNumber: 'HM-CW-1042',
  },
  {
    id: 'w-2',
    name: '박영호',
    company: '동진엔지니어링 (협력사)',
    workType: '2공장 배관 보수공사',
    trainingDate: '2026.10.19',
    trainingStatus: 'completed',
    badgeNumber: 'CO-DJ-0205',
  },
  {
    id: 'w-3',
    name: '이민준',
    company: '창원정밀테크 (협력사)',
    workType: '자동화설비 전기 결선',
    trainingDate: '2026.09.12',
    trainingStatus: 'expired',
    badgeNumber: 'CO-CW-0814',
  },
  {
    id: 'w-4',
    name: '정지훈',
    company: '한화모멘텀 (설비보전팀)',
    workType: '유압프레스 정기 오버홀',
    trainingDate: '2026.10.19',
    trainingStatus: 'completed',
    badgeNumber: 'HM-CW-2091',
  },
];

export const SheKioskSubApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'permit' | 'near-miss' | 'tbm'>('education');
  const [searchQuery, setSearchQuery] = useState('');
  const [workers] = useState<WorkerRecord[]>(INITIAL_WORKERS);

  // Near miss state
  const [nearMissLocation, setNearMissLocation] = useState('1공장 가공 2라인 통로');
  const [nearMissDesc, setNearMissDesc] = useState('');
  const [nearMissSubmitted, setNearMissSubmitted] = useState(false);

  // Permit state
  const [permits, setPermits] = useState([
    {
      id: 'PTW-26-0891',
      title: '2공장 조립라인 천장 크레인 레일 용접 (화기작업)',
      type: '화기작업',
      applicant: '설비보전팀 정지훈',
      time: '09:00 ~ 17:00',
      status: '승인완료',
      safetyMeasures: '소화기 2대 비치, 불티 비산방지포 설치',
    },
    {
      id: 'PTW-26-0892',
      title: '케미컬 저장동 배기덕트 교체 (고소 5m 작업)',
      type: '고소작업',
      applicant: '동진엔지니어링 박영호',
      time: '13:00 ~ 18:00',
      status: '승인완료',
      safetyMeasures: '안전대 2개 체결, 안전모 착용, 신호수 1명 배치',
    },
  ]);

  const [newPermitModal, setNewPermitModal] = useState(false);
  const [newPermitTitle, setNewPermitTitle] = useState('');
  const [newPermitType, setNewPermitType] = useState('화기작업');

  const filteredWorkers = workers.filter(
    (w) =>
      w.name.includes(searchQuery) ||
      w.company.includes(searchQuery) ||
      w.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNearMissSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nearMissDesc.trim()) return;
    setNearMissSubmitted(true);
    setTimeout(() => {
      setNearMissSubmitted(false);
      setNearMissDesc('');
    }, 2500);
  };

  const handleCreatePermit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPermitTitle.trim()) return;
    const newP = {
      id: `PTW-26-089${permits.length + 3}`,
      title: newPermitTitle,
      type: newPermitType,
      applicant: '현장 작업담당자 (신규 등록)',
      time: '09:00 ~ 18:00',
      status: '검토 중 (안전팀)',
      safetyMeasures: '기본 안전수칙 준수 및 보호구 착용 필수',
    };
    setPermits([newP, ...permits]);
    setNewPermitTitle('');
    setNewPermitModal(false);
  };

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-full">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MonitorCheck className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              SHE오스크 현장 안전보건 키오스크
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            출입 안전교육 확인 · 고위험 작업허가서(PTW) · 아차사고 즉시 제보
          </p>
        </div>

        {/* Kiosk Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'education'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            안전교육 이수조회
          </button>
          <button
            onClick={() => setActiveTab('permit')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'permit'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            작업허가(PTW)
          </button>
          <button
            onClick={() => setActiveTab('near-miss')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'near-miss'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            아차사고 신고
          </button>
          <button
            onClick={() => setActiveTab('tbm')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'tbm'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            일일 TBM 서약
          </button>
        </div>
      </div>

      {/* Tab 1: Education Verification */}
      {activeTab === 'education' && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="작업자 이름, 소속사, 출입증 번호..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="text-xs text-slate-400">
              오늘 출입 작업자 교육 이수율 <strong className="text-orange-400">98.2%</strong>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-800/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/60 font-semibold">
                <tr>
                  <th className="py-3 px-4">작업자명</th>
                  <th className="py-3 px-4">소속 / 부서</th>
                  <th className="py-3 px-4">담당 작업</th>
                  <th className="py-3 px-4">출입증 코드</th>
                  <th className="py-3 px-4">최근 교육일</th>
                  <th className="py-3 px-4 text-center">출입 인증 상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredWorkers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      <span>{w.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{w.company}</td>
                    <td className="py-3 px-4 text-slate-300">{w.workType}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{w.badgeNumber}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{w.trainingDate}</td>
                    <td className="py-3 px-4 text-center">
                      {w.trainingStatus === 'completed' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>출입 승인 (이수완료)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          <AlertOctagon className="w-3 h-3" />
                          <span>재교육 필요 (만료)</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Permit To Work */}
      {activeTab === 'permit' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">
              금일 고위험 안전작업허가서(PTW) 진행 현황
            </h3>
            <button
              onClick={() => setNewPermitModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>신규 작업허가 신청</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permits.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {p.id}
                  </span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                    {p.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{p.title}</h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>작업시간: {p.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>신청자: {p.applicant}</span>
                  </div>
                  <div className="mt-2 p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
                    안전조치: {p.safetyMeasures}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {newPermitModal && (
            <div className="p-4 rounded-xl bg-slate-800 border border-orange-500/50 mt-4">
              <h4 className="text-xs font-bold text-orange-400 mb-3">신규 작업허가서 간이 등록</h4>
              <form onSubmit={handleCreatePermit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">작업 명칭 및 구역</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 1공장 크레인 하부 고소도장작업"
                    value={newPermitTitle}
                    onChange={(e) => setNewPermitTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">작업 유형</label>
                  <select
                    value={newPermitType}
                    onChange={(e) => setNewPermitType(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="화기작업">화기작업 (용접, 절단, 그라인딩)</option>
                    <option value="고소작업">고소작업 (2m 이상 추락위험)</option>
                    <option value="밀폐공간">밀폐공간 출입작업</option>
                    <option value="중장비작업">중장비 및 지게차 특수작업</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewPermitModal(false)}
                    className="px-3 py-1.5 rounded bg-slate-700 text-slate-300 hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-orange-600 hover:bg-orange-500 text-white font-medium"
                  >
                    허가서 제출
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Near Miss Reporting */}
      {activeTab === 'near-miss' && (
        <div className="mt-6 max-w-xl mx-auto p-6 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <AlertOctagon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              현장 아차사고(Near Miss) 즉시 신고함
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            사고로 이어질 뻔한 위험 요소를 사전에 신고해 주세요. 우수 제보자에게는 포상 및 안전 마일리지가 지급됩니다.
          </p>

          {nearMissSubmitted ? (
            <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>신고가 정상 접수되었습니다! EHS팀에서 확인 후 즉각 개선 조치하겠습니다.</span>
            </div>
          ) : (
            <form onSubmit={handleNearMissSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">발생 구역</label>
                <select
                  value={nearMissLocation}
                  onChange={(e) => setNearMissLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="1공장 가공 2라인 통로">1공장 (정밀가공동) 가공라인</option>
                  <option value="2공장 자동화조립동 A구역">2공장 (조립/물류동) 조립라인</option>
                  <option value="본관 후면 하역장">본관/지원동 하역장</option>
                  <option value="케미컬 옥외저장소">케미컬 옥외저장소</option>
                  <option value="기타 사업장 내">기타 현장 통로</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  위험 요소 및 상황 설명
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="예: 지게차 이동 통로 바닥에 오일이 미세 누유되어 미끄럼 위험이 발생함..."
                  value={nearMissDesc}
                  onChange={(e) => setNearMissDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400">
                <Camera className="w-5 h-5 text-slate-400" />
                <span>현장 사진 첨부 (키오스크/모바일 카메라 연동)</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>아차사고 신고서 제출하기</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 4: Daily TBM Pledge */}
      {activeTab === 'tbm' && (
        <div className="mt-6 max-w-2xl mx-auto p-6 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">
              한화모멘텀 창원사업장 안전 10대 기본수칙 서약
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            금일 작업 전 공정별 TBM(Tool Box Meeting) 실시 및 안전수칙 준수 서약
          </p>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/70 p-4 rounded-lg border border-slate-800">
            <div className="flex items-start gap-2">
              <span className="font-mono text-orange-400">01.</span>
              <span>작업장 내 필수 개인보호구(안전모, 안전화, 보안경) 100% 착용</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-orange-400">02.</span>
              <span>2m 이상 고소 작업 시 안전대 안전고리 반드시 체결</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-orange-400">03.</span>
              <span>가동 중인 설비 점검·정비 시 LOTO(잠금장치 및 표지) 철저</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-orange-400">04.</span>
              <span>화기작업 시 소화설비 비치 및 불티비산 방지포 설치</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-mono text-orange-400">05.</span>
              <span>지게차 등 하역기계 제한속도(10km/h) 준수 및 보행자 우선 양보</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-700">
            <span className="text-xs text-slate-400">
              오늘 서약 완료 인원: <strong className="text-white">186명</strong>
            </span>
            <button
              onClick={() => alert('금일 TBM 안전서약이 전자서명으로 등록되었습니다.')}
              className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
            >
              터치로 서약서 서명하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
