# Moomu Landing Page - React Components

기존 HTML 파일을 React 컴포넌트로 분리한 Moomu 랜딩 페이지입니다.

## 프로젝트 구조

```
moomu-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── HeroSection/
│   │   │   ├── HeroSection.js
│   │   │   └── HeroSection.css
│   │   ├── AboutSection/
│   │   │   ├── AboutSection.js
│   │   │   └── AboutSection.css
│   │   ├── MoodboardSection/
│   │   │   ├── MoodboardSection.js
│   │   │   └── MoodboardSection.css
│   │   ├── CTASection/
│   │   │   ├── CTASection.js
│   │   │   └── CTASection.css
│   │   └── Footer/
│   │       ├── Footer.js
│   │       └── Footer.css
│   ├── styles/
│   │   └── GlobalStyles.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## 컴포넌트 설명

### 1. Header
- 로고, 네비게이션, 사용자 메뉴 포함
- 투명 배경과 블러 효과 적용

### 2. HeroSection  
- 메인 타이틀과 Moomu 로고
- 애니메이션 이미지 갤러리
- CTA 버튼 포함

### 3. AboutSection
- Moomu 소개 및 특징
- 그라디언트 텍스트 효과
- Features 카드 3개

### 4. MoodboardSection
- 무드보드 설명
- 태그와 설명이 포함된 카드 형태

### 5. CTASection
- 최종 행동 유도 섹션
- 앱 프리뷰 영역

### 6. Footer
- 소셜 링크, 푸터 메뉴
- 저작권 정보

## 설치 및 실행

### 1. 의존성 설치
```bash
cd moomu-react
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 빌드
```bash
npm run build
```

## 주요 기능

- **반응형 디자인**: 모든 컴포넌트가 재사용 가능한 형태로 구성
- **CSS 모듈화**: 각 컴포넌트별로 독립적인 CSS 파일 관리
- **애니메이션**: 이미지 갤러리 슬라이드 애니메이션
- **그라디언트 효과**: 버튼과 텍스트에 그라디언트 스타일 적용
- **재사용 가능한 스타일**: GlobalStyles.css에 공통 스타일 정의

## 기술 스택

- React 18.2.0
- CSS3 (Flexbox, Grid, Animations)
- Google Fonts (Pretendard, MuseoModerno)