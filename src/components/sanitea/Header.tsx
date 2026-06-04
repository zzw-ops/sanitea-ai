import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group">
            <h1 className="font-headline text-2xl font-medium tracking-widest text-brand-gold">
              山宁 <span className="text-xs tracking-[0.4em] ml-1 font-body opacity-80 uppercase">Sanitea</span>
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {['首页', '四季茶饮', 'AI 选茶', '草本理念', '门店'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="text-sm tracking-widest text-[#AAB4C4] hover:text-brand-gold transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10 rounded-full font-body tracking-wider">
            今日茶方
          </Button>
          <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-full font-body font-medium tracking-wider">
            点单选茶
          </Button>
        </div>
      </div>
    </header>
  );
}
