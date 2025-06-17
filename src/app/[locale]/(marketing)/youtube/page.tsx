import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { Faq } from '@/components/Faq';
import { AnalysisButton } from '@/components/youtube/AnalysisButton';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Youtube',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function YoutubePage() {
  const t = useTranslations('Youtube');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 介绍 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="mb-6">
            <span className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              {t('badge_text')}
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-indigo-100">
            {t('description')}
          </p>

          {/* 下载组件区域 */}
          <div className="mx-auto max-w-4xl">
            <AnalysisButton />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4">

          {/* 欢迎信息 */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {t('welcome_title')}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {t('welcome')}
            </p>
          </div>

          {/* 支持的平台 */}
          <section className="mb-20">
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              {t('supported')}
            </h3>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="group text-center">
                  <div className="rounded-xl bg-gray-50 p-6 transition-colors group-hover:bg-indigo-50">
                    <Image
                      src="/assets/images/windows.svg"
                      alt={t('platform_windows')}
                      width={80}
                      height={80}
                      className="mx-auto mb-2"
                    />
                    <div className="font-medium text-gray-700">{t('platform_windows')}</div>
                  </div>
                </div>
                <div className="group text-center">
                  <div className="rounded-xl bg-gray-50 p-6 transition-colors group-hover:bg-indigo-50">
                    <Image
                      src="/assets/images/apple.svg"
                      alt={t('platform_macos')}
                      width={80}
                      height={80}
                      className="mx-auto mb-2"
                    />
                    <div className="font-medium text-gray-700">{t('platform_macos')}</div>
                  </div>
                </div>
                <div className="group text-center">
                  <div className="rounded-xl bg-gray-50 p-6 transition-colors group-hover:bg-indigo-50">
                    <Image
                      src="/assets/images/android.svg"
                      alt={t('platform_android')}
                      width={80}
                      height={80}
                      className="mx-auto mb-2"
                    />
                    <div className="font-medium text-gray-700">{t('platform_android')}</div>
                  </div>
                </div>
                <div className="group text-center">
                  <div className="rounded-xl bg-gray-50 p-6 transition-colors group-hover:bg-indigo-50">
                    <Image
                      src="/assets/images/linux.svg"
                      alt={t('platform_linux')}
                      width={80}
                      height={80}
                      className="mx-auto mb-2"
                    />
                    <div className="font-medium text-gray-700">{t('platform_linux')}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 功能特点 */}
          <section className="mb-20">
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              {t('features_title')}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-3xl">🎥</div>
                <h4 className="mb-2 font-semibold text-gray-900">{t('feature_video_title')}</h4>
                <p className="text-sm text-gray-600">{t('welcome3')}</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-3xl">🎵</div>
                <h4 className="mb-2 font-semibold text-gray-900">{t('feature_audio_title')}</h4>
                <p className="text-sm text-gray-600">{t('welcome5')}</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-3xl">⚡</div>
                <h4 className="mb-2 font-semibold text-gray-900">{t('feature_speed_title')}</h4>
                <p className="text-sm text-gray-600">{t('welcome6')}</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-3xl">🔒</div>
                <h4 className="mb-2 font-semibold text-gray-900">{t('feature_security_title')}</h4>
                <p className="text-sm text-gray-600">{t('feature_security_desc')}</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 text-3xl">💯</div>
                <h4 className="mb-2 font-semibold text-gray-900">{t('feature_free_title')}</h4>
                <p className="text-sm text-gray-600">{t('feature_free_desc')}</p>
              </div>
            </div>
          </section>

          {/* 使用步骤 */}
          <section className="mb-20">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
              <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
                {t('steps_title')}
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                    1
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-900">{t('step1_title')}</h4>
                  <p className="text-sm text-gray-600">{t('step1_desc')}</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                    2
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-900">{t('step2_title')}</h4>
                  <p className="text-sm text-gray-600">{t('step2_desc')}</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                    3
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-900">{t('step3_title')}</h4>
                  <p className="text-sm text-gray-600">{t('step3_desc')}</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                    4
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-900">{t('step4_title')}</h4>
                  <p className="text-sm text-gray-600">{t('step4_desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ 部分 */}
          <section>
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
              {t('faq_title')}
            </h3>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <Faq namespace="Youtube" />
            </div>
          </section>

        </div>
      </div>

      {/* 返回首页链接 */}
      <div className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {t('back_home')}
          </Link>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mb-4 text-2xl font-bold text-indigo-400">{t('brand_name')}</div>
            <p className="mb-6 text-gray-400">{t('brand_desc')}</p>
            <div className="flex justify-center space-x-6">
              <Link href="/" className="text-gray-400 transition-colors hover:text-white">
                {t('nav_home')}
              </Link>
              <Link href="/x" className="text-gray-400 transition-colors hover:text-white">
                {t('nav_x_download')}
              </Link>
              <Link href="/youtube" className="text-gray-400 transition-colors hover:text-white">
                {t('nav_youtube_download')}
              </Link>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-sm text-gray-500">
              {t('copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
