'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const regex = /^(?:https?:\/\/)?(?:www\.)?(?:x\.com|twitter\.com)\/\w+\/status\/\d+$/;

type Stream = {
  container: string;
  size: number;
  src: string[];
  video_profile: string;
};

type MediaObject = {
  url: string | null;
  title: string;
  site: string;
  streams: {
    __default__: Stream;
  };
};

export function AnalysisButton() {
  const t = useTranslations('X');

  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mediaArray, setMediaArray] = useState<MediaObject[]>([]);

  const isValidUrl = (url: string): boolean => {
    return regex.test(url);
  };
  const isImage = (media: MediaObject): boolean => {
    return ['jpg', 'jpeg', 'png', 'gif'].includes(media.streams.__default__.container.split('.').pop() || '');
  };

  const isVideo = (media: MediaObject): boolean => {
    return ['mp4', 'webm', 'mkv'].includes(media.streams.__default__.container.split('.').pop() || '');
  };

  const getMediaType = (media: MediaObject): string => {
    if (isImage(media)) {
      return 'image';
    }
    if (isVideo(media)) {
      return 'video';
    }
    return 'other';
  };

  const parseData = (input: string): MediaObject[] => {
    const sanitizedInput = input
      .replaceAll(/Infinity/g, 'null') // 替换 Infinity
      .replaceAll(/NaN/g, 'null') // 替换 NaN
      .replaceAll(/undefined/g, 'null'); // 替换 undefined

    // 使用正则表达式分割字符串为单独的 JSON 对象
    const jsonObjects = sanitizedInput.trim().split(/\n(?=\{)/);
    const result: MediaObject[] = [];

    for (const jsonObject of jsonObjects) {
      try {
        const parsedObject = JSON.parse(jsonObject);
        result.push(parsedObject);
      } catch (error) {
        console.error('JSON 解析错误:', error);
      }
    }

    return result;
  };

  const handleDownload = async () => {
    setError('');

    if (!userInput.trim()) {
      setError(t('validation_error1'));
      return;
    }

    if (!isValidUrl(userInput)) {
      setError(t('validation_error2'));
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: userInput }),
      });

      const { data } = await res.json();

      const parsedMediaArray = parseData(data);
      setMediaArray(parsedMediaArray);
    } catch (err) {
      console.error('下载错误:', err);
      setError('下载失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white/10 p-2 backdrop-blur-md sm:flex-row sm:p-3">
        <div className="flex-1">
          <input
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setError(''); // 用户输入时清除错误
            }}
            type="text"
            name="videoUrl"
            placeholder={t('download_button_tip')}
            className={`size-full rounded-lg px-4 py-3 text-sm text-gray-800
              outline-none transition-colors duration-200
              placeholder:text-gray-500 focus:ring-2 
              focus:ring-indigo-500
              ${error ? 'border border-red-300 bg-red-50' : 'bg-white/90'}
              sm:text-base`}
          />
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={isLoading}
          className="mt-2 rounded-lg bg-[#E21E3C] px-6 py-3 font-semibold text-white transition hover:bg-[#c91834]
            disabled:opacity-50 sm:mt-0"
        >
          {isLoading ? t('analyzing') : t('analysis')}
        </button>
      </div>

      {error && (
        <div className="mt-2 text-left text-sm text-red-500 sm:absolute">
          <span className="flex items-center gap-1">
            <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </span>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {mediaArray.map(media => (
          <div key={media.title} className="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow">
            <div className="mb-3 flex items-center justify-between">
              <span className="max-w-[70%] truncate text-sm text-gray-700" title={media.title}>
                {media.title}
              </span>
              <a
                href={media.streams.__default__.src[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                download
              >
                {t('download')}
              </a>
            </div>

            <div className="relative overflow-hidden rounded-lg">
              {
                getMediaType(media) === 'video' && (
                  <video
                    controls
                    className="h-auto w-full"
                    preload="metadata"
                  >
                    <track kind="captions" label="No captions" />
                    <source src={media.streams.__default__.src[0]} type="video/mp4" />
                  </video>
                )
              }
              {
                getMediaType(media) === 'image' && media.streams.__default__.src[0] && (
                  <Image
                    src={media.streams.__default__.src[0]}
                    alt={media.title}
                    className="h-auto w-full object-cover transition hover:opacity-90"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                )
              }

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
