import OpenAI from "openai";
import { google } from "googleapis";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function saveToGoogleSheets(resumeSnippet, roast) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[now, resumeSnippet, roast]],
      },
    });

    console.log("✅ Saved to Google Sheets");
  } catch (err) {
    console.error("❌ Failed to save to Google Sheets:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ error: "Missing resume text" });

  const roastPrompt = `You are a savage career critic with a sharp, sarcastic sense of humor.
Roast this resume in **exactly 10 savage sentences**, grouped into clear sections.

When roasting, always reference actual details from the resume like company names, job titles, universities, certifications, or skills to make it feel personal and authentic.

The output MUST follow this exact structured format with emoji headers:

🔥 Background: 2 savage sentences roasting their overall background and vibe. Reference their most recent role or title.
🔥 Early Experience: 2 sentences mocking their first jobs/internships. Call out the company names or roles.
🔥 Buzzwords & Fake Impact: 2 sentences calling out exaggerated buzzwords and fake “impact.” Quote some phrases directly from the resume.
🔥 Skills & Education: 2 sentences trashing their listed skills or certifications and their education (use the actual university name if present).
🔥 Overall Vibe: 1 brutal sentence summarizing how the resume feels overall.

💀 Savage Score: A snarky **score out of 100** with one funny line explaining why.

✨ Quick Fix Suggestion (Sarcastic): End with one short sarcastic tip on how they could *maybe* make it better.

Be sarcastic, witty, and cutting, but NOT profane.

Here’s the resume:
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

    // ✅ Save to Google Sheets
    await saveToGoogleSheets(resumeText.slice(0, 49000), roast);

    return res.status(200).json({ roast });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate roast" });
  }
}
