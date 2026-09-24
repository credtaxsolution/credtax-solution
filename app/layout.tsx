import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { IconSprite } from '@/components/Icons';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://credtaxsolution.com'),
  title: {
    default: 'CredTax | Offshore Tax & Accounting Support for CPA Firms',
    template: '%s | CredTax',
  },
  description:
    'CredTax provides offshore tax, accounting and workflow support for US and Canadian CPA firms, with flexible, dedicated and workflow-based support models.',
  keywords: [
    'Offshore tax preparation',
    'CPA firm support',
    'US tax for CPAs',
    'Canadian accounting support',
    'Tax review and QC',
    'Bookkeeping offshore',
    'CredTax Pod',
    'CPA firm succession',
  ],
  authors: [{ name: 'CredTax Solution LLP' }],
  creator: 'CredTax Solution LLP',
  publisher: 'CredTax Solution LLP',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://credtaxsolution.com',
    siteName: 'CredTax',
    title: 'CredTax | Offshore Tax & Accounting Support for CPA Firms',
    description:
      'Offshore tax, accounting and workflow support for US and Canadian CPA firms, built around the way your firm already works.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'CredTax Solution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CredTax | Offshore Tax & Accounting Support for CPA Firms',
    description:
      'Offshore tax, accounting and workflow support for US and Canadian CPA firms, built around the way your firm already works.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CredTax',
  legalName: 'CredTax Solution LLP',
  description:
    'Offshore tax, accounting and workflow support for US and Canadian CPA and accounting firms.',
  url: 'https://credtaxsolution.com/',
  founder: [
    { '@type': 'Person', name: 'Raijo Jose' },
    { '@type': 'Person', name: 'Nithin PR' },
  ],
  email: 'prnithin6@gmail.com',
  telephone: '+91 9495915993',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Menacheriveedu, Ward 6 Door No.459, Thattampady',
    addressLocality: 'Karumalloor',
    addressRegion: 'Kerala',
    postalCode: '683511',
    addressCountry: 'IN',
  },
  areaServed: ['US', 'CA'],
  knowsAbout: [
    'US tax preparation support',
    'Tax review and quality-control support',
    'Bookkeeping and accounting support',
    'CPA firm workflow support',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to main content
        </a>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
