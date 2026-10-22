import React, { useState } from 'react';
import {
  Boxes,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  Search,
  Download,
  Send,
  Package,
} from 'lucide-react';

interface InventoryItem {
  id: string;
  category: '머리/얼굴' | '호흡기' | '손/발' | '추락방지' | '응급보건';
  name: string;
  spec: string;
  currentStock: number;
  safetyStock: number;
  unit: string;
  storageBin: string;
  lastRestock: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'PPE-01',
    category: '머리/얼굴',
    name: '통기형 프리미엄 안전모 (흰색)',
    spec: 'KCS 인증 ABE종 / 턱끈 포함',
    currentStock: 48,
    safetyStock: 30,
    unit: '개',
    storageBin: 'A-01-1',
    lastRestock: '2026.10.05',
  },
  {
    id: 'PPE-02',
    category: '호흡기',
    name: '3M 안면부 여과식 방진마스크 1급',
    spec: '8822 (쿨링 밸브형)',
    currentStock: 120,
    safetyStock: 80,
    unit: '매',
    storageBin: 'B-02-3',
    lastRestock: '2026.10.12',
  },
  {
    id: 'PPE-03',
    category: '머리/얼굴',
    name: '김서림방지 고글형 보안경',
    spec: 'UV400 / 폴리카보네이트 내충격',
    currentStock: 35,
    safetyStock: 25,
    unit: '개',
    storageBin: 'A-02-2',
    lastRestock: '2026.09.28',
  },
  {
    id: 'PPE-04',
    category: '손/발',
    name: '고전압 작업용 특수 절연장갑',
    spec: 'Class 0 (1,000V AC 내전압)',
    currentStock: 12,
    safetyStock: 15, // Low stock warning!
    unit: '켤레',
    storageBin: 'C-01-4',
    lastRestock: '2026.08.19',
  },
  {
    id: 'PPE-05',
    category: '손/발',
    name: '절단방지 내마모 코팅장갑',
    spec: 'EN388 Cut Level 5 인증',
    currentStock: 180,
    safetyStock: 100,
    unit: '켤레',
    storageBin: 'C-02-1',
    lastRestock: '2026.10.15',
  },
  {
    id: 'PPE-06',
    category: '추락방지',
    name: '원터치 버클 전체식 안전그네(안전대)',
    spec: '이중 죔줄 + 충격흡수 쇽압소바',
    currentStock: 22,
    safetyStock: 15,
    unit: '세트',
    storageBin: 'D-01-2',
    lastRestock: '2026.10.02',
  },
  {
    id: 'PPE-07',
    category: '응급보건',
    name: '화상치료 전용 쿨젤 드레싱 팩',
    spec: 'Burn Dressing 10x10cm',
    currentStock: 24,
    safetyStock: 20,
    unit: '팩',
    storageBin: 'E-03-1',
    lastRestock: '2026.10.08',
  },
  {
    id: 'PPE-08',
    category: '응급보건',
    name: '포비돈/알코올 소독키트 & 멸균붕대',
    spec: '창원사업장 전용 보건구급함 리필',
    currentStock: 14,
    safetyStock: 15, // Low stock warning
    unit: '세트',
    storageBin: 'E-01-3',
    lastRestock: '2026.09.15',
  },
];

export const InventorySubApp: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const categories = ['all', '머리/얼굴', '호흡기', '손/발', '추락방지', '응급보건'];

  const filteredItems = items.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.storageBin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleDispense = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          if (it.currentStock <= 0) return it;
          return { ...it, currentStock: it.currentStock - 1 };
        }
        return it;
      })
    );
    showNotice(`[현장 불출 완료] ${name} 1건 출급 처리되었습니다.`);
  };

  const handleRestock = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          return { ...it, currentStock: it.currentStock + 10 };
        }
        return it;
      })
    );
    showNotice(`[입고 보충 완료] ${name} +10개 재고가 추가되었습니다.`);
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const lowStockCount = items.filter((it) => it.currentStock < it.safetyStock).length;

  return (
    <div className="p-6 bg-slate-900 text-slate-100 min-h-full">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Boxes className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              안전보호구 및 보건물품 재고관리 시스템
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            총 {items.length}개 품목 관리 · 적정 안전재고 유지율 96.4% · 부서별 출급 등록
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lowStockCount > 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>재고 보충 권고: {lowStockCount}개 품목</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>전 품목 안전재고 충족</span>
            </div>
          )}
        </div>
      </div>

      {notification && (
        <div className="mt-4 p-3 rounded-lg bg-blue-950/70 border border-blue-800 text-blue-300 text-xs flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c === 'all' ? '전체 카테고리' : c}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="품목명, 규격, 보관함 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-800/40 mt-6">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800/80 text-slate-400 border-b border-slate-700/60 font-semibold">
            <tr>
              <th className="py-3 px-4">코드</th>
              <th className="py-3 px-4">분류</th>
              <th className="py-3 px-4">품목명 / 규격</th>
              <th className="py-3 px-4">보관 위치</th>
              <th className="py-3 px-4 text-right">현재고</th>
              <th className="py-3 px-4 text-right">안전재고</th>
              <th className="py-3 px-4 text-center">재고상태</th>
              <th className="py-3 px-4 text-center">빠른 수량 작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredItems.map((item) => {
              const isLow = item.currentStock < item.safetyStock;
              return (
                <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">{item.id}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.spec}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{item.storageBin}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-100 tabular-nums">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-400 tabular-nums">
                    {item.safetyStock} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {isLow ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        <span>보충필요</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>적정</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleDispense(item.id, item.name)}
                        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] flex items-center gap-1 transition-colors"
                        title="현장 1개 불출"
                      >
                        <Minus className="w-3 h-3 text-red-400" />
                        <span>불출</span>
                      </button>
                      <button
                        onClick={() => handleRestock(item.id, item.name)}
                        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] flex items-center gap-1 transition-colors"
                        title="재고 +10개 입고"
                      >
                        <Plus className="w-3 h-3 text-emerald-400" />
                        <span>입고</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
