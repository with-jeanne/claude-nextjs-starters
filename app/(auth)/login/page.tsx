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
import { loginSchema, type LoginInput } from '@/lib/validations'
import { toast } from 'sonner'

/**
 * 로그인 페이지 (F010)
 * 이메일/비밀번호 입력 폼, 인라인 에러 표시, 로딩 상태 처리 포함
 */
export default function LoginPage() {
  /* 비밀번호 표시/숨기기 UI 상태 */
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (_data: LoginInput) => {
    try {
      // TODO: Supabase Auth 로그인 Server Action 연결 (Task 010)
      // const result = await loginAction(data)
      // if (result.error) throw new Error(result.error)
      // router.push('/dashboard')
      toast.success('로그인 성공!')
    } catch {
      toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>계정에 로그인하여 견적서를 관리하세요</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            aria-label="로그인 폼"
            noValidate
          >
            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="login-email">이메일</FormLabel>
                  <FormControl>
                    <Input
                      id="login-email"
                      placeholder="example@example.com"
                      type="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!form.formState.errors.email}
                      aria-describedby={
                        form.formState.errors.email ? 'login-email-error' : undefined
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage id="login-email-error" />
                </FormItem>
              )}
            />

            {/* 비밀번호 필드 (표시/숨기기 토글) */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="login-password">비밀번호</FormLabel>
                    {/* TODO: 비밀번호 찾기 페이지 연결 (MVP 이후 기능) */}
                    <span
                      className="text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      최소 8자
                    </span>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="login-password"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        aria-required="true"
                        aria-invalid={!!form.formState.errors.password}
                        aria-describedby={
                          form.formState.errors.password ? 'login-password-error' : undefined
                        }
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
                  <FormMessage id="login-password-error" />
                </FormItem>
              )}
            />

            {/* 로그인 제출 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>
          </form>
        </Form>

        {/* 하단 링크 영역 */}
        <div className="mt-6 space-y-3 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            계정이 없으신가요?{' '}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              회원가입
            </Link>
          </p>
          {/* 개발용 데모 안내 - TODO: Phase 3 완료 후 제거 */}
          <p className="text-center text-xs text-muted-foreground/70">
            데모: 아무 이메일과 8자 이상의 비밀번호로 로그인하세요
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
