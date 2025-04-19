export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { targets } = req.body;

    // Run scraper logic here...
    res.status(200).json({ message: 'Scraper received', targets });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

