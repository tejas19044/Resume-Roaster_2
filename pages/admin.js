import { useState } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [roasts, setRoasts] = useState([]);

  const handleLogin = async () => {
    const res = await fetch('/api/admin-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (data.success) {
      setAuthed(true);
      setRoasts(data.roasts || []);
    } else {
      alert('Wrong password! Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      {!authed ? (
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">🔒 Admin Login</h1>
          <p className="text-gray-500 mb-6">Enter the secret password to view all roasts</p>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md shadow transition-all"
          >
            Unlock Admin Dashboard
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">📜 All Roasts</h1>
          {roasts.length === 0 ? (
            <p className="text-center text-gray-500">No roasts yet!</p>
          ) : (
            <div className="space-y-6">
              {roasts.map((entry, i) => (
                <div key={i} className="bg-white shadow-md rounded-lg p-6">
                  <p className="text-sm text-gray-400">
                    🕒 {new Date(entry.timestamp).toLocaleString()}
                  </p>
                  <h2 className="text-lg font-bold mt-2">Resume Preview:</h2>
                  <pre className="bg-gray-50 p-3 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
                    {entry.text}
                  </pre>
                  <h2 className="text-lg font-bold mt-4">Roast:</h2>
                  <p className="text-gray-800 whitespace-pre-line">{entry.roast}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


