import { chromium } from 'playwright-core';
const EXEC = '/opt/thorium-browser/thorium';
const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const errs = [];
page.on('pageerror', e => errs.push(e.message.slice(0,160)));
await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(6000);
const info = await page.evaluate(() => {
  const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
  const menuBtn = !!document.querySelector('header button');
  const h1Font = getComputedStyle(document.querySelector('h1')).fontSize;
  return { horizontalOverflow: overflow, mobileMenuBtn: menuBtn, h1FontSize: h1Font };
});
console.log(JSON.stringify(info));
console.log('PAGEERRORS:', errs.length);
errs.forEach(e=>console.log('-',e));
await browser.close();
console.log('MOBILE_DONE');
