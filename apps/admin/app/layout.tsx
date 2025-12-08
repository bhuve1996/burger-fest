import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Burger Fest Admin',
  description: 'Admin panel for Burger Fest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
