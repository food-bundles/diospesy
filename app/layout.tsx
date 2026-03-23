import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import "./globals.css";

// app/layout.tsx
import { Cinzel, Cormorant_Garamond, Lato, Great_Vibes } from 'next/font/google'

<link href="https://fonts.googleapis.com/css2?family=Playball&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cinzel' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-cormorant' })
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], variable: '--font-lato' })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-great-vibes' })


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diospesy Wedding",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
