// 服务端渲染的主组件

import BreathingAnimation from '@/components/breathing/BreathingAnimation';

const breathingPatterns = [
  {
    id: 0,
    name: '4-7-8呼吸法',
    description: '放松神经系统，快速减压',
    icon: '🌙',
    color: 'blue',
    phases: [
      { phase: 'inhale', duration: 4000, instruction: '吸气 4 秒' },
      { phase: 'hold', duration: 7000, instruction: '屏息 7 秒' },
      { phase: 'exhale', duration: 8000, instruction: '呼气 8 秒' },
    ],
  },
  {
    id: 1,
    name: '等长呼吸',
    description: '平衡身心，适合初学者',
    icon: '⚖️',
    color: 'green',
    phases: [
      { phase: 'inhale', duration: 4000, instruction: '慢慢吸气' },
      { phase: 'hold', duration: 4000, instruction: '保持住' },
      { phase: 'exhale', duration: 4000, instruction: '慢慢呼气' },
      { phase: 'pause', duration: 4000, instruction: '自然暂停' },
    ],
  },
  {
    id: 2,
    name: '三角呼吸',
    description: '提高专注力，适合工作间隙',
    icon: '🔺',
    color: 'purple',
    phases: [
      { phase: 'inhale', duration: 4000, instruction: '深深吸气' },
      { phase: 'hold', duration: 4000, instruction: '保持 4 秒' },
      { phase: 'exhale', duration: 4000, instruction: '完全呼出' },
    ],
  },
];

export default function BreathingExercise() {
  return (
    <section id="breathing" className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-50 -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100 to-transparent rounded-full opacity-50 translate-y-10 -translate-x-10"></div>

        <div className="relative z-10">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              🫁 深呼吸放松
            </h2>
            <p className="text-gray-600 text-lg">
              通过科学的呼吸节奏，快速缓解压力，恢复内心平静
            </p>
          </div>

          <BreathingAnimation patterns={breathingPatterns as any} />

          {/* 使用说明（静态内容） */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>💡</span>
              使用建议
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>• 找一个安静舒适的环境</div>
              <div>• 保持自然舒适的坐姿</div>
              <div>• 专注于呼吸的感觉</div>
              <div>• 初学者建议练习5-10分钟</div>
            </div>
          </div>

          {/* 科学依据（静态内容） */}
          <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span>🔬</span>
              科学原理
            </h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              深度呼吸可以激活副交感神经系统，降低皮质醇水平，减缓心率，
              从而快速缓解压力和焦虑。研究表明，规律的深呼吸练习能够显著改善情绪状态和专注力。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
