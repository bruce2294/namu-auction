'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '../../components/common/Header';
import { MobileNav } from '../../components/common/MobileNav';
import { AuctionCard } from '../../components/auction/AuctionCard';
import { DetailModal } from '../../components/auction/DetailModal';
import { MOCK_AUCTION_ITEMS } from '../../data/mock-auctions';
import { AuctionItem, AuctionType } from '../../types/auction';
import {
  Search,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  Filter,
  Check,
  RotateCcw
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchKeyword, setSearchKeyword] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<'ALL' | AuctionType>('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [failCountFilter, setFailCountFilter] = useState<'ALL' | '0' | '1' | '2+'>('ALL');
  const [onlyUndervalued, setOnlyUndervalued] = useState(false);
  const [sortBy, setSortBy] = useState<'UNDERYALUED' | 'PRICE_ASC' | 'DDAY'>('UNDERYALUED');

  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(['auc-001']);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchKeyword(q);
    }
  }, [searchParams]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedType('ALL');
    setSelectedCategory('ALL');
    setSelectedRegion('ALL');
    setFailCountFilter('ALL');
    setOnlyUndervalued(false);
  };

  const filteredItems = useMemo(() => {
    return MOCK_AUCTION_ITEMS.filter((item) => {
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchAddr = item.addressRoad.toLowerCase().includes(q);
        const matchCase = item.caseNumber.toLowerCase().includes(q);
        if (!matchTitle && !matchAddr && !matchCase) return false;
      }
      if (selectedType !== 'ALL' && item.type !== selectedType) return false;
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedRegion !== 'ALL') {
        if (!item.addressRoad.includes(selectedRegion)) return false;
      }
      if (failCountFilter === '0' && item.failCount !== 0) return false;
      if (failCountFilter === '1' && item.failCount !== 1) return false;
      if (failCountFilter === '2+' && item.failCount < 2) return false;
      if (onlyUndervalued && item.aiBriefing.undervalueRatio > -20) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'UNDERYALUED') {
        return a.aiBriefing.undervalueRatio - b.aiBriefing.undervalueRatio;
      }
      if (sortBy === 'PRICE_ASC') {
        return a.minimumPrice - b.minimumPrice;
      }
      return a.dDay - b.dDay;
    });
  }, [searchKeyword, selectedType, selectedCategory, selectedRegion, failCountFilter, onlyUndervalued, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] pb-24 md:pb-16 transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* 상단 검색 & 정렬 헤더 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E2638]">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              경·공매 통합 물건 검색
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              조건에 맞는 실시간 법원경매 & 온비드 공매 물건 ({filteredItems.length}건)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* 정렬 드롭다운 */}
            <div className="flex items-center gap-1 bg-white dark:bg-[#111622] px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E2638] text-xs font-semibold shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="UNDERYALUED" className="bg-white dark:bg-[#111622]">저평가율 높은순</option>
                <option value="PRICE_ASC" className="bg-white dark:bg-[#111622]">최저입찰가 낮은순</option>
                <option value="DDAY" className="bg-white dark:bg-[#111622]">매각기일 임박순</option>
              </select>
            </div>

            {/* 모바일 필터 열기 버튼 */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-sm"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>필터</span>
            </button>
          </div>
        </div>

        {/* 2열 구조: 좌측 사이드바 필터 (데스크톱) + 우측 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* 좌측 고정 사이드바 필터 */}
          <aside className="hidden md:block col-span-1 rounded-2xl p-5 bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E2638]">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                정밀 검색 필터
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-400 hover:text-sky-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                초기화
              </button>
            </div>

            {/* 키워드 검색 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">물건명/사건번호</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="예: 자이, 2024타경"
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* 구분 (경매/공매) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">구분</label>
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
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 지역 필터 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">지역 (수도권)</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { label: '전체지역', val: 'ALL' },
                  { label: '서울 강남/서초', val: '강남' },
                  { label: '서울 마포/서부', val: '마포' },
                  { label: '경기 성남(분당/위례)', val: '성남' },
                  { label: '경기 화성(동탄)', val: '화성' },
                ].map((r) => (
                  <button
                    key={r.val}
                    onClick={() => setSelectedRegion(r.val)}
                    className={`py-1.5 px-2 rounded-lg text-left truncate font-medium transition-all ${
                      selectedRegion === r.val
                        ? 'bg-sky-50 dark:bg-cyan-950/80 text-sky-700 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 font-bold'
                        : 'bg-slate-50 dark:bg-[#080B10] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1E2638]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 유찰 횟수 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">유찰 횟수</label>
              <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-[#080B10] p-1 rounded-xl text-xs">
                {[
                  { label: '전체', val: 'ALL' },
                  { label: '신건(0)', val: '0' },
                  { label: '1회 유찰', val: '1' },
                  { label: '2회+ 유찰', val: '2+' },
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => setFailCountFilter(f.val as any)}
                    className={`py-1.5 rounded-lg font-bold transition-all ${
                      failCountFilter === f.val
                        ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 급매 저평가 토글 */}
            <div className="pt-2">
              <button
                onClick={() => setOnlyUndervalued(!onlyUndervalued)}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  onlyUndervalued
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/50 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#080B10] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#1E2638]'
                }`}
              >
                <Flame className={`w-4 h-4 ${onlyUndervalued ? 'text-rose-600 dark:text-rose-400 fill-current' : 'text-slate-400'}`} />
                <span>20% 이상 저평가 매물만</span>
              </button>
            </div>
          </aside>

          {/* 우측 물건 카드 그리드 */}
          <div className="col-span-1 md:col-span-3">
            {filteredItems.length === 0 ? (
              <div className="text-center py-24 bg-white dark:bg-[#111622]/40 rounded-3xl border border-slate-200 dark:border-[#1E2638] space-y-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  선택하신 조건에 일치하는 경·공매 물건이 없습니다.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-sm"
                >
                  필터 전체 초기화
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <AuctionCard
                    key={item.id}
                    item={item}
                    onSelect={(sel) => setSelectedItem(sel)}
                  />
                ))}
              </div>
            )}
          </div>
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] flex items-center justify-center text-slate-400">검색 조건을 불러오는 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}

