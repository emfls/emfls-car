# Project History

## 2026-09-14 — P0 사이트 기반 및 디자인 시스템 구축

### 수행 작업

- `emfls-car`를 Astro static output 프로젝트로 초기화했다.
- 자동차 관리 대시보드형 홈페이지와 가이드·도구 목록 구조를 만들었다.
- 정비, 소모품, 타이어, 운전, 중고차, 전기차, 세차, 차량용품, 경고등 카테고리 데이터를 등록했다.
- 엔진오일, 브레이크 패드, 타이어 공기압, 배터리, 와이퍼, 냉각수, 자동차 경고등, 연비, 장거리 운전, 중고차 점검 대표 데이터를 등록했다.
- 공통 레이아웃, 헤더, 푸터, 상태 지표, 가이드 카드, 도구 카드를 구현했다.
- 홈, 가이드, 도구, 소개, 개인정보처리방침, 문의, 404와 데이터 기반 상세·카테고리 경로를 만들었다.
- title, description, canonical, Open Graph, JSON-LD, sitemap, robots.txt, favicon을 추가했다.

### 생성/수정 파일

- 프로젝트 설정: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`
- 데이터: `src/data/site.ts`, `src/data/content.ts`
- UI: `src/layouts/BaseLayout.astro`, `src/components/*`, `src/styles/global.css`
- 페이지: `src/pages/*`
- 공개 자산: `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`, `public/_headers`
- 문서: `AGENTS.md`, `SITE_STRATEGY.md`, `DESIGN_SYSTEM.md`, `TASKS.md`, `README.md`
- 기존 `REPOSITORY_CONNECTION.md`는 보존했다.

### 주요 기술 결정

- Astro의 정적 페이지와 `getStaticPaths()`를 사용해 DB/API 없이 콘텐츠 확장이 가능하도록 했다.
- 카테고리·가이드·도구를 typed local data로 분리했다.
- 외부 UI 프레임워크나 불필요한 dependency를 추가하지 않았다.

### 디자인 결정

- graphite 배경, 얇은 경계선, cyan/amber/coral 상태 체계로 계기판의 정밀함을 표현했다.
- 홈 대시보드 수치에는 `DEMO UI · EXAMPLE`을 표시하고 예시 데이터임을 하단에도 안내했다.
- 모바일 우선의 정보 밀도와 카드 그리드를 적용했다.

### 아직 구현하지 않은 항목

- 실제 가이드 장문 콘텐츠
- 차량 유지관리 플래너
- 연비·주유비 계산기 로직
- 로그인, DB, API, 분석 도구, 광고, 문의 전송

### 다음 권장 작업

P1에서 대표 가이드 상세 콘텐츠를 먼저 작성한 뒤, 입력과 결과의 경계를 명확히 한 연비 계산기 MVP와 유지관리 플래너 MVP를 추가한다.

### 검증 결과

- `npm install` 성공.
- `npm run check` 성공: 0 errors, 0 warnings.
- `npm run build` 성공: static output, 30 pages generated.
- `REPOSITORY_CONNECTION.md`를 포함해 기존 파일을 불필요하게 덮어쓰지 않았다.
- 생성 산출물(`dist/`, `.astro/`, `node_modules/`)은 `.gitignore`로 제외했다.

## 2026-09-14 — P1-A 연비·주유비 계산기 MVP

### 구현 기능

- `/tools/fuel-economy/`에 실제로 동작하는 연비·주유비 계산기를 추가했다.
- 주행거리, 사용 연료량, 연료 단가 입력으로 연비, 총 연료비, 1km당 비용, 100km 예상 비용을 계산한다.
- 계산 방법, 계산 예시, FAQ, 관련 자동차 도구 영역을 추가했다.
- `/tools/`의 도구 카드와 홈페이지 Quick Tools에서 계산기로 연결되도록 데이터를 갱신했다.

### 생성/수정 파일

- 생성: `src/lib/fuel-calculator.js`, `src/pages/tools/fuel-economy/index.astro`, `tests/fuel-calculator.test.mjs`
- 수정: `src/data/content.ts`, `src/pages/tools/[slug].astro`, `src/styles/global.css`, `package.json`, `README.md`, `TASKS.md`, `public/sitemap.xml`

### 계산 공식

- 연비 = 주행거리 ÷ 사용 연료량
- 총 연료비 = 사용 연료량 × 연료 단가
- 1km당 연료비 = 총 연료비 ÷ 주행거리
- 100km 예상 연료비 = 1km당 연료비 × 100

### UX 결정

- 자동 입력값은 제공하지 않고 `예: 600`, `예: 45`, `예: 1650` placeholder만 사용했다.
- 모바일 숫자 키패드를 위해 `inputmode`와 `type="number"`를 사용했다.
- 잘못된 값은 인라인 메시지로 표시하며 alert, 저장, API를 사용하지 않는다.
- 결과 영역은 `aria-live`로 계산 결과 변화를 전달하고 색상 외에 상태 텍스트도 제공한다.
- 실용적인 입력 상한을 두어 비정상적으로 큰 값을 안내한다.

### 검증 결과

- `npm test`: 4 tests passed
- `npm run check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: static output, 30 pages built
- Case 1 계산값과 0, 음수, 비숫자, 과대값 검증 케이스를 자동 테스트했다.

### 아직 구현하지 않은 기능

- 차량 유지관리 플래너
- 사용자 차량 저장 및 LocalStorage 프로필
- EV 충전비, 실시간 유가, 지역별 유가 조회
- 로그인, DB, API, 광고, 분석 도구

### 다음 권장 작업

P1-B에서 대표 가이드 상세 콘텐츠를 보강하고, 이후 유지관리 플래너를 별도 기능으로 설계한다.

## 2026-09-14 — P1-B 대표 자동차 가이드 상세 콘텐츠 구축

### 생성한 가이드

- `/guides/engine-oil-change-interval/` — 엔진오일 교체 주기
- `/guides/tire-pressure/` — 타이어 공기압 확인 방법
- `/guides/car-battery-replacement/` — 자동차 배터리 교체 시기
- `/guides/brake-pad-replacement/` — 브레이크 패드 교체 시기
- `/guides/dashboard-warning-lights/` — 자동차 경고등 기본 확인 방법

### 생성/수정 파일

- 생성: `src/components/GuideDetail.astro`
- 수정: `src/data/content.ts`, `src/pages/guides/[slug].astro`, `src/pages/guides/index.astro`, `src/styles/global.css`, `public/sitemap.xml`, `TASKS.md`
- 기존 P0/P1-A의 공통 레이아웃, GuideCard, 계산기, `REPOSITORY_CONNECTION.md`는 보존했다.

### 콘텐츠 구조 결정

- 각 상세 페이지는 핵심 답변, 요약 bullet, 판단 기준 섹션, 직접 확인 절차, 안전 주의사항, FAQ, 관련 링크를 공통 구조로 렌더링한다.
- 상세 콘텐츠는 `guideDetails` typed data로 관리해 이후 같은 route와 컴포넌트로 확장할 수 있도록 했다.
- 일반 가이드는 기존 fallback 템플릿을 유지하고 대표 5개만 실제 상세 콘텐츠를 제공한다.

### 안전/정확성 원칙

- 제조사 매뉴얼과 차량별 차이를 항상 우선하도록 명시했다.
- 엔진오일·배터리·타이어는 절대적인 교체 수명이나 공기압을 단정하지 않았다.
- 브레이크와 경고등은 위험한 자가정비를 유도하지 않고 이상 시 전문가 점검과 안전한 정차를 안내한다.
- 경고등은 색상뿐 아니라 점멸 여부와 차량 증상을 함께 판단하도록 구성했다.

### 내부 링크 / SEO

- 대표 가이드 사이에 실제 생성되는 가이드 route만 연결했다.
- 연비 관련 가이드에서 `/tools/fuel-economy/`로 연결했다.
- 장거리 운전, 타이어 공기압, 경고등, 엔진오일, 배터리, 브레이크 관련 링크를 상호 연결했다.
- 각 상세 페이지에 고유 title, description, canonical, Open Graph와 Article JSON-LD를 적용했다.
- 대표 5개 URL을 `public/sitemap.xml`에 추가했다.

### 검증 결과

- `npm test`: 기존 fuel calculator 4 tests passed
- `npm run check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: 30 pages built
- 5개 상세 route 정적 생성 확인
- `/guides/`와 홈페이지의 데이터 기반 링크 확인
- placeholder/lorem ipsum 검색 결과 없음

### 다음 권장 작업

P1-C에서 검색 의도가 높은 추가 콘텐츠 2~3개를 선정하고, 실제 사용자 질문과 Search Console 데이터를 기준으로 관련 가이드 연결을 개선한다. 유지관리 플래너는 별도 기능 범위로 설계한다.

## 2026-09-14 — P1-C 차량 유지관리 플래너 MVP

### 구현 기능

- `/tools/maintenance-planner/`에 브라우저 기반 유지관리 플래너를 추가했다.
- 현재 주행거리와 엔진오일 교체 주행거리, 타이어·배터리·브레이크 상태를 입력받아 상태 카드를 만든다.
- 결과를 `ATTENTION → CHECK → SOON → OK` 우선순위로 정렬하고 각 항목에 이유, 다음 행동, 관련 가이드를 표시한다.
- 입력 초기화 버튼과 inline validation을 추가했다.

### 판정 로직

- 엔진오일은 마지막 교체 이후 주행거리 차이를 계산하고 제조사 매뉴얼과 비교하도록 안내한다. 임의의 교체 주기를 절대 기준으로 판정하지 않는다.
- 타이어는 최근 점검만 `OK`, 오래됨·모름은 `CHECK`로 표시한다.
- 배터리는 최근 점검/교체는 `OK`, 오래됨·모름은 `CHECK`, 약한 시동은 `ATTENTION`으로 표시한다.
- 브레이크는 이상 없음은 `OK`, 모름은 `CHECK`, 소음·제동감 변화는 보수적으로 `ATTENTION`으로 표시한다.

### 안전·개인정보 결정

- 결과는 차량 진단이 아닌 입력 기반 관리 참고 결과라고 명시했다.
- 브레이크 이상에는 전문 정비 점검과 안전한 판단을 안내한다.
- 차량 제조사 매뉴얼 우선 원칙을 페이지 콘텐츠와 결과 행동 문구에 반영했다.
- LocalStorage, Cookie, 계정, DB, API, 서버 전송을 사용하지 않는다.

### 생성/수정 파일

- 생성: `src/lib/maintenance-planner.js`, `src/pages/tools/maintenance-planner/index.astro`, `tests/maintenance-planner.test.mjs`
- 수정: `src/data/content.ts`, `src/pages/tools/[slug].astro`, `src/styles/global.css`, `package.json`, `public/sitemap.xml`, `TASKS.md`

### 검증 결과

- `npm test`: 9 tests passed (fuel calculator 4 + maintenance planner 5)
- `npm run check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: 30 pages built
- `/tools/maintenance-planner/` 정적 생성 확인
- 홈페이지·`/tools/` 플래너 링크 및 4개 관련 가이드 링크 확인

### 다음 권장 작업

P2에서 실제 사용자의 입력 패턴과 검색 데이터를 바탕으로 상태 문구를 다듬고, 필요할 때만 유지관리 항목을 추가한다. 차량 저장이나 알림 기능은 별도 제품 범위로 검토한다.

## 2026-09-14 — P1-D 대표 자동차 가이드 5개 추가 및 내부링크 강화

### 신규 가이드

- `/guides/wiper-replacement/` — 와이퍼 교체 시기와 확인 방법
- `/guides/coolant-check/` — 자동차 냉각수 점검 방법
- `/guides/long-distance-driving-checklist/` — 장거리 운전 전 차량 점검 체크리스트
- `/guides/tire-replacement/` — 타이어 교체 시기 확인 방법
- `/guides/fuel-economy-drop/` — 자동차 연비가 갑자기 떨어지는 이유

### 변경 파일

- 수정: `src/data/content.ts`, `src/pages/index.astro`, `public/sitemap.xml`, `TASKS.md`
- 기존 `GuideDetail`, `/guides/[slug]/`, `BaseLayout`, 디자인 시스템을 재사용했다.
- 신규 컴포넌트나 기능, 계산기, 플래너는 추가하지 않았다.

### 내부링크 구조

- 엔진오일, 타이어 공기압, 배터리, 브레이크, 경고등 가이드에서 장거리 점검·냉각수·타이어 교체로 연결했다.
- 신규 가이드에서 실제 존재하는 엔진오일, 타이어 공기압, 경고등, 배터리, 브레이크 가이드로 연결했다.
- 냉각수·장거리 점검·타이어 교체·연비 저하 가이드에서 유지관리 플래너를 관련 도구로 노출했다.
- 연비 저하 가이드에서 `/tools/fuel-economy/`로 연결했다.
- 홈페이지 P1 플래너 CTA를 실제 `/tools/maintenance-planner/` route로 갱신했다.

### 안전 및 정확성 결정

- 제조사 매뉴얼과 차량별 차이를 우선하도록 작성했다.
- 냉각계통은 뜨거운 상태에서 캡을 열지 않도록 명시하고 과열·반복 감소 시 전문 점검을 권장했다.
- 타이어 손상, 브레이크 이상, 경고등과 주행 이상은 계속 운전을 단정하지 않고 안전한 정차·전문 점검을 안내했다.
- 와이퍼와 타이어는 특정 개월·수명을 절대 기준으로 제시하지 않았다.

### SEO 및 검증

- 모든 신규 페이지에 기존 `BaseLayout` 기반 고유 title, description, canonical, Open Graph, Article JSON-LD를 적용했다.
- 신규 5개 URL을 sitemap에 추가했다.
- `npm test`: 9 tests passed
- `npm run check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: 35 pages built
- 신규 5개 route 생성, 기존 대표 5개 route 유지, 내부 링크 대상 확인

### 다음 권장 작업

P2에서 Search Console과 실제 검색 질문을 기준으로 상위 가이드의 업데이트 우선순위를 정하고, 가이드 간 관련 링크 클릭 흐름을 개선한다.

## 2026-09-14 — Project Isolation Rule 추가

여러 EMFLS 프로젝트를 병렬 운영하므로 다른 Repo의 내용이 실수로 붙여넣어질 수 있음. 프로젝트 불일치 내용을 감지하면 잘못 붙여넣었다고 명시하고 현재 Repo에 반영하지 않는 Project Isolation Rule을 `AGENTS.md`에 추가함.

## 2026-09-14 — P2 Launch QA 및 배포 준비 점검

### QA 범위

- 현재 정적 build의 전체 33개 HTML route
- 10개 대표 자동차 가이드, 카테고리 route, 연비 계산기, 유지관리 플래너
- 내부 링크, sitemap, robots.txt, canonical, Open Graph, title/description, Article JSON-LD
- 계산기·플래너 기존 테스트, 모바일 CSS 규칙, 기본 접근성 markup, Contact/Privacy 정합성

### 발견한 문제

- 계획 중인 `fuel-cost-calculator`와 `tire-tools`가 상세 route로 생성되어 얇은 준비 중 페이지가 노출되고 있었다.
- About, Privacy, Contact, 404 등 일부 페이지가 공통 기본 description을 공유해 duplicate metadata가 있었다.
- 콘텐츠가 없는 전기차·세차·차량용품 카테고리가 indexable 상태에서 준비 중 문구를 보여주고 있었다.

### 수정한 문제

- 계획 중 도구는 route를 생성하지 않고 비링크 `SOON` 카드로 표시하도록 정리했다.
- About, Privacy, Contact, 404에 고유 meta description을 추가했다.
- 빈 카테고리는 중립적인 안내 문구와 `noindex,follow`를 적용했다.
- 기존 기능, 콘텐츠, 계산 로직은 재작성하지 않았다.

### 수정하지 않은 항목과 이유

- 실제 Publisher ID가 없어 `ads.txt`를 만들지 않았다.
- Analytics, 광고, DB, API, 로그인은 범위 밖이며 추가하지 않았다.
- 수동 sitemap 자동화는 현재 route 수가 안정적이고, 이번 QA에서는 무리한 아키텍처 변경을 하지 않았다.
- 실제 브라우저 기반 시각 테스트 도구 없이 정적 CSS·markup·build 산출물 기준으로 모바일/접근성을 점검했다.

### 검증 결과

- `npm test`: 9 tests passed
- `npm run check`: 0 errors, 0 warnings, 0 hints
- `npm run build`: 33 pages built
- 전체 HTML route의 title, description, canonical, Open Graph, h1, 내부 링크 점검 통과
- sitemap 대상·중복 URL 점검 통과
- 계획 중 도구 route 미생성 확인
- lorem ipsum, 개발용 TODO/FIXME, 준비 중 placeholder 문구 점검 통과

### Launch blocker

없음. 현재 정적 배포를 막는 오류는 확인되지 않아 `READY WITH MINOR ITEMS`로 판정했다.

### 다음 권장 작업

배포 후 실제 도메인에서 Cloudflare Pages 응답 헤더, Search Console 색인 상태, 모바일 실기기 시각 QA를 확인한다.

## 2026-09-14 — Production Deployment 준비 및 Cloudflare Pages 연결

### 배포 대상

- GitHub Repo: `https://github.com/emfls/emfls-car.git`
- Production branch: `main`
- Cloudflare Pages project: `emfls-car` 전용 프로젝트 생성
- Build command: `npm run build`
- Output directory: `dist`
- Astro output: static, `site: https://car.emfls.com`

### 진행 상태

- Cloudflare Pages에 `emfls-car` 프로젝트를 생성하고 GitHub `emfls/emfls-car`를 연결했다.
- 기존 `emfls-home`, `emfls-site` Pages 프로젝트와 다른 EMFLS 프로젝트는 수정하지 않았다.
- 최초 연결 시점에는 기존 커밋에 대한 배포가 생성되지 않아, 이 기록 커밋을 `main`에 push하여 GitHub 연동 Production 배포를 트리거한다.
- Custom Domain `car.emfls.com` 연결과 Production URL QA는 배포 완료 후 이어서 확인한다.

### 다음 권장 작업

최신 Cloudflare Production deployment가 성공한 뒤 `car.emfls.com` Custom Domain, HTTPS, 주요 route, 계산기·플래너, sitemap·robots·canonical을 실제 응답 기준으로 검증한다.
