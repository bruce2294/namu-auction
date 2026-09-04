# [IA & User Flow] 정보구조 및 핵심 유저 플로우 설계서
> **문서 버전:** v1.2  
> **기준 문서:** [PRD_부동산경공매정보플랫폼.md](file:///c:/bruce/workspace/my_project/namu-auction/260904/namu-auction/docs/PRD_%EB%B6%80%EB%8F%99%EC%82%B0%EA%B2%BD%EA%B3%B5%EB%A7%A4%EC%A0%95%EB%B3%B4%ED%94%8C%EB%9E%AB%ED%8F%BC.md)  
> **최신 갱신일자:** 2026-09-04  
> **운영 법인:** 주식회사 나무 D&C (대표이사: 오세현)  

---

## 1. 정보구조 (Information Architecture, IA)

나무옥션은 **단일 반응형 웹 클라이언트(Next.js App Router 기반)**로 데스크톱과 모바일을 모두 지원하며, **기본 라이트 모드(Default)**와 다크 모드 토글, 그리고 **쇼핑몰형 경·공매 입찰 장바구니**를 전역에서 지원합니다.

```
나무옥션 (Namu Auction)
├── 🌐 전역 공통 레이아웃 (Global Shell)
│   ├── GNB 헤더 (Header)
│   │   ├── 서비스 로고 ("나무옥션", 법인: 주식회사 나무 D&C)
│   │   ├── 주요 네비게이션 (검색 / 지도 / 커뮤니티 / 자산관리 / 멤버십)
│   │   ├── 라이트/다크 테마 토글 버튼 (기본값: 라이트 모드)
│   │   ├── 🛒 입찰 장바구니 트리거 버튼 (담긴 물건 수 뱃지 표시)
│   │   └── 사용자 인증 (4대 소셜 로그인 모달 / 로그인 후 프로필 드롭다운)
│   ├── 🛒 입찰 장바구니 드로어 (CartDrawer)
│   │   ├── 담긴 경·공매 물건 목록 및 개별 삭제
│   │   ├── 3대 합산 금액 실시간 집계 (총 감정가, 총 최저입찰가, 총 필요 입찰보증금 10%)
│   │   └── [원클릭 일괄 상담 / 입찰의뢰 신청] CTA
│   ├── 🔐 4대 소셜 로그인 모달 (LoginModal)
│   │   ├── 네이버 간편 로그인 (#03C75A)
│   │   ├── 카카오 간편 로그인 (#FEE500)
│   │   ├── 구글 간편 로그인 (Google Multi-color)
│   │   └── 애플 간편 로그인 (#000000 / 다크 #FFFFFF)
│   └── 📄 공통 푸터 (Footer)
│       ├── 법인 정보 (주식회사 나무 D&C, 대표이사: 오세현, 사업자정보)
│       ├── 법적 투자 면책 조항 고지 배너
│       └── 고객센터 및 바로가기 링크
│
├── 1. 홈 (/)
│   ├── 🌟 쇼핑몰형 7:3 와이드 롤링 배너 (RollingBanner)
│   │   ├── 우측 70%: 무손실 고화질 이미지 갤러리 액자 (1.jpg ~ 5.jpg, 앰비언트 블러 백드롭)
│   │   ├── 좌측 30%: 애플 아이폰 스타일 리퀴드 글래스 멘트 카드 (초투명 유리 + 실시간 3D 입체 물방울 4구)
│   │   ├── 5대 감성 자극 카피라이팅 & 인디케이터 / 이전·다음 컨트롤
│   │   └── [즉시 경매 물건 보러가기] 다이렉트 CTA
│   ├── 오늘의 AI 추천 & 급매 테마 큐레이션 (반값 경매, 2회 이상 유찰)
│   ├── 물건 카드 내 [🛒 담기] 원클릭 장바구니 연동
│   ├── 지역별 경·공매 통계 현황 (신건/진행/낙찰가율 요약)
│   ├── 최신 낙찰 성공 후기 미리보기
│   └── 최신 부동산 정책/세제 변경 브리핑 알림
│
├── 2. 경·공매 검색 (/search)
│   ├── 통합 검색 / 경매 탭 / 공매(온비드) 탭
│   ├── 다중 조건 필터 (지역, 물건용도, 감정/최저가, 유찰횟수, 매각기일)
│   ├── 결과 목록 (카드 그리드 뷰 / 리스트 뷰 전환, 물건별 [🛒 담기] 버튼)
│   └── 물건 상세 팝업 모달 / 전용 뷰 (DetailModal)
│       ├── AI 브리핑 카드 (감정가/최저가/유찰현황/권리분석 신호등)
│       ├── 사진 갤러리 및 현황 위치도
│       ├── 국토부 실거래가 기반 시세분석 리포트 (유사 거래 산출 근거 + 면책 고지)
│       ├── 매각기일 변동 히스토리 & 가격 변동 차트
│       ├── 사건 기본 내역 (물건명세서, 감정평가요약, 등기부 현황)
│       └── [🛒 장바구니 담기] 및 공유 기능
│
├── 3. 인터랙티브 지도 (/map)
│   ├── 전체화면 카카오 지도 (마커 클러스터링)
│   ├── Bounding Box 기반 실시간 물건 렌더링 (Debounce 조회)
│   ├── 지도 상단 필터바 (지역/물건종류/가격대)
│   ├── 마커 클릭 시 바텀 시트 / 간이 팝업 카드 노출 (장바구니 담기 연동)
│   └── 관심지역 설정 (신규 물건 등록 알림 연동)
│
├── 4. 투자자 커뮤니티 (/community)
│   ├── 탭 메뉴
│   │   ├── 전문가 칼럼 (인증 전문가 작성)
│   │   ├── 낙찰 후기 (일반회원 실전 경험담, 면책 배너 포함)
│   │   ├── 경공매 Q&A (질문 및 답변 채택)
│   │   └── 법원 판례 아카이브 (판례 퀴즈, 승소/패소 해설)
│   ├── 글 상세 (/community/[id])
│   │   ├── 본문 및 첨부 이미지
│   │   ├── 좋아요, 북마크, 공유, 신고
│   │   └── 댓글 / 대댓글 (Q&A의 경우 답변 채택 버튼)
│   └── 글 작성 (/community/write)
│
├── 5. 멤버십 안내 & 결제 (/membership)
│   ├── 요금제 비교 테이블 (Free / Standard / Premium)
│   ├── 토스페이먼츠 정기구독(빌링키) 결제 연동
│   └── 결제 성공/완료/해지 가이드
│
└── 6. 마이페이지 (/mypage)
    ├── 프로필 및 멤버십 상태 관리 (소셜 연동 정보 확인)
    ├── 입찰 장바구니 내역 및 과거 상담/의뢰 신청 이력
    ├── 내가 작성한 글 / 댓글 / 채택 내역
    └── 🌟 자산관리 & AI 추천 대시보드 (/mypage/assets)
        ├── 내 자산 브리핑 (보유 주택수, 총자산, 가용 투자금)
        ├── 보유 부동산 등록/수정 모달
        ├── 맞춤형 AI 추천 물건 목록 (추천 사유 + 취득세/대출 시뮬레이션)
        └── 정책 변경 영향도 브리핑 배너
```

---

## 2. 핵심 유저 플로우 (Key User Flows)

### Flow 1. 신규 방문자의 물건 탐색 및 입찰 장바구니 일괄 의뢰 흐름
신규/경력 투자자가 홈 배너 또는 검색/지도에서 매력적인 경·공매 물건을 발견하고, 쇼핑몰처럼 장바구니에 담아 필요 보증금을 합산 계산한 뒤 원클릭 상담을 접수하는 여정입니다.

```mermaid
flowchart TD
    Start([방문자 홈 접속]) --> HomeBanner[쇼핑몰형 7:3 롤링 배너 감상]
    HomeBanner --> ActionChoice{탐색 방식 선택}
    
    ActionChoice -->|배너 CTA 클릭| SearchPage[검색 페이지 이동 /search]
    ActionChoice -->|지도 탐색| MapPage[지도 페이지 이동 /map]
    ActionChoice -->|홈 테마 큐레이션| CurationClick[급매/유찰 테마 카드 확인]
    
    SearchPage --> ApplyFilter[필터 적용: 서울 아파트, 2회 유찰]
    ApplyFilter --> ItemList[물건 리스트 노출]
    
    ItemList --> AddCartDirect[물건 카드에서 바로 '🛒 담기' 클릭]
    ItemList --> OpenDetail[물건 카드 클릭하여 상세 모달 열람]
    OpenDetail --> ViewAnalysis[AI 권리분석 신호등 & 시세분석 확인]
    ViewAnalysis --> AddCartModal[상세 모달에서 '🛒 장바구니 담기' 클릭]
    
    AddCartDirect --> CartDrawerOpen[장바구니 드로어 즉시 오픈]
    AddCartModal --> CartDrawerOpen
    
    CartDrawerOpen --> CalcCheck[총 감정가 / 최저가 / 필요 보증금 10% 실시간 자동 집계 확인]
    CalcCheck --> ClickConsult['원클릭 일괄 상담 / 입찰의뢰' 클릭]
    
    ClickConsult --> AuthCheck{로그인 여부}
    AuthCheck -->|미로그인| LoginModal[4대 소셜 로그인 모달 팝업]
    LoginModal -->|네이버/카카오/구글/애플 인증| CompleteConsult[일괄 상담신청 완료 토스트 및 접수]
    AuthCheck -->|로그인 상태| CompleteConsult
```

---

### Flow 2. 4대 소셜 간편 로그인 및 라이트/다크 테마 전환 흐름
사용자가 복잡한 회원가입 절차 없이 네이버, 카카오, 구글, 애플 계정으로 1초 만에 로그인하고 원하는 테마로 사이트를 이용하는 플로우입니다.

```mermaid
flowchart TD
    User([사이트 이용자]) --> HeaderAction{헤더 인터랙션}
    
    HeaderAction -->|테마 토글 버튼 클릭| ThemeToggle[라이트 ↔ 다크 모드 즉각 전환]
    ThemeToggle --> PersistTheme[localStorage 및 html.dark 클래스 반영]
    
    HeaderAction -->|로그인 버튼 클릭| OpenLoginModal[4대 소셜 로그인 모달 팝업]
    OpenLoginModal --> ProviderChoice{인증 수단 선택}
    
    ProviderChoice -->|네이버| NaverOAuth[네이버 OAuth 2.0 팝업/리다이렉트]
    ProviderChoice -->|카카오| KakaoOAuth[카카오 Kauth 간편 인증]
    ProviderChoice -->|구글| GoogleOAuth[Google Identity Services]
    ProviderChoice -->|애플| AppleOAuth[Apple ID로 로그인]
    
    NaverOAuth --> AuthSuccess[토큰 수신 및 AuthContext 사용자 프로필 갱신]
    KakaoOAuth --> AuthSuccess
    GoogleOAuth --> AuthSuccess
    AppleOAuth --> AuthSuccess
    
    AuthSuccess --> CloseModal[모달 닫힘 및 GNB에 사용자 아바타/이름 표시]
    CloseModal --> UnlockFeatures[장바구니 일괄의뢰, 자산관리 등록 등 회원 전용 기능 해제]
```

---

### Flow 3. 무료 이용자의 유료 멤버십 전환 흐름
무료 회원이 일일 상세 열람 한도(5회)에 도달하거나, AI 정밀 추천/시세분석 심화 데이터를 열람하기 위해 토스페이먼츠로 정기 결제하는 과정입니다.

```mermaid
flowchart TD
    User([무료 회원 로그인 이용 중]) --> Trigger{유료 전환 트리거 발생}
    
    Trigger -->|상세 열람 5회 초과| LimitModal[일일 무료 열람 한도 초과 안내 모달]
    Trigger -->|자산관리 AI 추천 클릭| AssetLocked[/mypage/assets AI 추천 잠금 화면]
    Trigger -->|GNB 멤버십 클릭| MembershipPage[/membership 페이지 직접 진입]
    
    LimitModal --> ViewPlans[요금제 비교 화면 표시]
    AssetLocked --> ViewPlans
    MembershipPage --> ViewPlans
    
    ViewPlans --> SelectPlan[Standard 또는 Premium 요금제 선택]
    SelectPlan --> PaymentAuth[토스페이먼츠 카드 등록 / 빌링키 발급 창]
    
    PaymentAuth --> PaymentProcess{결제 승인 처리}
    PaymentProcess -->|성공| SuccessPage[결제 완료 및 멤버십 즉시 활성화]
    PaymentProcess -->|실패| FailRetry[결제 실패 안내 및 카드 재입력 유도]
    
    SuccessPage --> UnlockAccess[모든 제한 해제 및 AI 브리핑 전체 열람]
```

---

### Flow 4. 회원의 낙찰 후기 작성 및 커뮤니티 공유 흐름
실제 경매/공매로 낙찰받은 회원이 자신의 경험을 나누고 커뮤니티 참여도를 높이는 플로우입니다.

```mermaid
flowchart TD
    User([낙찰 경험이 있는 회원]) --> CommPage[커뮤니티 /community 진입]
    CommPage --> WriteBtn[글쓰기 버튼 클릭]
    
    WriteBtn --> AuthCheck{로그인 여부}
    AuthCheck -->|비로그인| LoginModal[소셜 로그인 모달 노출]
    LoginModal --> WriteForm[작성 폼: 탭 선택(낙찰 후기)]
    AuthCheck -->|로그인| WriteForm
    
    WriteForm --> NoticeCheck[투자 면책 문구 고지 확인 및 동의]
    NoticeCheck --> InputDetails[사건번호 매칭 또는 물건 정보 입력]
    InputDetails --> WriteContent[입찰 전략, 명도 후기, 사진 첨부]
    
    WriteContent --> PresignedUpload[S3 Presigned URL 이미지 비동기 업로드]
    PresignedUpload --> SubmitPost[게시글 등록 완료]
    
    SubmitPost --> PostView[게시글 상세 페이지로 이동]
    PostView --> FeedBack[다른 회원들의 축하 댓글 및 좋아요 피드백 수신]
```

---

## 3. 데스크톱 vs 모바일 뷰포트별 UI/UX 차이점 분석

Next.js 단일 반응형 웹 환경에서 뷰포트 크기에 따라 사용자 경험을 최적화하기 위한 핵심 레이아웃 분기 기준입니다.

| 영역 / 기능 | 데스크톱 화면 (Desktop, ≥ 1024px) | 모바일 화면 (Mobile, < 768px) | 설계 및 구현 의도 |
|---|---|---|---|
| **메인 히어로 배너 (RollingBanner)** | **가로 7:3 와이드 분할 레이아웃**<br>• 우측 70%: 고화질 무손실 이미지 액자 (여백 블러)<br>• 좌측 30%: 아이폰 스타일 초투명 리퀴드 글래스 + 입체 물방울 멘트 카드 | **수직 상하 적층 레이아웃 (Stack)**<br>• 상단 60%: 이미지 갤러리 뷰<br>• 하단 40%: 리퀴드 글래스 멘트 카드 오버레이 | 데스크톱의 와이드 비율과 모바일의 수직 스크롤 환경에 각각 최적화된 시각적 집중도 제공 |
| **메인 네비게이션 (GNB)** | 상단 고정 헤더 (로고, 메뉴 텍스트 링크, 테마토글, 장바구니 뱃지, 소셜로그인 버튼) | **하단 5버튼 고정 탭바** (홈, 검색, 지도, 커뮤니티, 마이페이지) + 상단 간이 헤더 (로고, 테마, 장바구니) | 모바일에서 엄지손가락으로 즉각적인 1-Tap 페이지 전환 지원 (모바일 앱 사용성 극대화) |
| **입찰 장바구니 (CartDrawer)** | **우측 사이드 슬라이딩 드로어 (Width 400px)**<br>배경 오버레이와 함께 매끄러운 오픈, 3대 합산 금액 고정 | **하단 바텀시트 / 전체화면 오버레이**<br>모바일 화면 전폭(100%) 차지, 최하단 합산 CTA 고정 | 좁은 모바일 화면에서도 담긴 물건과 보증금 합산 수치를 한눈에 확인 가능하도록 처리 |
| **검색 필터 패널 (/search)** | **좌측 고정 사이드바 (Width 320px)**<br>항상 펼쳐져 있어 필터 변경 시 우측 리스트 즉시 반응 | **하단 슬라이드업 시트 (Bottom Sheet)**<br>우측 하단 플로팅 '필터' 버튼 탭 시 전체 높이 85%로 오픈 | 모바일 좁은 화면에서 리스트 영역을 온전히 확보하고 필터 시에만 집중할 수 있도록 분리 |
| **지도 UI (/map)** | 좌측 물건 리스트 슬라이딩 패널 (Width 400px) + 우측 대형 지도 분할 레이아웃 | **전체화면 풀스크린 지도** + 하단 스와이프 가능한 캐러셀 미니 카드 | 모바일에서는 지도 조작 공간을 최대로 제공하고 스와이프로 매물 탐색 |
| **물건 상세 레이아웃 (/search/[id] 또는 모달)** | 모달 팝업 시 중앙 와이드 뷰 (좌: 사진/권리분석, 우: 시세차트/장바구니 담기 버튼) | **풀스크린 모달 또는 1열 수직 스크롤**<br>상단 핵심 브리핑 → 사진 → 시세분석, 하단 고정 액션바 | 모바일에서 스크롤을 내리며 자연스러운 정보 스토리라인을 따라가도록 배치 |
| **자산관리 대시보드 (/mypage/assets)** | 대시보드 3열 카드 그리드 (자산 요약, 정책 알림, 추천 물건 2열 배치) | 단일 열 카드 스택 + 상단 스와이프 가능한 정책 알림 배너 | 시각적 정보 밀도를 낮추고 핵심 수치(취득세, 가용자금)를 크게 강조 |
| **터치 & 인터랙션** | 마우스 호버(Hover) 효과, 세부 툴팁 마우스오버 표시 | 탭(Tap) 인터랙션, 터치 영역 최소 48x48px 보장, 햅틱 피드백 연상 인터랙션 | 터치 실수 방지 및 모바일 웹 접근성(WCAG 2.1 AA) 준수 |

---
*본 문서는 Phase 2.5(UI/비주얼 아이덴티티 및 디자인 토큰 설계)와 Phase 3(DB 스키마)의 직접적인 입력 자료로 사용됩니다.*

