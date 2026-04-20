# Mac 개발 환경 설정 가이드

현재 개발 환경: **macOS** (2026-04-20 기준)

---

## 1. 사전 요구사항

### Xcode Command Line Tools
```bash
xcode-select --install
```

### Homebrew 설치
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Homebrew 설치 후 경로 설정 (Apple Silicon Mac인 경우):
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```

---

## 2. Homebrew로 설치할 패키지

### Core Development Tools
```bash
brew install git node
```

### 라이브러리 및 의존성
```bash
brew install \
  ada-url \
  brotli \
  c-ares \
  ca-certificates \
  fmt \
  gettext \
  hdrhistogram_c \
  icu4c@78 \
  jq \
  libnghttp2 \
  libnghttp3 \
  libngtcp2 \
  libunistring \
  libuv \
  llhttp \
  lz4 \
  oniguruma \
  openssl@3 \
  pcre2 \
  readline \
  simdjson \
  sqlite \
  uvwasi \
  xz \
  zstd
```

**설치 확인:**
```bash
brew list
```

---

## 3. Node.js & npm 설정

### 설치된 버전
- **Node.js**: v25.8.1
- **npm**: 11.11.0

### 설치 후 버전 확인
```bash
node --version
npm --version
```

### npm 캐시 정리 (선택사항)
```bash
npm cache clean --force
```

---

## 4. npm 전역 패키지

### 현재 설치된 글로벌 패키지
```bash
npm list -g --depth=0
```

#### 설치할 패키지
- **@anthropic-ai/claude-code** (v2.1.114)
  ```bash
  npm install -g @anthropic-ai/claude-code@2.1.114
  ```

---

## 5. 시스템 도구 확인

다음 도구들이 시스템에 포함되어 있는지 확인:

```bash
# Git
git --version
# 현재: git version 2.53.0

# Ruby (시스템 기본)
ruby --version

# Python3 (시스템 기본)
python3 --version

# Java
java -version
```

---

## 6. Git 사용자 설정

### 전역 Git 설정

새 Mac에서 처음 git을 사용할 때 사용자 정보를 설정해야 합니다:

```bash
# 사용자명 설정
git config --global user.name "Jeanne Oh"

# 이메일 설정
git config --global user.email "withmyzest@gmail.com"
```

### 설정 확인

```bash
# 설정된 전역 정보 확인
git config --global --list

# 현재 리포지토리의 설정 확인
git config --local --list
```

### 추가 권장 설정

```bash
# 기본 branch 이름을 main으로 설정
git config --global init.defaultBranch main

# Pull 기본 동작을 rebase로 설정 (선택사항)
git config --global pull.rebase false

# 색상 출력 활성화
git config --global color.ui true

# 줄 끝 문자 자동 변환 (macOS)
git config --global core.autocrlf input
```

### Git 전역 설정 파일 확인

Git 전역 설정은 `~/.gitconfig` 파일에 저장됩니다:

```bash
# 전역 설정 파일 보기
cat ~/.gitconfig

# 전역 설정 파일 편집 (VS Code에서)
code ~/.gitconfig
```

예상되는 `.gitconfig` 내용:
```
[user]
  name = Jeanne Oh
  email = withmyzest@gmail.com
[init]
  defaultBranch = main
[color]
  ui = true
[core]
  autocrlf = input
```

---

## 7. Shell Alias 설정

### ll Alias 추가

터미널에서 자주 사용하는 명령어를 단축하기 위해 alias를 설정합니다:

```bash
# ~/.zprofile 또는 ~/.zshrc 파일 열기
code ~/.zshrc
```

파일에 다음 내용 추가:

```bash
# 유용한 Aliases
alias ll='ls -lh'
alias la='ls -lah'
alias l='ls -lh'
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git log'
alias gco='git checkout'
alias gd='git diff'
alias gb='git branch'
alias cd..='cd ..'
```

**설정 적용:**
```bash
# 현재 터미널 세션에 즉시 적용
source ~/.zshrc

# 또는 새 터미널 창 열기
```

### 설정 확인

```bash
# alias 목록 보기
alias

