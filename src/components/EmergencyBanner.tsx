import React from 'react';
import { PhoneCall, ShieldAlert, AlertTriangle } from 'lucide-react';
import { EMERGENCY_CONTACTS, PLANT_METRICS } from '../data/defaultConfig';

interface EmergencyBannerProps {
  onOpenEmergencyModal?: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = () => {
  return (
    <div className="bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Plant Safety Slogan & Accident-Free Days */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>창원사업장 안전 최우선 (Safety First)</span>
          </div>
          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
            ·
          </span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span>무재해 기록:</span>
            <span className="font-mono font-bold text-white tabular-nums">
              {PLANT_METRICS.accidentFreeDays}일
            </span>
            <span className="text-[11px] text-slate-500">
              (목표 {PLANT_METRICS.targetDays}일)
            </span>
          </div>
        </div>

        {/* Right: Quick Emergency Phone Numbers */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-sans text-[11px]">방재센터</span>
            <a
              href={`tel:${EMERGENCY_CONTACTS[0].internalPhone}`}
              className="text-red-400 hover:text-red-300 font-bold underline-offset-2 hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>사내 {EMERGENCY_CONTACTS[0].internalPhone}</span>
            </a>
          </div>

          <span className="text-slate-700" aria-hidden="true">
            |
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-sans text-[11px]">의무실</span>
            <a
              href={`tel:${EMERGENCY_CONTACTS[1].internalPhone}`}
              className="text-emerald-400 hover:text-emerald-300 font-bold underline-offset-2 hover:underline"
            >
              <span>사내 {EMERGENCY_CONTACTS[1].internalPhone}</span>
            </a>
          </div>

          <span className="text-slate-700 hidden md:inline" aria-hidden="true">
            |
          </span>

          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-400 font-sans text-[11px]">EHS안전팀</span>
            <span className="text-slate-200">
              사내 {EMERGENCY_CONTACTS[2].internalPhone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
