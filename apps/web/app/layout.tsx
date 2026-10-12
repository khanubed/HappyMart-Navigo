import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StoreProvider } from "@/components/store-provider"
import { cn } from "@workspace/ui/lib/utils"

import { StorefrontShell } from "@/components/layout/storefront-shell"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('happymart_theme_id');var v=['fresh-market','market-red','urban-blue','pantry-earth','modern-plum'];var id=v.indexOf(t)!==-1?t:'fresh-market';document.documentElement.setAttribute('data-theme',id);}catch(e){document.documentElement.setAttribute('data-theme','fresh-market');}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider>
            <StorefrontShell>{children}</StorefrontShell>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
