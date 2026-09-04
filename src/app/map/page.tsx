'use client';

import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { MobileNav } from '../../components/common/MobileNav';
import { DetailModal } from '../../components/auction/DetailModal';
import { MOCK_AUCTION_ITEMS } from '../../data/mock-auctions';
import { AuctionItem } from '../../types/auction';
import { getAssetPath } from '@/utils/path';
import {
  MapPin,
  Layers,
  Sparkles,
  Compass,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  TrendingDown,
  Building
} from 'lucide-react';

export default function MapPage() {
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(MOCK_AUCTION_ITEMS[0]);
  const [detailModalItem, setDetailModalItem] = useState<AuctionItem | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(['auc-001']);
  const [selectedType, setSelectedType] = useState<'ALL' | 'COURT' | 'ONBID'>('ALL');

  // 모의 좌표 위치 매핑 (서울/수도권 지도 내 상대 좌표 %)
  const markerPositions: Record<string, { top: string; left: string }> = {
    'auc-001': { top: '65%', left: '55%' }, // 강남 개포 디에이치
    'auc-002': { top: '58%', left: '50%' }, // 서초 반포 르엘
    'auc-003': { top: '78%', left: '68%' }, // 성남 위례 자이
    'auc-004': { top: '85%', left: '48%' }, // 분당 판교 힐스테이트
    'auc-005': { top: '92%', left: '58%' }, // 화성 동탄 랜드마크
    'auc-006': { top: '48%', left: '38%' }, // 서울 마포 자이
  };

  const formatKRW = (val: number) => {
    if (val >= 100000000) {
      const eok = Math.floor(val / 100000000);
      const man = Math.floor((val % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${man.toLocaleString()}만` : `${eok}억`;
    }
    return `${(val / 10000).toLocaleString()}만원`;
  };

  const filteredItems = MOCK_AUCTION_ITEMS.filter(
    (item) => selectedType === 'ALL' || item.type === selectedType
  );

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] overflow-hidden transition-colors duration-200">
      <Header />

      <div className="flex-1 relative flex overflow-hidden">
        {/* 좌측 슬라이딩 물건 리스트 (데스크톱 380px) */}
        <aside className="w-full sm:w-[380px] lg:w-[420px] h-full bg-white dark:bg-[#0F1420] border-r border-slate-200 dark:border-[#1E2638] flex flex-col z-20 shadow-lg">
          {/* 패널 상단 필터바 */}
          <div className="p-4 border-b border-slate-200 dark:border-[#1E2638] space-y-3 bg-slate-50/50 dark:bg-[#111622]/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                지도 내 탐색 ({filteredItems.length}건)
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                실시간 동기화
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-[#080B10] p-1 rounded-xl text-xs">
              {[
                { label: '전체', val: 'ALL' },
                { label: '법원경매', val: 'COURT' },
                { label: '온비드공매', val: 'ONBID' },
              ].map((t) => (
                <button
                  key={t.val}
                  onClick={() => setSelectedType(t.val as any)}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedType === t.val
                      ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 물건 리스트 스크롤 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-cyan-950/40 border-sky-400 dark:border-cyan-500 shadow-md'
                      : 'bg-white dark:bg-[#111622] border-slate-200 dark:border-[#1E2638] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <img
                    src={getAssetPath(item.thumbnailUrl)}
                    alt={item.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-bold text-sky-700 dark:text-cyan-400 font-mono-nums">
                          {item.caseNumber}
                        </span>
                        <span className="text-rose-500 font-bold font-mono-nums">
                          D-{item.dDay}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.addressRoad}
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-1 border-t border-slate-100 dark:border-[#1E2638]">
                      <div>
                        <div className="text-[10px] text-slate-400">최저입찰가</div>
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono-nums">
                          {formatKRW(item.minimumPrice)}
                        </div>
                      </div>
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono-nums">
                        {item.aiBriefing.undervalueRatio}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* 우측 메인 지도 캔버스 (카카오맵 시뮬레이션 뷰) */}
        <div className="flex-1 relative bg-slate-200 dark:bg-[#0A0E17] overflow-hidden">
          {/* 지도 배경 패턴 (서울/수도권 지형도 모의) */}
          <div className="absolute inset-0 opacity-80 dark:opacity-60 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e2638_1px,transparent_1px)] [background-size:24px_24px]">
            {/* 한강 물결 모의 그래픽 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-30" viewBox="0 0 1000 800">
              <path
                d="M 0,350 Q 200,420 400,380 T 800,420 T 1000,360"
                fill="none"
                stroke="#0284C7"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <text x="350" y="375" fill="#0284C7" fontSize="14" fontWeight="bold" opacity="0.8">
                한강 (Han River)
              </text>
            </svg>
          </div>

          {/* 지도 상단 플로팅 컨트롤 */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-[#111622]/90 border border-slate-200 dark:border-[#1E2638] text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
              📍 수도권 신도시 신축 랜드마크 핀맵
            </span>
          </div>

          {/* 지도 우측 컨트롤 버튼 */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
            <button className="p-2 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-md hover:bg-slate-50 dark:hover:bg-[#171F30]">
              <ZoomIn className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>
            <button className="p-2 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-md hover:bg-slate-50 dark:hover:bg-[#171F30]">
              <ZoomOut className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </button>
          </div>

          {/* 지도 위 아파트 마커 핀들 */}
          {filteredItems.map((item) => {
            const pos = markerPositions[item.id] || { top: '50%', left: '50%' };
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedItem(item)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110"
              >
                {/* 핀 뱃지 */}
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg border text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-600 text-white border-white scale-110 ring-4 ring-sky-500/30'
                      : 'bg-white dark:bg-[#111622] text-slate-900 dark:text-white border-slate-300 dark:border-[#1E2638]'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{item.title.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono-nums text-rose-500">D-{item.dDay}</span>
                </div>
                {/* 핀 꼬리 */}
                <div
                  className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${
                    isSelected ? 'bg-sky-600' : 'bg-white dark:bg-[#111622]'
                  }`}
                />
              </div>
            );
          })}

          {/* 선택된 마커의 하단 플로팅 인포윈도우 카드 (클릭 시 세부 모달 오픈) */}
          {selectedItem && (
            <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-30 animate-fadeIn">
              <div className="rounded-2xl p-4 bg-white/95 dark:bg-[#0F1420]/95 border border-sky-300 dark:border-cyan-500/40 shadow-2xl backdrop-blur-md space-y-3">
                <div className="flex gap-3">
                  <img
                    src={getAssetPath(selectedItem.thumbnailUrl)}
                    alt={selectedItem.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-cyan-400 font-semibold mb-0.5">
                      <span>{selectedItem.courtOrOrg}</span>
                      <span>•</span>
                      <span className="font-mono-nums">D-{selectedItem.dDay}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {selectedItem.addressRoad}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-mono-nums">
                        {formatKRW(selectedItem.minimumPrice)}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono-nums">
                        {selectedItem.aiBriefing.undervalueRatio}% 저평가
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E2638] flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    인근 6개월 실거래 기반 정량 분석
                  </span>
                  <button
                    onClick={() => setDetailModalItem(selectedItem)}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                  >
                    <span>AI 상세분석</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 상세 모달 */}
      <DetailModal
        item={detailModalItem}
        onClose={() => setDetailModalItem(null)}
      />

      <MobileNav />
    </div>
  );
}
