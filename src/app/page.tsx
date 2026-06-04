import React, { useState, useRef } from 'react';
'use client';

import { Header } from '@/components/sanitea/Header';
import { Hero } from '@/components/sanitea/Hero';
import { QuizFlow } from '@/components/sanitea/QuizFlow';
import { ResultView } from '@/components/sanitea/ResultView';
import { Philosophy } from '@/components/sanitea/Philosophy';
import { Footer } from '@/components/sanitea/Footer';
import type { TeaRecommendation } from '@/lib/tea-logic';

export default function Home() {
  const [quizResult, setQuizResult] = useState<TeaRecommendation | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const quizRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuizComplete = (result: TeaRecommendation, answers: Record<string, string>) => {
    setQuizResult(result);
    setQuizAnswers(answers);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setQuizResult(null);
    setQuizAnswers({});
    scrollToQuiz();
  };

  return (
    <main className="min-h-screen selection:bg-brand-gold selection:text-white">
      <Header />
      
      {!quizResult ? (
        <>
          <Hero onStartQuiz={scrollToQuiz} />
          <div ref={quizRef}>
            <QuizFlow onComplete={handleQuizComplete} />
          </div>
          <Philosophy />
        </>
      ) : (
        <div className="pt-20">
          <ResultView 
            result={quizResult} 
            answers={quizAnswers}
            onReset={handleReset} 
          />
        </div>
      )}

      <Footer />
    </main>
  );
}
