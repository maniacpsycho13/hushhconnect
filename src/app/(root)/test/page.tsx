// 'use client'
// import { useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     id: '',
//   });

//   const [walletLink, setWalletLink] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/create-pass', formData);
//       setWalletLink(response.data.url);
//     } catch (error) {
//       console.error('Error creating pass:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Share Your Hushh Card via Google Wallet</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="id"
//           placeholder="Unique ID"
//           value={formData.id}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Generate Google Wallet Link</button>
//       </form>
//       {walletLink && (
//         <div>
//           <h2>Google Wallet Link:</h2>
//           <a href={walletLink} target="_blank" rel="noopener noreferrer">
//             Add to Google Wallet
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}

