import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Omniscale",
  description: "We Scale Coaches & Agencies to $65K/Month By Building Their Entire Backend",
  icons: {
    icon: "/favicon.png", // Updated favicon to use the new OmniScale brand icon
  },
  generator: "v0.app",
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
