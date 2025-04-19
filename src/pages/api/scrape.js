// src/pages/api/scrape.js
import { scrapeData } from '../../scraper/scraper';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Pass the targets to scrapeData function
      const data = await scrapeData(req.body.targets);
      res.status(200).json(data); // Return the scraped data
    } catch (error) {
      console.error('Error in API route:', error); // Log any error in the API handler
      res.status(500).json({ error: 'Failed to scrape data' }); // Send 500 error response
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Handle methods other than POST
  }
}

