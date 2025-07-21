import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: 'Missing resume text' });
  }

  const roastPrompt = `You are a savage career critic with a brutal sense of humor.
Roast this resume in exactly 10 sentences:
1. Background
2. Early experiences
3. Buzzwords
4. Fake impacts
5. Formatting/style
6. Tone
7. Skills
8. Education
9. Overall vibe
10. Savage Score: X/100
Be sarcastic, funny, cutting, but not profane.
Resume:\n${resumeText}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You roast resumes with wit and sarcasm.' },
        { role: 'user', content: roastPrompt }
      ]
    });

    const roast = completion.choices?.[0]?.message?.content || 'No roast generated.';

    return res.status(200).json({ roast });
  } catch (err) {
    console.error('OpenAI error:', err);
    return res.status(500).json({ error: 'Failed to generate roast' });
  }
}




