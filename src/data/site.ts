export const site = {
  name: 'EMFLS CAR',
  domain: 'https://car.emfls.com',
  description: '자동차 유지관리부터 운전, 타이어, 전기차까지 다루는 차량 생활 가이드.',
  navigation: [
    { label: '가이드', href: '/guides/' },
    { label: '도구', href: '/tools/' },
    { label: '정비', href: '/guides/category/maintenance/' },
    { label: '전기차', href: '/guides/category/ev/' },
  ],
} as const;