# 특정 alias 확인
alias ll
# 출력: ll='ls -lh'
```

### 추가 유용한 Aliases (선택사항)

```bash
# 디렉토리 관련
alias mkdir='mkdir -p'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# npm 관련
alias ni='npm install'
alias nid='npm install --save-dev'
alias nr='npm run'
alias nrdev='npm run dev'
alias nrbuild='npm run build'

# Git 관련 (이미 위에서 설정)
alias gaa='git add .'
alias gcm='git commit -m'
alias gpush='git push origin'
alias gpull='git pull origin'

# 기타
alias cls='clear'
alias weather='curl wttr.in'
```

---

## 8. Cursor 앱 설치 & VS Code/Cursor 확장 프로그램

### Cursor 앱 설치

#### 설치 방법 1: 공식 웹사이트에서 다운로드

1. [Cursor 공식 웹사이트](https://cursor.com) 방문
2. **Download** 또는 **Download for Mac** 버튼 클릭
3. 다운로드된 `Cursor.dmg` 파일 실행
4. **Cursor** 아이콘을 **Applications** 폴더로 드래그
5. Applications 폴더에서 Cursor 실행

#### 설치 방법 2: Homebrew로 설치 (권장)

```bash
# Cursor Homebrew tap 추가
brew tap cursorapp/cursor

# Cursor 설치
brew install cursor

# 설치 확인
cursor --version
```

**참고**: Homebrew로 설치하면 자동 업데이트 관리가 편합니다.

#### 설치 방법 3: 명령어로 직접 실행

```bash
# Mac App Store가 설치되어 있는 경우
# (최신 버전은 공식 사이트나 Homebrew 권장)

# 또는 이미 다운로드된 Cursor 앱 실행
open /Applications/Cursor.app
```

### Cursor 설정

**Step 1: VS Code 설정 가져오기**
1. Cursor 실행
2. Cmd+Shift+P → "Cursor: Preferences"
3. VS Code 설정 가져오기 옵션 선택 (선택사항)

**Step 2: 확장 프로그램 설치**

### VS Code / Cursor 확장 프로그램

#### 설치된 확장 프로그램 목록

| 확장 프로그램 | 개발사 | 버전 | 용도 |
|-----------|-------|------|------|
| **Claude Code for VS Code** | Anthropic | Latest | Claude Code IDE 통합 |
| **Korean Language Pack** | MS-CEINTL | Latest | VS Code 한글화 |
| **Live Server** | ritwickdey | Latest | 로컬 웹 서버 & 라이브 리로드 |
| **Remote - SSH** | Anysphere | Latest | SSH를 통한 원격 개발 |
| **Tailwind CSS IntelliSense** | bradlc | Latest | Tailwind CSS 자동완성 & 힌트 |

#### VS Code에서 설치하기

**Option 1: Marketplace UI에서 직접 설치**
1. VS Code 실행
2. 왼쪽 사이드바 **Extensions** 아이콘 클릭 (또는 `Cmd+Shift+X`)
3. 각 확장 프로그램 이름 검색
4. **Install** 클릭

**Option 2: Command Line에서 일괄 설치**
```bash
# Claude Code for VS Code
code --install-extension Anthropic.claude-code

# Korean Language Pack
code --install-extension MS-CEINTL.vscode-language-pack-ko

# Live Server
code --install-extension ritwickdey.LiveServer

# Remote - SSH
code --install-extension Anysphere.remote-ssh

# Tailwind CSS IntelliSense
code --install-extension bradlc.vscode-tailwindcss
```

**Option 3: 한 번에 모두 설치 (권장)**
```bash
#!/bin/bash

# 모든 확장 프로그램 설치
code --install-extension Anthropic.claude-code && \
code --install-extension MS-CEINTL.vscode-language-pack-ko && \
code --install-extension ritwickdey.LiveServer && \
code --install-extension Anysphere.remote-ssh && \
code --install-extension bradlc.vscode-tailwindcss

