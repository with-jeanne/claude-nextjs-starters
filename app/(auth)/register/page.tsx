'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordStrength } from '@/components/auth/password-strength'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { toast } from 'sonner'

/**
 * 회원가입 페이지 (F010)
 * 이름/이메일/비밀번호/비밀번호 확인 폼
 * 비밀번호 강도 표시, 표시/숨기기 토글, 인라인 에러 표시 포함
 */
export default function RegisterPage() {
  /* 비밀번호 표시/숨기기 UI 상태 */
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  /* 비밀번호 강도 표시를 위해 현재 입력값 추적 */
  const watchedPassword = form.watch('password')

  const onSubmit = async (_data: RegisterInput) => {
    try {
      // TODO: Supabase Auth 회원가입 Server Action 연결 (Task 010)
      // const result = await registerAction(data)
      // if (result.error) throw new Error(result.error)
      // router.push('/dashboard')
      toast.success('회원가입이 완료되었습니다!')
    } catch {
      toast.error('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>새 계정을 만들고 견적서 관리를 시작하세요</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            aria-label="회원가입 폼"
            noValidate
          >
            {/* 이름 필드 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="register-name">이름</FormLabel>
                  <FormControl>
                    <Input
                      id="register-name"
                      placeholder="홍길동"
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.name}
                      aria-describedby={
                        form.formState.errors.name ? 'register-name-error' : undefined
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="register-name-error" />
                </FormItem>
              )}
            />

            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="register-email">이메일</FormLabel>
                  <FormControl>
                    <Input
                      id="register-email"
                      placeholder="example@example.com"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.email}
                      aria-describedby={
                        form.formState.errors.email ? 'register-email-error' : undefined
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="register-email-error" />
                </FormItem>
              )}
            />

            {/* 비밀번호 필드 (강도 표시 + 토글) */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="register-password">비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="register-password"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        aria-required="true"
                        aria-invalid={!!form.formState.errors.password}
                        aria-describedby="register-password-strength register-password-error"
                        className="pr-10"
                        {...field}
                      />
                      {/* 비밀번호 표시/숨기기 토글 버튼 */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </FormControl>

                  {/* 비밀번호 강도 표시 */}
                  <div id="register-password-strength">
                    <PasswordStrength password={watchedPassword} />
                  </div>

                  <FormMessage id="register-password-error" />
                </FormItem>
              )}
            />

            {/* 비밀번호 확인 필드 */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="register-confirm-password">비밀번호 확인</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        placeholder="••••••••"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        aria-required="true"
                        aria-invalid={!!form.formState.errors.confirmPassword}
                        aria-describedby={
                          form.formState.errors.confirmPassword
                            ? 'register-confirm-password-error'
                            : undefined
                        }
                        className="pr-10"
                        {...field}
                      />
                      {/* 비밀번호 확인 표시/숨기기 토글 버튼 */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage id="register-confirm-password-error" />
                </FormItem>
              )}
            />

            {/* 회원가입 제출 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  가입 중...
                </>
              ) : (
                '회원가입'
              )}
            </Button>

            {/* 이용약관 동의 안내 */}
            <p className="text-center text-xs text-muted-foreground">
              가입하면{' '}
              {/* TODO: 이용약관 페이지 연결 (MVP 이후 기능) */}
              <span className="underline underline-offset-2 cursor-pointer">이용약관</span>에 동의하는 것으로 간주됩니다.
            </p>
          </form>
        </Form>

        {/* 하단 링크 영역 */}
        <div className="mt-6 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
