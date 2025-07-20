import OpenAI from 'openai';
import { storage } from '../../utils/storage';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: 'Missing resume text' });

  const roastPrompt = `You are a savage career critic with a brutal sense of humor.\nRoast this resume in exactly 10 sentences, covering background, early experiences, buzzwords, fake impacts, formatting, and education. Be sarcastic, funny, and cutting, but NOT profane. End with a Savage Score: X/100.\nResume:\n${resumeText}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You roast resumes with wit and sarcasm.' },
        { role: 'user', content: roastPrompt }
      ],
    });

    const roast = completion.choices[0].message.content || 'No roast generated.';
    const timestamp = new Date().toISOString();

    storage.resumes.push({ text: resumeText.slice(0, 500), roast, timestamp });

    return res.status(200).json({ roast });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate roast' });
  }
}


