'use client';

import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { MobileNav } from '../../components/common/MobileNav';
import {
  BookOpen,
  MessageSquare,
  Sparkles,
  Heart,
  Eye,
  PenTool,
  Search,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface Post {
  id: string;
  type: 'REVIEW' | 'COLUMN' | 'QNA' | 'CASE_LAW';
  title: string;
  summary: string;
  author: string;
  badge: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  isAdopted?: boolean;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'REVIEW' | 'COLUMN' | 'QNA' | 'CASE_LAW'>('ALL');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post-001',
      type: 'REVIEW',
      title: '개포 디에이치 퍼스티어 아이파크 실전 낙찰기 — 시세 대비 3.5억 싸게 잡았습니다',
      summary: '나무옥션의 3개월 실거래가 정량 분석선과 스트레스 DSR 대출 시뮬레이터 덕분에 1순위 단독 입찰로 안전하게 낙찰받았습니다.',
      author: '개포디에이치낙찰자',
      badge: '실전낙찰자',
      date: '2026-09-02',
      views: 1240,
      likes: 64,
      comments: 28,
    },
    {
      id: 'post-002',
      type: 'COLUMN',
      title: '[전문가 칼럼] 2026 하반기 스트레스 DSR 2단계 시행 속 수도권 경매 레버리지 공략법',
      summary: '대출 한도가 줄어들었지만, 비규제지역 다주택 취득세 8% 중과 배제 룰을 활용하면 오히려 실수요자와 투자자 모두에게 기회가 열립니다.',
      author: '박정석 경매연구소장',
      badge: '공인전문가',
      date: '2026-09-01',
      views: 3420,
      likes: 152,
      comments: 42,
    },
    {
      id: 'post-003',
      type: 'QNA',
      title: '비규제지역 1주택 상태에서 위례 신도시 아파트 경매 입찰 시 취득세율 문의드립니다',
      summary: '기존에 마포에 아파트 1채가 있는 상태에서 위례 자이 아파트를 낙찰받으려 합니다. 8% 중과세율이 적용되는지 아니면 1~3% 기본세율인지 궁금합니다.',
      author: '초보투자김씨',
      badge: '회원',
      date: '2026-08-30',
      views: 890,
      likes: 23,
      comments: 8,
      isAdopted: true,
    },
    {
      id: 'post-004',
      type: 'CASE_LAW',
      title: '[판례 아카이브] 매각물건명세서상 기재 누락된 대항력 있는 임차인의 보증금 인수 분쟁',
      summary: '법원 매각물건명세서의 중대한 오류로 인해 매수인이 예상치 못한 보증금을 인수하게 된 사건(대법원 2023다19482)의 매각허가결정 취소 인용 판례 해설.',
      author: '나무옥션 법무팀',
      badge: '공식운영진',
      date: '2026-08-28',
      views: 2150,
      likes: 98,
      comments: 15,
    },
    {
      id: 'post-005',
      type: 'REVIEW',
      title: '판교 힐스테이트 엘포레 대형 평형 단독 낙찰 후기 및 명도 팁',
      summary: '소유자 점유 건이라 이사비 협의가 걱정이었는데, 인도명령 신청과 동시에 원만하게 협의하여 3주 만에 열쇠를 받았습니다.',
      author: '판교라이프',
      badge: '실전낙찰자',
      date: '2026-08-25',
      views: 1820,
      likes: 81,
      comments: 34,
    }
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPostItem: Post = {
      id: `post-${Date.now()}`,
      type: activeTab === 'ALL' ? 'REVIEW' : activeTab,
      title: newTitle,
      summary: newContent.slice(0, 100),
      author: '나 (로그인 회원)',
      badge: '회원',
      date: '2026-09-04',
      views: 1,
      likes: 0,
      comments: 0,
    };
    setPosts([newPostItem, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsWriteModalOpen(false);
  };

  const filteredPosts = posts.filter((p) => {
    if (activeTab !== 'ALL' && p.type !== activeTab) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-slate-900 dark:text-[#F1F5F9] pb-24 md:pb-16 transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* 상단 타이틀 & 글쓰기 버튼 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E2638]">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-500" />
              경·공매 투자자 커뮤니티 & 판례
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              실제 낙찰자들의 노하우, 전문가 실전 칼럼, Q&A, 최신 법원 판례를 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="제목/내용 검색..."
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E2638] bg-white dark:bg-[#111622] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>글쓰기</span>
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-[#1E2638] text-xs font-bold">
          {[
            { id: 'ALL', label: '전체글' },
            { id: 'REVIEW', label: '🏆 실전 낙찰후기' },
            { id: 'COLUMN', label: '✍️ 전문가 칼럼' },
            { id: 'QNA', label: '💬 경공매 Q&A' },
            { id: 'CASE_LAW', label: '⚖️ 법원판례 아카이브' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#111622]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 게시글 목록 카드 리스트 */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500/40 transition-all space-y-2.5 cursor-pointer"
              onClick={() => alert(`[${post.title}]\n\n상세 본문 열람 프로토타입입니다.`)}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      post.type === 'REVIEW'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : post.type === 'COLUMN'
                        ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                        : post.type === 'QNA'
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                        : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {post.type === 'REVIEW'
                      ? '낙찰후기'
                      : post.type === 'COLUMN'
                      ? '전문가칼럼'
                      : post.type === 'QNA'
                      ? '질문답변'
                      : '법원판례'}
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{post.author}</span>
                  <span className="text-[10px] text-slate-400">({post.badge})</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400">{post.date}</span>
                </div>

                {post.isAdopted && (
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    답변채택완료
                  </span>
                )}
              </div>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {post.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-[#1E2638]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-rose-500 font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    댓글 {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </span>
                </div>
                <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                  내용 보기 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 글쓰기 모달 */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-[#1E2638] rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E2638]">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                커뮤니티 글 작성
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">제목</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 위례 자이 신도시 아파트 입찰 후기 공유합니다"
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">내용</label>
                <textarea
                  rows={5}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="실전 입찰 경험이나 질문 내용을 자유롭게 작성해 주세요. (투자 손실 주의 및 과장 문구 금지)"
                  className="w-full mt-1 p-3.5 rounded-xl border border-slate-300 dark:border-[#1E2638] bg-slate-50 dark:bg-[#080B10] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#080B10] text-[11px] text-slate-500">
                ⚠️ 등록된 글은 커뮤니티 가이드라인 및 면책 조항에 따라 공개되며, 다른 회원들의 투자 참고 자료로 활용됩니다.
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
}
