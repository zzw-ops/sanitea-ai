import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="font-headline text-3xl font-medium tracking-widest text-brand-gold">
              山宁 <span className="text-xs tracking-[0.4em] ml-1 font-body opacity-80 uppercase">Sanitea</span>
            </h2>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              新式中药健康茶饮品牌。植根东方自然美学，结合现代生活状态，为您呈献灵感四溢的草本茶饮体验。
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs tracking-widest text-brand-gold uppercase">了解更多</h4>
            <nav className="flex flex-col gap-4">
              {['品牌故事', '草本库', '四季茶单', '常见问题'].map(item => (
                <Link key={item} href="#" className="text-slate-500 text-sm hover:text-brand-gold transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs tracking-widest text-brand-gold uppercase">联系我们</h4>
            <div className="text-slate-500 text-sm space-y-4">
              <p>上海市徐汇区艺术街区 88 号</p>
              <p>contact@sanitea.com</p>
              <div className="flex gap-4 pt-4">
                {['WeChat', 'RedBook', 'Insta'].map(icon => (
                  <span key={icon} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] hover:border-brand-gold/50 cursor-pointer transition-colors">
                    {icon[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-widest text-slate-600 uppercase">
            © 2024 SANITEA 山宁 · 灵感择茶版权所有
          </p>
          <div className="flex gap-8 text-[10px] tracking-widest text-slate-600 uppercase">
            <Link href="#" className="hover:text-slate-400">隐私协议</Link>
            <Link href="#" className="hover:text-slate-400">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
