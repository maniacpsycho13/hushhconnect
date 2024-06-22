'use client'


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
    console.log(pathname);
    const content="Hushh Business Card"
    const path='https://hushhconnect.vercel.app'+pathname

    return(
        <div className='flex gap-3 justify-center items-center'>
            <div>
                
                <WhatsappShareButton
                    url={path}
                    title={content}
                    separator=":: "
                    >
                <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
            <div>

                <FacebookShareButton
                    url={path}
                    quote={content}
                    hashtag={'#nextshare'}
                    >
                <FacebookIcon size={32} round />
                </FacebookShareButton>

            </div>

            <div>
                <LinkedinShareButton url={path}>
                <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
            <div>
                <EmailShareButton
                    url={pathname}
                    subject={content}
                    body="We appreciate your business card. Share it with anyone."
                >
                <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </div>
    )
    
}
  