import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — StarterKit',
}

const stats = [
  { label: '총 수익', value: '$45,231', icon: DollarSign, trend: '+20.1%', up: true },
  { label: '활성 사용자', value: '2,350', icon: Users, trend: '+18.5%', up: true },
  { label: '새 주문', value: '1,247', icon: ShoppingCart, trend: '-4.2%', up: false },
  { label: '가동률', value: '99.9%', icon: Activity, trend: '+0.1%', up: true },
]

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', initials: 'AJ' },
  { name: 'Bob Smith', email: 'bob@example.com', status: 'Pending', initials: 'BS' },
  { name: 'Carol White', email: 'carol@example.com', status: 'Active', initials: 'CW' },
  { name: 'David Brown', email: 'david@example.com', status: 'Inactive', initials: 'DB' },
]

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader title="Dashboard" description="애플리케이션 메트릭 개요.">
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button size="sm">Add Widget</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, trend, up }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{value}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {up ? (
                  <TrendingUp className="size-3 text-green-500" />
                ) : (
                  <TrendingDown className="size-3 text-red-500" />
                )}
                <span className={up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {trend}
                </span>
                <span className="text-muted-foreground">지난달 대비</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>최근 사용자</CardTitle>
          <CardDescription>최근에 활동한 사용자 목록.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map(({ name, email, status, initials }) => (
              <div key={email} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    status === 'Active'
                      ? 'default'
                      : status === 'Pending'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
