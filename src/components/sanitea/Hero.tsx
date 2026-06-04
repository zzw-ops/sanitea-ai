import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Leaf, Mountain } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-brand-gold">
          <path d="M50 450C150 400 250 500 400 450S650 350 750 400" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M50 480C150 430 250 530 400 480S650 380 750 430" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-brand-gold/30 text-brand-gold rounded-full flex items-center gap-2 w-fit bg-brand-gold/5">
              <Sparkles size={12} />
              <span className="text-[10px] tracking-[0.2em] font-body uppercase">AI Tea Matching / 今日状态选茶</span>
            </Badge>
            
            <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 font-medium">
              让山宁 AI，<br />
              为你择一杯<span className="text-brand-gold italic">当下之茶</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-body font-light tracking-wide">
              依据季节、状态、口味与饮用场景，<br className="hidden md:block" />
              生成适合你的东方草本茶饮推荐。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                onClick={onStartQuiz}
                size="lg" 
                className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 h-14 px-10 rounded-full font-body text-lg font-medium tracking-widest shadow-lg shadow-brand-gold/20"
              >
                开始 AI 选茶
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/10 hover:bg-white/5 h-14 px-10 rounded-full text-white/80 font-body tracking-wider"
              >
                查看四季茶单
              </Button>
            </div>
            
            <div className="mt-16 flex items-center gap-12 text-sm text-slate-500 font-body tracking-widest opacity-60">
              <div className="flex items-center gap-2">
                <Leaf size={16} className="text-brand-gold" />
                <span>0 添加草本</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain size={16} className="text-brand-gold" />
                <span>东方养生</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-[500px] h-[500px] mx-auto">
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 border border-brand-gold/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-4 border border-brand-gold/5 rounded-full"></div>
              
              {/* Preview Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 glass-morphism p-8 rounded-3xl border border-brand-gold/20 animate-float z-20">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] tracking-widest text-brand-gold uppercase opacity-80">今日推荐</span>
                  <div className="px-2 py-0.5 rounded-sm bg-brand-gold/10 border border-brand-gold/20 text-[9px] text-brand-gold">92% MATCH</div>
                </div>
                <h3 className="font-headline text-3xl mb-2">清桂茶选</h3>
                <p className="text-[10px] tracking-[0.2em] text-slate-400 uppercase mb-4">OSMANTHUS CLEAR BLEND</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['花香', '清爽', '低甜'].map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full border border-white/5 bg-white/5 text-slate-300">{tag}</span>
                  ))}
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent mb-6"></div>
                <p className="text-xs text-slate-400 leading-loose italic">“适合在疲惫的午后，寻得一丝清凉与芳香的平衡。”</p>
              </div>

              {/* Botanical illustrations placeholders using subtle paths */}
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-40">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-brand-gold" strokeWidth="0.5">
                  <path d="M100 180 Q80 140 100 100 T120 20" />
                  <circle cx="100" cy="50" r="2" fill="currentColor" />
                  <circle cx="90" cy="80" r="1.5" fill="currentColor" />
                  <circle cx="110" cy="110" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
