import { useState } from 'react';

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-center mt-10">🔥 Resume Roast 💀</h1>
      <p className="mt-2 text-gray-600">Where careers come to get humbled</p>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Upload Your Resume & Get <span className="text-red-500">Destroyed</span> (Lovingly)
        </h2>
        <textarea
          placeholder="Paste your resume text here..."
          className="w-full p-3 border rounded mb-4"
          rows={8}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <button
          onClick={handleRoast}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
        >
          {loading ? 'Roasting...' : '🔥 Roast Me 🔥'}
        </button>
      </div>

      {roast && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-xl w-full">
          <h3 className="text-xl font-bold mb-2">Your Roast:</h3>
          <p className="whitespace-pre-line text-gray-800">{roast}</p>
        </div>
      )}

      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">Why Our Roasts Hit Different</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white rounded shadow">
            <h4 className="font-bold">🎯 Surgical Precision</h4>
            <p>We target cringe-worthy buzzwords with laser accuracy.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h4 className="font-bold">😂 Devastatingly Funny</h4>
            <p>AI sarcasm trained to deliver premium roasts.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h4 className="font-bold">💔 Lovingly Brutal</h4>
            <p>No profanity, just pure comedic devastation.</p>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        Made with ❤️ + sarcasm. 2024 Resume Roast. All egos bruised equally.
      </footer>
    </div>
  );
}


