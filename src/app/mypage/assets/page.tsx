'use client';

import React, { useState } from 'react';
import { Header } from '../../../components/common/Header';
import { MobileNav } from '../../../components/common/MobileNav';
import { AIThinkingIndicator } from '../../../components/common/AIThinkingIndicator';
import { AuctionCard } from '../../../components/auction/AuctionCard';
import { DetailModal } from '../../../components/auction/DetailModal';
import { MOCK_AUCTION_ITEMS } from '../../../data/mock-auctions';
import { MOCK_POLICY_RULES } from '../../../data/mock-policies';
import { AuctionItem } from '../../../types/auction';
import {
  Sparkles,
  Building,
  Scale,
  Wallet,
  Coins,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default function AssetManagementPage() {
  // 사용자 자산 프로필 상태
  const [houseCount, setHouseCount] = useState<number>(1);
  const [availableCash, setAvailableCash] = useState<number>(250000000); // 가용자금 2.5억
  const [annualIncome, setAnnualIncome] = useState<number>(85000000); // 연소득 8,500만
  const [existingDebt, setExistingDebt] = useState<number>(200000000); // 기존대출 2억
  const [targetPreference, setTargetPreference] = useState<'CAPITAL_GAIN' | 'RENTAL_YIELD'>('CAPITAL_GAIN');

  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(['auc-001', 'auc-002']);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const formatKRW = (val: number) => {
    if (val >= 100000000) {
      const eok = Math.floor(val / 100000000);
      const man = Math.floor((val % 100000000) / 10000);
      return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
    }
    return `${(val / 10000).toLocaleString()}만원`;
  };

  // 내 자산 조건에 부합하는 맞춤 추천 물건 필터링 및 추천 사유 생성
  const recommendedItems = MOCK_AUCTION_ITEMS.filter((item) => {
    // 1주택자의 경우 비규제지역 아파트 또는 공매 오피스텔 추천
    if (houseCount === 1) {
      return item.category === '아파트' || item.category === '오피스텔';
    } else if (houseCount >= 2) {
      // 다주택자는 취득세 중과 회피용 오피스텔/상가 우선 추천
      return item.category === '오피스텔' || item.category === '상가/근린';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] pb-24 md:pb-16 transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        {/* 상단 브레드크럼 & 타이틀 */}
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-cyan-400 font-semibold mb-1">
            <span>마이페이지</span>
            <span>&gt;</span>
            <span>자산관리 & AI 정책 매칭</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                자산관리 & 최신 정부 정책 맞춤형 경매 투자
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                내 주택수와 가용 자금에 최신 부동산 정책(DSR 2단계, 취득세 중과)을 결합하여 실패 없는 입찰 전략을 AI가 브리핑합니다.
              </p>
            </div>
            <AIThinkingIndicator label="정책 버전: 2026.09 고시 기준 연동" />
          </div>
        </div>

        {/* 1. 최신 부동산 정책 브리핑 배너 */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-sky-50 to-teal-50 dark:from-[#111622] dark:to-[#0B1525] border border-sky-200 dark:border-cyan-500/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-cyan-500/20 text-sky-700 dark:text-cyan-300 flex-shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-800 dark:text-cyan-300">
                실시간 정부 정책 알림 (2026 하반기)
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                스트레스 DSR 2단계(+1.20%p) 시행 & 비규제지역 다주택 취득세 완화 유지
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                대출 한도가 다소 축소되었으나, 마포·성동·영등포 등 비규제지역 2주택 매수 시 취득세 8% 중과가 배제되어 틈새 경매 기회가 발생하고 있습니다.
              </p>
            </div>
          </div>
          <a
            href="/#policy"
            className="px-4 py-2 rounded-xl bg-white dark:bg-[#080B10] border border-sky-300 dark:border-cyan-500/40 text-xs font-bold text-sky-700 dark:text-cyan-300 shadow-sm hover:bg-sky-50 dark:hover:bg-[#171F30] whitespace-nowrap self-start md:self-auto transition-colors"
          >
            정책 규정 전문 보기
          </a>
        </div>

        {/* 2. 대시보드 2열 구조 (좌측: 내 자산 프로필 / 우측: AI 자산 브리핑) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측: 자산 프로필 설정 폼 */}
          <div className="lg:col-span-1 rounded-2xl p-5 bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E2638]">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                내 투자 프로필 설정
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">실시간 반영 중</span>
            </div>

            {/* 보유 주택수 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                현재 보유 주택 수
              </label>
              <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-[#080B10] p-1 rounded-xl border border-slate-200 dark:border-[#1E2638]">
                {[0, 1, 2, 3].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setHouseCount(cnt)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      houseCount === cnt
                        ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cnt === 0 ? '무주택' : cnt === 3 ? '3주택+' : `${cnt}주택`}
                  </button>
                ))}
              </div>
            </div>

            {/* 가용 현금 투자금 */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-300">가용 현금 투자금</label>
                <span className="font-mono-nums font-bold text-sky-600 dark:text-cyan-400">
                  {formatKRW(availableCash)}
                </span>
              </div>
              <input
                type="range"
                min={50000000}
                max={1000000000}
                step={25000000}
                value={availableCash}
                onChange={(e) => setAvailableCash(Number(e.target.value))}
                className="w-full accent-sky-600 dark:accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5천만원</span>
                <span>5억원</span>
                <span>10억원</span>
              </div>
            </div>

            {/* 연소득 (DSR 산출) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700 dark:text-slate-300">차주 연소득 (DSR 계산용)</label>
                <span className="font-mono-nums font-bold text-slate-800 dark:text-slate-200">
                  {formatKRW(annualIncome)}
                </span>
              </div>
              <input
                type="range"
                min={30000000}
                max={200000000}
                step={10000000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full accent-sky-600 dark:accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* 투자 목적 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">투자 주안점</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setTargetPreference('CAPITAL_GAIN')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    targetPreference === 'CAPITAL_GAIN'
                      ? 'bg-sky-50 dark:bg-cyan-950/60 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#080B10] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1E2638]'
                  }`}
                >
                  시세차익형 (아파트)
                </button>
                <button
                  onClick={() => setTargetPreference('RENTAL_YIELD')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    targetPreference === 'RENTAL_YIELD'
                      ? 'bg-sky-50 dark:bg-cyan-950/60 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#080B10] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1E2638]'
                  }`}
                >
                  월세수익형 (상가/오피스)
                </button>
              </div>
            </div>
          </div>

          {/* 우측: 🤖 AI 자산 분석 & 최적 전략 브리핑 */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-gradient-to-br from-white via-sky-50/50 to-teal-50/30 dark:from-[#111622] dark:via-[#0B101B] dark:to-[#0A1A2A] border border-sky-200 dark:border-cyan-500/30 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-sky-100 dark:bg-cyan-500/20 text-sky-600 dark:text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    AI 자산 & 정책 맞춤형 진단 리포트
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    회원님의 자산 프로필 기준 최적 낙찰 가이드라인
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                적합 매물 3건 매칭
              </span>
            </div>

            {/* 핵심 자연어 브리핑 */}
            <div className="p-4 rounded-xl bg-white/90 dark:bg-[#080B10]/80 border border-sky-200 dark:border-cyan-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium ai-scanline shadow-sm">
              &ldquo;회원님은 현재 <strong>{houseCount === 0 ? '무주택자' : `${houseCount}주택자`}</strong>이며, 가용 자금 <strong>{formatKRW(availableCash)}</strong>과 연소득 <strong>{formatKRW(annualIncome)}</strong>을 보유하고 계십니다.
              {houseCount === 1 ? (
                <span> 최신 지방세법에 따라 <strong>비규제지역(마포/성동/영등포) 아파트 낙찰 시 8% 중과 없이 1.1~3.3% 기본세율</strong>이 적용되며, 스트레스 DSR 2단계 적용 하에서도 최저가 11~14억원대 아파트 입찰 시 레버리지와 실투자금 매칭이 가장 안정적입니다.</span>
              ) : houseCount >= 2 ? (
                <span> 다주택 취득세 12% 중과를 피하기 위해 주택 수에 포함되지 않거나 업무용으로 활용 가능한 <strong>온비드 공매 오피스텔 및 상가(단일세율 4.6%)</strong>에 집중하시는 전략을 강력 권장합니다.</span>
              ) : (
                <span> 생애최초 LTV 80% 혜택 및 특례 대출을 활용하여 감정가 대비 20% 이상 유찰된 서울 역세권 6~9억원대 아파트 경매가 최적의 내집마련 기회입니다.</span>
              )}&rdquo;
            </div>

            {/* 3대 핵심 시뮬레이션 지표 박스 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-[#080B10] p-3.5 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">추천 낙찰 목표가 범위</div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono-nums mt-1">
                  {houseCount === 1 ? '11.5억 ~ 14.5억' : houseCount >= 2 ? '3억 ~ 6억원' : '6억 ~ 9억원'}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">가용자금 내 보증금 100% 충족</div>
              </div>

              <div className="bg-white dark:bg-[#080B10] p-3.5 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">예상 최대 대출 가능액</div>
                <div className="text-base font-extrabold text-sky-600 dark:text-cyan-400 font-mono-nums mt-1">
                  {houseCount === 1 ? '최대 8.1억원' : houseCount >= 2 ? '최대 3.5억원' : '최대 5.8억원'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">DSR 40% 한도 안전선 적용</div>
              </div>

              <div className="bg-white dark:bg-[#080B10] p-3.5 rounded-xl border border-slate-200 dark:border-[#1E2638] shadow-sm">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">적용 취득세율</div>
                <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 font-mono-nums mt-1">
                  {houseCount === 1 ? '1.1% ~ 3.3%' : houseCount >= 2 ? '4.6% (공매)' : '1.1% (기본)'}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">중과세율 완화 최적화</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 🎯 나에게 딱 맞는 AI 추천 경공매 물건 리스트 */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-sky-600 dark:text-cyan-400 font-bold mb-0.5">
                AI 정책 & 자산 매칭 엔진
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                회원님의 프로필에 최적화된 추천 물건 ({recommendedItems.length}건)
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              실거래 저평가율 및 규제 리스크 검증 완료
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {recommendedItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <AuctionCard
                  item={item}
                  onSelect={(sel) => setSelectedItem(sel)}
                />
                {/* 🌟 추천 사유 브리핑 바텀 칩 (차별화 포인트) */}
                <div className="mt-2 p-2.5 rounded-xl bg-sky-50/90 dark:bg-[#111622] border border-sky-200 dark:border-cyan-500/30 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="font-bold text-sky-800 dark:text-cyan-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>추천 사유: {item.aiBriefing.undervalueRatio}% 저평가 + 중과세 회피 적합</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px]">
                    예상 실투자금: 보증금 {formatKRW(item.bidDeposit)} / {item.aiBriefing.loanEstimatedLimit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 필수 법적 면책 배너 */}
        <div className="rounded-2xl p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>⚠️ 자산관리 및 시뮬레이션 고지:</strong> 본 자산관리 및 추천 기능은 공공 정책 고시 및 사용자 입력값을 기초로 산출된 추정 시뮬레이션입니다. 실제 대출 가능 여부와 금리는 금융기관 심사를 거쳐야 하며, 부동산 세금은 관할 세무서 및 전문 세무사 확인이 필요합니다.
        </div>
      </main>

      {/* 상세 모달 */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <MobileNav />
    </div>
  );
}
