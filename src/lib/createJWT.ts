import jwt from 'jsonwebtoken';
import { string } from 'zod';

let privateKey = '';
if(process.env.GOOGLE_WALLET_PRIVATE_KEY){
    privateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY.replace(/\\n/g, '\n') || ''; 
}
// Replace escaped newlines with actual newlines
const clientEmail = process.env.GOOGLE_WALLET_CLIENT_EMAIL;
const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;

type User={id:string , name:string , email:string};

export const createJwt = (userDetails: User) => {
  const payload = {
    iss: clientEmail,
    aud: 'google',
    origins: ['https://hushhconnect.vercel.app'],
    typ: 'savetowallet',
    payload: {
      genericObjects: [
        {
          id: `${issuerId}.${userDetails.id}`,
          classId: `${issuerId}.genericclass`,
          genericType: 'GENERIC_TYPE_UNSPECIFIED',
          hexBackgroundColor: '#0038FD',
          logo: {
            sourceUri: {
              uri: 'https://hushhconnect.vercel.app/logo2.svg',
            },
          },
          cardTitle: {
            defaultValue: {
              language: 'en-US',
              value: 'Hushh Card',
            },
          },
          header: {
            defaultValue: {
              language: 'en-US',
              value: userDetails.name,
            },
          },
          barcode: {
            type: 'QR_CODE',
            value: `https://hushhconnect.vercel.app/profile/${userDetails.id}/threads`,
          },
          heroImage: {
            sourceUri: {
              uri: 'https://hushhconnect.vercel.app/logo1.svg',
            },
          },
          textModulesData: [
            {
              header: 'Contact Information',
              body: `Email: ${userDetails.email}`,
            },
          ],
        },
      ],
    },
  };

  return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
};
