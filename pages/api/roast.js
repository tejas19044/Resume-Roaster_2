import OpenAI from "openai";
import { storage } from "../../utils/storage";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { resumeText } = req.body;
  if (!resumeText || resumeText.trim().length === 0) {
    return res.status(400).json({ error: "Missing resume text" });
  }

  const roastPrompt = `
You are a savage career critic with brutal humor. 
Roast this resume in **exactly 10 funny, sarcastic, fully structured sentences**.
Follow this flow:
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

Rules:
- Make it **witty and connected like a paragraph**, NOT bullet points.
- Each sentence should be **1-2 lines max**.
- Include the **Savage Score only ONCE at the end**.
- Do NOT say “Here’s your roast”, just start roasting.
- No profanity.

Resume:
${resumeText}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You roast resumes with savage wit and sarcasm." },
        { role: "user", content: roastPrompt }
      ],
      temperature: 0.9,
    });

    const roast = completion.choices[0].message.content || "No roast generated.";
    const timestamp = new Date().toISOString();

    // Save only a snippet for admin view
    storage.resumes.push({
      text: resumeText.slice(0, 300),
      roast,
      timestamp,
    });

    return res.status(200).json({ roast });
  } catch (error) {
    console.error("Roast API Error:", error);
    return res.status(500).json({ error: "Failed to generate roast" });
  }
}
