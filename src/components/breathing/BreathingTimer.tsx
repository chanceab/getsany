'use client';

import { useCallback, useEffect, useState } from 'react';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

type BreathingPattern = {
  id: number;
  name: string;
  icon: string;
  phases: Array<{
    phase: string;
    duration: number;
    instruction: string;
  }>;
};

type BreathingTimerProps = {
  pattern: BreathingPattern;
  onStop: () => void;
  onPatternChange: (patternId: number) => void;
  patterns: BreathingPattern[];
};

export default function BreathingTimer({ pattern, onStop, onPatternChange, patterns }: BreathingTimerProps) {
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const resetTimer = useCallback(() => {
    // 将状态更新逻辑封装在这里
    setCurrentPhase('inhale');
    setPhaseProgress(0);
    setCycleCount(0);
    setTotalTime(0);
  }, []);

  // 使用 useEffect 监听 pattern 的变化
  useEffect(() => {
    const handleReset = () => {
      resetTimer(); // 调用封装的重置函数
    };
    handleReset(); // 调用重置函数
  }, [pattern, resetTimer]);

  useEffect(() => {
    let phaseIndex = 0;
    const startTime = Date.now();
    let phaseStartTime = Date.now();

    const updateProgress = () => {
      const now = Date.now();
      const currentPhaseObj = pattern.phases[phaseIndex];
      if (!currentPhaseObj) {
        return;
      }
      const currentPhaseDuration = currentPhaseObj.duration;
      const elapsed = now - phaseStartTime;
      const progress = Math.min(elapsed / currentPhaseDuration, 1);

      if (pattern.phases[phaseIndex]?.phase) {
        setCurrentPhase((pattern.phases[phaseIndex]?.phase as BreathingPhase) ?? 'inhale');
      }
      setPhaseProgress(progress);
      setTotalTime(Math.floor((now - startTime) / 1000));

      if (progress >= 1) {
        phaseIndex = (phaseIndex + 1) % pattern.phases.length;
        if (phaseIndex === 0) {
          setCycleCount(prev => prev + 1);
        }
        phaseStartTime = now;
      }
    };

    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [pattern]);

  const getCircleStyle = () => {
    const baseScale = 1;
    const maxScale = 1.4;
    const minScale = 0.7;

    switch (currentPhase) {
      case 'inhale':
        return {
          transform: `scale(${baseScale + (maxScale - baseScale) * phaseProgress})`,
          background: `radial-gradient(circle, rgba(59, 130, 246, ${0.3 + 0.4 * phaseProgress}) 0%, rgba(147, 197, 253, ${0.1 + 0.2 * phaseProgress}) 100%)`,
        };
      case 'hold':
        return {
          transform: `scale(${maxScale})`,
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.7) 0%, rgba(134, 239, 172, 0.3) 100%)`,
        };
      case 'exhale':
        return {
          transform: `scale(${maxScale - (maxScale - minScale) * phaseProgress})`,
          background: `radial-gradient(circle, rgba(168, 85, 247, ${0.7 - 0.4 * phaseProgress}) 0%, rgba(196, 181, 253, ${0.3 - 0.2 * phaseProgress}) 100%)`,
        };
      case 'pause':
        return {
          transform: `scale(${minScale})`,
          background: `radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, rgba(209, 213, 219, 0.1) 100%)`,
        };
    }
  };

  const getCurrentInstruction = () => {
    const currentPhaseData = pattern.phases.find(p => p.phase === currentPhase);
    return currentPhaseData?.instruction || '';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextPattern = () => {
    const currentIndex = patterns.findIndex(p => p.id === pattern.id);
    const nextIndex = (currentIndex + 1) % patterns.length;
    if (patterns[nextIndex]) {
      onPatternChange(patterns[nextIndex].id);
    }
  };

  return (
    <div className="text-center space-y-8">
      {/* 主呼吸圆形 */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out"
          style={getCircleStyle()}
        >
          <span className="text-5xl">{pattern.icon}</span>
        </div>

        {/* 进度环 */}
        <svg className="absolute w-56 h-56 -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="100"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="112"
            cy="112"
            r="100"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 100}`}
            strokeDashoffset={`${2 * Math.PI * 100 * (1 - phaseProgress)}`}
            className="text-blue-500 transition-all duration-200"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 当前指令 */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-800">
          {getCurrentInstruction()}
        </h3>

        {/* 统计信息 */}
        <div className="flex justify-center gap-8 text-center">
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-blue-600">{cycleCount}</div>
            <div className="text-sm text-gray-600">完成循环</div>
          </div>
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-green-600">{formatTime(totalTime)}</div>
            <div className="text-sm text-gray-600">练习时间</div>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={onStop}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          结束练习
        </button>
        <button
          type="button"
          onClick={handleNextPattern}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          切换模式
        </button>
      </div>
    </div>
  );
}
