// 'use client'
// import { MultiFileDropzoneUsage } from "@/components/Post/MainFileUpload";
// import ReactPlayer from 'react-player/lazy'

// import AudioRecorder from "@/components/AudioRecoder";



// export default function Page() {
//   return (
//     <div>
//       <MultiFileDropzoneUsage/>
//       {/* <ReactPlayer url={'https://files.edgestore.dev/r5mk8liyue68uor3/publicFiles/_public/fda33ecf-5d06-48b5-aed4-5e95f1b246e7.mp4'}/> */}
//       <iframe src="https://files.edgestore.dev/r5mk8liyue68uor3/publicFiles/_public/fda33ecf-5d06-48b5-aed4-5e95f1b246e7.mp4" 
//       ></iframe>
//     </div>
//   )
// }

// export default function Page() {
//   return (
//     <div>
//       <h1>Speech to text</h1>
//       <AudioRecorder/>
//     </div>
//   )
// }



'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function AppleWalletPass() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/create-apple-pass', 
        { name, email, id: Date.now().toString() },
        { responseType: 'blob' }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element and trigger download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'hushh_wallet.pkpass';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('An error occurred while generating the pass. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Apple Wallet Pass</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Generating...' : 'Generate Pass'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}