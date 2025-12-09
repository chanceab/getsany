import type { LocalizationResource } from '@clerk/types';
import type { LocalePrefixMode } from 'next-intl/routing';

import { deDE, enUS, frFR, itIT, jaJP, koKR, ruRU, zhCN, zhTW } from '@clerk/localizations';

const localePrefix: LocalePrefixMode = 'never';

// FIXME: Update this configuration file based on your project information

const localesMap: Record<string, string> = {
  'en': 'English',
  'zh': '简体中文',
  'zh-hant': '繁體中文',
  'de': 'Deutsch',
  'fr': 'Français',
  'it': 'Italiano',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский',
};

export const AppConfig = {
  name: 'Nextjs Starter',
  localesMap,
  locales: Object.keys(localesMap),
  defaultLocale: 'en',
  localePrefix,
};

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  zh: zhCN,
  zh_tw: zhTW,
  de: deDE,
  fr: frFR,
  it: itIT,
  ja: jaJP,
  ko: koKR,
  ru: ruRU,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};