echo "✅ 모든 확장 프로그램 설치 완료!"
code --list-extensions
```

#### Cursor에서 설치하기

Cursor도 VS Code 기반이므로 동일한 확장 프로그램 설치 가능:

```bash
# Cursor에서 확장 프로그램 설치
cursor --install-extension Anthropic.claude-code
cursor --install-extension MS-CEINTL.vscode-language-pack-ko
cursor --install-extension ritwickdey.LiveServer
cursor --install-extension Anysphere.remote-ssh
cursor --install-extension bradlc.vscode-tailwindcss
```

또는:
1. **Extensions Marketplace** 열기 (Cmd+Shift+X)
2. 위의 확장 프로그램 검색 및 설치

#### 확장 프로그램별 설정 & 사용법

**Claude Code for VS Code**
- 설치 후 Anthropic 계정으로 로그인 (자동)
- 에디터에서 `/` 단축키로 Claude 명령 실행 가능
- 코드 선택 후 우클릭 → "Ask Claude" 메뉴 사용 가능

**Korean Language Pack**
- 설치 후 VS Code 자동 재시작
- Language 자동으로 한국어로 변경
- 명령 팔레트: `Cmd+Shift+P` → "Configure Display Language" → "ko" 선택

**Live Server**
- HTML 파일 우클릭 → "Open with Live Server"
- 또는 상태 바의 "Go Live" 버튼 클릭
- 자동으로 `http://localhost:5500` 개발 서버 시작
- 파일 저장 시 자동으로 브라우저 새로고침

**Remote - SSH**
- `Cmd+Shift+P` → "Remote-SSH: Connect to Host..."
- SSH 호스트 입력 (예: `user@192.168.1.100`)
- 원격 서버에 VS Code Server 자동 설치
- 로컬과 동일하게 원격 개발 가능

**Tailwind CSS IntelliSense**
- Tailwind CSS 클래스명 입력 시 자동완성 표시
- 클래스에 마우스 hover → CSS 색상 프리뷰 기능
- 설정: `.vscode/settings.json`에서 tailwindCSS 커스터마이징 가능

#### 권장 VS Code 설정 (.vscode/settings.json)

프로젝트에 `.vscode/settings.json` 파일 생성 (선택사항):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.wordWrap": "on",
  "editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "liveServer.settings.port": 5500,
  "liveServer.settings.root": "/",
  "liveServer.settings.useWebExt": true,
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/.git": true
  }
}
```

#### 설정 동기화 (Settings Sync)

VS Code 설정과 확장 프로그램을 여러 Mac에서 동기화:

1. VS Code 실행
2. 왼쪽 사이드바 **Accounts** 아이콘 (또는 `Cmd+Shift+P` → "Settings Sync")
3. **Sign in with GitHub** 또는 **Sign in with Microsoft** 선택
4. 다른 Mac에서도 로그인하면 설정 자동 동기화

**동기화 항목:**
- Settings (설정)
- Extensions (확장 프로그램)
- Keybindings (단축키)
- Snippets (코드 조각)
- UI State (UI 상태)

#### 설치 확인

설치된 확장 프로그램 확인:
```bash
# VS Code 설치된 확장 프로그램 목록 보기
code --list-extensions

# Cursor 확장 프로그램 목록 보기
cursor --list-extensions
```

예상 출력:
```
Anthropic.claude-code
MS-CEINTL.vscode-language-pack-ko
ritwickdey.LiveServer
Anysphere.remote-ssh
bradlc.vscode-tailwindcss
```

#### 유용한 VS Code 단축키

| 단축키 | 기능 |
|-------|------|
| `Cmd+Shift+X` | Extensions 열기 |
| `Cmd+,` | Settings 열기 |
| `Cmd+P` | Quick File Open |
| `Cmd+Shift+P` | Command Palette |
| `Cmd+/` | 주석 토글 |
| `Option+Shift+F` | Format Document |
| `Cmd+S` | 저장 |

#### Cursor vs VS Code

| 항목 | Cursor | VS Code |
|------|--------|---------|
| **기반** | VS Code 기반 | 공식 VS Code |
| **AI 통합** | 네이티브 AI 기능 포함 | Claude Code 확장 필요 |
| **확장** | VS Code 확장 호환 | 공식 확장 마켓플레이스 |
| **설정 동기화** | 지원 | 지원 (Settings Sync) |
| **단축키** | VS Code와 동일 | - |

#### 명령어로 Cursor 실행

터미널에서 직접 Cursor로 파일/폴더 열기:

```bash
# 현재 폴더를 Cursor로 열기
cursor .

