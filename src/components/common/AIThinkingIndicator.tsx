import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIThinkingIndicatorProps {
  label?: string;
  className?: string;
}

export const AIThinkingIndicator: React.FC<AIThinkingIndicatorProps> = ({
  label = 'AI 자율 브리핑 엔진 분석 가동 중...',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-sky-200 dark:border-cyan-500/30 bg-sky-50 dark:bg-cyan-950/20 text-sky-700 dark:text-cyan-300 ai-scanline shadow-sm transition-colors duration-200 ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 animate-pulse" />
      <span className="tracking-tight">{label}</span>
    </div>
  );
};
