import './globals.css';

export const metadata = {
  title: 'ImgFlow',
  description: 'ImgFlow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
