import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const issuerId = process.env.ISSUER_ID;
const classId = `${issuerId}.generic_class`;


const credentialsPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS as string);


// const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// const httpClient = new GoogleAuth({
//   credentials: credentials,
//   scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
// });

//  const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

// async function createPassClass() {
//   const genericClass = {
//     id: `${classId}`,
//     classTemplateInfo: {
//       cardTemplateOverride: {
//         cardRowTemplateInfos: [
//           {
//             twoItems: {
//               startItem: {
//                 firstValue: {
//                   fields: [
//                     {
//                       fieldPath: 'object.textModulesData["points"]'
//                     }
//                   ]
//                 }
//               },
//               endItem: {
//                 firstValue: {
//                   fields: [
//                     {
//                       fieldPath: 'object.textModulesData["contacts"]'
//                     }
//                   ]
//                 }
//               }
//             }
//           }
//         ]
//       },
//       detailsTemplateOverride: {
//         detailsItemInfos: [
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.imageModulesData["event_banner"]'
//                   }
//                 ]
//               }
//             }
//           },
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.textModulesData["game_overview"]'
//                   }
//                 ]
//               }
//             }
//           },
//           {
//             item: {
//               firstValue: {
//                 fields: [
//                   {
//                     fieldPath: 'class.linksModuleData.uris["official_site"]'
//                   }
//                 ]
//               }
//             }
//           }
//         ]
//       }
//     },
//     imageModulesData: [
//       {
//         mainImage: {
//           sourceUri: {
//             uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-2021-card.png'
//           },
//           contentDescription: {
//             defaultValue: {
//               language: 'en-US',
//               value: 'Google I/O 2022 Banner'
//             }
//           }
//         },
//         id: 'event_banner'
//       }
//     ],
//     textModulesData: [
//       {
//         header: 'Gather points meeting new people at Google I/O',
//         body: 'Join the game and accumulate points in this badge by meeting other attendees in the event.',
//         id: 'game_overview'
//       }
//     ],
//     linksModuleData: {
//       uris: [
//         {
//           uri: 'https://io.google/2022/',
//           description: 'Official I/O \'22 Site',
//           id: 'official_site'
//         }
//       ]
//     }
//   };

//   try {
//     await httpClient.request({
//       url: `${baseUrl}/genericClass/${classId}`,
//       method: 'GET'
//     });
//     console.log('Class already exists');
//   } catch (err:any) {
//     if (err.response && err.response.status === 404) {
//       await httpClient.request({
//         url: `${baseUrl}/genericClass`,
//         method: 'POST',
//         data: genericClass
//       });
//       console.log('Class created');
//     } else {
//       throw err;
//     }
//   }
// }

// async function createPassObject(req: NextRequest, res: NextResponse) {
//   const { email, name, id } = await req.json();

//   if (!email || !name || !id) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   const objectSuffix = `${email.replace(/[^\w.-]/g, '_')}`;
//   const objectId = `${issuerId}.${objectSuffix}`;

//   const genericObject = {
//     id: `${objectId}`,
//     classId: classId,
//     genericType: 'GENERIC_TYPE_UNSPECIFIED',
//     hexBackgroundColor: '#0038FD',
//     logo: {
//       sourceUri: {
//         uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'
//       }
//     },
//     cardTitle: {
//       defaultValue: {
//         language: 'en',
//         value: 'Hushh Wallet'
//       }
//     },
//     subheader: {
//       defaultValue: {
//         language: 'en',
//         value: 'Name'
//       }
//     },
//     header: {
//       defaultValue: {
//         language: 'en',
//         value: name
//       }
//     },
//     barcode: {
//       type: 'QR_CODE',
//       value: `https://hushhconnect.vercel.app/profile/${id}/threads`
//     },
//     heroImage: {
//       sourceUri: {
//         uri: 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.jpg'
//       }
//     },
//     textModulesData: [
//       {
//         header: 'POINTS',
//         body: '1234',
//         id: 'points'
//       },
//       {
//         header: 'CONTACTS',
//         body: '20',
//         id: 'contacts'
//       }
//     ]
//   };

//   const claims = {
//     iss: credentials.client_email,
//     aud: 'google',
//     origins: [],
//     typ: 'savetowallet',
//     payload: {
//       genericObjects: [genericObject]
//     }
//   };

//   const token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });
//   const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

//   return NextResponse.json({ saveUrl }, { status: 200 });
// }

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    
    
    //await createPassClass();
    //return await createPassObject(req, res);
    return NextResponse.json({ error: credentialsPath }, { status: 400 });
  } catch (error) {
    console.error('Error creating pass:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ error: 'hi there' }, { status: 200 });
}