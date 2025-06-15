# AI 생성 React/HTML 파일 뷰어 프로젝트

## 📋 요구사항 (Requirements)

### 1. 프로젝트 개요
- **목적**: Claude와 Gemini가 생성한 React 컴포넌트와 HTML 파일을 웹에서 보고 PDF로 출력할 수 있는 시스템
- **기술 스택**: React + Vite + TypeScript + Tailwind CSS
- **핵심 기능**: 파일 목록, 검색/필터, 실시간 렌더링, PDF 출력

### 2. 디렉토리 구조
```
project/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/
│   │   ├── Home.tsx         # 파일 목록 페이지
│   │   └── Viewer.tsx       # 파일 뷰어 페이지
│   ├── components/
│   │   ├── FileList.tsx
│   │   ├── FileCard.tsx
│   │   ├── SearchPanel.tsx
│   │   └── renderers/
│   │       ├── ReactRenderer.tsx
│   │       └── HTMLRenderer.tsx
│   ├── utils/
│   │   ├── fileLoader.ts
│   │   └── metadataManager.ts
│   └── metadata.json        # 빌드 시 생성
├── references/              # AI 생성 파일 저장소
│   ├── claude/             # Claude 생성 파일
│   │   ├── *.tsx
│   │   └── *.jsx
│   ├── gemini/             # Gemini 생성 파일
│   │   ├── *.html
│   │   └── *.js
│   └── metadata.json       # 파일 메타데이터
└── package.json
```

### 3. 메타데이터 시스템

#### 메타데이터 스키마
```typescript
interface FileMetadata {
  id: string                    // 고유 식별자 (예: "claude-dashboard-tsx")
  filename: string              // 파일명
  path: string                  // 상대 경로
  ai: 'claude' | 'gemini'      // AI 도구
  type: 'react' | 'html'       // 파일 타입
  title: string                 // 표시용 제목
  description?: string          // 설명
  tags: string[]               // 검색용 태그
  createdAt: string            // ISO 8601 형식
  updatedAt: string            // ISO 8601 형식
  dependencies?: string[]       // 사용된 라이브러리
  size: number                 // 파일 크기 (bytes)
  searchText?: string          // 검색 최적화용 텍스트
}

interface MetadataFile {
  version: string              // 메타데이터 버전
  lastUpdated: string          // 마지막 업데이트
  files: FileMetadata[]        // 파일 목록
}
```

#### metadata.json 예시
```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-01-15T10:30:00Z",
  "files": [
    {
      "id": "claude-dashboard-tsx",
      "filename": "dashboard.tsx",
      "path": "/references/claude/dashboard.tsx",
      "ai": "claude",
      "type": "react",
      "title": "실시간 대시보드",
      "description": "데이터 시각화 컴포넌트",
      "tags": ["dashboard", "chart", "real-time"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "dependencies": ["recharts", "lucide-react"],
      "size": 4567
    },
    {
      "id": "gemini-infographic-html",
      "filename": "aveva-infographic.html",
      "path": "/references/gemini/aveva-infographic.html",
      "ai": "gemini",
      "type": "html",
      "title": "AVEVA 인포그래픽",
      "description": "PDMS vs E3D 비교 분석",
      "tags": ["infographic", "aveva", "comparison"],
      "createdAt": "2024-01-14T15:20:00Z",
      "updatedAt": "2024-01-14T15:20:00Z",
      "dependencies": ["tailwindcss", "chart.js"],
      "size": 23456
    }
  ]
}
```

### 4. 기능 요구사항

#### 4.1 파일 로딩
- Vite의 `import.meta.glob()` 사용
- Claude 파일: 동적 import로 React 컴포넌트 로드
- Gemini 파일: raw text로 HTML 콘텐츠 로드

#### 4.2 홈 페이지
- 2열 레이아웃 (Claude | Gemini)
- 파일 카드 표시 (제목, 설명, 태그, 날짜)

#### 4.3 검색/필터
- 텍스트 검색 (제목, 설명, 태그)
- AI 도구별 필터
- 태그 필터
- 날짜 범위 필터
- 정렬 옵션 (이름, 날짜, 크기)

