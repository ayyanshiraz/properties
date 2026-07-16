import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CookieBanner from "../components/CookieBanner";
import ConditionalUI from "../components/ConditionalUI";
import WhatsAppButton from "../components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qemaat - Portal",
  description: "Buy, sell, and rent premium real estate properties with Qemaat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="FOAVItenv04tncfquMBw3P5Us7gfyuBPV2pnnKvhiIU" />
      </head>
      <body className="min-h-full flex flex-col">
        
        {/* ConditionalUI khud decide karega kahan Navbar/Footer dikhana hai */}
        <ConditionalUI>
          {children}
        </ConditionalUI>
        <WhatsAppButton />
        
        <CookieBanner />
      </body>
    </html>
  );
}