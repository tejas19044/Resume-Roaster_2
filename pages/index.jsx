export default function Home() {
  return (
    <div className="container">
      <h1>🔥 Resume Roast 💀</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Upload your resume (PDF or text) & let AI destroy it 💔
      </p>

      <h2>Upload PDF Resume</h2>
      <input type="file" accept="application/pdf" />
      
      <h3 style={{ textAlign: "center", margin: "15px 0" }}>Or Paste Resume Text</h3>
      <textarea placeholder="Paste your resume text here..." />

      <button>🔥 Roast Me 🔥</button>

      {/* Roast Output */}
      <div className="roast-output">
        <p><strong>Your Savage Roast:</strong></p>
        <p>Ah, so you’re the “dynamic leader” who managed to make note-taking sound impressive...</p>
        <p>Early jobs? A tragic comedy of LinkedIn buzzwords gone wrong...</p>
      </div>
    </div>
  );
}