#### 4.4 파일 뷰어
- 라우트: `/view/:ai/:filename`
- 출력에 최적화된 깔끔한 레이아웃
- Claude: React 컴포넌트를 A4 너비로 중앙 정렬
- Gemini: iframe으로 전체 화면 렌더링
- 브라우저 기본 출력 기능(Ctrl+P) 활용
- 불필요한 UI 요소 없이 콘텐츠만 표시

#### 4.5 PDF 출력
- 브라우저 인쇄 기능(Ctrl+P) 활용
- 뷰어 페이지는 출력에 최적화된 레이아웃
- A4 크기 자동 맞춤
- 불필요한 여백 최소화
- 페이지 나누기 자동 제어

### 5. 기술 요구사항

#### 5.1 보안
- HTML 파일은 iframe sandbox로 격리
- XSS 방지
- 안전한 동적 import

#### 5.2 성능
- 메타데이터는 메모리에 캐시
- 파일은 필요시에만 로드
- React.lazy()로 코드 스플리팅

#### 5.3 개발 경험
- Hot Module Replacement
- 메타데이터 자동 업데이트
- 타입 안정성

## 🎯 PR 기반 구현 계획

### PR1: 프로젝트 초기 설정 및 기본 구조
**목표**: Vite + React + TypeScript 프로젝트 설정 및 기본 디렉토리 구조 생성

**왜 필요한가**:
- 프로젝트의 기반을 마련하고 팀원들이 동일한 환경에서 개발할 수 있도록 함
- TypeScript로 타입 안정성 확보

**구현 방법**:
```bash
npm create vite@latest ai-file-viewer -- --template react-ts
cd ai-file-viewer
npm install
npm install react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- 디렉토리 구조 생성
- `.gitignore`, `tsconfig.json` 설정
- Tailwind CSS 설정

**검증 방법**:
- `npm run dev`로 개발 서버 실행 확인
- TypeScript 컴파일 에러 없음
- 브라우저에서 기본 React 앱 표시

---

### PR2: 메타데이터 타입 정의 및 샘플 데이터
**목표**: TypeScript 인터페이스 정의 및 샘플 metadata.json 생성

**왜 필요한가**:
- 타입 안정성으로 개발 중 오류 방지
- 실제 데이터 구조를 미리 정의하여 개발 방향 명확화

**구현 방법**:
- `src/types/metadata.ts` 생성
- `references/metadata.json` 샘플 파일 생성
- `references/claude/`, `references/gemini/` 디렉토리 생성

**검증 방법**:
- TypeScript 타입 체크 통과
- JSON 파일이 스키마와 일치
- 샘플 데이터로 기본 테스트 가능

---

### PR3: 기본 라우팅 및 페이지 뼈대
**목표**: React Router 설정 및 Home, Viewer 페이지 뼈대 생성

**왜 필요한가**:
- SPA 라우팅으로 페이지 간 전환 구현
- 페이지별 URL 관리

**구현 방법**:
```tsx
// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/view/:ai/:filename" element={<Viewer />} />
</Routes>
```
- 빈 페이지 컴포넌트 생성
- 기본 레이아웃 적용

**검증 방법**:
- `/` 경로로 홈 페이지 접근
- `/view/claude/test.tsx` 형식의 URL 작동
- 페이지 간 네비게이션 확인

---

### PR4: 메타데이터 로더 유틸리티
**목표**: metadata.json을 로드하고 검색/필터링하는 유틸리티 함수 구현

**왜 필요한가**:
- 메타데이터 기반 파일 관리의 핵심 로직
- 재사용 가능한 유틸리티로 코드 중복 방지

**구현 방법**:
```typescript
// src/utils/metadataManager.ts
export const loadMetadata = async (): Promise<MetadataFile>
export const searchFiles = (files: FileMetadata[], query: string): FileMetadata[]
export const filterFiles = (files: FileMetadata[], filters: FilterOptions): FileMetadata[]
```

**검증 방법**:
- 메타데이터 로드 성공
- 검색어로 파일 필터링 작동
- 다양한 필터 조합 테스트

---

### PR5: 홈 페이지 기본 구현 (메타데이터 표시)
**목표**: 메타데이터를 로드하여 간단한 목록으로 표시하는 홈 페이지 구현

**왜 필요한가**:
- 메타데이터 로더가 제대로 작동하는지 브라우저에서 확인
- 이후 PR들의 기반이 되는 페이지 구조 마련

**구현 방법**:
```tsx
// src/pages/Home.tsx
- useEffect로 메타데이터 로드
- 간단한 ul/li로 파일 목록 표시
- Claude/Gemini 구분하여 표시
```

**검증 방법**:
- 브라우저에서 파일 목록 확인
- metadata.json의 데이터가 화면에 표시됨
- 로딩 상태 표시

---

### PR6: FileCard 컴포넌트 추가
**목표**: 파일 정보를 카드 형태로 표시하는 컴포넌트 구현 및 홈 페이지에 적용

**왜 필요한가**:
- UI/UX 개선으로 파일 정보를 보기 좋게 표시
- 클릭 가능한 카드로 상호작용 추가

**구현 방법**:
```tsx
// src/components/FileCard.tsx
- 제목, 설명, 태그 표시
- Tailwind로 카드 스타일링
// Home.tsx 수정
- ul/li를 FileCard로 교체
```

**검증 방법**:
- 브라우저에서 카드 형태의 파일 목록 확인
- 호버 효과 작동
- 반응형 디자인 확인

---

### PR7: 2열 레이아웃 적용
**목표**: Claude와 Gemini 파일을 2열로 구분하여 표시

**왜 필요한가**:
- AI 도구별로 파일을 명확히 구분
- 비교하기 쉬운 레이아웃

**구현 방법**:
```tsx
// Home.tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <section>
    <h2>Claude 컴포넌트</h2>
    {claudeFiles.map(...)}
  </section>
  <section>
    <h2>Gemini 페이지</h2>
    {geminiFiles.map(...)}
  </section>
