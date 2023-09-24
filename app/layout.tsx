import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Hub de Voiture',
  description: 'Découvre les meilleurs voitures dans le monde',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  },
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
