import { createNavigation } from 'next-intl/navigation';

import { AppConfig } from '@/utils/AppConfig';

export const { usePathname, useRouter } = createNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});
