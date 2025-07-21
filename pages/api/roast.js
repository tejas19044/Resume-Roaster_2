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
Roast this resume on these 10 points sentences:
1. Background (mock their story)
2. Early experiences (make fun of jobs/projects)
3. Buzzwords (call out corporate jargon)
4. Fake impacts (mock exaggerated achievements)
5. Formatting/style (insult layout & design)
6. Tone (mock how boring or overconfident it sounds)
7. Skills (question usefulness)
8. Education (roast their degree)
9. Overall vibe (give an insult about their personality)
10. Final burn + a Savage Score (like 32/100)

Make each sentence witty and connected, NOT like bullet points.
Do NOT repeat Savage Score twice.
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




