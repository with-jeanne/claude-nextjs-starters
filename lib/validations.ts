import { z } from 'zod'

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
