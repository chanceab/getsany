'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

// 修改 regex 来匹配 YouTube 链接
export const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/;

type MediaStream = {
  url: string;
  type: 'video' | 'audio';
  quality?: string;
  format?: string;
};

type YouTubeMediaObject = {
  title: string;
  thumbnail?: string;
  duration?: string;
  streams: MediaStream[];
};

export function AnalysisButton() {
  const t = useTranslations('Youtube');

  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mediaData, setMediaData] = useState<YouTubeMediaObject | null>(null);

  const isValidUrl = (url: string): boolean => {
    return regex.test(url);
  };

  const parseYouTubeStreams = (streams: string[]): MediaStream[] => {
    return streams.map((streamUrl, index) => {
      // 根据 URL 参数判断是视频还是音频
      const urlParams = new URLSearchParams(streamUrl.split('?')[1]);
      const mime = urlParams.get('mime') || '';

      if (mime.includes('video')) {
        return {
          url: streamUrl,
          type: 'video',
          quality: 'HD',
          format: 'mp4',
        };
      } else if (mime.includes('audio')) {
        return {
          url: streamUrl,
          type: 'audio',
          format: 'webm',
        };
      }

      // 默认处理：第一个是视频，第二个是音频
      return {
        url: streamUrl,
        type: index === 0 ? 'video' : 'audio',
        quality: index === 0 ? 'HD' : undefined,
        format: index === 0 ? 'mp4' : 'webm',
      };
    });
  };

  const handleDownload = async () => {
    setError('');

    if (!userInput.trim()) {
      setError(t('validation_error1'));
      return;
    }

    if (!isValidUrl(userInput)) {
      setError('请输入有效的 YouTube 链接');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: userInput }),
      });

      const { data } = await res.json();

      // 假设 API 返回格式为 { title: string, streams: string[] }
      // 你需要根据实际 API 返回格式调整这部分
      const parsedStreams = parseYouTubeStreams(data.streams || data);

      const mediaObject: YouTubeMediaObject = {
        title: data.title || 'YouTube Video',
        thumbnail: data.thumbnail,
        duration: data.duration,
        streams: parsedStreams,
      };

      setMediaData(mediaObject);
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
              setError('');
            }}
            type="text"
            name="videoUrl"
            placeholder="请输入 YouTube 链接..."
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

      {mediaData && (
        <div className="mt-6 space-y-4">
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {mediaData.title}
              </h3>
              {mediaData.duration && (
                <p className="text-sm text-gray-600">
                  时长:
                  {mediaData.duration}
                </p>
              )}
            </div>

            <div className="space-y-6">
              {mediaData.streams.map(stream => (
                <div key={stream.url} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {stream.type === 'video'
                        ? (
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z" />
                            </svg>
                          )
                        : (
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.414 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.414l3.969-3.814z" clipRule="evenodd" />
                              <path d="M14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
                            </svg>
                          )}
                      <span className="font-medium text-gray-700">
                        {stream.type === 'video' ? '视频流' : '音频流'}
                      </span>
                      {stream.quality && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {stream.quality}
                        </span>
                      )}
                      {stream.format && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {stream.format.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-lg bg-black">
                    {stream.type === 'video'
                      ? (
                          <video
                            controls
                            className="h-auto w-full"
                            preload="metadata"
                          >
                            <track kind="captions" label="No captions" />
                            <source src={stream.url} type={`video/${stream.format || 'mp4'}`} />
                            您的浏览器不支持视频播放
                          </video>
                        )
                      : (
                          <div className="p-8 text-center">
                            <audio
                              controls
                              className="w-full"
                              preload="metadata"
                            >
                              <track kind="captions" label="No captions" />
                              <source src={stream.url} type={`audio/${stream.format || 'webm'}`} />
                              您的浏览器不支持音频播放
                            </audio>
                            <div className="mt-4 text-sm text-gray-300">
                              🎵 音频流
                            </div>
                          </div>
                        )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
