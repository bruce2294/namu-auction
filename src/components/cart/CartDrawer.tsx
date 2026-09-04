'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  X,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, isCartOpen, closeCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isCartOpen) return null;

  // 총 감정가 및 보증금 합계 계산
  const totalAppraisal = cartItems.reduce((acc, cur) => acc + cur.appraisalPrice, 0);
  const totalMinimum = cartItems.reduce((acc, cur) => acc + cur.minimumPrice, 0);
  const totalDeposit = Math.floor(totalMinimum * 0.1); // 입찰보증금 통상 10%

  const formatKRW = (amount: number) => {
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    if (eok > 0) {
      return `${eok}억 ${man > 0 ? `${man.toLocaleString()}만` : ''}원`;
    }
    return `${man.toLocaleString()}만원`;
  };

  const handleOrderConsultation = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      closeCart();
      alert('담으신 경·공매 매물에 대한 [일괄 입찰 대행 & AI 맞춤 상담] 신청이 완료되었습니다. 전문 컨설턴트가 곧 연락드립니다.');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* 바깥 배경 클릭 시 닫기 */}
      <div className="flex-1" onClick={closeCart} />

      {/* 장바구니 사이드 슬라이드 드로어 */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0F1420] h-full shadow-2xl border-l border-slate-200 dark:border-[#1E2638] flex flex-col justify-between animate-slideLeft transition-colors">
        {/* 상단 헤더 */}
        <div className="p-5 border-b border-slate-200 dark:border-[#1E2638] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-cyan-950/60 text-sky-600 dark:text-cyan-400 flex items-center justify-center border border-sky-200 dark:border-cyan-500/30">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                경·공매 입찰 장바구니
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500 text-white font-bold">
                  {cartItems.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                입찰을 고려 중인 매물을 모아 총 필요자금을 시뮬레이션하세요
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2638] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 중단: 장바구니 상품 목록 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-[#1A2234] text-slate-400 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                장바구니가 비어 있습니다
              </p>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                마음에 드는 신축 아파트 경·공매 매물에서 <br />
                <span className="font-semibold text-sky-600 dark:text-cyan-400">[장바구니 담기]</span> 버튼을 눌러보세요!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-1 text-xs text-slate-500">
                <span>선택된 매물 ({cartItems.length}개)</span>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1 hover:text-rose-500 transition-colors text-[11px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  전체 삭제
                </button>
              </div>

              {cartItems.map((item) => {
                const deposit = Math.floor(item.minimumPrice * 0.1);
                return (
                  <div
                    key={item.id}
                    className="group relative p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141A28] border border-slate-200 dark:border-[#1E2638] hover:border-sky-300 dark:hover:border-cyan-500/40 transition-all space-y-2.5 shadow-sm"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-200 dark:border-slate-800"
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-400">
                            {item.courtOrOrg} · D-{item.dDay}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white truncate mt-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {item.addressRoad}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-black text-slate-900 dark:text-white font-mono-nums">
                            최저 {formatKRW(item.minimumPrice)}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {item.aiBriefing.undervalueRatio}% 저평가
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 입찰 보증금 안내 뱃지 */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-[#1E2638] text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">필요 입찰보증금(10%)</span>
                      <span className="font-mono-nums font-bold text-sky-600 dark:text-cyan-400">
                        {formatKRW(deposit)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* 하단 결제/상담신청 바 */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-[#1E2638] bg-white dark:bg-[#0F1420] space-y-3.5 shadow-lg">
            {/* 총 합계 계산서 */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>담긴 매물 총 감정가</span>
                <span className="font-mono-nums font-semibold">{formatKRW(totalAppraisal)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>담긴 매물 총 최저입찰가</span>
                <span className="font-mono-nums font-semibold text-slate-800 dark:text-slate-200">
                  {formatKRW(totalMinimum)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 dark:border-[#1E2638]">
                <span className="font-bold text-slate-800 dark:text-white">총 필요 입찰보증금 합계</span>
                <span className="font-mono-nums font-black text-base text-sky-600 dark:text-cyan-400">
                  {formatKRW(totalDeposit)}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderConsultation}
              disabled={isOrdered}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 dark:from-cyan-500 dark:to-emerald-500 hover:from-sky-500 hover:to-teal-500 text-white dark:text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isOrdered ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin" />
                  <span>신청서 접수 중...</span>
                </>
              ) : (
                <>
                  <span>선택 매물 일괄 입찰의뢰 & AI 상담</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>권리분석 100% 안심 보증 및 취득세/DSR 사전 심사 포함</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
