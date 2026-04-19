---
name: Recurring Issues
description: 이 프로젝트에서 반복 발견되는 코드 품질 이슈 및 안티패턴
type: project
---

## 반복 발견 이슈 (2026-04-19 첫 리뷰 기준)

### Critical
- **`render` prop에 `any` 타입 사용**: login/page.tsx, register/page.tsx의 FormField render에 `{ field }: any` 패턴 다수 존재. `ControllerRenderProps`로 교체 필요.
- **console.log에 사용자 입력 데이터 노출**: login/page.tsx:32, register/page.tsx:34 — 인증 데이터 콘솔 출력은 보안 위험.

### Major
- **비제어 컴포넌트 혼용**: settings-content.tsx에서 React Hook Form 없이 `defaultValue`/`defaultChecked` 사용 — 저장 시 실제 값을 읽을 수 없음.
- **미사용 import**: login/page.tsx의 `Label`, (main)/page.tsx의 `CardContent` — ESLint warning 발생.
- **hooks/use-mobile.ts**: useEffect 내 동기 setState로 ESLint 에러 발생 (react-hooks/set-state-in-effect).

### Minor
- **내비게이션 링크 중복**: nav-links.tsx와 mobile-nav.tsx에 동일한 `links` 배열 중복 정의.
- **DashboardHeader 빈 div**: 좌측에 `<div></div>` 존재 — 미래 브레드크럼 등을 위한 플레이스홀더이나 주석 없음.
- **외부 링크 href 미완성**: footer.tsx, (main)/page.tsx에 `https://github.com` 등 플레이스홀더 URL 존재.

**Why:** 스타터킷 성격상 데모 코드가 포함되어 있으나, 실서비스 전환 시 위 항목들은 반드시 수정 필요.
**How to apply:** PR 리뷰 시 위 패턴 우선 체크.
