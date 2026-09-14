# EMFLS CAR

`car.emfls.com`을 위한 자동차 관리 대시보드형 가이드 사이트입니다.

## Stack

- Astro + TypeScript
- Static output for Cloudflare Pages
- Vanilla CSS
- Minimal JavaScript / no database / no API / no SSR

## Commands

```bash
npm install
npm run dev
npm run check
npm test
npm run build
```

## Structure

- `src/data/`: 확장 가능한 카테고리·가이드·도구 데이터
- `src/components/`: 공통 UI 구성요소
- `src/layouts/`: SEO와 공통 문서 구조
- `src/pages/`: crawl 가능한 정적 및 데이터 기반 routes
- `src/styles/`: 독립적인 자동차 대시보드 디자인 시스템

P0 화면의 대시보드 숫자와 상태는 실제 차량 정보가 아닌 Demo/Example UI입니다.
