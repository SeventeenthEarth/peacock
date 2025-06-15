# AI React Viewer

Claude와 Gemini가 생성한 React 컴포넌트와 HTML 파일을 웹에서 보고 PDF로 출력할 수 있는 시스템입니다.

## 🎯 주요 기능

- **파일 뷰어**: AI 생성 React 컴포넌트와 HTML 파일을 브라우저에서 실시간 렌더링
- **검색/필터**: 메타데이터 기반 파일 검색 및 AI 도구별, 태그별 필터링
- **PDF 출력**: A4 크기에 최적화된 레이아웃으로 브라우저 기본 출력 기능 활용
- **메타데이터 관리**: 자동 파일 스캔 및 메타데이터 생성으로 효율적인 파일 관리

## 📁 프로젝트 구조

```
project/
├── src/                      # 소스 코드
│   ├── pages/
│   │   ├── Home.tsx         # 파일 목록 페이지
│   │   └── Viewer.tsx       # 파일 뷰어 페이지
│   ├── components/
│   │   ├── FileCard.tsx     # 파일 카드 컴포넌트
│   │   ├── SearchBar.tsx    # 검색 바
│   │   ├── FilterPanel.tsx  # 필터 패널
│   │   └── renderers/
│   │       ├── ReactRenderer.tsx  # Claude React 컴포넌트 렌더러
│   │       └── HTMLRenderer.tsx   # Gemini HTML 렌더러
│   ├── utils/
│   │   ├── fileLoader.ts    # 동적 파일 로딩
│   │   └── metadataManager.ts # 메타데이터 관리
│   └── types/
│       └── metadata.ts      # TypeScript 인터페이스
├── references/              # AI 생성 파일 저장소
│   ├── claude/             # Claude 생성 React 컴포넌트 (.tsx, .jsx)
│   ├── gemini/             # Gemini 생성 HTML 파일 (.html)
│   └── metadata.json       # 파일 메타데이터
└── scripts/
    └── generate-metadata.js # 메타데이터 생성 스크립트
```

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 앱을 확인할 수 있습니다.

### 3. 빌드

```bash
npm run build
```

## 📝 사용 방법

### 새 파일 추가하기

1. **Claude 파일 추가**
   - `.tsx` 또는 `.jsx` 파일을 `references/claude/` 폴더에 저장
   - React 컴포넌트로 작성되어야 함

2. **Gemini 파일 추가**
   - `.html` 파일을 `references/gemini/` 폴더에 저장
   - 완전한 HTML 문서 또는 HTML fragment 형태

3. **메타데이터 생성**
   ```bash
   npm run generate-metadata
   ```

4. **앱에서 새로고침**
   - 홈 페이지의 "파일 목록 새로고침" 버튼 클릭
   - 또는 브라우저 새로고침 (F5)

### 파일 보기 및 출력

1. **파일 목록에서 선택**: 홈 페이지에서 원하는 파일 카드 클릭
2. **뷰어에서 확인**: 파일이 전체 화면으로 렌더링됨
3. **PDF 출력**: `Ctrl+P` (Windows/Linux) 또는 `Cmd+P` (Mac)로 PDF 저장

### 검색 및 필터

- **텍스트 검색**: 파일 제목, 설명, 태그에서 검색
- **AI 도구 필터**: Claude 또는 Gemini 파일만 보기
- **태그 필터**: 특정 태그가 있는 파일만 보기
- **조합 사용**: 검색과 필터를 동시에 사용 가능

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# TypeScript 타입 체크 및 빌드
npm run build

# 코드 린팅
npm run lint

# 메타데이터 생성
npm run generate-metadata
```

## 📊 메타데이터 시스템

### 자동 생성되는 정보

- **파일 정보**: 이름, 경로, 크기, 생성/수정 날짜
- **내용 분석**: 제목, 설명 (주석에서 추출)
- **의존성**: import된 라이브러리 목록
- **태그**: 파일 내용 기반 자동 태그 생성
- **검색 텍스트**: 통합 검색을 위한 인덱스

### 메타데이터 스키마

```typescript
interface FileMetadata {
  id: string                    // 고유 식별자
  filename: string              // 파일명
  path: string                  // 상대 경로
  ai: 'claude' | 'gemini'      // AI 도구
  type: 'react' | 'html'       // 파일 타입
  title: string                 // 표시용 제목
  description?: string          // 설명
  tags: string[]               // 검색용 태그
  createdAt: string            // 생성 날짜 (ISO 8601)
  updatedAt: string            // 수정 날짜 (ISO 8601)
  dependencies?: string[]       // 사용된 라이브러리
  size: number                 // 파일 크기 (bytes)
  searchText?: string          // 검색 최적화용 텍스트
}
```

## 🎨 기술 스택

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.6.2
- **Icons**: Lucide React 0.515.0
- **Linting**: ESLint 9.25.0

## 🔧 개발 환경 설정

### TypeScript 설정

프로젝트는 다중 TypeScript 설정을 사용합니다:
- `tsconfig.json`: 루트 설정
- `tsconfig.app.json`: 애플리케이션 설정
- `tsconfig.node.json`: Node.js 환경 설정

### ESLint 설정

React 19와 최신 ESLint 규칙을 사용하여 코드 품질을 유지합니다.

### Vite 설정

- Hot Module Replacement (HMR) 지원
- TypeScript 지원
- React 컴파일러 활성화

## 📋 출력 최적화

### A4 출력 설정

- 페이지 크기: A4 (210mm × 297mm)
- 여백: 20mm
- 폰트 최적화: 출력용 타이포그래피
- 페이지 나누기 제어: 이미지/표 분할 방지

### CSS 최적화

```css
@media print {
  @page { 
    size: A4;
    margin: 20mm;
  }
  
  /* 페이지 나누기 제어 */
  h1, h2, h3 { break-after: avoid; }
  img, table { break-inside: avoid; }
}
```

## 🚦 문제 해결

### 메타데이터 로드 실패

1. `references/metadata.json` 파일이 존재하는지 확인
2. `npm run generate-metadata` 실행
3. 브라우저에서 새로고침

### 파일이 표시되지 않음

1. 파일이 올바른 폴더에 있는지 확인
   - Claude: `references/claude/*.{tsx,jsx}`
   - Gemini: `references/gemini/*.html`
2. 파일 형식이 올바른지 확인
3. 메타데이터 재생성 후 새로고침

### 출력이 제대로 되지 않음

1. 뷰어 페이지에서 출력 (홈 페이지가 아님)
2. 브라우저 출력 설정에서 "배경 그래픽" 활성화
3. A4 크기로 페이지 설정

## 📄 라이선스

이 프로젝트는 개인/교육 목적으로 자유롭게 사용할 수 있습니다.

## 🤝 기여

버그 리포트나 기능 요청은 이슈로 등록해 주세요.