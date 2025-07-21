import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:C",
    });

    const rows = result.data.values || [];
    res.status(200).json({ rows });
  } catch (err) {
    console.error("Failed to read Google Sheets:", err);
    res.status(500).json({ error: "Could not fetch admin data" });
  }
}


