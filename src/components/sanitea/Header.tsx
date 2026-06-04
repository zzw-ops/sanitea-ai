import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  const menuUrl = "https://6000-firebase-studio-1780562143273.cluster-m7dwy2bmizezqukxkuxd55k5ka.cloudworkstations.dev/menu";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-baseline">
            <h1 className="font-headline text-2xl font-semibold tracking-widest text-primary">
              山宁 <span className="text-xs tracking-[0.2em] ml-1 font-body opacity-80 uppercase font-light">Shanning</span>
            </h1>
            <span className="hidden sm:inline-block h-4 w-px bg-primary/20 mx-3"></span>
            <span className="hidden sm:inline-block text-[10px] tracking-[0.4em] font-body opacity-50 uppercase font-light">Sanitea</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {['首页', '品牌理念', '产品系列', '四季茶单', 'AI 选茶', '联系我们'].map((item) => {
              let href = '#';
              if (item === 'AI 选茶') href = '#quiz';
              if (item === '首页') href = '/';
              if (item === '四季茶单') href = menuUrl;

              return (
                <Link 
                  key={item} 
                  href={href} 
                  className={`text-sm tracking-widest transition-colors relative group py-2
                    ${item === 'AI 选茶' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'}
                  `}
                >
                  {item}
                  {item === 'AI 选茶' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full"></span>
                  )}
                  {item !== 'AI 选茶' && (
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/5 rounded-full font-body tracking-wider text-xs">
            今日茶方
          </Button>
          <Button className="bg-accent text-accent-foreground hover:opacity-90 rounded-full font-body font-medium tracking-widest px-6 h-10 shadow-sm transition-all hover:scale-105 active:scale-95">
            开始选茶
          </Button>
        </div>
      </div>
    </header>
  );
}
