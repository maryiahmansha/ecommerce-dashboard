import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'E-commerce Dashboard',
  description: 'Analytics dashboard for e-commerce store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
