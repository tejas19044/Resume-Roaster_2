import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  // Call API to roast resume
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
      console.error(err);
      setRoast("❌ Error roasting resume.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {/* Header */}
      <h1>🔥 Resume Roast 💀</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Upload your resume (or paste text) and let AI destroy it… lovingly
