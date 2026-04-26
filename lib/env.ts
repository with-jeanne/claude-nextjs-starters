import { z } from 'zod'

/**
 * 환경 변수 검증 스키마
 * 빌드 타임 (NEXT_PUBLIC_) 변수와 런타임 (서버) 변수를 구분
 */
const envSchema = z.object({
  // ============================================================
  // 빌드 타임 환경 변수 (클라이언트에서 접근 가능)
  // NEXT_PUBLIC_ 접두사 필수
  // ============================================================
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('Supabase URL은 유효한 URL이어야 합니다')
    .describe('Supabase 프로젝트 URL'),

  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'Supabase 익명 키는 필수입니다')
    .describe('Supabase 공개 익명 키'),

  NEXT_PUBLIC_APP_URL: z
    .string()
    .url('앱 URL은 유효한 URL이어야 합니다')
    .default('http://localhost:3000')
    .describe('공개 링크 생성에 사용할 앱 도메인'),

  // ============================================================
  // 런타임 환경 변수 (서버 사이드 전용, .env.local에만 저장)
  // 클라이언트 번들에 포함되지 않음
  // ============================================================
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'Supabase 서비스 롤 키는 필수입니다')
    .describe('Supabase 서비스 롤 키 (서버 전용, 절대 공개하지 마세요)'),

  NOTION_API_KEY: z
    .string()
    .startsWith('ntn_', 'Notion API 키는 ntn_로 시작해야 합니다')
    .describe('Notion Integration 토큰'),

  NOTION_DATABASE_ID: z
    .string()
    .min(1, 'Notion 데이터베이스 ID는 필수입니다')
    .describe('Invoice DB Notion 데이터베이스 ID'),
})

/**
 * 환경 변수 파싱 및 검증
 * 서버 시작 시 자동 실행되어 잘못된 환경 변수 감지
 *
 * @throws {ZodError} 환경 변수 검증 실패 시
 */
export const env = (() => {
  try {
    return envSchema.parse(process.env)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('❌ 환경 변수 검증 실패:')
      error.issues.forEach((issue) => {
        const path = issue.path.join('.')
        console.error(`  - ${path}: ${issue.message}`)
      })
      process.exit(1)
    }
    throw error
  }
})()

/**
 * 환경 타입 추출
 * 사용처: type Env = typeof env
 */
export type Env = z.infer<typeof envSchema>
