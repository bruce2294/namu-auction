export type AuctionType = 'COURT' | 'ONBID';

export type AuctionStatus = '신건' | '유찰' | '진행' | '낙찰' | '변경';

export interface AuctionItem {
  id: string;
  type: AuctionType;
  caseNumber: string; // 사건번호 또는 관리번호 (예: 2024타경104523, 2024-0812-001)
  itemNumber?: number; // 물건번호
  courtOrOrg: string; // 서울서부지방법원 또는 캠코
  title: string;
  category: '아파트' | '오피스텔' | '다세대/빌라' | '상가/근린' | '토지';
  addressRoad: string;
  addressJibun: string;
  buildingAreaM2: number;
  landAreaM2?: number;
  appraisalPrice: number; // 감정가
  minimumPrice: number; // 최저매각가격
  bidDeposit: number; // 입찰보증금
  failCount: number; // 유찰 횟수
  auctionDate: string; // YYYY-MM-DD
  dDay: number; // 남은 일수
  status: AuctionStatus;
  
  // AI 시세 및 브리핑 분석 결과 (price_analysis 테이블 연동)
  aiBriefing: {
    headline: string;
    undervalueRatio: number; // 음수 (예: -21.4%)
    estimatedMarketPrice: number; // 예상 시세
    recentDealCount: number; // 표본 거래 건수
    confidenceGrade: 'A' | 'B' | 'C';
    riskSummary: string;
    taxEstimatedRatio: number; // 1주택 기준 예상 취득세율 (%)
    loanEstimatedLimit: string; // LTV 70% 가능 등
  };

  // 썸네일 이미지
  thumbnailUrl: string;
  images: string[];
}
