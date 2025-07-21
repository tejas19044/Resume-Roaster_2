import { useState, useEffect } from "react";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((res) => res.json())
      .then((d) => {
        setData(d.rows || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>📜 Admin Dashboard</h1>

      {loading && <p>Loading data...</p>}
      {!loading && data.length === 0 && <p>No roasted resumes yet.</p>}

      {data.slice(1).map((row, i) => (
        <div key={i} className="roast-output">
          <p><b>Timestamp:</b> {row[0]}</p>
          <p><b>Resume:</b> {row[1]}</p>
          <p><b>Roast:</b> {row[2]}</p>
        </div>
      ))}
    </div>
  );
}

