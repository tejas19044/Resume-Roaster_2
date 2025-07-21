import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('pdf');
  const [resumeText, setResumeText] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ PDF upload (stubbed for now)
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const base64 = reader.result.split(',')[1];
      alert('PDF parsing disabled in this mock UI.'); // Replace with backend call
    };
    reader.readAsDataURL(file);
  };

  // ✅ Fake roast generation (replace with real API call)
  const handleRoast = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setRoast(
        `Background: Too many buzzwords. Early experiences: painfully generic. Buzzwords: synergy overload. Fake impacts: achieved nothing spectacular. Formatting: looks like a template. Skills: questionable. Education: meh. Savage Score: 42/100`
      );
      setLoading(false);
    }, 1000);
  };

  // ✅ FIXED Regex for splitting roast into sections
  const formatRoast = (text) => {
    if (!text) return null;

    let cleanText = text.replace(/\*\*/g, '');

    const sections = cleanText.split(
      /(?=\bBackground:|\bEarly experiences:|\bBuzzwords:|\bFake impacts:|\bFormatting|\bTone:|\bSkills:|\bEducation:|\bOverall vibe:|\bSavage Score:)/
    );

    return sections.map((sec, i) => (
      <div
        key={i}
        className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded text-gray-800 leading-relaxed"
      >
        {sec.trim()}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-5xl font-extrabold">
          <span role="img" aria-label="fire">🔥</span> Resume Roast{' '}
          <span role="img" aria-label="skull">💀</span>
        </h1>
        <p className="text-lg mt-2 text-gray-600">Where careers come to get humbled</p>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">
          Upload Your Resume & Get <span className="text-red-500">Destroyed</span>{' '}
          <span className="text-gray-500">(Lovingly)</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Our AI-powered roast machine will tear apart your resume with surgical precision and devastating humor. <strong>No survivors.</strong>
        </p>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'pdf' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('pdf')}
          >
            Upload PDF
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === 'text' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab('text')}
          >
            Paste Text
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'pdf' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
            <p className="text-gray-500 mb-2">Drag & drop your PDF resume here</p>
            <label className="cursor-pointer inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
              Browse Files
              <input type="file" accept="application/pdf" className="hidden" onChange={handlePDFUpload} />
            </label>
            <p className="text-xs text-gray-400 mt-2">PDF files only • Max 10MB</p>
          </div>
        )}

        {activeTab === 'text' && (
          <div className="mb-6">
            <textarea
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume here..."
            />
          </div>
        )}

        {/* Roast Button */}
        <button
          onClick={handleRoast}
          disabled={loading}
          className="w-full py-4 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-md shadow-md transition-all"
        >
          {loading ? '🔥 Roasting your ego...' : '🔥 Roast Me 🔥'}
        </button>

        <p className="text-sm text-gray-500 mt-3">
          ⚠️ Warning: Feelings may be hurt. Egos will be bruised.
        </p>
      </div>

      {/* Roast Output */}
      {roast && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">🔥 Your Savage Roast 🔥</h2>
          {formatRoast(roast)}

          {/* Show Savage Score separately if exists */}
          {roast.includes('Savage Score') && (
            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-red-600">
                {roast.match(/Savage Score:.*\d+\/100/)?.[0] || ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
