import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: "Missing resume text" });

  const roastPrompt = `You are a savage career critic with a brutal sense of humor.
Roast this resume in **10 full sentences**, covering background, early experiences, buzzwords, fake impacts, formatting, skills, education, and overall vibe. 
Be sarcastic, funny, and cutting but NOT profane. 
End with a final Savage Score out of 100.
Resume:
${resumeText}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You roast resumes with wit and sarcasm." },
        { role: "user", content: roastPrompt },
      ],
    });

    const roast = completion.choices[0].message.content || "No roast generated.";
    return res.status(200).json({ roast });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate roast" });
  }
}
