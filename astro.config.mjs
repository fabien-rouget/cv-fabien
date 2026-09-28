// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cv.fabien-rouget.fr',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
