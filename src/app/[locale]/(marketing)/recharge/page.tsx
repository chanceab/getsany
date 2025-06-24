'use client';

import { useEffect, useState } from 'react';

export default function RechargePage() {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');

  const activities = [
    {
      id: 'breathing',
      title: '深呼吸放松',
      icon: '🫁',
      description: '跟随节奏，让身心回到平静状态',
      color: 'bg-blue-50 border-blue-200',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'exercise',
      title: '轻松运动',
      icon: '🤸‍♀️',
      description: '简单的伸展运动，唤醒身体活力',
      color: 'bg-green-50 border-green-200',
      buttonColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'coffee',
      title: '咖啡时光',
      icon: '☕',
      description: '享受一杯香浓咖啡，给大脑充电',
      color: 'bg-amber-50 border-amber-200',
      buttonColor: 'bg-amber-500 hover:bg-amber-600',
    },
    {
      id: 'meditation',
      title: '冥想片刻',
      icon: '🧘‍♀️',
      description: '短暂的冥想，清空思绪重新开始',
      color: 'bg-purple-50 border-purple-200',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const exercises = [
    { name: '颈部转动', duration: '30秒', description: '缓慢转动头部，放松颈部肌肉' },
    { name: '肩膀耸动', duration: '20秒', description: '上下耸肩，缓解肩部紧张' },
    { name: '手臂伸展', duration: '30秒', description: '向上伸展双臂，拉伸侧腰' },
    { name: '腰部扭转', duration: '30秒', description: '左右扭转腰部，放松腰椎' },
  ];

  // 深呼吸定时器
  useEffect(() => {
    if (currentActivity === 'breathing') {
      const phases = [
        { phase: 'inhale', duration: 4000, text: '吸气' },
        { phase: 'hold', duration: 4000, text: '屏息' },
        { phase: 'exhale', duration: 6000, text: '呼气' },
        { phase: 'pause', duration: 2000, text: '暂停' },
      ];

      let currentPhaseIndex = 0;
      let timeoutId: NodeJS.Timeout | null = null;

      const runPhase = () => {
        const currentPhaseData = phases[currentPhaseIndex];
        if (currentPhaseData) {
          setBreathingPhase(currentPhaseData.phase as any);

          timeoutId = setTimeout(() => {
            currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
            if (currentPhaseIndex === 0) {
              setBreathingCount(prev => prev + 1);
            }
            runPhase();
          }, currentPhaseData.duration);
        }
      };

      runPhase();

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [currentActivity]);

  const renderBreathingExercise = () => (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-1000 ${breathingPhase === 'inhale'
          ? 'scale-125 bg-blue-200'
          : breathingPhase === 'hold'
            ? 'scale-125 bg-blue-300'
            : breathingPhase === 'exhale'
              ? 'scale-75 bg-blue-100'
              : 'scale-100 bg-blue-50'
        } flex items-center justify-center`}
        >
          <span className="text-4xl">🫁</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-800">
          {breathingPhase === 'inhale' && '深深吸气...'}
          {breathingPhase === 'hold' && '保持住...'}
          {breathingPhase === 'exhale' && '慢慢呼气...'}
          {breathingPhase === 'pause' && '放松...'}
        </h3>
        <p className="text-gray-600">
          已完成
          {breathingCount}
          {' '}
          个呼吸循环
        </p>
      </div>
    </div>
  );

  const renderExerciseGuide = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
        简单伸展运动 🤸‍♀️
      </h3>
      <div className="grid gap-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800">{exercise.name}</h4>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {exercise.duration}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCoffeeTime = () => (
    <div className="text-center space-y-6">
      <div className="text-8xl">☕</div>
      <h3 className="text-2xl font-semibold text-gray-800">咖啡时光</h3>
      <div className="space-y-4 text-left max-w-md mx-auto">
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">☕ 冲一杯好咖啡</h4>
          <p className="text-gray-600 text-sm">选择你喜欢的咖啡，慢慢冲泡</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">🌅 找个舒适角落</h4>
          <p className="text-gray-600 text-sm">远离工作区域，换个环境</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <h4 className="font-medium text-amber-800 mb-2">📱 暂时放下手机</h4>
          <p className="text-gray-600 text-sm">专注于这个美好的咖啡时刻</p>
        </div>
      </div>
    </div>
  );

  const renderMeditation = () => (
    <div className="text-center space-y-6">
      <div className="text-8xl">🧘‍♀️</div>
      <h3 className="text-2xl font-semibold text-gray-800">冥想指引</h3>
      <div className="max-w-md mx-auto text-left space-y-3">
        <p className="text-gray-600">1. 舒适地坐下，背部挺直</p>
        <p className="text-gray-600">2. 轻轻闭上眼睛</p>
        <p className="text-gray-600">3. 专注于自然的呼吸</p>
        <p className="text-gray-600">4. 当思绪飘散时，温和地拉回注意力</p>
        <p className="text-gray-600">5. 从5分钟开始，逐渐延长时间</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌟 恢复活力站 🌟
          </h1>
          <p className="text-xl text-gray-600">
            工作累了？让我们一起恢复满满的能量！
          </p>
        </div>

        {/* 活动选择 */}
        {!currentActivity && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {activities.map(activity => (
              <div
                key={activity.id}
                className={`p-6 rounded-xl border-2 ${activity.color} hover:shadow-lg transition-all cursor-pointer`}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentActivity(activity.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentActivity(activity.id);
                  }
                }}
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl">{activity.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${activity.buttonColor}`}
                  >
                    开始体验
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 活动内容 */}
        {currentActivity && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              {currentActivity === 'breathing' && renderBreathingExercise()}
              {currentActivity === 'exercise' && renderExerciseGuide()}
              {currentActivity === 'coffee' && renderCoffeeTime()}
              {currentActivity === 'meditation' && renderMeditation()}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentActivity(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                返回选择
              </button>
            </div>
          </div>
        )}

        {/* 底部提示 */}
        <div className="text-center mt-12 text-gray-500">
          <p>💡 记住：短暂的休息是为了更好的工作状态</p>
        </div>
      </div>
    </div>
  );
}