</div>
```

**검증 방법**:
- 브라우저에서 2열 레이아웃 확인
- 모바일에서는 1열로 변경됨
- 각 섹션에 올바른 파일 표시

---

### PR8: 검색 기능 추가
**목표**: 메타데이터 기반 검색 기능을 홈 페이지에 추가

**왜 필요한가**:
- 파일이 많아질 때 원하는 파일을 빠르게 찾기
- 제목, 설명, 태그로 검색 가능

**구현 방법**:
```tsx
// src/components/SearchBar.tsx 생성
// Home.tsx에 통합
- 검색어 상태 관리
- searchFiles 유틸리티 사용
- 실시간 필터링
```

**검증 방법**:
- 브라우저에서 검색바 표시
- 검색어 입력 시 실시간 필터링
- 검색 결과가 없을 때 메시지 표시

---

### PR9: 필터 기능 추가
**목표**: AI 도구, 태그별 필터 기능 추가

**왜 필요한가**:
- 특정 카테고리의 파일만 보기
- 검색과 함께 사용하여 정교한 필터링

**구현 방법**:
```tsx
// src/components/FilterPanel.tsx 생성
- AI 선택 (All/Claude/Gemini)
- 태그 체크박스
// Home.tsx에 통합
```

**검증 방법**:
- 브라우저에서 필터 패널 표시
- 필터 적용 시 목록 업데이트
- 검색과 필터 동시 작동

---

### PR10: 파일 클릭 시 뷰어 페이지로 이동
**목표**: FileCard 클릭 시 뷰어 페이지로 라우팅

**왜 필요한가**:
- 파일 내용을 보기 위한 네비게이션
- SPA 라우팅 활용

**구현 방법**:
```tsx
// FileCard에 onClick 추가
onClick={() => navigate(`/view/${metadata.ai}/${metadata.filename}`)}
// Viewer 페이지에 기본 구조
```

**검증 방법**:
- 카드 클릭 시 URL 변경
- 뷰어 페이지로 이동
- 브라우저 뒤로가기 작동

---

### PR11: Claude 파일 로더 및 렌더러
**목표**: Claude TSX 파일을 로드하고 출력에 최적화된 방식으로 렌더링

**왜 필요한가**:
- React 컴포넌트를 동적으로 표시
- 출력 시 깨끗한 레이아웃 보장

**구현 방법**:
```typescript
// src/utils/fileLoader.ts
const claudeModules = import.meta.glob('/references/claude/*.{tsx,jsx}')

// src/components/renderers/ReactRenderer.tsx
<div className="w-full max-w-[210mm] mx-auto">
  <Suspense fallback={<div>로딩 중...</div>}>
    <Component />
  </Suspense>
