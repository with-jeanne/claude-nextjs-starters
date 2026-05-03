'use client'

import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

/**
 * 비밀번호 강도 표시 컴포넌트
 * 비밀번호 입력 시 강도를 시각적으로 표시합니다.
 * 실제 강도 계산 로직은 Phase 3 인증 구현 시 연결 필요.
 */

interface PasswordStrengthProps {
  /** 검사할 비밀번호 문자열 */
  password: string
  className?: string
}

/**
 * 비밀번호 강도 레벨 (0-4)
 * 0: 없음, 1: 매우 약함, 2: 약함, 3: 보통, 4: 강함
 */
function getPasswordStrength(password: string): number {
  // TODO: 실제 비밀번호 강도 계산 로직 구현 필요
  // 판단 기준:
  // - 길이 8자 이상 (+1)
  // - 대문자 포함 (+1)
  // - 숫자 포함 (+1)
  // - 특수문자 포함 (+1)
  if (!password) return 0
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return strength
}

const STRENGTH_CONFIG = {
  0: { label: '', value: 0, colorClass: '' },
  1: { label: '매우 약함', value: 25, colorClass: 'text-destructive' },
  2: { label: '약함', value: 50, colorClass: 'text-orange-500' },
  3: { label: '보통', value: 75, colorClass: 'text-yellow-500' },
  4: { label: '강함', value: 100, colorClass: 'text-green-600' },
} as const

/**
 * Progress 바 색상을 강도에 따라 반환
 */
function getProgressColor(strength: number): string {
  switch (strength) {
    case 1:
      return '[&>[data-slot=progress-indicator]]:bg-destructive'
    case 2:
      return '[&>[data-slot=progress-indicator]]:bg-orange-500'
    case 3:
      return '[&>[data-slot=progress-indicator]]:bg-yellow-500'
    case 4:
      return '[&>[data-slot=progress-indicator]]:bg-green-600'
    default:
      return ''
  }
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = getPasswordStrength(password)
  const config = STRENGTH_CONFIG[strength as keyof typeof STRENGTH_CONFIG]

  /* 비밀번호가 없을 때는 컴포넌트를 렌더링하지 않음 */
  if (!password) return null

  return (
    <div className={cn('space-y-1.5', className)} aria-live="polite" aria-label="비밀번호 강도">
      {/* 강도 Progress 바 */}
      <Progress
        value={config.value}
        className={cn('h-1.5 transition-all', getProgressColor(strength))}
        aria-label={`비밀번호 강도: ${config.label}`}
      />

      {/* 강도 레이블 */}
      <div className="flex items-center justify-between">
        <p className={cn('text-xs font-medium transition-colors', config.colorClass)}>
          {config.label}
        </p>
        {/* 강도 조건 힌트 */}
        <p className="text-xs text-muted-foreground">
          대소문자, 숫자, 특수문자 포함 권장
        </p>
      </div>
    </div>
  )
}
