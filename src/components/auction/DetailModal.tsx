import React, { useState } from 'react';
import { AuctionItem } from '../../types/auction';
import {
  X,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  Calculator,
  ShoppingCart,
  Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface DetailModalProps {
  item: AuctionItem | null;
  onClose: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'briefing' | 'price' | 'simulator'>('briefing');
  const [userHouseCount, setUserHouseCount] = useState<number>(1);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const { addToCart, removeFromCart, isInCart } = useCart();

  if (!item) return null;

  const inCart = isInCart(item.id);

  const handleCartToggle = () => {
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
      return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${(val / 10000).toLocaleString()}만원`;
  };

  // 취득세 시뮬레이션
  const calculateTax = () => {
    let rate = 1.1;
    if (userHouseCount === 1) rate = 1.1;
    else if (userHouseCount === 2) rate = 8.0;
    else rate = 12.0;
    const taxAmount = Math.round(item.minimumPrice * (rate / 100));
    return { rate, taxAmount };
  };

  const { rate, taxAmount } = calculateTax();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0F1420] border border-slate-200 dark:border-[#1E2638] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors duration-200">
        {/* 모달 상단 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-[#1E2638] bg-slate-50/90 dark:bg-[#080B10]/80 sticky top-0 z-20 transition-colors">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                item.type === 'COURT'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {item.type === 'COURT' ? '법원경매' : '온비드공매'}
            </span>
            <span className="font-mono-nums text-sm font-bold text-slate-800 dark:text-slate-200">
              {item.caseNumber}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline-block">
              {item.courtOrOrg}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCartToggle}
              title={inCart ? "장바구니에 담김 (클릭 시 취소)" : "장바구니에 담기"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                inCart
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-white dark:bg-[#171F30] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#1E2638] hover:bg-slate-100'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>장바구니 담김</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>장바구니 담기</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white dark:bg-[#171F30] hover:bg-slate-100 dark:hover:bg-[#202B42] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E2638] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 본문 스크롤 영역 */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* 타이틀 및 주소 */}
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-cyan-400 font-semibold mb-1">
              <span>{item.category}</span>
              <span>•</span>
              <span>전용 {item.buildingAreaM2}㎡ ({Math.round(item.buildingAreaM2 / 3.3)}평)</span>
              <span>•</span>
              <span className="text-rose-500 dark:text-rose-400 font-bold font-mono-nums">D-{item.dDay}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {item.addressRoad} (지번: {item.addressJibun})
            </p>
          </div>

          {/* 📷 신축 아파트 고화질 사진 갤러리 */}
          <div className="space-y-2">
            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E2638] bg-slate-100 dark:bg-slate-900 shadow-sm">
              <img
                src={item.images[activeImgIndex] || item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-mono-nums">
                {activeImgIndex + 1} / {item.images.length}
              </div>
            </div>

            {/* 미니 썸네일 스트립 */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImgIndex === idx
                        ? 'border-sky-500 dark:border-cyan-400 scale-105 shadow-md'
                        : 'border-slate-200 dark:border-[#1E2638] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="단지 사진" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🤖 핵심 AI 브리핑 카드 */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-[#111622] dark:via-[#0B101B] dark:to-[#0A1A2A] border border-sky-200 dark:border-cyan-500/30 relative overflow-hidden ai-scanline shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-cyan-500/20 border border-sky-300 dark:border-cyan-500/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                  AI 자율 분석 리포트
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30 font-semibold">
                정확도 등급: {item.aiBriefing.confidenceGrade}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              &ldquo;{item.aiBriefing.headline}&rdquo;
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-[#1E2638]">
              <div className="bg-white dark:bg-[#080B10]/80 p-3 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">감정평가액</div>
                <div className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 font-mono-nums">
                  {formatKRW(item.appraisalPrice)}
                </div>
              </div>
              <div className="bg-white dark:bg-[#080B10]/80 p-3 rounded-xl border border-sky-400 dark:border-cyan-500/40 shadow-sm">
                <div className="text-[11px] text-sky-600 dark:text-cyan-400 font-bold">최저입찰가</div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-mono-nums">
                  {formatKRW(item.minimumPrice)}
                </div>
              </div>
              <div className="bg-white dark:bg-[#080B10]/80 p-3 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">인근 예상 시세</div>
                <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono-nums">
                  {formatKRW(item.aiBriefing.estimatedMarketPrice)}
                </div>
              </div>
              <div className="bg-white dark:bg-[#080B10]/80 p-3 rounded-xl border border-emerald-300 dark:border-emerald-500/40 shadow-sm">
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">시세 대비 저평가율</div>
                <div className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400 font-mono-nums">
                  {item.aiBriefing.undervalueRatio}%
                </div>
              </div>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex border-b border-slate-200 dark:border-[#1E2638] text-sm font-medium gap-6">
            <button
              onClick={() => setActiveTab('briefing')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'briefing'
                  ? 'text-sky-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              1. 종합 브리핑
              {activeTab === 'briefing' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 dark:bg-cyan-400 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('price')}
              className={`pb-3 relative transition-colors ${
                activeTab === 'price'
                  ? 'text-sky-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              2. 국토부 실거래가 분석
              {activeTab === 'price' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 dark:bg-cyan-400 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`pb-3 relative transition-colors flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'text-sky-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              3. 세금 & 대출 시뮬레이터
              {activeTab === 'simulator' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600 dark:bg-cyan-400 rounded-full" />
              )}
            </button>
          </div>

          {/* 탭별 내용 */}
          {activeTab === 'briefing' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638] space-y-2">
                <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  권리 및 점유 리스크 점검 결과
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.aiBriefing.riskSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638]">
                  <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">입찰보증금 (10%)</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono-nums">
                    {formatKRW(item.bidDeposit)}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    * 수표 1장으로 미리 인출하여 준비 권장
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638]">
                  <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">매각기일 및 장소</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white">
                    {item.auctionDate} (10:00)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {item.courtOrOrg} 경매법정
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'price' && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    반경 1.5km 유사 면적 최근 실거래가 (국토교통부 연동)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">표본: {item.aiBriefing.recentDealCount}건</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  이상치(표준편차 2배 초과)를 필터링한 정량 통계 분석 결과입니다. 현재 최저가는 인근 실거래 시세 대비 약 <strong className="text-emerald-600 dark:text-emerald-400">{Math.abs(item.aiBriefing.undervalueRatio)}% 저렴</strong>한 구간에 위치해 있습니다.
                </p>
                <div className="h-32 bg-white dark:bg-[#080B10] rounded-lg border border-slate-200 dark:border-[#1E2638] flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs shadow-inner">
                  [실거래가 추이 시각화 차트: 평균 거래선 {formatKRW(item.aiBriefing.estimatedMarketPrice)} 대비 현재 최저가 {formatKRW(item.minimumPrice)}]
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200">
                    내 보유 주택수 선택 (정책 룰 엔진 적용)
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-[#080B10] p-1 rounded-lg border border-slate-200 dark:border-[#1E2638]">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setUserHouseCount(num)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          userHouseCount === num
                            ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {num === 3 ? '3주택 이상' : `${num}주택`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white dark:bg-[#080B10] p-3 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                    <div className="text-xs text-slate-500 dark:text-slate-400">예상 취득세율 및 세액</div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono-nums mt-1">
                      {rate}% ({formatKRW(taxAmount)})
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {userHouseCount >= 2 ? '다주택 취득세 중과 대상' : '기본 취득세율 구간 적용'}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#080B10] p-3 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                    <div className="text-xs text-slate-500 dark:text-slate-400">예상 대출 가능 한도</div>
                    <div className="text-lg font-bold text-sky-600 dark:text-cyan-400 font-mono-nums mt-1">
                      {item.aiBriefing.loanEstimatedLimit}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      * DSR 및 차주 소득에 따라 변동 가능
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 법적 면책 고지 */}
          <div className="rounded-xl p-3.5 bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-300">⚠️ 법적 면책 안내:</strong> 본 AI 브리핑 및 시세/세금 시뮬레이션 결과는 공공데이터 및 공개된 법률·정책 규칙을 기반으로 한 참고용 추정치입니다. 실제 입찰에 따른 권리분석, 대출 가능 여부 및 최종 세액은 반드시 현장 조사 및 공인 전문가(세무사, 법무사 등)의 검증을 거치시기 바랍니다.
          </div>
        </div>

        {/* 모달 하단 고정 액션바 */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-[#1E2638] bg-slate-50/90 dark:bg-[#080B10] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky bottom-0 z-20 transition-colors">
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">최저입찰가 (10% 보증금: {formatKRW(Math.floor(item.minimumPrice * 0.1))})</div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-mono-nums">
              {formatKRW(item.minimumPrice)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCartToggle}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                inCart
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/40'
                  : 'bg-white dark:bg-[#171F30] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#1E2638] hover:bg-slate-100'
              }`}
            >
              {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              <span>{inCart ? '장바구니 담김' : '장바구니 담기'}</span>
            </button>
            <button
              onClick={() => alert(`[사건번호: ${item.caseNumber}] 전문가 1:1 입찰 상담 신청이 접수되었습니다.`)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-cyan-600 dark:to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              전문가 입찰 상담 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
