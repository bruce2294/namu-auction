import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-slate-600 dark:text-slate-400 transition-colors duration-200 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* 상단: 브랜드 및 주요 링크 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#1E2638]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] flex items-center justify-center p-1 shadow-sm">
              <img
                src="/logo/ohsedol_logo-removebg-preview.png"
                alt="나무옥션 로고"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                나무옥션 (Namu Auction)
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                스마트 부동산 경·공매 & AI 맞춤 자산 매칭 플랫폼
              </p>
            </div>
          </div>

          {/* 약관 및 고객 링크 */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium">
            <a href="#terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#privacy" className="hover:text-slate-900 dark:hover:text-white font-bold text-slate-800 dark:text-slate-200 transition-colors">
              개인정보처리방침
            </a>
            <a href="#disclaimer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              책임의 한계와 법적고지
            </a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              고객지원 FAQ
            </a>
          </div>
        </div>

        {/* 중단: 회사 사업자 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <div className="space-y-1.5">
            <p className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
              주식회사 나무 D&C
            </p>
            <p>
              대표이사: 오세현 &nbsp;|&nbsp; 사업자등록번호: 120-88-94523 &nbsp;|&nbsp; 통신판매업신고: 제2026-서울마포-1045호
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
              <span>주소: 서울특별시 마포구 마포대로 195, 나무D&C 프롭테크 타워 14층</span>
            </p>
            <p className="flex items-center gap-3 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                문의: contact@namudnc.co.kr
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                고객센터: 1588-9400 (평일 09:30 ~ 18:00)
              </span>
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-100 dark:bg-[#111622] p-4 rounded-xl border border-slate-200 dark:border-[#1E2638] text-[11px]">
            <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              데이터 제공처 및 컴플라이언스 공지
            </p>
            <p>
              나무옥션의 모든 경매·공매 물건 및 실거래가 정보는 대법원 법원경매정보, 캠코 온비드(공공데이터포털), 국토교통부 실거래가 공개시스템의 정식 Open API와 제휴 계약을 통해 동기화됩니다.
            </p>
            <p className="text-[10px] text-slate-400">
              * 제공되는 시세분석 및 세금/대출 시뮬레이션은 참고용 정보이며, 최종 투자 판단의 책임은 이용자 본인에게 있습니다.
            </p>
          </div>
        </div>

        {/* 하단: 카피라이트 */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E2638]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <p>
            Copyright © 2026 <strong className="text-slate-700 dark:text-slate-300">주식회사 나무 D&C</strong> (Namu D&C Inc.) All rights reserved.
          </p>
          <p className="font-mono-nums">
            Namu Auction Platform Engine v1.0.4 • Build 20260904
          </p>
        </div>
      </div>
    </footer>
  );
};