# 특정 파일 열기
cursor ~/workspace/courses/invoice-web/setup.md

# 새로운 Cursor 창에서 열기
cursor -n .
```

#### Cursor 버전 확인 & 업데이트

```bash
# 버전 확인
cursor --version

# Homebrew로 설치한 경우 업데이트
brew upgrade cursor
```

#### Cursor 제거

```bash
# 애플리케이션 폴더에서 삭제
rm -rf /Applications/Cursor.app

# Homebrew로 설치한 경우
brew uninstall cursor
```

---

## 9. 프로젝트별 설정

### 이 프로젝트 (invoice-web)
```bash
cd /path/to/project
npm install
npm run dev
```

### 개발 명령어
```bash
npm run dev              # 개발 서버 (localhost:3000)
npm run build            # 프로덕션 빌드
npm run lint             # 린트 검사
npx eslint --fix .       # 자동 수정
```

---

## 10. 설정 파일 (선택사항)

### .env 파일 (Slack 알림 사용 시)
프로젝트 루트에 `.env` 파일 생성:
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

### Slack Webhook URL 발급 방법

**Step 1: Slack 앱 관리 페이지 접속**
1. Slack 워크스페이스 열기
2. 왼쪽 상단의 워크스페이스 이름 클릭
3. **Settings & administration** → **Manage apps** 클릭 (또는 직접 `https://your-workspace.slack.com/apps` 접속)

**Step 2: Incoming Webhooks 앱 찾기**
1. 검색창에 "Incoming Webhooks" 입력
2. **Incoming Webhooks** 앱 클릭
3. **Add to Slack** 또는 **Install** 버튼 클릭

**Step 3: 채널 선택 및 설정**
1. "Post to:" 드롭다운에서 알림을 받을 Slack 채널 선택
   - 예: `#dev`, `#notifications`, `#alerts`
   - 새 채널을 만들려면 "Create new channel" 옵션 선택
2. **Add Incoming Webhooks integration** 클릭

**Step 4: Webhook URL 복사**
1. 설정 페이지에서 **Webhook URL** 섹션 찾기
2. "Copy" 버튼을 클릭하여 URL 복사
   - 형식: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`
3. **Save Settings** 클릭

### .env 파일 설정

**1. 프로젝트 루트에 `.env` 파일 생성:**
```bash
touch .env
```

**2. 복사한 Webhook URL 추가:**
```bash
# .env 파일 내용
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

**3. .gitignore 확인:**
`.env` 파일이 `.gitignore`에 포함되어 있는지 확인 (민감한 정보이므로 커밋되면 안 됨):
```bash
# .gitignore 확인
cat .gitignore | grep ".env"
```

### Slack 알림 동작 확인

프로젝트는 3가지 상황에서 Slack 알림을 전송합니다:

| 이벤트 | 메시지 | 설정 파일 |
|-------|--------|---------|
| **Bash 명령 실행** | ⚙️ Bash 명령 실행됨 | `.claude/settings.json` (PostToolUse) |
| **Claude 알림** | 🔔 알림 발생 | `.claude/settings.json` (Notification) |
| **작업 종료** | ⏹️ 작업 종료 | `.claude/settings.json` (Stop) |

설정은 `.claude/settings.json` 파일에서 관리됩니다.

### Webhook URL 보안 주의사항

⚠️ **중요**: Webhook URL은 누구나 메시지를 보낼 수 있는 권한을 가지므로:

- `.env` 파일을 **절대 공유하지 마세요**
- `.gitignore`에 `.env`가 포함되어 있는지 확인
- 실수로 커밋했다면 Webhook URL을 **즉시 재생성** (Slack 앱 관리 페이지에서)
- CI/CD 파이프라인에서는 환경 변수로 관리

