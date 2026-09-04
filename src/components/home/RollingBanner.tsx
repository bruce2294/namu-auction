'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  ArrowRight,
  Pause,
  Play,
  Clock,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface BannerSlide {
  id: number;
  tag: string;
  tagBg: string;
  tagText: string;
  icon: any;
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  linkHref: string;
  ctaText: string;
  badge?: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    tag: '🔥 시세 대비 -30% 긴급',
    tagBg: 'bg-rose-500 text-white',
    tagText: 'text-rose-100',
    icon: Flame,
    title: '시세보다 4억 싸게 사는 유일한 합법적 치트키',
    highlight: '지금 입찰 안 하면 남이 가져갑니다',
    description: '수도권 신도시 신축 랜드마크 2회 유찰! 오늘 놓치면 다음 차수엔 최소 2억 더 줘야 합니다.',
    imageUrl: '/images/1.jpg',
    linkHref: '/search',
    ctaText: '초특가 입찰 물건 확인하기',
    badge: '마감임박 D-3',
  },
  {
    id: 2,
    tag: '💎 안전마진 3억 확보',
    tagBg: 'bg-amber-500 text-slate-950',
    tagText: 'text-amber-950',
    icon: Sparkles,
    title: '내 집 마련, 언제까지 제값 다 주고 사실 겁니까?',
    highlight: '경매는 타이밍, 시세차익 먼저 잡으세요',
    description: '실거주와 미래 자산가치를 동시에! 국토부 실거래가 정량 데이터로 검증된 알짜 신축 아파트',
    imageUrl: '/images/2.jpg',
    linkHref: '/search?q=자이',
    ctaText: '시세차익 1순위 추천 매물',
    badge: '경쟁률 폭발',
  },
  {
    id: 3,
    tag: '⚡ 권리분석 10초 완료',
    tagBg: 'bg-sky-500 text-white',
    tagText: 'text-sky-100',
    icon: ShieldCheck,
    title: '초보자도 두렵지 않은 AI 권리분석 100% 보증',
    highlight: '인수 위험 0%, 낙찰 성공률 89.4%',
    description: '말소기준권리부터 대항력 임차인, 명도 난이도까지 나무옥션 AI가 숨은 리스크를 완벽 차단합니다.',
    imageUrl: '/images/3.jpg',
    linkHref: '/search?q=힐스테이트',
    ctaText: '안심 권리분석 물건 보기',
    badge: 'AI 안전진단 A+',
  },
  {
    id: 4,
    tag: '💰 2026 정책 맞춤 절세',
    tagBg: 'bg-emerald-600 text-white',
    tagText: 'text-emerald-100',
    icon: Sparkles,
    title: '스트레스 DSR 2단계? 대출 꽉 차도 길은 있습니다',
    highlight: '취득세 중과 피하고 최대 레버리지 공략',
    description: '1주택 갈아타기 기본세율(1.1%) 특가 매물부터 다주택 비규제 온비드 공매 알짜 수익형까지 완비',
    imageUrl: '/images/4.jpg',
    linkHref: '/mypage/assets',
    ctaText: '내 대출·세금 맞춤 매물 진단',
    badge: '2026 정책 연동',
  },
  {
    id: 5,
    tag: '🎁 신규 회원 웰컴 혜택',
    tagBg: 'bg-purple-600 text-white',
    tagText: 'text-purple-100',
    icon: Gift,
    title: '부동산 상위 1%만 아는 스마트 경·공매 시크릿',
    highlight: '지금 가입하면 VIP AI 분석 리포트 무료',
    description: '망설이는 1초 사이에도 누군가는 수억 원 시세차익의 낙찰 영수증을 손에 쥐고 있습니다.',
    imageUrl: '/images/5.jpg',
    linkHref: '/membership',
    ctaText: '무료 VIP 리포트 받고 시작',
    badge: '선착순 한정 혜택',
  },
];

