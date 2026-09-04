'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Sparkles,
  Building2,
  BookOpen,
  Crown,
  User,
  Bell,
  Sun,
  Moon,
  LogOut,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAssetPath } from '@/utils/path';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, openLoginModal, logout } = useAuth();
  const { cartItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/search', label: '경·공매 검색', icon: Compass, color: 'text-sky-600 dark:text-cyan-400' },
    { href: '/map', label: '지도 탐색', icon: Building2, color: 'text-emerald-600 dark:text-emerald-400' },
    { href: '/community', label: '커뮤니티·판례', icon: BookOpen, color: 'text-amber-600 dark:text-amber-400' },
    { href: '/mypage/assets', label: 'AI 자산관리', icon: Sparkles, color: 'text-purple-600 dark:text-purple-400' },
    { href: '/membership', label: '멤버십', icon: Crown, color: 'text-amber-500 dark:text-amber-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-[#1E2638] bg-white/90 dark:bg-[#080B10]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* 브랜드 로고 */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] flex items-center justify-center p-1 shadow-sm dark:shadow-md dark:shadow-cyan-500/10 group-hover:border-sky-500 dark:group-hover:border-cyan-500/40 transition-all shrink-0">
              <img
                src={getAssetPath('/logo/ohsedol_logo-removebg-preview.png')}
                alt="나무옥션 로고"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 whitespace-nowrap">
                나무옥션
                <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.2 rounded bg-sky-50 dark:bg-cyan-500/10 text-sky-600 dark:text-cyan-400 border border-sky-200 dark:border-cyan-500/30 font-semibold tracking-normal">
                  AI v1.0
                </span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5 whitespace-nowrap">
                스마트 경·공매 & 자산 매칭
              </span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#111622] text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111622]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 우측 도구: 라이트/다크 테마 토글 & 유저 액션 & 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* 일배치 동기화 상태 뱃지 (대형 화면) */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] text-[11px] text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            <span>일배치: 오늘 02:30 완료</span>
          </div>

          {/* ☀️ / 🌙 테마 전환 토글 버튼 */}
          <button
            onClick={toggleTheme}
            aria-label="테마 전환"
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1E2638] bg-slate-100 dark:bg-[#111622] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-sky-400 dark:hover:border-cyan-400 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="hidden sm:inline text-[11px]">라이트</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline text-[11px]">다크</span>
              </>
            )}
          </button>

          {/* 🛒 장바구니 버튼 */}
          <button
            onClick={openCart}
            aria-label="입찰 장바구니 열기"
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1E2638] text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-[#111622] transition-colors relative cursor-pointer group"
            title="입찰 장바구니"
          >
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* 알림 벨 버튼 (중형 화면 이상 표시하여 모바일 공간 확보) */}
          <button
            className="hidden sm:flex p-2 rounded-xl border border-slate-200 dark:border-[#1E2638] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111622] transition-colors relative"
            title="알림"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-500 dark:bg-cyan-400 rounded-full"></span>
          </button>

          {/* 로그인 상태 분기 */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="font-bold text-slate-800 dark:text-slate-200 max-w-[50px] sm:max-w-[80px] truncate">
                  {user.name}
                </span>
                <span className="hidden sm:inline px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-bold shrink-0">
                  {user.tier}
                </span>
              </div>
              <button
                onClick={logout}
                title="로그아웃"
                className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-[#111622] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 dark:from-cyan-600 dark:to-cyan-500 hover:from-sky-500 hover:to-cyan-500 text-white text-xs font-bold shadow-sm dark:shadow-md dark:shadow-cyan-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>로그인</span>
            </button>
          )}

          {/* 🍔 모바일 햄버거 메뉴 토글 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="모바일 메뉴 열기"
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-[#1E2638] bg-slate-100 dark:bg-[#111622] text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 📱 모바일 드롭다운 네비게이션 드로어 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-[#1E2638] bg-white/95 dark:bg-[#080B10]/95 backdrop-blur-xl px-4 py-3 shadow-xl transition-all animate-fadeIn">
          {/* 모바일 상단 상태 뱃지 */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>일배치: 오늘 02:30 완료</span>
            </div>
            {user && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-[10px]">
                {user.tier} 회원
              </span>
            )}
          </div>

          {/* 모바일 네비게이션 링크 목록 */}
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-sky-50 dark:bg-cyan-950/30 text-sky-600 dark:text-cyan-400 font-bold border border-sky-200 dark:border-cyan-800/40'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#111622]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#111622] flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

