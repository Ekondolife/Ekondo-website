import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalNavigation from "@/components/conditional-navigation"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-context"
import { UserProvider } from "@/components/user-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import UTMTracker from "@/components/utm-tracker"

export const metadata: Metadata = {
  title: "Ekondo | Sustainability & Wellness",
  description: "Ekondo is a sustainability and wellness company rooted in Nature, creativity, and community.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Microsoft Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tto945l2yt");
          `}
        </Script>

        {/* ✅ Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <UserProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <ConditionalNavigation />
                <UTMTracker />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
