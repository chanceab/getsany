'use client';

import { useState } from 'react';
import { BreathingPatternSelector } from './BreathingPatternSelector';
import BreathingTimer from './BreathingTimer';

type BreathingPattern = {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  phases: Array<{
    phase: string; // BreathingPhase
    duration: number;
    instruction: string;
  }>;
};

type BreathingAnimationProps = {
  patterns: BreathingPattern[];
};

export default function BreathingAnimation({ patterns }: BreathingAnimationProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedPatternId, setSelectedPatternId] = useState(0);

  const selectedPattern = patterns.find(p => p.id === selectedPatternId) || patterns[0];

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handlePatternChange = (patternId: number) => {
    setSelectedPatternId(patternId);
    if (isActive) {
      setIsActive(false); // 重置当前练习
    }
  };

  if (!isActive) {
    return (
      <>
        <BreathingPatternSelector
          patterns={patterns}
          selectedId={selectedPatternId}
          onSelect={handlePatternChange}
        />

        <div className="text-center space-y-4">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-lg">
            <span className="text-6xl">{selectedPattern?.icon ?? ''}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedPattern?.name ?? ''}
            </h3>
            <p className="text-gray-600">
              {selectedPattern?.description ?? ''}
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            开始练习
          </button>
        </div>
      </>
    );
  }

  return (
    <BreathingTimer
      pattern={selectedPattern!}
      onStop={handleStop}
      onPatternChange={handlePatternChange}
      patterns={patterns}
    />
  );
}
