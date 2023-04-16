import './globals.css'
import { Nunito } from 'next/font/google'
import Nabvar from './components/navbar/Navbar'

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone with Next.js 13',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nabvar />
        {children}
      </body>
    </html>
  )
}
