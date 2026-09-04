'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MapPin, MessageSquare, UserCheck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈', icon: Home },
    { href: '/search', label: '경·공매', icon: Compass },
    { href: '/map', label: '지도', icon: MapPin },
    { href: '/community', label: '커뮤니티', icon: MessageSquare },
    { href: '/mypage/assets', label: '자산/MY', icon: UserCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#080B10]/95 backdrop-blur-lg border-t border-slate-200 dark:border-[#1E2638] px-2 py-1.5 pb-safe transition-colors duration-200">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-sky-600 dark:text-cyan-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'scale-110 text-sky-600 dark:text-cyan-400' : ''
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sky-500 dark:bg-cyan-400 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

