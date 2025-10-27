import { ThemeProvider } from '@/components/ThemeProvider';
import '../styles/globals.css';
import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'E-commerce Dashboard',
  description: 'Analytics dashboard for e-commerce store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
