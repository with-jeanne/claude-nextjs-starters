import { z } from 'zod'

/**
 * 인증 관련 검증 스키마
 */

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력하세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>

export const profileSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 주소를 입력하세요'),
  company: z.string().optional(),
  bio: z.string().optional(),
})

export type ProfileInput = z.infer<typeof profileSchema>

/**
 * 견적서 관련 검증 스키마
 */

// 견적서 상태 Enum
const invoiceStatusEnum = z.enum(['draft', 'sent', 'confirmed'])

export const invoiceSchema = z.object({
  title: z.string().min(1, '견적서 제목은 필수입니다'),
  description: z.string().optional(),
  client_name: z.string().min(1, '클라이언트명은 필수입니다'),
  total_amount: z.number().min(0, '금액은 0 이상이어야 합니다'),
  status: invoiceStatusEnum,
  issued_at: z.string().datetime('발행일은 유효한 날짜여야 합니다'),
})

export type InvoiceInput = z.infer<typeof invoiceSchema>

// 견적서 수정 스키마 (모든 필드 선택사항)
export const invoiceUpdateSchema = invoiceSchema.partial()

export type InvoiceUpdateInput = z.infer<typeof invoiceUpdateSchema>

/**
 * 견적서 항목 검증 스키마
 */

export const invoiceItemSchema = z.object({
  description: z.string().min(1, '항목 설명은 필수입니다'),
  quantity: z.number().min(1, '수량은 1 이상이어야 합니다'),
  unit_price: z.number().min(0, '단가는 0 이상이어야 합니다'),
})

export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>

// 항목 수정 스키마
export const invoiceItemUpdateSchema = invoiceItemSchema.partial()

export type InvoiceItemUpdateInput = z.infer<typeof invoiceItemUpdateSchema>

/**
 * Notion 동기화 검증 스키마
 */

export const syncSchema = z.object({
  database_id: z.string().min(1, 'Notion 데이터베이스 ID는 필수입니다'),
})

export type SyncInput = z.infer<typeof syncSchema>

/**
 * 공개 링크 토큰 검증 스키마
 */

export const publicTokenSchema = z.string().uuid('유효한 토큰이 아닙니다')

export type PublicToken = z.infer<typeof publicTokenSchema>

/**
 * 공개 페이지 토큰 쿼리 파라미터 검증
 */

export const publicPageQuerySchema = z.object({
  token: publicTokenSchema,
})

export type PublicPageQuery = z.infer<typeof publicPageQuerySchema>
