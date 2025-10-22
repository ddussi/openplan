# OpenPlan Frontend Assignment

## 프로젝트 소개

사진 정보를 조회하고 표시하는 웹 애플리케이션입니다.  
Turborepo 모노레포 구조로 확장 가능하게 설계했습니다.

---

## 기술 스택

- **Framework**: Next.js 15 (App Router), React 19
- **스타일**: Tailwind CSS
- **상태관리**: Zustand (전역상태), TanStack Query (서버상태)
- **모노레포**: Turborepo + pnpm
- **문서화**: Storybook
- **타입**: TypeScript (strict mode)

---

## 시작하기

```bash
# 설치
pnpm install

# 실행 (localhost:3000)
pnpm dev

# Storybook (localhost:6006)
pnpm dev --filter=storybook

# 빌드
pnpm build
```

---

## 프로젝트 구조

```
openplan/
├── apps/
│   ├── web/                    # 웹 애플리케이션
│   │   ├── app/                # 페이지 (/, /result, not-found)
│   │   └── src/
│   │       ├── components/     # UI 컴포넌트
│   │       └── containers/     # 페이지 로직
│   └── storybook/              # 컴포넌트 문서
│
└── packages/
    ├── ui/                     # 공통 UI (Button)
    └── shared/                 # 공통 로직
        ├── stores/             # Zustand 스토어
        ├── services/           # API 호출
        └── hooks/              # 커스텀 훅
```

---

## 주요 기능

### 1. 사진 조회
- 버튼 클릭으로 사진 정보 가져오기
- 1초 쓰로틀 적용 (중복 요청 방지)
- 로딩 중 스피너 표시

### 2. 상태 유지
- 새로고침해도 데이터 유지 (localStorage)
- Zustand로 전역 상태 관리

### 3. 페이지 이동
- 조회 후 자동으로 결과 페이지 이동
- 조회 안했으면 메인 페이지로 돌아가기

### 4. 반응형
- 모바일, 태블릿, 데스크톱 지원

---

## 설계 포인트

### 1. 컴포넌트 분리
- **Container**: 로직 처리 (API 호출, 상태 관리)
- **Presentation**: UI만 담당 (데이터 받아서 표시)

예시:
```typescript
// Container - 로직
function HomeContainer() {
  const { setPhoto } = usePhotoStore();
  const handleClick = () => { /* API 호출 */ };
  return <div onClick={handleClick}>...</div>;
}

// Presentation - UI
function PhotoInfo({ photo }) {
  return <div>{photo.id}</div>;
}
```

### 2. 상태 관리 전략
- **Zustand**: 사용자가 본 사진 데이터 저장 (전역)
- **TanStack Query**: API 호출 결과 캐싱 (서버)
- **localStorage**: 새로고침해도 데이터 유지

### 3. 모노레포 구조 이유
- 공통 UI 컴포넌트 재사용 (`packages/ui`)
- 공통 로직 재사용 (`packages/shared`)
- 여러 앱을 한 번에 관리 가능

### 4. 최적화
- Throttle로 중복 API 요청 방지
- TanStack Query로 불필요한 재호출 방지
- Skeleton으로 로딩 중 깜빡임 방지

---

## 테스트 방법

### 기본 동작 확인
1. 메인 페이지에서 "다음" 버튼 클릭
2. 로딩 표시 확인
3. 결과 페이지로 자동 이동
4. 사진 정보 (ID, 작가, 크기 등) 표시 확인
5. "이전" 버튼으로 메인 이동
6. 새로고침해도 데이터 유지되는지 확인

### Storybook 확인
```bash
pnpm dev --filter=storybook
```
Button 컴포넌트의 다양한 스타일 확인

---

## 기술 선택 이유

### Tailwind CSS
- 빠른 스타일링
- 번들 사이즈 작음

### Next.js App Router
- 최신 React 패턴
- 파일 기반 라우팅
