import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Leaf, Mountain, ArrowRight } from 'lucide-react';
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
            <Badge variant="outline" className="mb-8 px-4 py-1.5 border-[#DDD6C8] text-[#183A2C] rounded-full flex items-center gap-2 w-fit bg-[#FAF8F2] shadow-sm">
              <span className="text-[10px] tracking-[0.2em] font-body uppercase font-medium">澳门新式中药健康饮品</span>
            </Badge>
            
            <div className="mb-10 space-y-4">
              <h2 className="font-headline text-6xl md:text-7xl lg:text-8xl leading-none font-semibold text-[#183A2C]">
                山宁 AI
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#183A2C]/20"></div>
                <h3 className="font-headline text-4xl md:text-5xl text-[#183A2C]">让东方草本</h3>
              </div>
              <h3 className="font-headline text-4xl md:text-5xl text-[#183A2C]">更懂你的日常</h3>
            </div>
            
            <p className="text-lg text-[#3E4A42] mb-12 leading-relaxed font-body font-light tracking-wide max-w-md">
              依据季节、状态、口味与饮用场景，<br />
              生成适合你的东方草本茶饮推荐。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                onClick={onStartQuiz}
                size="lg" 
                className="bg-[#183A2C] text-[#F7F4EC] hover:bg-[#1F3D32] h-14 px-12 rounded-full font-body text-lg font-medium tracking-widest shadow-xl shadow-[#183A2C]/10"
              >
                开始 AI 选茶
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[#183A2C]/20 hover:bg-[#183A2C]/5 h-14 px-12 rounded-full text-[#183A2C] font-body tracking-wider"
              >
                查看四季茶单
              </Button>
            </div>
            
            <div className="mt-20 flex items-center gap-12 text-xs text-[#3E4A42] font-body tracking-[0.3em] uppercase opacity-60">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-[#C9A75A]" />
                <span>0 添加草本</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain size={14} className="text-[#C9A75A]" />
                <span>东方养生</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50">
              <Image 
                src="https://picsum.photos/seed/tea-nature/800/1000" 
                alt="Sanitea Nature" 
                fill 
                className="object-cover"
                data-ai-hint="herbal tea nature"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183A2C]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-[#F7F4EC]/90 text-sm tracking-[0.4em] uppercase mb-4 font-light">每一口都是山川草木的纹理</p>
                <h4 className="font-headline text-3xl text-white mb-6">自然之味，愈见初心</h4>
                <div className="flex items-center gap-2 text-[#C9A75A] text-xs tracking-widest font-medium">
                  EXPLORE THE COLLECTION <ArrowRight size={14} />
                </div>
              </div>
            </div>
            
            {/* Decorative leaf shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 pointer-events-none rotate-45">
              <Leaf size={160} className="text-[#183A2C]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
