import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      url: 'https://getsany.com',
      siteName: 'GetsAny',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter_title'),
      description: t('twitter_description'),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://getsany.com',
    },
  };
}

const FeatureCard = ({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const StepCard = ({ step, title, description }: {
  step: number;
  title: string;
  description: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
      {step}
    </div>
    <div>
      <h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const HomePage = async (props: IIndexProps) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  const features = [
    {
      icon: '🎥',
      title: t('feature_x_title'),
      description: t('feature_x_description'),
    },
    {
      icon: '📺',
      title: t('feature_youtube_title'),
      description: t('feature_youtube_description'),
    },
    {
      icon: '🎵',
      title: t('feature_audio_title'),
      description: t('feature_audio_description'),
    },
    {
      icon: '🖼️',
      title: t('feature_image_title'),
      description: t('feature_image_description'),
    },
    {
      icon: '⚡',
      title: t('feature_speed_title'),
      description: t('feature_speed_description'),
    },
    {
      icon: '🔒',
      title: t('feature_security_title'),
      description: t('feature_security_description'),
    },
  ];

  const steps = [
    {
      title: t('step1_title'),
      description: t('step1_description'),
    },
    {
      title: t('step2_title'),
      description: t('step2_description'),
    },
    {
      title: t('step3_title'),
      description: t('step3_description'),
    },
    {
      title: t('step4_title'),
      description: t('step4_description'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 英雄区域 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {t('hero_title')}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-indigo-100">
            {t('hero_subtitle')}
            <br />
            {t('hero_features')}
          </p>

          {/* 快捷导航按钮 */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:space-x-4">
            <Link
              href="/x"
              className="group flex w-full min-w-0 items-center justify-center space-x-2 rounded-full bg-white px-6 py-4 font-medium text-indigo-600 transition-all hover:scale-105 hover:shadow-lg sm:w-auto sm:px-8"
            >
              <span className="text-lg sm:text-base">📱</span>
              <span className="whitespace-nowrap text-sm sm:text-base">{t('button_x_download')}</span>
            </Link>
            <Link
              href="/youtube"
              className="group flex w-full min-w-0 items-center justify-center space-x-2 rounded-full border-2 border-white bg-transparent px-6 py-4 font-medium text-white transition-all hover:scale-105 hover:bg-white hover:text-indigo-600 sm:w-auto sm:px-8"
            >
              <span className="text-lg sm:text-base">📺</span>
              <span className="whitespace-nowrap text-sm sm:text-base">{t('button_youtube_download')}</span>
            </Link>
          </div>

          {/* 使用说明卡片 */}
          <div className="mx-auto max-w-4xl rounded-2xl bg-white/10 p-6 text-left backdrop-blur-sm">
            <h3 className="mb-4 text-center text-2xl font-bold">{t('usage_guide_title')}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-white font-bold text-indigo-600">
                    {index + 1}
                  </div>
                  <h4 className="mb-1 font-semibold">{step.title}</h4>
                  <p className="text-sm text-indigo-100">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 特性介绍 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {t('features_title')}
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              {t('features_description')}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* 详细使用说明 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                {t('detailed_steps_title')}
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                {t('detailed_steps_description')}
              </p>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <StepCard
                    key={index}
                    step={index + 1}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
              <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
                {t('supported_platforms_title')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-2 text-2xl">📱</div>
                  <div className="font-semibold">X (Twitter)</div>
                  <div className="text-sm text-gray-600">{t('platform_x_features')}</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                  <div className="mb-2 text-2xl">📺</div>
                  <div className="font-semibold">YouTube</div>
                  <div className="text-sm text-gray-600">{t('platform_youtube_features')}</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center opacity-75 shadow-sm">
                  <div className="mb-2 text-2xl">📱</div>
                  <div className="font-semibold">Instagram</div>
                  <div className="text-sm text-gray-600">{t('platform_coming_soon')}</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center opacity-75 shadow-sm">
                  <div className="mb-2 text-2xl">🎵</div>
                  <div className="font-semibold">TikTok</div>
                  <div className="text-sm text-gray-600">{t('platform_coming_soon')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ 部分 */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            {t('faq_title')}
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">{t('faq1_question')}</h3>
              <p className="text-gray-600">{t('faq1_answer')}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">{t('faq2_question')}</h3>
              <p className="text-gray-600">{t('faq2_answer')}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">{t('faq3_question')}</h3>
              <p className="text-gray-600">{t('faq3_answer')}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">{t('faq4_question')}</h3>
              <p className="text-gray-600">{t('faq4_answer')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mb-4 text-2xl font-bold text-indigo-400">GetsAny</div>
            <p className="mb-6 text-gray-400">{t('footer_description')}</p>
            <div className="flex justify-center space-x-6">
              <Link href="/x" className="text-gray-400 transition-colors hover:text-white">
                {t('footer_x_link')}
              </Link>
              <Link href="/youtube" className="text-gray-400 transition-colors hover:text-white">
                {t('footer_youtube_link')}
              </Link>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-sm text-gray-500">
              {t('footer_copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
