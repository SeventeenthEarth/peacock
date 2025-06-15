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
- Claude: React 컴포넌트 직접 렌더링
- Gemini: iframe으로 안전하게 렌더링
- 에러 처리 및 로딩 상태

#### 4.5 PDF 출력
- 브라우저 인쇄 기능 활용
- Print CSS 최적화
- 페이지 레이아웃 조정

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

### PR5: Claude 파일 로더 구현
**목표**: Claude의 React 컴포넌트를 동적으로 로드하는 로직 구현

**왜 필요한가**:
- React 컴포넌트를 런타임에 동적으로 import하여 렌더링
- 파일 추가 시 코드 수정 없이 자동 반영

**구현 방법**:
```typescript
// src/utils/fileLoader.ts
const claudeModules = import.meta.glob('/references/claude/*.{tsx,jsx}')
export const loadClaudeComponent = async (filename: string)
```

**검증 방법**:
- 샘플 TSX 파일 로드 확인
- 컴포넌트 렌더링 성공
- 에러 처리 작동

---

### PR6: Gemini 파일 로더 구현
**목표**: Gemini의 HTML 파일을 로드하는 로직 구현

**왜 필요한가**:
- HTML 파일을 안전하게 로드하고 표시
- iframe으로 격리하여 보안 확보

**구현 방법**:
```typescript
const geminiFiles = import.meta.glob('/references/gemini/*.html', { as: 'raw' })
export const loadGeminiHTML = async (filename: string): Promise<string>
```

**검증 방법**:
- 샘플 HTML 파일 로드 확인
- HTML 콘텐츠 문자열 반환
- 파일 없을 때 에러 처리

---

### PR7: FileCard 컴포넌트
**목표**: 파일 정보를 표시하는 카드 컴포넌트 구현

**왜 필요한가**:
- 일관된 UI로 파일 정보 표시
- 재사용 가능한 컴포넌트

**구현 방법**:
```tsx
// src/components/FileCard.tsx
interface FileCardProps {
  metadata: FileMetadata
  onClick: () => void
}
```
- 제목, 설명, 태그, 날짜 표시
- 호버 효과 및 클릭 이벤트

**검증 방법**:
- 메타데이터 정보 올바르게 표시
- 클릭 이벤트 작동
- 반응형 디자인 확인

---

### PR8: 검색/필터 컴포넌트
**목표**: 검색바와 필터 패널 컴포넌트 구현

**왜 필요한가**:
- 사용자가 원하는 파일을 빠르게 찾을 수 있도록 함
- 메타데이터 기반 효율적인 검색

**구현 방법**:
```tsx
// src/components/SearchPanel.tsx
interface SearchPanelProps {
  onSearch: (query: string) => void
  onFilter: (filters: FilterOptions) => void
}
```

**검증 방법**:
- 검색어 입력 시 콜백 호출
- 필터 옵션 변경 시 콜백 호출
- UI 반응성 확인

---

### PR9: ReactRenderer 컴포넌트
**목표**: Claude의 React 컴포넌트를 렌더링하는 컴포넌트 구현

**왜 필요한가**:
- 동적으로 로드한 React 컴포넌트를 안전하게 렌더링
- 에러 바운더리로 오류 격리

**구현 방법**:
```tsx
// src/components/renderers/ReactRenderer.tsx
interface ReactRendererProps {
  component: React.ComponentType
}
```
- React.Suspense로 로딩 상태 처리
- ErrorBoundary로 에러 처리

**검증 방법**:
- 컴포넌트 정상 렌더링
- 로딩 상태 표시
- 에러 발생 시 fallback UI

---

### PR10: HTMLRenderer 컴포넌트
**목표**: Gemini의 HTML을 iframe으로 렌더링하는 컴포넌트 구현

**왜 필요한가**:
- HTML 콘텐츠를 안전하게 격리하여 표시
- XSS 등 보안 위협 방지

**구현 방법**:
```tsx
// src/components/renderers/HTMLRenderer.tsx
interface HTMLRendererProps {
  html: string
}
```
- iframe sandbox 속성 설정
- 반응형 크기 조정

**검증 방법**:
- HTML 콘텐츠 정상 표시
- 스크립트 실행 격리 확인
- 반응형 레이아웃 작동

---

### PR11: 홈 페이지 구현
**목표**: 파일 목록을 표시하는 홈 페이지 완성

**왜 필요한가**:
- 사용자가 모든 파일을 한눈에 보고 선택
- 검색/필터 기능 통합

**구현 방법**:
- 메타데이터 로드 및 상태 관리
- 2열 레이아웃 (Claude | Gemini)
- SearchPanel과 FileCard 통합

**검증 방법**:
- 파일 목록 정상 표시
- 검색/필터 작동
- 파일 클릭 시 뷰어로 이동

---

### PR12: 뷰어 페이지 구현
**목표**: 선택한 파일을 표시하는 뷰어 페이지 완성

**왜 필요한가**:
- 파일 내용을 전체 화면으로 보기
- AI별 적절한 렌더러 사용

**구현 방법**:
- URL 파라미터에서 파일 정보 추출
- AI 타입에 따라 렌더러 선택
- 네비게이션 바 추가

**검증 방법**:
- Claude/Gemini 파일 모두 표시
- 뒤로가기 버튼 작동
- 에러 상태 처리

---

### PR13: Print CSS 및 PDF 출력
**목표**: 인쇄용 스타일 추가 및 PDF 출력 최적화

**왜 필요한가**:
- 웹 콘텐츠를 깔끔하게 인쇄
- PDF로 저장하여 공유 가능

**구현 방법**:
```css
@media print {
  /* 인쇄용 스타일 */
}
```
- 불필요한 UI 요소 숨김
- 페이지 나누기 제어

**검증 방법**:
- 브라우저 인쇄 미리보기 확인
- PDF 출력 품질 검증
- 페이지 레이아웃 확인

---

### PR14: 메타데이터 생성 스크립트
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

### PR15: 문서화
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