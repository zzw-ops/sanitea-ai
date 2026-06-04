import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Share2, Info, Thermometer, Candy, MapPin, Leaf } from 'lucide-react';
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
    <section className="py-24 min-h-screen bg-[#F7F4EC] flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-[#183A2C]/20 text-[#183A2C] rounded-full px-4 py-1 bg-white">
            AI 今日茶方
          </Badge>
          <h2 className="font-headline text-5xl mb-4 text-[#183A2C]">为您生成的灵感推荐</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#FAF8F2] p-8 md:p-16 rounded-[40px] border border-[#DDD6C8] shadow-sm relative overflow-hidden"
        >
          {/* Match Score Badge */}
          <div className="absolute top-10 right-10 flex flex-col items-center">
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" fill="transparent" className="text-[#EEE9DF]" />
                <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" fill="transparent" 
                        strokeDasharray={238.7} strokeDashoffset={238.7 - (238.7 * result.matchScore) / 100} 
                        className="text-[#C9A75A]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-headline font-bold text-[#183A2C]">{result.matchScore}%</span>
                <span className="text-[8px] tracking-widest text-[#3E4A42] uppercase">Match</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h3 className="text-5xl md:text-6xl font-headline mb-4 tracking-tight text-[#183A2C]">{result.teaName}</h3>
                <p className="text-sm tracking-[0.4em] text-[#3E4A42] uppercase font-light">{result.englishName}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-[#5C7A63]/10 text-[#5C7A63]">
                    <Info size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs tracking-widest text-[#3E4A42] uppercase mb-2 font-medium">推荐理由</h4>
                    <p className="text-[#3E4A42] leading-relaxed italic opacity-90">
                      {loadingRationale ? '正在润色理由...' : rationale}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.tasteTags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-[#5C7A63]/20 bg-[#5C7A63]/5 text-[#5C7A63]">
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#DDD6C8] space-y-3">
                  <div className="flex items-center gap-2 text-[#C9A75A]">
                    <Thermometer size={14} />
                    <span className="text-xs tracking-widest uppercase font-medium">饮用温度</span>
                  </div>
                  <p className="text-sm text-[#3E4A42]">{result.servingSuggestion.temperature}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#DDD6C8] space-y-3">
                  <div className="flex items-center gap-2 text-[#C9A75A]">
                    <Candy size={14} />
                    <span className="text-xs tracking-widest uppercase font-medium">甜度建议</span>
                  </div>
                  <p className="text-sm text-[#3E4A42]">{result.servingSuggestion.sweetness}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#DDD6C8] space-y-3 col-span-full">
                  <div className="flex items-center gap-2 text-[#C9A75A]">
                    <MapPin size={14} />
                    <span className="text-xs tracking-widest uppercase font-medium">适饮场景</span>
                  </div>
                  <p className="text-sm text-[#3E4A42]">{result.servingSuggestion.scenario}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h4 className="text-xs tracking-widest text-[#183A2C] uppercase mb-6 flex items-center gap-2 font-semibold">
                    <span className="w-8 h-px bg-[#183A2C]/20"></span>
                    草本灵感
                  </h4>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {result.herbalIngredients.map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5C7A63]"></div>
                        <span className="text-[#3E4A42] text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-[#183A2C]/5 border border-[#DDD6C8] relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-[10px] tracking-widest text-[#3E4A42] uppercase mb-3 font-semibold">饮用提示</h4>
                    <p className="text-[11px] text-[#3E4A42]/70 leading-relaxed italic">
                      {result.disclaimer}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-[#183A2C] text-[#F7F4EC] hover:bg-[#1F3D32] rounded-full h-14 font-medium tracking-widest shadow-lg shadow-[#183A2C]/10">
                  立即下单
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="h-14 w-14 rounded-full border-[#DDD6C8] text-[#3E4A42] hover:text-[#183A2C] hover:bg-white">
                    <Download size={18} />
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-full border-[#DDD6C8] text-[#3E4A42] hover:text-[#183A2C] hover:bg-white">
                    <Share2 size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onReset}
                    className="h-14 px-8 rounded-full border-[#DDD6C8] text-[#3E4A42] hover:text-[#183A2C] hover:bg-white flex gap-2 items-center"
                  >
                    <RefreshCw size={16} />
                    <span className="text-sm">重新选择</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02] pointer-events-none">
            <Leaf size={600} className="text-[#183A2C]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
