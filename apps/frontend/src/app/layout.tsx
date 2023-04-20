import './globals.css';

export const metadata = {
  title: 'ImgFlow',
  description: 'ImgFlow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
