import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");   // Resume text from PDF or pasted
  const [roast, setRoast] = useState("");             // Roast output
  const [loading, setLoading] = useState(false);      // Loading state for spinner/button

  // ✅ 1. Handle PDF upload → convert to Base64 → send to backend → get extracted text
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setRoast(""); // Clear previous roast

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      // Get Base64 string without the "data:application/pdf;base64," prefix
      const base64String = reader.result.split(",")[1];

      try {
        // Send Base64 to backend parse-pdf API
        const res = await fetch("/api/parse-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfBase64: base64String }),
        });

        const data = await res.json();

        if (data.text) {
          // ✅ Fill textarea with extracted PDF text
          setResumeText(data.text);
        } else {
          alert("❌ Failed to extract text from PDF");
        }
      } catch (err) {
        console.error("PDF upload error:", err);
        alert("❌ PDF parsing failed");
      }

      setLoading(false);
    };

    reader.onerror = () => {
      alert("❌ Failed to read PDF file");
      setLoading(false);
    };
  };

  // ✅ 2. Send resume text (from PDF or pasted) → roast API → display savage roast
  const handleRoast = async () => {
    if (!resumeText.trim()) {
      alert("Please paste or upload your resume text first!");
      return;
    }

    setLoading(true);
    setRoast(""); // Clear previous roast

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();
      if (data.roast) {
        setRoast(data.roast);
      } else {
        setRoast("⚠️ No roast generated. Try again!");
      }
    } catch (err) {
      console.error("Error roasting resume:", err);
      setRoast("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* ✅ Header */}
      <h1>🔥 Resume Roast 💀</h1>
      <p style={{ marginBottom: "20px" }}>
        Upload your resume (PDF or text) & let AI destroy it 💔
      </p>

      {/* ✅ Upload PDF Resume */}
      <h2>Upload PDF Resume</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePDFUpload}
        className="mb-4"
      />

      {/* ✅ OR Paste Resume Text */}
      <h3 style={{ marginTop: "20px" }}>Or Paste Resume Text</h3>
      <textarea
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      {/* ✅ Roast Button */}
      <button onClick={handleRoast} disabled={loading}>
        {loading ? "🔥 Roasting..." : "🔥 Roast Me 🔥"}
      </button>

      {/* ✅ Roast Output */}
      {roast && (
        <div className="roast-output">
          <h3>Your Savage Roast:</h3>
          {/* Split roast into sentences for better readability */}
          {roast.split(/(?<=[.!?])\s+/).map((sentence, i) => (
            <p key={i}>🔥 {sentence}</p>
          ))}
        </div>
      )}
    </div>
  );
}
