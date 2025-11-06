import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "KUA Dungkek - Kantor Urusan Agama Kecamatan Dungkek",
    template: "%s | KUA Dungkek"
  },
  description: "Portal resmi KUA Dungkek - Layanan administrasi keagamaan Islam, pendaftaran nikah, dan informasi keagamaan untuk masyarakat Kecamatan Dungkek",
  keywords: ["KUA Dungkek", "Kantor Urusan Agama", "Pernikahan Islam", "SIMKAH", "Kemenag", "Dungkek", "Sumenep"],
  authors: [{ name: "KUA Dungkek" }],
  creator: "KUA Dungkek",
  publisher: "KUA Dungkek",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kuadungkek.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KUA Dungkek - Kantor Urusan Agama Kecamatan Dungkek",
    description: "Portal resmi KUA Dungkek - Layanan administrasi keagamaan Islam dan pendaftaran nikah online",
    url: '/',
    siteName: 'KUA Dungkek',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'KUA Dungkek Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.className}>
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-14 sm:pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
