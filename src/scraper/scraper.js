// src/scraper/scraper.js
import { chromium } from 'playwright'; // Import the chromium module from playwright

export const scrapeData = async (targets) => {
  const result = [];
  for (const target of targets) {
    try {
      const browser = await chromium.launch(); // Use chromium to launch the browser
      const page = await browser.newPage();
      
      console.log(`Scraping: ${target}`);
      
      await page.goto(target, { timeout: 20000 }); // Visit the target URL
      await page.waitForSelector('body', { timeout: 10000 }); // Wait for the page body to load
      
      const text = await page.textContent('body'); // Extract text content from the body

      result.push({ target, text }); // Push the scraped data into the result array
      await browser.close(); // Close the browser after scraping
    } catch (error) {
      console.error(`Error scraping ${target}:`, error);
      result.push({ target, error: error.message }); // Handle any errors and log them
    }
  }

  return result; // Return the scraped results
};

