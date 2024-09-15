import { Inter } from 'next/font/google'
import { GeistSans } from "geist/font/sans";
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cantemos',
  description: 'Cancionero catolico movil.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={GeistSans.className}>
        <Navbar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