### Slack Webhook URL 재생성

기존 URL을 더 이상 사용하지 않으려면:

1. Slack 앱 관리 페이지 → Incoming Webhooks
2. 해당 Webhook URL 선택
3. **Remove** 또는 **Delete** 클릭
4. 새로운 Webhook URL 발급 (위의 Step 2~4 반복)

---

## 11. MCP (Model Context Protocol) 서버

### 설치된 MCP 서버 목록

프로젝트는 다음의 MCP 서버가 설정되어 있습니다 (`.mcp.json` 파일):

| 서버 | 타입 | 설명 | 설치 명령어 |
|------|------|------|-----------|
| **playwright** | stdio | 브라우저 자동화 | `npx @playwright/mcp@latest` |
| **context7** | HTTP | 라이브러리 문서/API | `https://mcp.context7.com/mcp` |
| **sequential-thinking** | stdio | 단계별 사고 프로세스 | `npx @modelcontextprotocol/server-sequential-thinking` |
| **shadcn** | stdio | shadcn/ui 컴포넌트 관리 | `npx shadcn@latest mcp` |

### MCP 서버 설정 파일

프로젝트 루트의 `.mcp.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### 새 Mac에서 MCP 서버 설정

1. **프로젝트에서 `.mcp.json` 파일 복사** (이미 git에 포함됨)
2. **CLI 도구 설치** (필요시)
   ```bash
   npm install -g @anthropic-ai/claude-code@2.1.114
   ```
3. **Claude Code 실행 시 MCP 서버 자동 로드**
   - Claude Code가 `.mcp.json`을 감지하고 서버를 자동으로 시작

### MCP 서버 용도

- **playwright**: 웹 페이지 스크린샷, 자동 클릭, 폼 입력 등 브라우저 자동화
- **context7**: 최신 라이브러리 문서 검색 (React, Next.js, Prisma 등)
- **sequential-thinking**: 복잡한 문제 분석을 위한 단계별 추론
- **shadcn**: shadcn/ui 컴포넌트 추가, 예제 검색, 사용법 조회

---

## 12. 체크리스트

새 Mac 설정 시 확인사항:

- [ ] Xcode Command Line Tools 설치
- [ ] Homebrew 설치 및 경로 설정
- [ ] Node.js v25.8.1 설치
- [ ] npm 11.11.0 버전 확인
- [ ] npm 전역 패키지 설치
- [ ] Git 설정 (`git config`)
- [ ] Shell Alias 설정 (`~/.zshrc`)
- [ ] Cursor 앱 설치
- [ ] VS Code / Cursor 확장 프로그램 설치
- [ ] 프로젝트 `npm install`
- [ ] `.env` 파일 생성 (필요 시)
- [ ] MCP 서버 설정 확인
- [ ] 개발 서버 실행 테스트

---

## 13. 문제 해결

### Homebrew 업데이트
```bash
brew update
brew upgrade
```

### Node.js 버전 관리 (여러 버전 필요 시)
```bash
# nvm 사용
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 25.8.1
nvm use 25.8.1
```

### npm 캐시 문제
```bash
npm cache clean --force
npm install -g npm@latest
```

---

## 14. 한 번에 설치하기 (자동화)

모든 과정을 처음부터 자동화하려면 다음 스크립트를 사용하세요:

```bash
#!/bin/bash

# Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Core tools
brew install git node

# 라이브러리
brew install ada-url brotli c-ares ca-certificates fmt gettext \
  hdrhistogram_c icu4c@78 jq libnghttp2 libnghttp3 libngtcp2 \
  libunistring libuv llhttp lz4 oniguruma openssl@3 pcre2 readline \
  simdjson sqlite uvwasi xz zstd

# npm 전역 패키지
npm install -g @anthropic-ai/claude-code@2.1.114

# 버전 확인
echo "=== 설치 완료 ==="
git --version
node --version
npm --version
npm list -g --depth=0
```

**참고**: 이미 1~12번을 개별적으로 진행했다면 이 섹션은 건너뛰어도 됩니다.

---

**마지막 업데이트**: 2026-04-20
