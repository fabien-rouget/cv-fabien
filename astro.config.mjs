// @ts-check
import { defineConfig } from 'astro/config';

const rawBasePath = process.env.PUBLIC_BASE_PATH?.trim();
const base = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}/` : '/';

export default defineConfig({
  site: 'https://cv.fabien-rouget.fr',
  base,
});