export const RollingBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { openLoginModal } = useAuth();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  // 자동 롤링 타이머
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const slide = BANNER_SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <div
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl select-none border border-slate-200 dark:border-[#1E2638] shadow-md hover:shadow-lg transition-shadow bg-slate-950"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* 시원하고 웅장한 높이 (이미지 비율 및 여백 최적화) */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[390px] overflow-hidden">
          {/* 슬라이드 렌더링 */}
          {BANNER_SLIDES.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* 🌟 1. 빈 영역을 멘트처럼 투명 유리(Frosted Liquid Glass)로 채우는 앰비언트 배경 */}
              <img
                src={item.imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-125 saturate-200"
              />
              {/* 애플 Liquid Glass 질감 오버레이 (빛 반사 및 프리즘 광택) */}
              <div className="absolute inset-0 bg-white/[0.12] dark:bg-black/[0.35] backdrop-blur-3xl backdrop-saturate-[180%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/70 sm:via-black/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

              {/* 🌟 2. 원본 비율이 100% 유지되는 대형 메인 아파트 이미지 (우측 70% 영역) */}
              <div className="absolute inset-y-2 right-2 sm:right-4 md:right-6 w-full sm:w-[67%] md:w-[70%] flex items-center justify-center sm:justify-end p-2 sm:p-3 z-10 pointer-events-none">
                <div className="relative max-h-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/35 backdrop-blur-md bg-white/5 flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-h-[260px] sm:max-h-[320px] md:max-h-[360px] w-auto max-w-full object-contain object-center rounded-2xl transform transition-transform duration-700 hover:scale-105"
                  />
                  {/* 이미지 테두리 빛나는 유리 액자 림 라이트 */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 pointer-events-none" />
                </div>
              </div>

              {/* 🌟 3. 아이폰(iOS Liquid Glass) 맑은 투명 유리 + 물방울 효과 멘트 카드 (좌측 30% 영역) */}
              <div className="absolute inset-y-0 left-0 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center z-20 pointer-events-none">
                <div className="relative pointer-events-auto w-full sm:w-[320px] md:w-[340px] p-5 sm:p-6 md:p-7 rounded-3xl bg-white/[0.08] dark:bg-black/[0.18] backdrop-blur-2xl backdrop-saturate-[200%] border border-white/40 dark:border-white/30 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.9),_inset_0_-1px_1.5px_0_rgba(255,255,255,0.15),_0_20px_40px_-10px_rgba(0,0,0,0.5)] space-y-2.5 sm:space-y-3 animate-fadeIn overflow-hidden">
                  {/* 애플 시그니처: 대각선 빛 반사 레이어 (Glossy Specular Sheen) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/[0.04] to-transparent pointer-events-none" />
                  {/* 좌측 상단 은은한 프리즘 빛 퍼짐 */}
                  <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />

                  {/* 💧 유리 표면에 맺힌 영롱한 물방울 효과 (Liquid Dew Droplets) */}
                  {/* 물방울 1 (우측 상단 메인 방울) */}
                  <div className="absolute top-3.5 right-4 w-4 h-4 rounded-full bg-white/25 backdrop-blur-sm border border-white/70 shadow-[inset_1.5px_1.5px_2px_rgba(255,255,255,0.95),_inset_-1px_-1px_2px_rgba(0,0,0,0.35),_1px_2px_4px_rgba(0,0,0,0.3)] pointer-events-none animate-pulse">
                    <span className="absolute top-0.5 left-1 w-1 h-1 rounded-full bg-white opacity-95" />
                  </div>
                  {/* 물방울 2 (우측 상단 길쭉한 작은 방울) */}
                  <div className="absolute top-6 right-9 w-2.5 h-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/60 shadow-[inset_1px_1px_1.5px_rgba(255,255,255,0.9),_inset_-0.5px_-0.5px_1px_rgba(0,0,0,0.3),_1px_1.5px_3px_rgba(0,0,0,0.25)] pointer-events-none rotate-12">
                    <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white opacity-90" />
                  </div>
                  {/* 물방울 3 (좌측 상단 모서리 이슬방울) */}
                  <div className="absolute top-3 left-8 w-3 h-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),_inset_-1px_-1px_1.5px_rgba(0,0,0,0.3),_1px_2px_3px_rgba(0,0,0,0.25)] pointer-events-none">
                    <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white opacity-90" />
                  </div>
                  {/* 물방울 4 (우측 하단 미세 이슬) */}
                  <div className="absolute bottom-4 right-6 w-2 h-2 rounded-full bg-white/30 border border-white/60 shadow-[inset_0.5px_0.5px_1px_rgba(255,255,255,0.9),_1px_1px_2px_rgba(0,0,0,0.2)] pointer-events-none" />

                  {/* 상단 뱃지 라인 */}
                  <div className="relative z-10 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-md ${item.tagBg}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.tag}</span>
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/30 text-white backdrop-blur-xl border border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* 메인 타이틀 & 자극 멘트 (투명 유리 위 또렷한 시인성) */}
                  <div className="relative z-10 space-y-1">
                    <h2 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-snug">
                      👉 {item.highlight}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-100 font-medium line-clamp-2 leading-relaxed pt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {item.description}
                    </p>
                  </div>

                  {/* 행동 유도 CTA 버튼 */}
                  <div className="relative z-10 pt-1">
                    {item.id === 5 ? (
                      <button
                        onClick={openLoginModal}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 text-xs font-black shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.7),_0_10px_20px_-5px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition-all cursor-pointer group"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <Link
                        href={item.linkHref}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white text-xs font-black shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.6),_0_10px_20px_-5px_rgba(14,165,233,0.5)] hover:scale-[1.02] transition-all cursor-pointer group"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* 컨트롤러: 좌우 화살표 & 인디케이터 바 (Apple Frosted Glass) */}
        <div className="absolute bottom-4 right-6 sm:right-12 z-30 flex items-center gap-2 bg-white/20 dark:bg-black/40 backdrop-blur-2xl px-3.5 py-1.5 rounded-full border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),_0_10px_20px_rgba(0,0,0,0.3)] text-white text-xs">
          {/* 슬라이드 페이지 인디케이터 */}
          <span className="font-mono-nums font-bold text-xs tracking-wider">
            <strong className="text-cyan-400">{currentSlide + 1}</strong> / {BANNER_SLIDES.length}
          </span>

          <span className="w-px h-3 bg-white/20" />

          {/* 재생 / 일시정지 */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-cyan-300 transition-colors"
            title={isPlaying ? '자동 넘김 일시정지' : '자동 넘김 시작'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          <span className="w-px h-3 bg-white/20" />

          {/* 이전 / 다음 버튼 */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              className="p-1 hover:text-cyan-300 transition-colors"
              title="이전 배너"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 hover:text-cyan-300 transition-colors"
              title="다음 배너"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

