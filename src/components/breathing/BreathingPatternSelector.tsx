'use client';

type BreathingPattern = {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
};

type BreathingPatternSelectorProps = {
  patterns: BreathingPattern[];
  selectedId: number;
  onSelect: (id: number) => void;
};

export function BreathingPatternSelector({ patterns, selectedId, onSelect }: BreathingPatternSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        选择呼吸模式
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {patterns.map(pattern => (
          <button
            type="button"
            key={pattern.id}
            onClick={() => onSelect(pattern.id)}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${selectedId === pattern.id
              ? 'border-blue-300 bg-blue-50 shadow-lg'
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-25'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{pattern.icon}</span>
              <h4 className="font-semibold text-gray-800">
                {pattern.name}
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              {pattern.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
