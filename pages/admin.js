import { storage } from '../../utils/storage';

export default function handler(req, res) {
  const pwd = req.query.pwd;
  if (pwd !== process.env.ADMIN_PASSWORD) return res.status(401).json({ success: false });
  return res.status(200).json({ success: true, data: storage.resumes });
}
