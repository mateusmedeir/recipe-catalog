import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/context/authContext'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Recipe Catalog',
  description: 'A simple recipe catalog app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="h-svh">
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
