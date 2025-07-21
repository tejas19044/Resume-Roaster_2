import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);
  const [authed, setAuthed] = useState(false);

  const fetchData = async () => {
    const res = await fetch('/api/admin-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      setEntries(data.entries);
      setAuthed(true);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!authed ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="border p-2 rounded w-64"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={fetchData}
            className="ml-3 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">Stored Roasts</h1>
          {entries.length === 0 && <p>No resumes roasted yet 😅</p>}
          {entries.map((entry, idx) => (
            <div key={idx} className="mb-6 p-4 border rounded bg-gray-50">
              <p className="text-sm text-gray-500">{entry.timestamp}</p>
              <h3 className="font-bold mt-2">Resume (snippet):</h3>
              <pre className="text-sm whitespace-pre-wrap">{entry.text}</pre>
              <h3 className="font-bold mt-2">Roast:</h3>
              <pre className="text-sm whitespace-pre-wrap text-red-600">{entry.roast}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

