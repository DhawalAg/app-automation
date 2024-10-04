import "~/styles/globals.css";
import { Inter } from 'next/font/google'
import { type Metadata } from "next";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Application Automation',
  description: 'Automate your job application process',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



