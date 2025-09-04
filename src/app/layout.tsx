import { DM_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.scss';
import { getGlobalData, getOptionsData } from '@/services/network_requests';

import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';

export const revalidate = 300;

const dmSans = DM_Sans({
  variable: '--primary',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata = {
  generator: process.env.COMPANY_NAME || 'Default Generator',
  applicationName: process.env.COMPANY_NAME || 'Default Application',
  creator: process.env.COMPANY_NAME || 'Default Creator',
  publisher: process.env.COMPANY_NAME || 'Default Publisher',
};

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: 'black' },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [globalDataResponse, optionsDataResponse] = await Promise.all([
    getGlobalData(),
    getOptionsData(),
  ]);

  const globalData = globalDataResponse?.data; 
  const optionsData = optionsDataResponse?.data;

  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased font-primary`}>
        <NextTopLoader
          color="#fcaa70"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Header
          optionalData={optionsData}
          globalData={globalData}
        />
        {children}
        <Footer globalData={globalData} />
      </body>
    </html>
  );
}
