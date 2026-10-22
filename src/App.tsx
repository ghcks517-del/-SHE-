import React, { useState } from 'react';
import {
  HeartPulse,
  MonitorCheck,
  Boxes,
  Settings,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import { SheService } from './types/she';
import { DEFAULT_SERVICES, STORAGE_KEY_SERVICES } from './data/defaultConfig';
import { UrlSettingsModal } from './components/UrlSettingsModal';

export default function App() {
  const [services, setServices] = useState<SheService[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (stored) {
        const parsed: SheService[] = JSON.parse(stored);
        return DEFAULT_SERVICES.map((def) => {
          const found = parsed.find((p) => p.id === def.id);
          return found ? { ...def, url: found.url } : def;
        });
      }
    } catch (e) {
      console.warn('Failed to load services from localStorage:', e);
    }
    return DEFAULT_SERVICES;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  const handleSaveServices = (updated: SheService[]) => {
    setServices(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save services to localStorage:', e);
    }
  };

  const handleButtonClick = (service: SheService) => {
    setLastClickedId(service.id);
    setTimeout(() => setLastClickedId(null), 400);

    if (service.url) {
      window.open(service.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-7 h-7 text-red-500 shrink-0" />;
      case 'MonitorCheck':
        return <MonitorCheck className="w-7 h-7 text-orange-500 shrink-0" />;
      case 'Boxes':
        return <Boxes className="w-7 h-7 text-blue-500 shrink-0" />;
      default:
        return <Shield className="w-7 h-7 text-orange-500 shrink-0" />;
    }
  };

  const getIconBackground = (id: string) => {
    switch (id) {
      case 'aed':
        return 'bg-red-50 border-red-100';
      case 'she-kiosk':
        return 'bg-orange-50 border-orange-100';
      case 'inventory':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col justify-between selection:bg-orange-500 selection:text-white font-sans">
      {/* Top Mobile App Bar - Bright theme */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-4 py-3.5">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
                한화모멘텀 창원사업장 SHE
              </h1>
              <p className="text-[11px] font-medium text-slate-500 mt-1">
                모바일 통합 바로가기
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 active:scale-95 transition-all"
            title="연동 URL 설정"
            aria-label="연동 URL 설정"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Mobile Screen: Centered 3 Large Click Buttons - Bright Cards */}
      <main className="flex-1 max-w-md w-full mx-auto px-5 py-6 flex flex-col justify-center">
        <div className="space-y-4 my-auto">
          {services.map((svc) => {
            const isPressed = lastClickedId === svc.id;
            return (
              <button
                key={svc.id}
                onClick={() => handleButtonClick(svc)}
                className={`w-full group text-left relative overflow-hidden rounded-2xl p-5 border bg-white shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.98] flex items-center justify-between ${
                  isPressed
                    ? 'border-orange-500 ring-2 ring-orange-500/30'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
                style={{
                  minHeight: '94px',
                }}
              >
                {/* Left: Icon & Button Label */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl border flex items-center justify-center shadow-xs ${getIconBackground(
                      svc.id
                    )}`}
                  >
                    {getServiceIcon(svc.iconName)}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5 group-hover:text-orange-600 transition-colors">
                      <span>{svc.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {svc.tagline}
                    </div>
                  </div>
                </div>

                {/* Right: Touch Arrow Indicator */}
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-orange-500 group-hover:text-white border border-slate-200/80 flex items-center justify-center text-slate-500 transition-all shrink-0">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </main>



      {/* Settings Modal */}
      <UrlSettingsModal
        services={services}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveServices}
      />
    </div>
  );
}
