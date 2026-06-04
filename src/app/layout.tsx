import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '山宁 SANITEA - AI 灵感择茶',
  description: '让山宁 AI，为你择一杯当下之茶。新式中药健康茶饮，东方自然美学。',
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
      <body className="font-body antialiased bg-[#0E1116] text-[#F5F0E6]">
        {children}
      </body>
    </html>
  );
}
