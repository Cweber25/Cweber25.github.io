import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Cole Weber - Full-Stack Developer',
  description: 'Professional portfolio and resume of Cole Weber',
}

// Google Analytics ID - Set via GitHub Secrets
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Google Analytics - Only load if GA_MEASUREMENT_ID is set */}
        {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith('G-') && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
