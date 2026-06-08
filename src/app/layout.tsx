import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

const geist = Inter({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'ATS Analyzer — Otimize seu CV para LinkedIn',
  description: 'Analise seu currículo com IA, aplique regras ATS e otimize seu perfil para o LinkedIn.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
