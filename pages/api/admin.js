import { useState, useEffect } from "react";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((res) => res.json())
      .then((d) => setData(d.resumes || []));
  }, []);

  return (
    <div className="container">
      <h1>📜 Admin Dashboard</h1>
      {data.length === 0 && <p>No resumes roasted yet.</p>}

      {data.map((item, i) => (
        <div key={i} className="roast-output">
          <p><b>Resume:</b> {item.text}</p>
          <p><b>Roast:</b> {item.roast}</p>
          <p><small>{item.timestamp}</small></p>
        </div>
      ))}
    </div>
  );
}
