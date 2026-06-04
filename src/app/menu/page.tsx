'use client';

import React from 'react';
import { Header } from '@/components/sanitea/Header';
import { Footer } from '@/components/sanitea/Footer';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Leaf, Sun, Wind, Moon, Coffee } from 'lucide-react';
import Image from 'next/image';

const SEASONAL_MENU = [
  {
    season: '春 · 灵感',
    title: '清桂茶选',
    english: 'OSMANTHUS CLEAR BLEND',
    description: '桂花与清新草本的邂逅，适合明亮而充满希望的午后。',
    tags: ['花香', '清爽', '回甘'],
    image: 'https://picsum.photos/seed/spring-tea/600/400'
  },
  {
    season: '夏 · 调和',
    title: '墨韵乌朱',
    english: 'INK RHYME BLACK PEARL',
    description: '深色草本带来的果香微甜，清解夏日浮躁，沁人心脾。',
    tags: ['果香', '去腻', '微甜'],
    image: 'https://picsum.photos/seed/summer-tea/600/400'
  },
  {
    season: '秋 · 滋养',
    title: '雪耳温露',
    english: 'SNOW EAR DEW',
    description: '温润如玉，调和秋季干燥，给身心一份温柔的包裹。',
    tags: ['滋补', '温润', '丝滑'],
    image: 'https://picsum.photos/seed/autumn-tea/600/400'
  },
  {
    season: '冬 · 暖意',
    title: '姜焙陈皮',
    english: 'GINGER AGED PEEL',
    description: '老姜与陈皮的深厚韵味，在寒冷冬日里重塑内在暖流。',
    tags: ['暖身', '醇厚', '草本'],
    image: 'https://picsum.photos/seed/winter-tea/600/400'
  }
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <Badge variant="outline" className="mb-6 border-primary/20 text-primary rounded-full px-6 py-2 bg-white/50 backdrop-blur-sm shadow-sm">
              <span className="text-xs tracking-[0.3em] font-medium uppercase">四季更迭 · 草本常新</span>
            </Badge>
            <h1 className="font-headline text-5xl md:text-7xl text-primary mb-8 font-semibold">山宁四季茶单</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
              顺应自然节律，精选四时草本。我们以时间为引，<br />
              为您调配每一季的内在平衡。
            </p>
          </motion.div>

          <div className="grid gap-16">
            {SEASONAL_MENU.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center bg-card/40 p-8 md:p-12 rounded-[48px] border border-border shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex-1 space-y-8">
                  <div className="space-y-2">
                    <span className="text-accent font-medium tracking-[0.4em] uppercase text-xs">{item.season}</span>
                    <h2 className="font-headline text-4xl md:text-5xl text-primary font-semibold">{item.title}</h2>
                    <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase opacity-60">{item.english}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-md italic">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white border border-border text-[10px] tracking-widest text-primary font-medium">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="relative aspect-[3/2] rounded-[32px] overflow-hidden shadow-xl border-4 border-white">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover"
                      data-ai-hint="aesthetic herbal tea"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
