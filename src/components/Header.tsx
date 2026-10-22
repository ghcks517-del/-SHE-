import React from 'react';
import { Settings2, Shield } from 'lucide-react';
import { ServiceId } from '../types/she';

interface HeaderProps {
  currentView: 'dashboard' | 'map' | ServiceId;
  onSelectView: (view: 'dashboard' | 'map' | ServiceId) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectView('dashboard')}
          className="flex items-center gap-2.5 text-left text-base sm:text-lg font-bold tracking-tight text-white hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-sans">한화모멘텀 창원사업장 SHE</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectView('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'dashboard'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            대시보드 종합
          </button>
          <button
            onClick={() => onSelectView('aed')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'aed'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            AED
          </button>
          <button
            onClick={() => onSelectView('she-kiosk')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'she-kiosk'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            SHE오스크
          </button>
          <button
            onClick={() => onSelectView('inventory')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'inventory'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            물품관리
          </button>
          <button
            onClick={() => onSelectView('map')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentView === 'map'
                ? 'text-orange-400 font-semibold border-b-2 border-orange-500'
                : 'hover:text-white'
            }`}
          >
            사업장 안전지도
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Settings2 className="w-3.5 h-3.5 text-orange-400" />
            <span>연동 URL 설정</span>
          </button>
        </div>
      </div>
    </header>
  );
};
