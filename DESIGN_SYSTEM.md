# EMFLS CAR Design System

## Design concept

Dark automotive dashboard. 계기판의 상태·수치·점검 우선순위를 차용하되 실제 계기판을 복제하지 않고, 정밀하고 차분한 차량 관리 서비스로 보이게 한다.

## Typography

본문은 Manrope와 Noto Sans KR, 수치와 상태 라벨은 DM Mono를 사용한다. 큰 제목은 좁은 행간과 음수 자간으로 정보의 밀도를 만든다.

## Colors

Graphite `#0d1214`, surface `#141b1e`, line `#2a3538`, text `#edf4f1`, muted `#91a2a2`. 정상은 cyan `#75e1d0`, 점검은 amber `#f5b95b`, 주의는 coral `#ed796f`, 보조 강조는 lime/violet을 사용한다.

## Layout

1120px 콘텐츠 컨테이너, 넓은 수평 여백, 얇은 경계선, 낮은 그림자, 4/5열 카드 그리드와 모바일 1~2열 전환을 기본으로 한다.

## Navigation

상단 sticky header에 브랜드, 가이드, 도구, 대표 카테고리, 도구 CTA를 배치한다. 모든 핵심 경로는 텍스트 링크로 탐색 가능해야 한다.

## Card system

Guide Card는 tag, 제목, 요약, 카테고리를 포함한다. Tool Card는 도구 상태를 보여주며 준비 중 기능에는 `SOON`을 표시한다. 카드에 과도한 장식이나 긴 그림자를 사용하지 않는다.

## Status system

Normal은 cyan, Attention은 amber, Warning은 coral로 표시한다. 홈페이지 대시보드 값은 `DEMO UI · EXAMPLE`과 하단 안내로 실제 차량 데이터가 아님을 분명히 한다.

## Responsive behavior

모바일 우선. 850px 이하에서 hero를 단일 열로, 620px 이하에서 내비게이션을 단순화하고 카드 그리드를 2열 또는 1열로 전환한다.

## Forbidden patterns

과도한 네온, 사이버펑크, 게임 UI, 가짜 차량 데이터, 자동 재생 애니메이션, 불필요한 그림자, 외부 UI 라이브러리, 키워드 반복을 금지한다.

## Future advertising placement principles

현재 광고 코드는 없으며, 향후 광고를 도입하더라도 콘텐츠와 기능을 우선한다. 광고는 핵심 답변과 계산기 입력·결과, 경고 메시지, 주요 내비게이션과 분리하고 `광고`임을 명확히 표시한다. 모바일에서 첫 화면의 핵심 정보나 터치 흐름을 가리지 않으며, 버튼·링크처럼 오인될 수 있는 위치와 안전 관련 안내 사이에는 배치하지 않는다.
