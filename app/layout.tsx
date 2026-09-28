import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { IconSprite } from '@/components/Icons';
import { createPublicClient } from '@/lib/supabase/public';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

async function getSiteFavicon(): Promise<string> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general')
      .single();

    if (data?.value?.favicon_url) {
      return data.value.favicon_url;
    }
  } catch (err) {
    console.error('Error fetching favicon settings:', err);
  }
  return '/favicon.svg';
}

export async function generateMetadata(): Promise<Metadata> {
  const faviconUrl = await getSiteFavicon();

  return {
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
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faviconUrl = await getSiteFavicon();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
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
