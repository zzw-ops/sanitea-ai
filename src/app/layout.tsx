import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '山宁 SHANNING - AI 灵感择茶',
  description: '让东方草本更懂你的日常。新式中药健康茶饮，东方自然美学。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#F7F4EC] text-[#183A2C] paper-texture">
        {children}
      </body>
    </html>
  );
}
