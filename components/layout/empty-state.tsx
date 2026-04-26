/**
 * 빈 상태 컴포넌트
 * 데이터가 없을 때 사용자에게 보여줄 피드백 UI
 */

import { AlertCircle } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-12 px-4 text-center dark:border-neutral-700 dark:bg-neutral-950', className)}>
      {/* 아이콘 영역 */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
        {icon || <AlertCircle className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />}
      </div>

      {/* 제목 */}
      <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>

      {/* 설명 */}
      <p className="mb-6 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">{description}</p>

      {/* 액션 버튼 (선택사항) */}
      {action && action}
    </div>
  )
}
