import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Share2, Info, Thermometer, Candy, MapPin } from 'lucide-react';
import type { AIRecipeRecommendationOutput } from '@/ai/flows/ai-recipe-recommendation-flow';
import { generateRecommendationRationale } from '@/ai/flows/recommendation-rationale-flow';

interface ResultViewProps {
  result: AIRecipeRecommendationOutput;
  answers: Record<string, string>;
  onReset: () => void;
}

export function ResultView({ result, answers, onReset }: ResultViewProps) {
  const [rationale, setRationale] = useState<string>('');
  const [loadingRationale, setLoadingRationale] = useState(true);

  useEffect(() => {
    async function fetchRationale() {
      try {
        const data = await generateRecommendationRationale({
          userState: [answers.currentState],
          tastePreference: [answers.tastePreference],
          drinkingScene: [answers.drinkingScenario],
          tempPreference: [answers.temperaturePreference],
          season: [answers.currentSeason],
          aversion: [answers.avoidTaste],
          recommendedTea: {
            name: result.teaName,
            englishName: result.englishName,
            flavorKeywords: result.tasteTags,
            suitableStates: [answers.currentState],
            ingredients: result.herbalIngredients,
            tempSuggestion: result.servingSuggestion.temperature,
            sweetnessSuggestion: result.servingSuggestion.sweetness,
            sceneSuggestion: result.servingSuggestion.scenario,
          }
        });
        setRationale(data.rationale);
      } catch (e) {
        setRationale(result.reason);
      } finally {
        setLoadingRationale(false);
      }
    }
    fetchRationale();
  }, [result, answers]);

  return (
    <section className="py-24 min-h-screen brand-bg-texture flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-brand-gold/30 text-brand-gold rounded-full px-4 py-1">
            AI 今日茶方
          </Badge>
          <h2 className="font-headline text-5xl mb-4">为您生成的灵感推荐</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-morphism p-8 md:p-16 rounded-[40px] gold-glow relative overflow-hidden"
        >
          {/* Match Score Badge */}
          <div className="absolute top-10 right-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="2" fill="transparent" 
                        strokeDasharray={283} strokeDashoffset={283 - (283 * result.matchScore) / 100} 
                        className="text-brand-gold" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-headline font-bold">{result.matchScore}%</span>
                <span className="text-[8px] tracking-widest text-slate-500 uppercase">Match</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="text-5xl md:text-6xl font-headline mb-4 tracking-tight">{result.teaName}</h3>
                <p className="text-sm tracking-[0.4em] text-slate-400 uppercase font-light">{result.englishName}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-brand-gold/10 text-brand-gold">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs tracking-widest text-slate-500 uppercase mb-2">推荐理由</h4>
                    <p className="text-slate-300 leading-relaxed italic">
                      {loadingRationale ? '正在润色理由...' : rationale}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.tasteTags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 text-brand-gold">
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Thermometer size={16} />
                    <span className="text-xs tracking-widest uppercase">饮用温度</span>
                  </div>
                  <p className="text-sm text-slate-300">{result.servingSuggestion.temperature}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-gold">
                    <Candy size={16} />
                    <span className="text-xs tracking-widest uppercase">甜度建议</span>
                  </div>
                  <p className="text-sm text-slate-300">{result.servingSuggestion.sweetness}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3 col-span-full">
                  <div className="flex items-center gap-2 text-brand-gold">
                    <MapPin size={16} />
                    <span className="text-xs tracking-widest uppercase">适饮场景</span>
                  </div>
                  <p className="text-sm text-slate-300">{result.servingSuggestion.scenario}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h4 className="text-xs tracking-widest text-brand-gold uppercase mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-brand-gold/30"></span>
                    草本灵感
                  </h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {result.herbalIngredients.map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                        <span className="text-slate-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-brand-navy border border-brand-gold/20 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-[10px] tracking-widest text-slate-500 uppercase mb-3">安全指引</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {result.disclaimer}
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 bg-brand-gold/5 blur-3xl rounded-full group-hover:bg-brand-gold/10 transition-all"></div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-full h-14 font-medium tracking-widest">
                  立即下单
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="h-14 w-14 rounded-full border-white/10 text-slate-400 hover:text-brand-gold">
                    <Download size={20} />
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-full border-white/10 text-slate-400 hover:text-brand-gold">
                    <Share2 size={20} />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onReset}
                    className="h-14 px-8 rounded-full border-white/10 text-slate-400 hover:text-brand-gold flex gap-2 items-center"
                  >
                    <RefreshCw size={18} />
                    <span>重新选择</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
