# EMFLS CAR Tasks

## 2026-09-29 — P0 route publishing and tool parity recovery

- [x] 상세 콘텐츠가 없는 Guide 요약 데이터로 정적 상세 경로를 생성하지 않는다.
- [x] Guide 목록, Home 카드, 카테고리와 sitemap이 동일한 상세 콘텐츠 발행 집합을 사용한다.
- [x] 직접 의도가 겹치는 legacy 경로 3개는 대응하는 상세 Guide로 301 처리한다. 나머지 두 경로는 근거 없이 다른 페이지로 보내지 않는다.
- [x] 연비 계산기와 유지관리 플래너 UI가 테스트되는 공용 계산·검증 모듈을 사용한다.
- [ ] 승인된 배포 후 공개 Production의 route, sitemap, tool interaction을 다시 확인한다.
- [ ] Google / Naver / Daum / IndexNow Search Launch의 계정 상태를 확인하고 Registry에 기록한다.

## P0 — Foundation (완료)

- [x] Astro static foundation
- [x] Data-driven categories, guides, and tools
- [x] Responsive navigation and footer
- [x] Homepage dashboard
- [x] Guides, tools, about, privacy, contact, and 404 pages
- [x] Category, guide, and tool expansion routes
- [x] SEO foundation, sitemap, robots, favicon
- [x] Design and project documentation

## P1 — Product MVP

- [x] P1-A 연비·주유비 계산기 MVP
- [x] P1-B 대표 자동차 가이드 상세 콘텐츠 5개
- [x] P1-C 차량 유지관리 플래너 MVP
- [x] P1-D 대표 자동차 가이드 5개 추가 및 내부링크 강화
- [ ] 문의 채널 연결
- [ ] Maintenance Planner의 일반 10,000km oil check 분기를 제조사/차량별 입력과 더 잘 정합되도록 재검토한다.

## P2 — Content expansion

- [x] P2 Launch QA 및 배포 준비 점검
- [x] Production Deployment: Cloudflare Pages 및 `car.emfls.com` 연결 (`PRODUCTION LIVE`)
- [ ] 카테고리별 콘텐츠 확장
- [ ] 관련 콘텐츠 연결
- [ ] 추가 자동차 계산기

## P3 — Optimization

- [x] Search Console 초기 설정 및 sitemap 제출
- [x] AdSense 심사 준비 QA 및 광고 미삽입 원칙 점검
- [x] GA4 연결 및 Production 전용 측정 설정
- [x] Network Baseline v1 alignment
- [x] Car 전용 1200×630 OG raster image 제작
- [x] Production Visual / UI / UX Polish QA
- [x] Final responsive QA (320/375/768px)
- [ ] Search Console 데이터 기반 개선
- [ ] Winner 콘텐츠 확장
- [ ] 접근성·성능 세부 최적화
