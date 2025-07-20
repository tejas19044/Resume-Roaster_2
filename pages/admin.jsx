import { useState } from 'react';

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/admin?pwd=' + password);
    const json = await res.json();
    if (json.success) {
      setData(json.data);
      setAuth(true);
    } else {
      alert('Wrong password');
    }
  };

  if (!auth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="border px-2 py-1">Timestamp</th>
            <th className="border px-2 py-1">Resume (snippet)</th>
            <th className="border px-2 py-1">Roast</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{item.timestamp}</td>
              <td className="border px-2 py-1">{item.text}</td>
              <td className="border px-2 py-1 whitespace-pre-line">{item.roast}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


