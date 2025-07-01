import Link from 'next/link';

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
  {
    id: 'music',
    title: '音乐疗愈',
    icon: '🎵',
    description: '聆听舒缓音乐，让大脑切换到放松模式',
    color: 'bg-pink-50 border-pink-200',
    buttonColor: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    id: 'nature',
    title: '自然观察',
    icon: '🌿',
    description: '观察窗外绿植或天空，让眼睛和心灵放松',
    color: 'bg-emerald-50 border-emerald-200',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    id: 'snack',
    title: '健康零食',
    icon: '🍎',
    description: '来点坚果或水果，给大脑补充营养',
    color: 'bg-orange-50 border-orange-200',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
  },

  {
    id: 'fresh-air',
    title: '新鲜空气',
    icon: '🌬️',
    description: '到阳台或窗边呼吸新鲜空气',
    color: 'bg-teal-50 border-teal-200',
    buttonColor: 'bg-teal-500 hover:bg-teal-600',
  },
  {
    id: 'eye-rest',
    title: '眼部放松',
    icon: '👁️',
    description: '缓解眼疲劳，保护视力健康',
    color: 'bg-violet-50 border-violet-200',
    buttonColor: 'bg-violet-500 hover:bg-violet-600',
  },
];

export default function RechargePage() {
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

        {/* 活动卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activities.map(activity => (
            <div
              key={activity.id}
              className={`group relative overflow-hidden rounded-2xl border-2 ${activity.color} hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer hover:-translate-y-1`}
            >
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 translate-x-8 -translate-y-8">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
              </div>

              <div className="relative p-6 space-y-4">
                {/* 图标区域 */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{activity.icon}</span>
                  </div>
                </div>

                {/* 标题 */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* 按钮 */}
                <div className="pt-2">
                  <Link
                    href={`/recharge/${activity.id}`}
                    className="text-2xl font-bold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    <button
                      type="button"
                      className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${activity.buttonColor} hover:shadow-lg hover:shadow-black/20 active:scale-95`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        开始体验
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </Link>

                </div>

                {/* 悬浮时的光晕效果 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-16 space-y-8">
          {/* 放松的好处 */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                为什么要给自己一些放松时间？
              </h2>
              <p className="text-gray-600 text-lg">
                科学研究证明，适当的放松对身心健康有着重要意义
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🧠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">提升专注力</h3>
                <p className="text-gray-600">短暂的休息能让大脑重新整理信息，提高工作效率和创造力</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">❤️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">减轻压力</h3>
                <p className="text-gray-600">放松能降低皮质醇水平，缓解焦虑和紧张情绪</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">💪</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">增强免疫力</h3>
                <p className="text-gray-600">适当休息有助于身体恢复，增强抵抗力和整体健康</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">😊</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">改善情绪</h3>
                <p className="text-gray-600">放松活动能促进内啡肽分泌，让你感到更加快乐和满足</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">提高决策力</h3>
                <p className="text-gray-600">清醒的头脑能做出更好的判断，避免疲劳导致的错误决策</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">🌙</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">改善睡眠</h3>
                <p className="text-gray-600">白天的适当放松有助于晚上更好地进入深度睡眠</p>
              </div>
            </div>
          </div>

          {/* 心灵鸡汤区域 */}
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">💝</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                写给每一个努力生活的你
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "你已经很努力了，记得好好照顾自己。工作是生活的一部分，但不是全部。你的健康和快乐，比任何工作都重要。"
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "每个认真生活的人，都应该被温柔以待。给自己一些时间，你比想象中更需要这份关爱。"
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "生活不只有工作和忙碌，还有阳光、咖啡香、深呼吸，还有此刻正在关爱自己的你。"
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "疲惫不是你的错，是生活太匆忙。每一次的自我关爱，都是对生活最好的投资。"
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "你可以暂停，可以放慢脚步，可以给自己一个拥抱。这不是懒惰，这是智慧。"
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    "世界很大，烦恼很多，但此刻的你值得拥有这份宁静。愿你在忙碌中找到属于自己的小确幸。"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 温暖提示 */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl px-8 py-6 shadow-lg">
              <div className="text-3xl">🌟</div>
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800">
                  身心健康比什么都重要
                </p>
                <p className="text-gray-600">
                  你值得拥有这些美好的放松时光
                </p>
              </div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="bg-white rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              你知道吗？
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">76%</div>
                <p className="text-gray-600">的员工表示适当休息后工作效率更高</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5分钟</div>
                <p className="text-gray-600">的深呼吸就能显著降低压力水平</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                <p className="text-gray-600">的人认为工作间隙的放松很有必要</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
