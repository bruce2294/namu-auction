'use client';

import React from 'react';
import { AuctionItem } from '../../types/auction';
import { Sparkles, Calendar, MapPin, TrendingDown, Eye, AlertTriangle, CheckCircle2, ShoppingCart, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getAssetPath } from '@/utils/path';

interface AuctionCardProps {
  item: AuctionItem;
  onSelect: (item: AuctionItem) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({
  item,
  onSelect,
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(item.id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  const formatKRW = (val: number) => {
    if (val >= 100000000) {
      const eok = Math.floor(val / 100000000);
      const man = Math.floor((val % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${man.toLocaleString()}만` : `${eok}억`;
    }
    return `${(val / 10000).toLocaleString()}만원`;
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm hover:shadow-xl dark:hover:shadow-2xl hover:border-sky-400 dark:hover:border-cyan-500/40 overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* 상단 썸네일 & 뱃지 오버레이 */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={getAssetPath(item.thumbnailUrl)}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

        {/* 좌측 상단: 구분 & 상태 뱃지 */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide shadow-md ${
              item.type === 'COURT'
                ? 'bg-blue-600 text-white border border-blue-400/40'
                : 'bg-emerald-600 text-white border border-emerald-400/40'
            }`}
          >
            {item.type === 'COURT' ? '법원경매' : '온비드공매'}
          </span>
          <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-slate-950/80 text-cyan-300 border border-slate-700/60 backdrop-blur-sm">
            {item.status} ({item.failCount}회)
          </span>
        </div>

        {/* 우측 상단: 장바구니 담기 퀵 버튼 & D-Day */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono-nums font-bold bg-rose-500 text-white shadow-md">
            D-{item.dDay}
          </span>
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={inCart ? "장바구니에서 빼기" : "장바구니 담기"}
            title={inCart ? "장바구니에 담김 (클릭 시 취소)" : "장바구니 담기"}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md border text-xs font-bold transition-all shadow-md cursor-pointer ${
              inCart
                ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/40'
                : 'bg-black/50 text-slate-100 border-white/30 hover:bg-sky-600 hover:text-white hover:border-sky-400'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>담김</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>담기</span>
              </>
            )}
          </button>
        </div>

        {/* 썸네일 하단 법원 & 사건번호 오버레이 */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="font-mono-nums tracking-wide font-medium bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
            {item.caseNumber}
          </span>
          <span className="text-[11px] text-slate-200 drop-shadow-sm">{item.courtOrOrg}</span>
        </div>
      </div>

      {/* 본문 콘텐츠 */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 bg-white dark:bg-[#111622] transition-colors">
        {/* 제목 & 물건종류 */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="px-1.5 py-0.5 rounded bg-sky-50 dark:bg-[#171F30] text-sky-700 dark:text-cyan-400 font-semibold border border-sky-200 dark:border-transparent">
              {item.category}
            </span>
            <span>전용 {item.buildingAreaM2}㎡ ({Math.round(item.buildingAreaM2 / 3.3)}평)</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <span className="truncate">{item.addressRoad}</span>
          </p>
        </div>

        {/* 🤖 AI 핵심 브리핑 말풍선 */}
        <div className="rounded-xl p-2.5 bg-sky-50/70 dark:bg-[#080B10]/90 border border-sky-200 dark:border-cyan-500/20 text-xs relative ai-scanline transition-colors">
          <div className="flex items-start gap-1.5 text-sky-900 dark:text-cyan-300 leading-snug">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 text-[11px] sm:text-xs font-medium">
              {item.aiBriefing.headline}
            </span>
          </div>
        </div>

        {/* 가격 지표 섹션 (감정가 vs 최저가 & 저평가율) */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#1E2638] flex items-end justify-between">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>감정가</span>
              <span className="font-mono-nums text-slate-400 dark:text-slate-400 line-through">
                {formatKRW(item.appraisalPrice)}
              </span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-mono-nums tracking-tight">
              {formatKRW(item.minimumPrice)}
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold font-mono-nums">
              <TrendingDown className="w-3.5 h-3.5" />
              {item.aiBriefing.undervalueRatio}% 저평가
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-end gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
              <span>신뢰도 {item.aiBriefing.confidenceGrade}등급</span>
            </div>
          </div>
        </div>

        {/* 매각기일 & 행동 유도 */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#1E2638]/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            매각: {item.auctionDate}
          </span>
          <span className="text-sky-600 dark:text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
            AI 상세분석 &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
