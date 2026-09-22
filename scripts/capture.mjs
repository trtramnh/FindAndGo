import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

// Lưu ảnh cục bộ để kiểm tra tỷ lệ bố cục và cách xuống dòng.
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const width of [1440, 1024, 768, 390, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/landing-${width}.png`, fullPage: true });
    if (width === 1440 || width === 375) {
      await page.screenshot({ path: `artifacts/hero-${width}.png` });
      await page.locator('#explore').screenshot({ path: `artifacts/preview-${width}.png` });
    }
    console.log(JSON.stringify({ width, documentWidth: await page.evaluate(() => document.documentElement.scrollWidth), title: await page.title() }));
  }
} finally { await browser.close(); }
