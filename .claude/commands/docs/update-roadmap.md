---
description: 'ROADMAP.md에서 완료된 Task를 ✅로 자동 체크합니다'
allowed-tools:
  [
    'Read',
    'Edit',
    'Bash(git log:*)',
    'Bash(git diff:*)',
    'Bash(ls:*)',
    'Bash(find:*)',
  ]
---

# Claude 명령어: update-roadmap

`docs/ROADMAP.md`에서 완료된 Task를 자동으로 감지하고 ✅ 표시로 업데이트합니다.

## 사용법

```
/update-roadmap
/update-roadmap 005 006 007        # 특정 Task 번호 지정
/update-roadmap --all              # 전체 자동 감지
```

## 프로세스

### 1단계: 현재 상태 파악

`docs/ROADMAP.md`를 읽어 다음을 파악합니다:
- 이미 ✅ 완료된 Task 목록
- 아직 완료 표시가 없는 Task 목록 (번호, 제목, 의존성)

### 2단계: 완료 여부 판단

**인자가 있는 경우** (`/update-roadmap 005 006`):
- 지정된 Task 번호를 완료로 처리

**인자가 없는 경우** (자동 감지):
아래 기준으로 각 Task의 완료 여부를 판단합니다:

1. **Git 로그 확인**: `git log --oneline`에서 Task 관련 커밋 존재 여부
2. **산출물 파일 존재 확인**: ROADMAP의 "산출물" 항목에 명시된 파일이 실제로 존재하는지
3. **구현 사항 체크**: ROADMAP의 "구현 사항" 항목에 명시된 핵심 파일/기능이 코드베이스에 있는지

판단이 애매한 Task는 완료 처리하지 않고 목록으로 보고합니다.

### 3단계: ROADMAP.md 업데이트

완료된 Task의 제목 줄을 다음과 같이 수정합니다:

**Before:**
```
- **Task 005: 인증 페이지 UI 구현 (로그인/회원가입)**
```

**After:**
```
- **Task 005: 인증 페이지 UI 구현 (로그인/회원가입)** ✅ 완료
```

이미 ✅가 있는 줄은 건드리지 않습니다.

### 4단계: 결과 보고

업데이트 후 다음을 출력합니다:

```
## 로드맵 업데이트 완료

✅ 완료 처리된 Task:
  - Task 005: 인증 페이지 UI 구현
  - Task 006: 대시보드 페이지 UI 구현
  - Task 007: 견적서 공개 페이지 UI 구현

⏳ 아직 미완료 Task:
  - Task 008: 오류 페이지 및 네비게이션 마무리

📊 Phase 진행률:
  - Phase 1: 3/3 완료 ✅
  - Phase 2: 4/5 완료 (80%)
  - Phase 3: 0/6 완료
  - Phase 4: 0/3 완료
```

## 규칙

- ✅가 이미 있는 Task는 수정하지 않음
- 판단 근거 없이 임의로 완료 처리하지 않음
- 인자로 지정된 Task가 존재하지 않으면 오류 출력
- ROADMAP.md 외 다른 파일은 수정하지 않음
