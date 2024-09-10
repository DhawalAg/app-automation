import "~/styles/globals.css";
import { Inter } from 'next/font/google'
import { type Metadata } from "next";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Prompt Improver",
  description: 'Improve your prompts with AI assistance',
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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



