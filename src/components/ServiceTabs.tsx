import React from 'react';
import {
  HeartPulse,
  MonitorCheck,
  Boxes,
  ExternalLink,
  Maximize2,
  QrCode,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SheService, ServiceId } from '../types/she';

interface ServiceTabsProps {
  services: SheService[];
  activeServiceId?: ServiceId;
  onSelectService: (id: ServiceId) => void;
  onOpenExternal: (url: string) => void;
  onShowQr: (service: SheService) => void;
}

export const ServiceTabs: React.FC<ServiceTabsProps> = ({
  services,
  activeServiceId,
  onSelectService,
  onOpenExternal,
  onShowQr,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-red-500" />;
      case 'MonitorCheck':
        return <MonitorCheck className="w-6 h-6 text-orange-500" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-blue-500" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            창원사업장 핵심 SHE 3대 연동 서비스
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            메뉴 탭을 클릭하여 제작된 웹앱으로 즉시 이동하거나 통합 뷰어로 바로 관리할 수 있습니다.
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>연동 상태:</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3개 서비스 정상 연결됨</span>
          </span>
        </div>
      </div>

      {/* 3 Main Service Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {services.map((service, index) => {
          const isSelected = activeServiceId === service.id;
          return (
            <div
              key={service.id}
              className={`group relative rounded-xl bg-slate-800/80 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-orange-500 shadow-[0_0_20px_rgba(243,115,33,0.15)] ring-1 ring-orange-500'
                  : 'border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="p-5">
                {/* Top service header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                        <span>0{index + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span>{service.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => onShowQr(service)}
                    title="모바일 QR 접속"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Tagline & Description */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Metrics 3-column strip */}
                {service.metrics && service.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 mb-4">
                    {service.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                        <div className="text-xs font-bold text-white font-mono tabular-nums mt-0.5">
                          {m.value}
                          {m.unit && <span className="text-[10px] font-normal text-slate-400 ml-0.5">{m.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick features unboxed metadata */}
                {service.quickFeatures && service.quickFeatures.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-400">
                    {service.quickFeatures.slice(0, 3).map((feat, fIdx) => (
                      <React.Fragment key={fIdx}>
                        <span>{feat}</span>
                        {fIdx < 2 && <span aria-hidden="true" className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons Section */}
              <div className="px-5 py-3.5 bg-slate-900/60 border-t border-slate-700/60 rounded-b-xl flex items-center gap-2">
                {/* Primary Action: Direct External Webpage Navigation */}
                <button
                  onClick={() => onOpenExternal(service.url)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 transition-colors shadow-xs"
                >
                  <span>웹페이지 즉시 이동</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {/* Secondary Action: Open in Portal Integrated Workspace */}
                <button
                  onClick={() => onSelectService(service.id)}
                  title="포털 내 통합 뷰어로 열기"
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">통합 뷰어</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
