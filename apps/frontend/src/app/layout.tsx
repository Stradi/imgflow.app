import 'reactflow/dist/style.css';
import './globals.css';

export const metadata = {
  title: 'ImgFlow',
  description: 'ImgFlow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
