import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GROW | Tu Growth Partner',
  description: 'Integramos estrategia, creatividad, producción y performance para escalar tu marca de forma sostenible y medible.',
  metadataBase: new URL('https://growmkt.mx'),
  openGraph: {
    title: 'GROW | Tu Growth Partner',
    description: 'Integramos estrategia, creatividad, producción y performance para escalar tu marca.',
    url: 'https://growmkt.mx',
    siteName: 'GROW',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GROW | Tu Growth Partner',
    description: 'Integramos estrategia, creatividad, producción y performance para escalar tu marca.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-surface text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
