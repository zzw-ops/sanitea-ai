import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Loader2, Leaf } from 'lucide-react';
import { recommendTea, type AIRecipeRecommendationOutput } from '@/ai/flows/ai-recipe-recommendation-flow';

const STEPS = [
  {
    id: 'currentState',
    question: '你现在的状态？',
    description: '告诉山宁你此刻的身心感受',
    options: ['熬夜疲惫', '午后犯困', '饭后油腻', '想喝清爽', '想喝温润', '想要放松']
  },
  {
    id: 'tastePreference',
    question: '你偏好的口感？',
    description: '茶汤滑过舌尖时的期待',
    options: ['花香清爽', '果香微甜', '草本回甘', '温润甘甜', '清苦解腻', '低甜自然']
  },
  {
    id: 'drinkingScenario',
    question: '今天的饮用场景？',
    description: '不同的时刻需要不同的陪伴',
    options: ['上课 / 办公', '饭后', '逛街', '晚间放松', '朋友聚会', '独处阅读']
  },
  {
    id: 'temperaturePreference',
    question: '你想喝冷饮还是热饮？',
    description: '对温度的执着选择',
    options: ['冰饮', '少冰', '常温', '热饮']
  },
  {
    id: 'currentSeason',
    question: '当前季节或天气？',
    description: '顺应四时而饮',
    options: ['春日微风', '夏日炎热', '秋日干燥', '冬日寒冷', '阴雨潮湿', '不确定，让 AI 判断']
  },
  {
    id: 'avoidTaste',
    question: '是否有需要避开的口味？',
    description: '属于你个人的风味禁忌',
    options: ['不要太苦', '不要太甜', '不要姜味', '不要花香太重', '不要浓草本味', '无特别忌口']
  }
];

interface QuizFlowProps {
  onComplete: (result: AIRecipeRecommendationOutput, answers: Record<string, string>) => void;
}

export function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [STEPS[currentStep].id]: option }));
  };

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await recommendTea({
        currentState: answers.currentState || '',
        tastePreference: answers.tastePreference || '',
        drinkingScenario: answers.drinkingScenario || '',
        temperaturePreference: answers.temperaturePreference || '',
        currentSeason: answers.currentSeason || '',
        avoidTaste: answers.avoidTaste || '',
      });
      onComplete(result, answers);
    } catch (error) {
      console.error('Failed to get recommendation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = STEPS[currentStep];
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <section id="quiz" className="py-24 bg-background min-h-[700px] flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl mb-4 text-primary">AI 选茶小问答</h2>
          <p className="text-primary/60 font-body tracking-[0.3em] uppercase text-[10px] font-medium">
            用 30 秒告诉山宁你现在的状态
          </p>
        </div>

        <div className="bg-card p-10 md:p-16 rounded-[48px] border border-border shadow-sm relative overflow-hidden">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4 text-[10px] tracking-widest text-primary/60 uppercase font-medium">
              <span>{String(currentStep + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')} 状态感知中</span>
              <span className="text-accent font-semibold">{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-1 bg-border [&>div]:bg-primary" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="min-h-[300px]"
            >
              <div className="mb-10">
                <h3 className="text-3xl font-headline mb-3 text-primary">{currentStepData.question}</h3>
                <p className="text-muted-foreground text-sm font-body font-light">{currentStepData.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentStepData.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`
                      py-4 px-6 rounded-2xl text-sm font-body tracking-widest transition-all border text-center
                      ${answers[currentStepData.id] === option 
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg' 
                        : 'border-border bg-white/40 text-primary/80 hover:border-primary/30 hover:bg-white'}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0 || isSubmitting}
              className="text-primary/60 hover:text-primary disabled:opacity-30 flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              <span>上一步</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!answers[currentStepData.id] || isSubmitting}
              className={`
                px-12 rounded-full h-14 flex items-center gap-2 font-medium tracking-widest shadow-xl transition-all
                ${currentStep === STEPS.length - 1 
                  ? 'bg-accent text-accent-foreground hover:opacity-90 shadow-accent/20' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/10'}
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>生成茶方中...</span>
                </>
              ) : currentStep === STEPS.length - 1 ? (
                <>
                  <span>生成茶方</span>
                  <ChevronRight size={18} />
                </>
              ) : (
                <>
                  <span>下一步</span>
                  <ChevronRight size={18} />
                </>
              )}
            </Button>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.03] pointer-events-none">
            <Leaf size={160} className="text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
