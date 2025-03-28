import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import BottomMenu from './components/BottomMenu';
import { Providers } from './providers';
import ScrollToTop from './components/ScrollToTop';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Manavim',
  description: 'Your fresh grocery shopping app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* app icon change and make rounded */}
      <link rel="icon" href="/images/manavIM.ico" sizes="32x32" />
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="pb-16 sm:pb-0">
            {children}
          </main>
          <ScrollToTop />
          <BottomMenu />
        </Providers>
      </body>
    </html>
  );
}
