import { Sparkles, Wind, Moon, Sun } from 'lucide-react';

export function Philosophy() {
  return (
    <section className="py-32 bg-[#FAF8F2] relative overflow-hidden border-y border-[#DDD6C8]/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <h2 className="font-headline text-5xl mb-8 leading-tight text-[#183A2C]">
            不是药感，<br />
            是东方草本的<span className="text-[#C9A75A] italic">日常感</span>
          </h2>
          <p className="text-[#3E4A42] text-lg leading-relaxed font-body font-light opacity-80">
            山宁希望把传统草本、东方美学与新式茶饮结合，让养生不再沉重，也不再遥远。
            每一杯茶都从口味、状态与场景出发，回到更轻盈的日常。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <Sparkles size={24} />, label: '0 添加' },
            { icon: <Wind size={24} />, label: '草本灵感' },
            { icon: <Sun size={24} />, label: '四季茶饮' },
            { icon: <Moon size={24} />, label: '轻负担' },
          ].map((item, index) => (
            <div key={index} className="space-y-6 group animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-white border border-[#DDD6C8] text-[#183A2C] group-hover:border-[#183A2C]/30 group-hover:bg-[#F2EDE3] transition-all duration-500 shadow-sm">
                {item.icon}
              </div>
              <p className="text-sm tracking-[0.3em] uppercase text-[#3E4A42] font-body font-medium group-hover:text-[#183A2C] transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative mountain silhoutte at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#183A2C]">
          <path d="M0,224L120,186.7C240,149,480,75,720,85.3C960,96,1200,192,1320,240L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
