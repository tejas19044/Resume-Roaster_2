import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume text first!");
      return;
    }

    setLoading(true);
    setRoast("");

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
      {/* Header */}
      <h1>🔥 Resume Roast 💀</h1>
      <p style={{ marginBottom: "20px" }}>
        Upload your resume (or paste text) and let AI destroy it… lovingly. 💔
      </p>

      {/* Paste Resume */}
      <h2>Paste Your Resume</h2>
      <textarea
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      {/* Roast Button */}
      <button onClick={handleRoast} disabled={loading}>
        {loading ? "🔥 Roasting..." : "🔥 Roast Me 🔥"}
      </button>

      {/* Roast Output */}
      {roast && (
        <div className="roast-output">
          <h3>Your Savage Roast:</h3>
          {roast.split(/(?<=[.!?])\s+/).map((sentence, i) => (
            <p key={i}>🔥 {sentence}</p>
          ))}
        </div>
      )}
    </div>
  );
}
