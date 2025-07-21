import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('pdf');
  const [resumeText, setResumeText] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ PDF upload & backend parsing
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const base64 = reader.result.split(',')[1];

      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfBase64: base64 }),
      });

      const data = await res.json();
      if (data.text) {
        setResumeText(data.text.trim());
        setActiveTab('text'); // Switch to text tab after parsing
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
    setRoast('');
    const res = await fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText }),
    });
    const data = await res.json();
    setRoast(data.roast);
    setLoading(false);
  };

  // ✅ Format roast into clean sections
  const formatRoast = (text) => {
    if (!text) return null;

    // Remove ** markdown artifacts
    let cleanText = text.replace(/\*\*/g, '');

    // Split into sections by keywords
    const sections = cleanText.split(
      /(?=\bBackground:|\b
