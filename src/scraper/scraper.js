// src/scraper/scraper.js
import { chromium } from 'playwright';

export async function scrapeData(targets) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];

  for (const { label, url, selector } of targets) {
    try {
      console.log(`Scraping ${label}: ${url} with selector "${selector}"`);
      await page.goto(url, { timeout: 20000 });
      await page.waitForSelector(selector, { timeout: 10000 });

      const text = await page.textContent(selector);

      results.push({
        site: label,
        data: text?.trim() || '[No text found]',
      });
    } catch (err) {
      console.error(`❌ Error scraping ${label}:`, err);
      results.push({
        site: label,
        error: err.message,
      });
    }
  }

  await browser.close();
  return results;
}

