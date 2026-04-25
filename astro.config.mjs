import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap';  // 一時無効化（Astro 4.16 + sitemap 3.2.0 互換性問題・★294 [新セッション] 2026-04-22）
// TODO: Step 7 GSC登録前に手動 public/sitemap.xml 作成 or sitemapバージョン調整

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://tenshoku-compare-info.pages.dev',
  integrations: [
    tailwind(),
    // sitemap(),  // 一時無効化（上記コメント参照）
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
