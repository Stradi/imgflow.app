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
        <script defer data-domain="imgflow.app" src="https://analytics.imgflow.app/js/script.js"></script>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
