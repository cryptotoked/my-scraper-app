// src/pages/api/scrape.js
import { scrapeData } from '../../scraper/scraper';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = await scrapeData(req.body.targets);
      res.status(200).json(data); 
    } catch (error) {
      console.error('Error in API route:', error); 
      res.status(500).json({ error: 'Failed to scrape data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); 
  }
}

