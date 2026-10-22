import React, { useState } from 'react';
import { X, Check, RotateCcw, Link2, ExternalLink, Save } from 'lucide-react';
import { SheService } from '../types/she';
import { DEFAULT_SERVICES } from '../data/defaultConfig';

interface UrlSettingsModalProps {
  services: SheService[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedServices: SheService[]) => void;
}

export const UrlSettingsModal: React.FC<UrlSettingsModalProps> = ({
  services,
  isOpen,
  onClose,
  onSave,
}) => {
  const [urls, setUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    services.forEach((s) => {
      initial[s.id] = s.url;
    });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (id: string, val: string) => {
    setUrls((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {
    const resetVals: Record<string, string> = {};
    DEFAULT_SERVICES.forEach((s) => {
      resetVals[s.id] = s.url;
    });
    setUrls(resetVals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = services.map((s) => ({
      ...s,
      url: urls[s.id]?.trim() || s.url,
    }));
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-5 text-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1.5">
          <Link2 className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            연동 웹앱 URL 설정
          </h2>
        </div>

        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          버튼 클릭 시 이동할 웹페이지 주소를 입력하세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: svc.accentColor }}
                  />
                  {svc.name}
                </span>

                {urls[svc.id] && (
                  <a
                    href={urls[svc.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-orange-600 hover:text-orange-700 font-medium"
                  >
                    <span>새 창 테스트</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <input
                type="url"
                required
                placeholder="https://..."
                value={urls[svc.id] || ''}
                onChange={(e) => handleChange(svc.id, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기값 복원</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>저장됨</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>설정 저장</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
