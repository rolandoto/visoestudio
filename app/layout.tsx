import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Favorit Studio - Creative Direction & Design',
  description: 'Perfect over done. Curiosity over routine. Visions over strategy.',
  keywords: ['design', 'creative', 'studio', 'branding', 'product design'],
  authors: [{ name: 'Favorit Studio' }],
  openGraph: {
    title: 'Favorit Studio',
    description: 'Creative Direction & Design Studio',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  )
}
