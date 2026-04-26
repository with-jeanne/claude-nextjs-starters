import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 font-semibold">
            <span className="text-primary">◈</span>
            <span>Invoice</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
