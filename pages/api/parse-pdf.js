import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // allow up to ~10MB PDF uploads
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pdfBase64 } = req.body;
    if (!pdfBase64) {
      return res.status(400).json({ error: 'No PDF provided' });
    }

    // Convert Base64 to Buffer
    const buffer = Buffer.from(pdfBase64, 'base64');

    // Parse PDF
    const data = await pdfParse(buffer);

    return res.status(200).json({ text: data.text });
  } catch (err) {
    console.error('PDF parse error:', err);
    return res.status(500).json({ error: 'Failed to parse PDF' });
  }
}
