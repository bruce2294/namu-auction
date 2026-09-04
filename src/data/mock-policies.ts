export interface PolicyRule {
  id: string;
  title: string;
  category: 'TAX' | 'LOAN' | 'REGULATION';
  effectiveDate: string;
  sourceCitation: string;
  summary: string;
  impactOnBuyer: {
    firstHome: string; // 1주택/무주택
    multiHome: string; // 다주택자
  };
  keyMetrics: {
    label: string;
    value: string;
    subtext?: string;
  }[];
}

export const MOCK_POLICY_RULES: PolicyRule[] = [
  {
    id: 'pol-001',
    title: '2026년 하반기 수도권 스트레스 DSR 2단계 및 주택담보대출 한도 기준',
    category: 'LOAN',
    effectiveDate: '2026-09-01 시행',
    sourceCitation: '금융위원회 금융정책과 고시 제2026-118호',
    summary: '수도권 주택 매수 시 차주별 스트레스 금리 1.20%p 가산 적용. DSR 40% 한도 내 대출 가능액 자동 산출.',
    impactOnBuyer: {
      firstHome: '연소득 7천만원 기준 수도권 아파트 대출 한도 최대 4.3억원 (LTV 70% 범위 내)',
      multiHome: '다주택자 규제지역 주택 매수 시 담보대출 원칙적 불가 (사업자/신용대출 예외 시뮬레이션 필요)',
    },
    keyMetrics: [
      { label: '수도권 가산금리', value: '+1.20%p', subtext: '스트레스 DSR 2단계' },
      { label: '무주택 LTV 상한', value: '최대 70%', subtext: '생애최초 80%' },
      { label: 'DSR 상한', value: '40%', subtext: '은행권 기준' },
    ],
  },
  {
    id: 'pol-002',
    title: '지방세법 다주택자 취득세 중과 차등 적용 및 일시적 2주택 처분 기한',
    category: 'TAX',
    effectiveDate: '2026년 현행 유지',
    sourceCitation: '행정안전부 부동산세제과 법령 안내',
    summary: '비규제지역 1~2주택 기본세율(1~3%), 조정대상지역 2주택 8%, 3주택 이상 12% 중과세율 적용.',
    impactOnBuyer: {
      firstHome: '취득가 6억 이하 1.1%, 9억 초과 3.3% 기본세율',
      multiHome: '조정지역 2주택 취득 시 8.0%, 3주택 이상 12.0% 중과 (법원경매/공매 낙찰 동일 적용)',
    },
    keyMetrics: [
      { label: '무주택/1주택', value: '1.1% ~ 3.3%', subtext: '취득가액별 차등' },
      { label: '조정 2주택', value: '8.0%', subtext: '중과세율' },
      { label: '3주택 이상', value: '12.0%', subtext: '최고 중과세율' },
    ],
  },
  {
    id: 'pol-003',
    title: '강남3구·용산구 조정대상지역 및 투기과열지구 잔여 지정 규정',
    category: 'REGULATION',
    effectiveDate: '현재 효력 유지',
    sourceCitation: '국토교통부 주거정책심의위원회 공고',
    summary: '강남·서초·송파·용산 4개 구는 규제지역 유지. 그 외 서울 전역 및 수도권은 비규제지역으로 대출·세제 완화 적용.',
    impactOnBuyer: {
      firstHome: '규제지역 매수 시 실거주 의무 및 LTV 50% 적용, 비규제지역은 실거주 의무 없이 LTV 70%',
      multiHome: '비규제지역(마포, 성동, 영등포 등) 2주택 취득 시 취득세 중과 배제(기본세율 적용)',
    },
    keyMetrics: [
      { label: '규제지역', value: '강남3구·용산', subtext: 'LTV 50% 제한' },
      { label: '비규제지역', value: '서울 21개구 외', subtext: 'LTV 70% 가능' },
      { label: '실거주 의무', value: '규제지역 한정', subtext: '전세퇴거자금 가능' },
    ],
  },
];
