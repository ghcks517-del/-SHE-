import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, ExternalLink, Copy, Check, Smartphone } from 'lucide-react';
import { SheService } from '../types/she';

interface QrCodeModalProps {
  service: SheService | null;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ service, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!service) return;
    QRCode.toDataURL(service.url, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [service]);

  if (!service) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(service.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">모바일 현장 접속 QR 코드</h3>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          창원사업장 현장 작업자 또는 안전관리자 모바일 기기 카메라로 스캔하여{' '}
          <strong className="text-slate-200">{service.name}</strong> 페이지에 바로 접속하세요.
        </p>

        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl mb-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`${service.name} QR Code`}
              className="w-48 h-48 rounded"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
              QR 코드 생성 중...
            </div>
          )}
          <span className="text-[11px] font-medium text-slate-600 mt-2">
            스마트폰 카메라로 스캔 시 즉시 연결
          </span>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700 mb-5">
          <div className="text-[11px] text-slate-400 mb-1 font-mono">연동 대상 URL</div>
          <div className="text-xs text-slate-200 font-mono break-all truncate">
            {service.url}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>주소 복사</span>
              </>
            )}
          </button>
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition-colors"
          >
            <span>새 창에서 열기</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
