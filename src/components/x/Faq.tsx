'use client';

import type translations from '@/locales/en.json';
import { useTranslations } from 'next-intl';

import { useState } from 'react';

// 动态提取 translations 的键作为命名空间类型
type Namespace = keyof typeof translations;

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  namespace?: Namespace | 'X';
};

const FaqItemCom = (props: { item: FaqItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <span className="pr-4 font-semibold text-gray-900">{props.item.question}</span>
        <svg
          className={`size-5 shrink-0 text-indigo-600 transition-transform duration-200 ${open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-2">
          <div className="whitespace-pre-line leading-relaxed text-gray-600">
            {props.item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Faq = ({ namespace = 'X' }: FaqProps) => {
  const t = useTranslations(namespace);

  const faqData: FaqItem[] = [
    {
      question: t('faq1.question'),
      answer: t('faq1.answer'),
    },
    {
      question: t('faq2.question'),
      answer: t('faq2.answer'),
    },
    {
      question: t('faq3.question'),
      answer: t('faq3.answer'),
    },
    {
      question: t('faq4.question'),
      answer: t('faq4.answer'),
    },
  ];

  return (
    <div className="bg-white">
      {/* 如果需要标题，可以取消注释以下行 */}
      {/* <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">{t('faq')}</h3>
      </div> */}

      <div className="divide-y divide-gray-200">
        {faqData.map((item, index) => (
          <FaqItemCom key={`${item.question}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};
