import { storage } from '../../utils/storage';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body;

  // ✅ Match env variable
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  return res.status(200).json({ success: true, roasts: storage.resumes });
}