</div>
```

**검증 방법**:
- Claude 파일 클릭 시 컴포넌트 렌더링
- A4 너비(210mm)에 맞춰 중앙 정렬
- 출력 미리보기에서 적절한 크기

---

### PR12: Gemini 파일 로더 및 렌더러
**목표**: Gemini HTML 파일을 로드하고 iframe으로 출력 가능하게 렌더링

**왜 필요한가**:
- HTML 콘텐츠를 안전하게 표시
- 원본 스타일 유지하며 출력

**구현 방법**:
```typescript
// fileLoader.ts에 추가
const geminiFiles = import.meta.glob('/references/gemini/*.html', { as: 'raw' })

// src/components/renderers/HTMLRenderer.tsx
<iframe 
  srcDoc={html}
  className="w-full h-screen border-0"
  sandbox="allow-scripts allow-same-origin"
/>
```

**검증 방법**:
- Gemini 파일 클릭 시 HTML 표시
- 전체 화면으로 콘텐츠 표시
- 출력 시 원본 레이아웃 유지

---

### PR13: 뷰어 페이지 출력 최적화
**목표**: 뷰어 페이지를 A4 출력에 최적화된 레이아웃으로 구성

**왜 필요한가**:
- 불필요한 UI 요소 제거로 깔끔한 출력물
- A4 크기에 맞는 콘텐츠 표시
- 브라우저 기본 출력(Ctrl+P) 활용

**구현 방법**:
```tsx
// Viewer.tsx 단순화
<div className="min-h-screen bg-white">
  {/* 콘텐츠만 표시, 여백은 CSS로 제어 */}
  {ai === 'claude' ? <ReactRenderer /> : <HTMLRenderer />}
</div>

// 출력용 CSS
@media print {
  @page { 
    size: A4;
    margin: 20mm;
  }
}
```

**검증 방법**:
- 뷰어 페이지에 콘텐츠만 표시됨
- Ctrl+P로 출력 미리보기 확인
- A4 크기에 적절히 맞춰짐

---

### PR14: Print CSS 최종 최적화
**목표**: 출력 품질 향상을 위한 세부 CSS 조정

**왜 필요한가**:
- 홈 페이지 출력 방지
- 뷰어 페이지 출력 품질 극대화
- 페이지 나누기 제어

**구현 방법**:
```css
/* 홈 페이지 출력 방지 */
@media print {
  .home-page { display: none; }
  body.home-page::after { 
    content: "파일을 선택하여 뷰어에서 출력하세요"; 
  }
}

/* 뷰어 페이지 최적화 */
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

**검증 방법**:
- 홈에서 Ctrl+P 시 안내 메시지
- 뷰어에서 출력 시 깨끗한 레이아웃
- 이미지/표가 페이지 경계에서 잘리지 않음

---

### PR15: 메타데이터 생성 스크립트
**목표**: 파일을 스캔하여 metadata.json을 생성하는 Node.js 스크립트

**왜 필요한가**:
- 수동으로 메타데이터 관리하는 부담 제거
- 파일 추가 시 자동으로 감지

**구현 방법**:
```javascript
// scripts/generate-metadata.js
- 파일 시스템 스캔
- 기본 메타데이터 추출
- JSON 파일 생성
```

**검증 방법**:
- `npm run generate-metadata` 실행
- 모든 파일이 감지됨
- 유효한 JSON 생성

---

### PR16: 문서화
**목표**: README.md와 CLAUDE.md 작성

**왜 필요한가**:
- 프로젝트 사용법 명확화
- Claude Code 사용자를 위한 가이드

**구현 방법**:
- README.md: 프로젝트 개요, 설치, 사용법
- CLAUDE.md: Claude Code 명령어, 워크플로우
- 샘플 파일 추가

**검증 방법**:
- 문서 따라하기로 프로젝트 실행 가능
- Claude Code 가이드 명확성
- 예제 코드 작동 확인

## 📊 성공 지표
- 파일 로딩 시간 < 1초
- 검색 응답 시간 < 100ms (metadata 기반)
- 모든 주요 브라우저 지원
- PDF 출력 품질 보장
- 100개 이상 파일 관리 가능