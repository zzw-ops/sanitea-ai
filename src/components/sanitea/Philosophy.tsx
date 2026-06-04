import { Sparkles, Wind, Moon, Sun } from 'lucide-react';

export function Philosophy() {
  return (
    <section className="py-32 bg-[#0B1320] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-5xl mb-8 leading-tight">
            不是药感，<br />
            是东方草本的<span className="text-brand-gold italic">日常感</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-body font-light">
            山宁希望把传统草本、东方美学与新式茶饮结合，让养生不再沉重，也不再遥远。
            每一杯茶都从口味、状态与场景出发，回到更轻盈的日常。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <Sparkles />, label: '0 添加' },
            { icon: <Wind />, label: '草本灵感' },
            { icon: <Sun />, label: '四季茶饮' },
            { icon: <Moon />, label: '轻负担' },
          ].map((item, index) => (
            <div key={index} className="space-y-6 group">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-brand-gold group-hover:bg-brand-gold/10 group-hover:border-brand-gold/30 transition-all duration-500">
                {item.icon}
              </div>
              <p className="text-sm tracking-[0.3em] uppercase text-slate-400 font-body group-hover:text-brand-gold transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative mountain silhoutte at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-brand-navy">
          <path d="M0,224L120,186.7C240,149,480,75,720,85.3C960,96,1200,192,1320,240L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
