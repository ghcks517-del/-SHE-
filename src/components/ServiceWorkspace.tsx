import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  QrCode,
  Settings2,
  Maximize2,
  ShieldCheck,
  AlertCircle,
  Eye,
  Layers,
} from 'lucide-react';
import { SheService } from '../types/she';
import { AedSubApp } from './subapps/AedSubApp';
import { SheKioskSubApp } from './subapps/SheKioskSubApp';
import { InventorySubApp } from './subapps/InventorySubApp';

interface ServiceWorkspaceProps {
  service: SheService;
  onBack: () => void;
  onOpenSettings: () => void;
  onShowQr: (service: SheService) => void;
  onOpenExternal: (url: string) => void;
}

export const ServiceWorkspace: React.FC<ServiceWorkspaceProps> = ({
  service,
  onBack,
  onOpenSettings,
  onShowQr,
  onOpenExternal,
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'iframe'>('interactive');
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(service.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReloadIframe = () => {
    setIframeKey((prev) => prev + 1);
    setIframeFailed(false);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-130px)] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Workspace Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/90 border-b border-slate-800 text-xs">
        {/* Left: Navigation and Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>대시보드로 복귀</span>
          </button>

          <span className="text-slate-700" aria-hidden="true">
            |
          </span>

          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: service.accentColor }}
            />
            <h2 className="text-sm font-bold text-white tracking-tight">
              {service.name}
            </h2>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              ({service.category})
            </span>
          </div>
        </div>

        {/* Center: Mode Switcher (Interactive System vs iFrame Embed) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'interactive'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>통합 워크스페이스</span>
          </button>
          <button
            onClick={() => setViewMode('iframe')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'iframe'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>웹 프레임 임베드</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'iframe' && (
            <button
              onClick={handleReloadIframe}
              title="프레임 새로고침"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleCopyUrl}
            title="연동 URL 복사"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">URL 복사</span>
              </>
            )}
          </button>

          <button
            onClick={() => onShowQr(service)}
            title="모바일 QR 코드 보기"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            title="URL 주소 변경"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenExternal(service.url)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-colors"
          >
            <span>새 창에서 열기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target URL indicator bar */}
      <div className="px-4 py-1.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="text-slate-500">연결 주소:</span>
          <span className="text-slate-300 truncate">{service.url}</span>
        </div>
        <div className="shrink-0 text-slate-400">
          관리 책임: {service.manager}
        </div>
      </div>

      {/* Workspace Content Area */}
      <div className="flex-1 relative overflow-y-auto">
        {viewMode === 'interactive' ? (
          <div>
            {service.id === 'aed' && <AedSubApp />}
            {service.id === 'she-kiosk' && <SheKioskSubApp />}
            {service.id === 'inventory' && <InventorySubApp />}
          </div>
        ) : (
          <div className="h-full min-h-[600px] flex flex-col bg-slate-950">
            {iframeFailed ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-300">
                <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">
                  외부 웹사이트 임베드 보호 (X-Frame-Options) 알림
                </h3>
                <p className="max-w-md text-xs text-slate-400 mb-6 leading-relaxed">
                  연동된 웹사이트 보안 정책상 iframe 내부 표시가 차단될 수 있습니다. 아래 버튼을 눌러 새 창에서 즉시 실행하시거나 상단의 [통합 워크스페이스] 모드를 이용해 주세요.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenExternal(service.url)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold"
                  >
                    <span>새 창에서 바로 열기</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('interactive')}
                    className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                  >
                    통합 화면으로 전환
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={service.url}
                title={service.name}
                className="w-full h-full min-h-[700px] border-none bg-slate-900"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                onError={() => setIframeFailed(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
