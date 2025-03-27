import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import BottomMenu from './components/BottomMenu';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Manavim',
  description: 'Your fresh grocery shopping app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="pb-16 sm:pb-0">
            {children}
          </main>
          <BottomMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
