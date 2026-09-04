'use client';

import React from 'react';
import { Scale, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface PolicyMatchBannerProps {
  onSelectHouseCount?: (count: number) => void;
  selectedHouseCount?: number;
}

export const PolicyMatchBanner: React.FC<PolicyMatchBannerProps> = ({
  onSelectHouseCount,
  selectedHouseCount = 1,
}) => {
  return (
    <div className="relative rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* 좌측: 간결한 정책 타이틀 & 뱃지 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-cyan-950/60 text-sky-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0 border border-sky-200 dark:border-cyan-500/30">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-50 dark:bg-cyan-950/80 text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30">
              2026 정부 정책 연동
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              스트레스 DSR 2단계 & 비규제지역 취득세 룰 적용
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
            내 주택 수와 대출 한도에 딱 맞는 신축 아파트 추천
          </p>
        </div>
      </div>

      {/* 우측: 퀵 조건 선택 칩 & 진단 바로가기 버튼 */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#080B10] p-1 rounded-xl border border-slate-200 dark:border-[#1E2638] text-xs">
          {[
            { label: '무주택', cnt: 0 },
            { label: '1주택 갈아타기', cnt: 1 },
            { label: '다주택 절세', cnt: 2 },
          ].map((item) => (
            <button
              key={item.cnt}
              onClick={() => onSelectHouseCount?.(item.cnt)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                selectedHouseCount === item.cnt
                  ? 'bg-sky-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a
          href="/mypage/assets"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 dark:from-cyan-500 dark:to-emerald-500 hover:from-sky-500 hover:to-teal-500 text-white dark:text-slate-950 text-xs font-bold shadow-sm transition-all whitespace-nowrap"
        >
          <span>AI 정밀 진단</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
