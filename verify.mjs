import { chromium } from 'playwright-core';

const EXEC = '/opt/thorium-browser/thorium';

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errs = [];
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
page.on('pageerror', (e) => errs.push('PAGEERR: ' + e.message.slice(0, 160)));

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(6000); // wait for loader + 3D scene

// Simulate mouse movement to enable custom cursor
await page.mouse.move(720, 450);
await page.waitForTimeout(500);

const info = await page.evaluate(() => {
  const ids = ['top', 'about', 'skills', 'projects', 'experience', 'contact'];
  const out = {};
  for (const id of ids) {
    const el = document.getElementById(id);
    out[id] = el ? { exists: true, text: (el.innerText || '').replace(/\s+/g, ' ').slice(0, 45) } : { exists: false };
  }
  out.brand = document.querySelector('header a span')?.textContent;
  out.canvas = document.querySelectorAll('canvas').length;
  out.marqueeChips = document.querySelectorAll('#skills span.rounded-full').length;
  out.projectCards = document.querySelectorAll('[data-mode="view"]').length;
  out.stats = document.querySelectorAll('.stat-fade').length;
  out.cursorDot = !!document.querySelector('div[style*="opacity"]');
  out.bodyBg = getComputedStyle(document.body).backgroundColor;
  out.noise = document.querySelector('.noise') !== null;
  return out;
});

console.log('=== STRUCTURE ===');
console.log(JSON.stringify(info, null, 2));

// Scroll through all sections to trigger scroll animations
for (const s of ['about', 'skills', 'projects', 'experience', 'contact']) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), s);
  await page.waitForTimeout(700);
}

// Check console errors after full scroll
console.log('=== ERRORS ===');
console.log('count:', errs.length);
errs.slice(0, 6).forEach((e) => console.log('-', e));

await browser.close();
console.log('VERIFY_DONE');
