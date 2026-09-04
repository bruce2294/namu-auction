'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../components/common/Header';
import { RollingBanner } from '../components/home/RollingBanner';
import { MobileNav } from '../components/common/MobileNav';
import { AIThinkingIndicator } from '../components/common/AIThinkingIndicator';
import { AuctionCard } from '../components/auction/AuctionCard';
import { DetailModal } from '../components/auction/DetailModal';
import { PolicyMatchBanner } from '../components/policy/PolicyMatchBanner';
import { MOCK_AUCTION_ITEMS, MOCK_COMMUNITY_FEEDBACK } from '../data/mock-auctions';
import { AuctionItem, AuctionType } from '../types/auction';
import {
  Search,
  Flame,
  ArrowRight,
  Heart,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'ALL' | AuctionType>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyUndervalued, setOnlyUndervalued] = useState<boolean>(false);
  const [policyHouseCount, setPolicyHouseCount] = useState<number>(1);

  // 검색 실행 핸들러
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchKeyword.trim())}`);
    } else {
      router.push('/search');
    }
  };

  // 인기 검색어 클릭
  const handleKeywordClick = (kw: string) => {
    router.push(`/search?q=${encodeURIComponent(kw)}`);
  };

  // 필터링 로직
  const filteredItems = useMemo(() => {
    return MOCK_AUCTION_ITEMS.filter((item) => {
      // 1. 키워드 검색
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchAddress =
          item.addressRoad.toLowerCase().includes(query) ||
          item.addressJibun.toLowerCase().includes(query);
        const matchCase = item.caseNumber.toLowerCase().includes(query);
        if (!matchTitle && !matchAddress && !matchCase) return false;
      }

      // 2. 경매 / 공매 타입
      if (selectedType !== 'ALL' && item.type !== selectedType) {
        return false;
      }

      // 3. 물건 카테고리
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // 4. 급매/저평가 필터 (20% 이상 저평가)
      if (onlyUndervalued && item.aiBriefing.undervalueRatio > -20) {
        return false;
      }

      return true;
    });
  }, [searchKeyword, selectedType, selectedCategory, onlyUndervalued]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] pb-24 md:pb-16 transition-colors duration-200 selection:bg-sky-500 selection:text-white">
      {/* 1. 상단 GNB 헤더 */}
      <Header />

      {/* 2. 쇼핑몰 스타일 움직이는 롤링 프로모션 배너 (헤더 바로 밑) */}
      <RollingBanner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6 sm:space-y-8">
        {/* 2. 심플 & 미니멀 히어로 섹션 (군더더기 없는 검색 중심) */}
        <section className="relative text-center py-4 sm:py-6 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-cyan-950/40 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>AI 기반 수도권 신도시 신축 아파트 경·공매 탐색</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            스마트 경·공매,{' '}
            <span className="bg-gradient-to-r from-sky-600 to-teal-600 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
              AI 브리핑으로 10초 만에.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            대법원 법원경매와 캠코 온비드 공매를 통합 검색하고, 국토부 실거래가 기반 저평가율을 즉시 확인하세요.
          </p>

          {/* 통합 검색바 폼 */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-[#111622] border border-slate-300 dark:border-[#1E2638] shadow-sm hover:shadow-md focus-within:border-sky-500 dark:focus-within:border-cyan-500 transition-all">
              <div className="flex items-center gap-2.5 w-full px-3 py-1.5">
                <Search className="w-5 h-5 text-sky-600 dark:text-cyan-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="지역(예: 개포동, 위례), 아파트명(자이, 힐스테이트, 르엘), 사건번호 검색..."
                  className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                />
                {searchKeyword && (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword('')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 cursor-pointer"
                  >
                    지우기
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 dark:from-cyan-500 dark:to-emerald-500 hover:from-sky-500 hover:to-teal-500 text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>검색</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* 실시간 인기 검색어 칩 */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-bold text-sky-700 dark:text-cyan-400 mr-1">
              <TrendingUp className="w-3.5 h-3.5" />
              인기 키워드:
            </span>
            {['판교 힐스테이트', '동탄역 랜드마크', '마포 자이', '디에이치 아너힐즈', '르엘 대치'].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleKeywordClick(kw)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-[#111622] hover:bg-sky-50 dark:hover:bg-cyan-950/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-[#1E2638] transition-all cursor-pointer text-[11px]"
              >
                #{kw}
              </button>
            ))}
          </div>
        </section>


        {/* 🌟 3. 슬림한 최신 정부 부동산 정책 맞춤형 경매 투자 배너 */}
        <section id="policy">
          <PolicyMatchBanner
            selectedHouseCount={policyHouseCount}
            onSelectHouseCount={(cnt) => setPolicyHouseCount(cnt)}
          />
        </section>

        {/* 4. 빠른 탭 필터링 & 정렬 컨트롤 바 (이미지 카드 리스트 시작 영역) */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* 좌측: 타입 탭 */}
            <div className="flex items-center p-1 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] text-xs font-semibold shadow-sm">
              <button
                onClick={() => setSelectedType('ALL')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedType === 'ALL'
                    ? 'bg-sky-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                통합 전체 ({MOCK_AUCTION_ITEMS.length})
              </button>
              <button
                onClick={() => setSelectedType('COURT')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedType === 'COURT'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                법원경매
              </button>
              <button
                onClick={() => setSelectedType('ONBID')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedType === 'ONBID'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                온비드공매
              </button>
            </div>

            {/* 우측: 카테고리 및 급매 토글 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-white dark:bg-[#111622] p-1 rounded-xl border border-slate-200 dark:border-[#1E2638] text-xs shadow-sm">
                {['ALL', '아파트', '오피스텔', '상가/근린'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedCategory === cat
                        ? 'bg-slate-100 dark:bg-[#1E2638] text-sky-700 dark:text-cyan-300 font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {cat === 'ALL' ? '전체유형' : cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setOnlyUndervalued(!onlyUndervalued)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  onlyUndervalued
                    ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/50 shadow-sm'
                    : 'bg-white dark:bg-[#111622] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1E2638] hover:text-slate-900 shadow-sm'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${onlyUndervalued ? 'text-rose-600 dark:text-rose-400 fill-current' : 'text-slate-400'}`} />
                <span>20% 이상 저평가만 보기</span>
              </button>
            </div>
          </div>

          {/* 5. 신축 아파트 이미지 물건 카드 그리드 */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#111622]/40 rounded-3xl border border-slate-200 dark:border-[#1E2638]">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                조건에 맞는 경·공매 물건이 없습니다. 필터를 재설정해 보세요.
              </p>
            </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredItems.map((item) => (
                  <AuctionCard
                    key={item.id}
                    item={item}
                    onSelect={(selected) => setSelectedItem(selected)}
                  />
                ))}
              </div>
          )}
        </section>

        {/* 6. 실시간 낙찰 후기 커뮤니티 브리핑 */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#111622]/60 border border-slate-200 dark:border-[#1E2638] shadow-sm space-y-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-sky-600 dark:text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                커뮤니티 실전 인사이트
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                회원들의 생생한 낙찰 성공기 & 실전 후기
              </h2>
            </div>
            <Link
              href="/community"
              className="text-xs text-sky-600 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              전체 게시판 보기 &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_COMMUNITY_FEEDBACK.map((rev) => (
              <Link
                key={rev.id}
                href="/community"
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-[#080B10]/80 border border-slate-200 dark:border-[#1E2638] hover:border-sky-400 dark:hover:border-cyan-500/50 hover:shadow-md transition-all flex flex-col justify-between gap-3 shadow-sm cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">{rev.author}</span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-cyan-950/60 text-sky-700 dark:text-cyan-400 text-[10px] font-semibold border border-sky-200 dark:border-cyan-500/30">
                        {rev.badge}
                      </span>
                    </div>
                    <span className="text-[11px]">{rev.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-1 leading-snug group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {rev.summary}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-[#1E2638]">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-400 font-medium">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    추천 {rev.likes}
                  </span>
                  <span>댓글 {rev.comments}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 상세 분석 모달 */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* 모바일 하단 탭바 */}
      <MobileNav />
    </div>
  );
}
