'use client';

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

const stats = [
  { icon: TrendingUp, label: 'Performance Score', value: 100, suffix: '/100' },
  { icon: Users, label: 'Active Users', value: 10000, suffix: '+' },
  { icon: Zap, label: 'Load Time', value: 0.8, suffix: 's' },
  { icon: Award, label: 'Accessibility', value: 98, suffix: '%' }
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const stepValue = stat.value / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(stepValue * currentStep, stat.value);
          
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = currentValue;
            return newValues;
          });

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      });
    }
  }, [isVisible]);

  const formatValue = (value: number, index: number) => {
    if (index === 1) return Math.floor(value).toLocaleString();
    if (index === 2) return value.toFixed(1);
    return Math.floor(value);
  };

  return (
    <section ref={sectionRef} id="stats" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Impressive Numbers
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            See the measurable impact of modern Next.js development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center transform transition-all duration-500 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {formatValue(animatedValues[index], index)}
                  <span className="text-2xl text-blue-600">{stat.suffix}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Performance Metrics */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                First Contentful Paint
              </div>
              <div className="text-2xl text-blue-600 font-semibold">0.9s</div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Lightning fast initial render</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Largest Contentful Paint
              </div>
              <div className="text-2xl text-purple-600 font-semibold">1.2s</div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Excellent Core Web Vitals</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Cumulative Layout Shift
              </div>
              <div className="text-2xl text-green-600 font-semibold">0.01</div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Minimal layout shifts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}