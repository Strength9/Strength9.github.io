/**
 * capture-inner-heroes.mjs
 * Generates unique mini hero composite backgrounds for each inner page.
 * Writes temporary HTML files to disk (same approach as capture-hero.mjs)
 * so that file:// image references work.
 * Usage: node scripts/capture-inner-heroes.mjs
 */

import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { statSync, writeFileSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'assets', 'images');

// Each page gets 6 unique screenshots relevant to its theme
const pages = {
  services: [
    'lotiq', 'burlandbow', 'wellington-country-park',
    'swiftest', 'avatal', 'boakes-joinery'
  ],
  hosting: [
    'wellington-country-park', 'wellington-farm-shop', 'wellington-barns',
    'hr-matters', 'boakes-joinery', 'wellington-riding'
  ],
  products: [
    'lotiq', 'swiftest', 'max-bonanza',
    'spinitin', 'aph-financial', 'avatal'
  ],
  portfolio: [
    'burlandbow', 'aph-financial', 'wellington-riding',
    'imre-banana', 'swiftest', 'lotiq'
  ],
  about: [
    'wellington-country-park', 'lotiq', 'burlandbow',
    'wellington-barns', 'aph-financial', 'swiftest'
  ],
  contact: [
    'wellington-farm-shop', 'avatal', 'imre-banana',
    'boakes-joinery', 'hr-matters', 'the-iron-duke'
  ]
};

function buildHTML(screenshots) {
  const imgTags = screenshots
    .map(name => `    <img src="../assets/images/screenshots/${name}.webp" alt="">`)
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 2880px;
    height: 600px;
    background: #111827;
    overflow: hidden;
  }

  .grid-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%) perspective(1200px) rotateY(-8deg) rotateX(2deg);
    display: grid;
    grid-template-columns: repeat(3, 520px);
    grid-template-rows: repeat(2, 310px);
    gap: 16px;
    transform-style: preserve-3d;
  }

  .grid-container img {
    width: 520px;
    height: 310px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.3);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right,
        rgba(17,24,39,0.88) 0%,
        rgba(17,24,39,0.75) 25%,
        rgba(17,24,39,0.55) 50%,
        rgba(17,24,39,0.40) 75%,
        rgba(17,24,39,0.30) 100%
      );
    z-index: 2;
  }

  .vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(17,24,39,0.5) 100%);
    z-index: 3;
  }

  .accent {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 50%, rgba(37,99,235,0.10) 0%, transparent 50%);
    z-index: 4;
  }
</style>
</head>
<body>
  <div class="grid-container">
${imgTags}
  </div>
  <div class="overlay"></div>
  <div class="vignette"></div>
  <div class="accent"></div>
</body>
</html>`;
}

async function main() {
  console.log('Generating inner page hero composites...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 2880, height: 600 },
    deviceScaleFactor: 1,
  });

  for (const [pageName, screenshots] of Object.entries(pages)) {
    const html = buildHTML(screenshots);
    const tmpHtmlPath = path.resolve(__dirname, `_tmp-inner-${pageName}.html`);
    writeFileSync(tmpHtmlPath, html);

    const page = await context.newPage();
    await page.goto(`file://${tmpHtmlPath}`, {
      waitUntil: 'networkidle',
      timeout: 15000,
    });
    await page.waitForTimeout(1000);

    const pngPath = path.resolve(outputDir, `page-header-${pageName}.png`);
    const webpPath = path.resolve(outputDir, `page-header-${pageName}.webp`);

    await page.screenshot({ path: pngPath, fullPage: false });

    // Convert to WebP
    let quality = 70;
    execSync(`cwebp -q ${quality} "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });

    let size = statSync(webpPath).size;
    while (size > 100 * 1024 && quality > 35) {
      quality -= 5;
      execSync(`cwebp -q ${quality} "${pngPath}" -o "${webpPath}"`, { stdio: 'pipe' });
      size = statSync(webpPath).size;
    }

    // Clean up temp files
    unlinkSync(pngPath);
    unlinkSync(tmpHtmlPath);

    console.log(`  ${pageName}: ${(size / 1024).toFixed(0)}KB (q=${quality})`);
    await page.close();
  }

  await browser.close();
  console.log('\nAll inner hero composites generated.');
}

main().catch(console.error);
