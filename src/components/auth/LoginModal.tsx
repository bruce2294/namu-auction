'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Sparkles, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTab, setIsEmailTab] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login('google'); // 이메일 로그인 시뮬레이션
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 transition-colors">
        {/* 닫기 버튼 */}
        <button
          onClick={closeLoginModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E2638] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 브랜드 헤더 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-[#080B10] border border-slate-200 dark:border-[#1E2638] p-1.5 shadow-sm mx-auto">
            <img
              src="/logo/ohsedol_logo-removebg-preview.png"
              alt="나무옥션 로고"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            나무옥션 간편 시작하기
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            3초 만에 로그인하고 AI 추천 및 실거래가 시세분석을 무제한으로 이용하세요.
          </p>
        </div>

        {/* 4대 소셜 로그인 버튼 리스트 */}
        <div className="space-y-2.5">
          {/* 1. 네이버 로그인 */}
          <button
            onClick={() => login('naver')}
            className="w-full h-12 rounded-2xl bg-[#03C75A] hover:bg-[#02b350] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all group"
          >
            <span className="w-5 h-5 flex items-center justify-center font-black text-base text-white">
              N
            </span>
            <span>네이버로 시작하기</span>
          </button>

          {/* 2. 카카오 로그인 */}
          <button
            onClick={() => login('kakao')}
            className="w-full h-12 rounded-2xl bg-[#FEE500] hover:bg-[#ebd300] text-[#191919] font-bold text-sm flex items-center justify-center gap-3 shadow-sm hover:shadow transition-all group"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3C6.477 3 2 6.477 2 10.767c0 2.775 1.879 5.2 4.717 6.556l-1.2 4.417c-.105.385.334.69.66.474l5.244-3.473c.189.017.38.026.579.026 5.523 0 10-3.477 10-7.767C22 6.477 17.523 3 12 3z" />
            </svg>
            <span>카카오로 시작하기</span>
          </button>

          {/* 3. 구글 로그인 */}
          <button
            onClick={() => login('google')}
            className="w-full h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 shadow-sm transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google로 계속하기</span>
          </button>

          {/* 4. 애플 로그인 */}
          <button
            onClick={() => login('apple')}
            className="w-full h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm flex items-center justify-center gap-3 shadow-sm hover:opacity-90 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.69.97.08 1.95-.49 2.54-1.18z" />
            </svg>
            <span>Apple로 로그인</span>
          </button>
        </div>

        {/* 또는 이메일 로그인 전환 */}
        <div className="pt-2">
          {!isEmailTab ? (
            <button
              onClick={() => setIsEmailTab(true)}
              className="w-full text-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium"
            >
              이메일 주소로 로그인하기 &rarr;
            </button>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-3 pt-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소 입력"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-all"
              >
                이메일로 로그인
              </button>
            </form>
          )}
        </div>

        {/* 보안 및 이용약관 안내 */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#1E2638] text-center text-[11px] text-slate-400 leading-relaxed">
          로그인 시 나무옥션의 <a href="#terms" className="underline hover:text-slate-600 dark:hover:text-slate-200">이용약관</a> 및 <a href="#privacy" className="underline hover:text-slate-600 dark:hover:text-slate-200">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
        </div>
      </div>
    </div>
  );
};
