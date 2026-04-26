/**
 * 페이지 헤더 컴포넌트
 * 각 페이지의 제목, 설명, 액션 버튼을 일관된 스타일로 표현
 */

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, action, children, className }: PageHeaderProps) {
  // children이 있으면 action 대신 사용 (하위호환성)
  const actionContent = children || action

  return (
    <div className={cn('mb-8 flex items-center justify-between', className)}>
      {/* 제목 및 설명 영역 */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">{title}</h1>
        {description && <p className="mt-2 text-neutral-600 dark:text-neutral-400">{description}</p>}
      </div>

      {/* 액션 버튼 영역 (선택사항) */}
      {actionContent && <div className="ml-4 flex items-center gap-2">{actionContent}</div>}
    </div>
  )
}
