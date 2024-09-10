import "~/styles/globals.css";
import React, { PropsWithChildren } from 'react'
import { type Metadata } from "next";

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
      <body>{children}</body>
    </html>
  )
}
