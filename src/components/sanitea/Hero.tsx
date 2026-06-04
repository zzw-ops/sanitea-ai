import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Mountain, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-xl animate-fade-in">
            <Badge variant="outline" className="mb-8 px-4 py-1.5 border-brand-grey text-brand-green rounded-full flex items-center gap-2 w-fit bg-brand-paper/50 shadow-sm">
              <span className="text-[10px] tracking-[0.2em] font-body uppercase font-medium">澳门新式中药健康饮品</span>
            </Badge>
            
            <div className="mb-10 space-y-4">
              <h2 className="font-headline text-6xl md:text-7xl lg:text-8xl leading-none font-semibold text-brand-green">
                山宁 AI
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-brand-green/20"></div>
                <h3 className="font-headline text-4xl md:text-5xl text-brand-green">让东方草本</h3>
              </div>
              <h3 className="font-headline text-4xl md:text-5xl text-brand-green">更懂你的日常</h3>
            </div>
            
            <p className="text-lg text-brand-green/70 mb-12 leading-relaxed font-body font-light tracking-wide max-w-md">
              依据季节、状态、口味与饮用场景，<br />
              生成适合你的东方草本茶饮推荐。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                onClick={onStartQuiz}
                size="lg" 
                className="bg-brand-green text-brand-paper hover:bg-brand-green/90 h-14 px-12 rounded-full font-body text-lg font-medium tracking-widest shadow-xl shadow-brand-green/10"
              >
                开始 AI 选茶
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-green/20 hover:bg-brand-green/5 h-14 px-12 rounded-full text-brand-green font-body tracking-wider"
              >
                查看四季茶单
              </Button>
            </div>
            
            <div className="mt-20 flex items-center gap-12 text-xs text-brand-green/60 font-body tracking-[0.3em] uppercase">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-brand-gold" />
                <span>0 添加草本</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain size={14} className="text-brand-gold" />
                <span>东方养生</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-white/40">
              <Image 
                src="https://picsum.photos/seed/tea-nature/800/1000" 
                alt="Sanitea Nature" 
                fill 
                className="object-cover"
                data-ai-hint="herbal tea nature"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-brand-paper/90 text-[10px] tracking-[0.4em] uppercase mb-4 font-light">每一口都是山川草木的纹理</p>
                <h4 className="font-headline text-3xl text-white mb-6">自然之味，愈见初心</h4>
                <div className="flex items-center gap-2 text-brand-gold text-xs tracking-widest font-medium">
                  EXPLORE THE COLLECTION <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
