/**
 * capture-hero.mjs
 * Opens the hero-composite.html in Playwright, screenshots it at 2880x1600,
 * then converts to WebP.
 * Usage: node scripts/capture-hero.mjs
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log('🎨 Generating hero composite image...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 2880, height: 1600 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  const htmlPath = `file://${path.resolve(__dirname, 'hero-composite.html')}`;

  await page.goto(htmlPath, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  const pngPath = path.resolve(__dirname, '..', 'assets', 'images', 'hero-bg.png');
  const webpPath = path.resolve(__dirname, '..', 'assets', 'images', 'hero-bg.webp');

  await page.screenshot({ path: pngPath, fullPage: false });
  console.log('  ✓ hero-bg.png captured');

  await browser.close();

  // Convert to WebP — target under 200KB with quality adjustments
  let quality = 75;
  execSync(`cwebp -q ${quality} "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });

  // Check file size
  const { statSync } = await import('fs');
  let size = statSync(webpPath).size;
  console.log(`  → hero-bg.webp: ${(size / 1024).toFixed(0)}KB (q=${quality})`);

  // If over 200KB, reduce quality
  while (size > 200 * 1024 && quality > 40) {
    quality -= 5;
    execSync(`cwebp -q ${quality} "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
    size = statSync(webpPath).size;
    console.log(`  → hero-bg.webp: ${(size / 1024).toFixed(0)}KB (q=${quality})`);
  }

  console.log(`\n✅ Hero composite ready: ${(size / 1024).toFixed(0)}KB`);
}

main().catch(console.error);
