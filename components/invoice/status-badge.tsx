/**
 * 견적서 상태 배지 컴포넌트
 * 견적서의 상태(초안/발송됨/확인됨)를 시각적으로 표현
 */

import { Badge } from '@/components/ui/badge'
import { InvoiceStatus } from '@/lib/types/invoice'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

/**
 * 상태별 스타일 매핑
 */
const STATUS_VARIANTS: Record<InvoiceStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: {
    label: '초안',
    variant: 'secondary',
  },
  sent: {
    label: '발송됨',
    variant: 'outline',
  },
  confirmed: {
    label: '확인됨',
    variant: 'default',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, variant } = STATUS_VARIANTS[status]

  return (
    <Badge variant={variant} className={cn('font-medium', className)}>
      {label}
    </Badge>
  )
}
