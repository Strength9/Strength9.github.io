/**
 * capture-screenshots.mjs
 * Screenshots 20 client websites using Playwright, saves as PNG, converts to WebP.
 * Usage: node scripts/capture-screenshots.mjs
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

const VIEWPORT = { width: 1280, height: 800 };
const CONCURRENCY = 3;
const OUT_DIR = path.resolve('assets/images/screenshots');

const CLIENTS = [
  { name: 'wellington-country-park', url: 'https://wellingtoncountrypark.co.uk' },
  { name: 'spinitin',               url: 'https://spinitin.com' },
  { name: 'avatal',                  url: 'https://avatal.co.uk' },
  { name: 'hr-matters',             url: 'https://hrmattersuk.com' },
  { name: 'nj-graphique',           url: 'https://www.njgraphique.co.uk' },
  { name: 'lotiq',                  url: 'https://www.lotiq.co' },
  { name: 'wellington-riding',      url: 'https://wellingtonriding.co.uk' },
  { name: 'burlandbow',             url: 'https://burlandbow.co.uk' },
  { name: 'aph-financial',          url: 'https://aphfinancial.co.uk' },
  { name: 'wellington-farm-shop',   url: 'https://wellingtonfarmshop.co.uk' },
  { name: 'imre-banana',            url: 'https://imrebanana.com' },
  { name: 'boakes-joinery',         url: 'https://www.boakesjoinery.com' },
  { name: 'wellington-barns',       url: 'https://wellingtonbarns.co.uk' },
  { name: 'swiftest',               url: 'https://swiftest.co.uk' },
  { name: 'max-bonanza',            url: 'https://maxbonanza.com' },
  { name: 'wellington-horse-trials', url: 'https://wellingtonhorsetrials.co.uk' },
  { name: 'js-perfections',         url: 'https://jsperfections.co.uk' },
  { name: 'the-iron-duke',          url: 'https://theironduke.co.uk' },
  { name: 'uk-vans-4-less',         url: 'https://ukvans4less.co.uk' },
  { name: 'help-grow-your-business', url: 'https://helpgrowyourbusiness.co.uk' },
];

/** Try to dismiss common cookie/consent banners */
async function dismissCookieBanner(page) {
  const selectors = [
    // Common accept button text patterns
    'button:has-text("Accept")',
    'button:has-text("Accept All")',
    'button:has-text("Accept all")',
    'button:has-text("Allow")',
    'button:has-text("Allow All")',
    'button:has-text("Got it")',
    'button:has-text("I agree")',
    'button:has-text("OK")',
    'button:has-text("Agree")',
    'a:has-text("Accept")',
    'a:has-text("Accept All")',
    // Common class/id patterns
    '[id*="cookie"] button',
    '[class*="cookie"] button',
    '[id*="consent"] button',
    '[class*="consent"] button',
    '[id*="gdpr"] button',
    '.cc-btn.cc-dismiss',
    '#onetrust-accept-btn-handler',
    '.cmplz-accept',
  ];

  for (const selector of selectors) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(500);
        return true;
      }
    } catch {
      // ignore — try next selector
    }
  }
  return false;
}

async function captureOne(browser, client) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  const pngPath = path.join(OUT_DIR, `${client.name}.png`);

  try {
    console.log(`  → Navigating to ${client.url}`);
    await page.goto(client.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Try dismissing cookie banners
    await dismissCookieBanner(page);
    await page.waitForTimeout(1000); // let animations settle

    await page.screenshot({ path: pngPath, fullPage: false });
    console.log(`  ✓ ${client.name}.png captured`);
  } catch (err) {
    console.error(`  ✗ ${client.name} failed: ${err.message}`);
    // Try with domcontentloaded as fallback
    try {
      await page.goto(client.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: pngPath, fullPage: false });
      console.log(`  ✓ ${client.name}.png captured (fallback)`);
    } catch (err2) {
      console.error(`  ✗ ${client.name} failed completely: ${err2.message}`);
    }
  } finally {
    await context.close();
  }
}

async function convertToWebP() {
  console.log('\n📦 Converting PNGs to WebP...');
  for (const client of CLIENTS) {
    const pngPath = path.join(OUT_DIR, `${client.name}.png`);
    const webpPath = path.join(OUT_DIR, `${client.name}.webp`);
    if (existsSync(pngPath)) {
      try {
        execSync(`cwebp -q 80 "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
        console.log(`  ✓ ${client.name}.webp`);
      } catch (err) {
        console.error(`  ✗ ${client.name}.webp conversion failed`);
      }
    }
  }
}

async function main() {
  console.log('🎯 Capturing 20 client website screenshots...\n');

  const browser = await chromium.launch({ headless: true });

  // Process in batches of CONCURRENCY
  for (let i = 0; i < CLIENTS.length; i += CONCURRENCY) {
    const batch = CLIENTS.slice(i, i + CONCURRENCY);
    console.log(`\nBatch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(CLIENTS.length / CONCURRENCY)}:`);
    await Promise.all(batch.map(client => captureOne(browser, client)));
  }

  await browser.close();
  await convertToWebP();

  console.log('\n✅ All screenshots captured and converted.');
}

main().catch(console.error);
