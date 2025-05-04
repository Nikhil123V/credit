import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { CustomerProvider } from "@/context/customer-context"
import {
  ClerkProvider,

} from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CrediKhaata - Loan Ledger for Shopkeepers",
  description: "Manage customer credit, track transactions, and record repayments",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomerProvider>
            {children}
            </CustomerProvider>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>






    </ClerkProvider>
  )
}
