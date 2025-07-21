import { useState } from 'react';

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ PDF Upload → Backend Parsing
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const base64 = reader.result.split(',')[1];

      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64: base64 })
      });

      const data = await res.json();
      if (data.text) {
        setResumeText(data.text.trim());
      } else {
        alert('Failed to parse PDF');
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Roast API call
  const handleRoast = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    const res = await fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });
    const data = await res.json();
    setRoast(data.roast);
    setLoading(false);
  };

  // ✅ Structured roast formatting
  const formatRoast = (text) => {
    const lines = text.split(/\. |\n/).filter(Boolean);
    return lines.map((line, i) => (
      <li key={i} className="mb-2 leading-relaxed">
        {i === lines.length - 1 ? `💀 ${line}` : `🔥 ${line}.`}
      </li>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center mb-4">🔥 Resume Roast 💀</h1>
        <p className="text-center text-gray-600 mb-6">
          Upload your resume (PDF or text) & let AI destroy it 💔
        </p>

        {/* ✅ Upload PDF → backend parsing */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload PDF Resume:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ✅ OR Paste Text */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Or Paste Resume Text:</label>
          <textarea
            rows={20}
            className="w-full p-3 border rounded-lg"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume here..."
          />
        </div>

        {/* ✅ Roast Button */}
        <button
          onClick={handleRoast}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
        >
          {loading ? '🔥 Roasting...' : '🔥 Roast Me 🔥'}
        </button>

        {/* ✅ Roast Output */}
        {roast && (
          <div className="mt-6 bg-gray-50 border-l-4 border-red-500 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-3">Your Savage Roast:</h2>
            <ul className="list-none text-gray-800">{formatRoast(roast)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
