import '../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-commerce Dashboard',
  description: 'Analytics dashboard for e-commerce store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
