'use client';

import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { MobileNav } from '../../components/common/MobileNav';
import { useAuth } from '../../context/AuthContext';
import {
  Crown,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  CreditCard,
  X,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function MembershipPage() {
  const { user, login } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'STANDARD' | 'PREMIUM'>('PREMIUM');
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardBirth, setCardBirth] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      id: 'FREE',
      name: 'Free 플랜',
      price: '0원',
      period: '평생 무료',
      description: '부동산 경·공매 입문 및 기본 탐색자를 위한 플랜',
      badge: '기본',
      features: [
        '전국 법원경매 & 온비드 공매 기본 검색',
        '일일 물건 상세 브리핑 5회 열람',
        '투자자 커뮤니티 글 열람 및 댓글 작성',
        '관심물건 북마크 최대 5개',
      ],
      buttonText: '현재 이용 중',
      disabled: true,
      popular: false,
    },
    {
      id: 'STANDARD',
      name: 'Standard 플랜',
      price: '월 19,900원',
      period: '정기 결제',
      description: '본격적인 입찰 준비 및 실거래가 정량 분석 필수 플랜',
      badge: '가장 실속형',
      features: [
        '전국 경·공매 물건 무제한 상세 열람',
        '국토부 실거래가 기반 이상치 제거 시세분석 무제한',
        '관심물건 매각기일 D-Day 알림',
        '관심물건 북마크 무제한',
        '예상 낙찰가 가이드라인 제공',
      ],
      buttonText: 'Standard 시작하기',
      disabled: false,
      popular: false,
    },
    {
      id: 'PREMIUM',
      name: 'Premium AI 플랜',
      price: '월 39,900원',
      period: '정기 결제 (연 결제 시 20% 할인)',
      description: '2026 정부 정책 연동 AI 추천 및 다주택 세무 시뮬레이션 완벽 제공',
      badge: '👑 추천 최고 등급',
      features: [
        'Standard 플랜의 모든 혜택 기본 포함',
        '🌟 2026 최신 정부 정책(스트레스 DSR 2단계, 취득세 중과) AI 매칭 엔진',
        '내 자산(주택수/가용금) 맞춤형 추천 물건 & 산출 근거 열람',
        '전문가 심층 칼럼 및 법원 판례 해설 전문 열람',
        '1-Click 입찰 분석 브리핑 리포트 출력',
        '전문가 1:1 입찰 상담 우선 예약권',
      ],
      buttonText: 'Premium 구독하기',
      disabled: false,
      popular: true,
    },
  ];

  const handleOpenBilling = (planId: 'STANDARD' | 'PREMIUM') => {
    setSelectedPlan(planId);
    setIsBillingModalOpen(true);
    setIsSuccess(false);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // 모의 결제 완료
    setIsSuccess(true);
    setTimeout(() => {
      // 사용자 등급 업그레이드 시뮬레이션
      if (user) {
        user.tier = selectedPlan;
        localStorage.setItem('namu_user', JSON.stringify(user));
      } else {
        login('naver');
      }
      setIsBillingModalOpen(false);
      alert(`[결제 성공]\n\n${selectedPlan} 멤버십이 즉시 활성화되었습니다! 모든 정밀 분석과 정책 매칭을 무제한 이용하실 수 있습니다.`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] pb-24 md:pb-16 transition-colors duration-200">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* 상단 헤더 */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>나무옥션 멤버십 멤버스</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            성공적인 경·공매 낙찰, <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              데이터와 정책 AI
            </span>로 앞서가세요.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            언제든지 위약금 없이 1-Click으로 해지 가능합니다. 7일 무료 체험을 시작해 보세요.
          </p>
        </div>

        {/* 3대 요금제 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                p.popular
                  ? 'bg-white dark:bg-[#111622] border-2 border-amber-500 shadow-xl dark:shadow-amber-500/10 scale-105 z-10'
                  : 'bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[11px] font-black tracking-wide shadow-md">
                  BEST POPULAR
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{p.badge}</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E2638]">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono-nums">
                    {p.price}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.period}</div>
                </div>

                {/* 제공 혜택 리스트 */}
                <div className="space-y-2.5 pt-4">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  disabled={p.disabled}
                  onClick={() => handleOpenBilling(p.id as any)}
                  className={`w-full py-3 rounded-2xl font-bold text-xs shadow-sm transition-all ${
                    p.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-md'
                      : p.disabled
                      ? 'bg-slate-100 dark:bg-[#080B10] text-slate-400 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-500 text-white'
                  }`}
                >
                  {p.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 보안 및 환불 규정 안내 */}
        <div className="rounded-2xl p-4 bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
          🔒 모든 결제는 토스페이먼츠 정식 보안 모듈을 통해 카드정보 암호화 후 진행됩니다. 결제 후 7일 이내 열람 이력이 없을 경우 100% 전액 환불을 보장합니다.
        </div>
      </main>

      {/* 정기결제 시뮬레이션 모달 */}
      {isBillingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E2638]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  정기구독 카드 등록 ({selectedPlan})
                </h3>
              </div>
              <button
                onClick={() => setIsBillingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  결제 승인 완료!
                </h4>
                <p className="text-xs text-slate-500">
                  {selectedPlan} 멤버십 권한이 계정에 적용되었습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#080B10] border border-slate-200 dark:border-[#1E2638] flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">결제 금액</span>
                  <span className="font-mono-nums font-black text-base text-amber-600 dark:text-amber-400">
                    {selectedPlan === 'PREMIUM' ? '월 39,900원' : '월 19,900원'}
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">신용/체크카드 번호</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 - 0000 - 0000 - 0000"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs font-mono-nums focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">유효기간 (MM/YY)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs font-mono-nums focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">생년월일 (6자리)</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={cardBirth}
                      onChange={(e) => setCardBirth(e.target.value)}
                      placeholder="YYMMDD"
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs font-mono-nums focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>토스페이먼츠 빌링키 암호화 연동 (자동 결제 등록)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md transition-all mt-2"
                >
                  결제 및 정기구독 시작하기
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
}
