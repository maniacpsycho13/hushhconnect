'use client'

import { useState } from 'react';
import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
  } from 'next-share'
  
import { useRouter, usePathname } from 'next/navigation'

export default function SharingCard() {
    const router = useRouter();
    const pathname = usePathname();
    const [copySuccess, setCopySuccess] = useState('');
    const content = "Hushh Business Card";
    const path = 'https://hushhvivaconnect.shop' + pathname;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(path);
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            setCopySuccess('Failed to copy!');
            setTimeout(() => setCopySuccess(''), 2000);
        }
    }

    return (
        <div className='flex flex-col gap-3 justify-center items-center'>
            <div className='flex gap-3'>
                <WhatsappShareButton
                    url={path}
                    title={content}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <FacebookShareButton
                    url={path}
                    quote={content}
                    hashtag={'#nextshare'}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <LinkedinShareButton url={path}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <EmailShareButton
                    url={path}
                    subject={content}
                    body="We appreciate your business card. Share it with anyone."
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>

            <div className='flex items-center gap-2 mt-3'>
                <input
                    type="text"
                    value={path}
                    readOnly
                    className="p-2 border rounded w-64"
                />
                <button 
                    onClick={copyToClipboard} 
                    className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded"
                >
                    Copy
                </button>
            </div>
            {copySuccess && <div className="text-green-500 mt-1">{copySuccess}</div>}
        </div>
    )
}
