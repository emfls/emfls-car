# emfls-car 작업 지침

- 이 저장소 내부만 수정한다.
- 구현 내용과 주요 결정은 `PROJECT_HISTORY.md`에 기록한다.
- P0는 Astro 정적 사이트 기반과 디자인 시스템에 한정한다.
- 실제 차량 데이터처럼 보이는 값은 Demo/Example임을 명시한다.

## Project Isolation Rule

- 현재 작업 프로젝트는 `emfls-car`이며 작업 시작 전에 현재 디렉터리가 `/Users/whitesmile/Documents/emfls-car`인지 확인한다.
- 현재 프로젝트 내부 파일만 수정하고, 다른 Repo나 프로젝트의 파일은 수정하지 않는다.
- 사용자가 붙여넣은 내용이 `emfls-tools`, `emfls-home`, `emfls-aquarium`, `emfls-tech`, `emfls-pet`, `emfls-food`, `emfls-travel`, `emfls-garden`, `emfls-creator` 또는 다른 EMFLS subdomain과 관련된 것으로 보이면 현재 `emfls-car`와 관련이 있는지 먼저 확인한다.
- 현재 Car 프로젝트와 무관한 다른 프로젝트의 프롬프트·코드·디자인·브랜드·카테고리·콘텐츠·도메인·SEO metadata·Analytics·Cloudflare 설정·기능·파일 경로는 명시적인 요청 없이는 적용하지 않는다.
- 다른 프로젝트 내용이 잘못 붙여넣어진 것으로 판단되면 다음 취지로 알린다: "이 내용은 현재 emfls-car 프로젝트가 아니라 다른 프로젝트의 내용으로 보입니다. 잘못 붙여넣은 것으로 판단하여 emfls-car에는 반영하지 않았습니다."
- 일부만 혼입된 경우 다른 프로젝트 부분을 명확히 지적하고 제외하며, `emfls-car` 관련 부분만 처리한다.
