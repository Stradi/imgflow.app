import NavigationBar from '@/components/NavigationBar';
import './globals.css';

export const metadata = {
  title: 'ImgFlow',
  description: 'ImgFlow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <header>
          <NavigationBar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
