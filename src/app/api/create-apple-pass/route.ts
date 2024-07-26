import { NextRequest, NextResponse } from 'next/server';
import { PKPass } from 'passkit-generator';
import fs from 'fs';
import path from 'path';

const certificatePath = path.resolve(process.cwd(), 'src/Data/appleWallet/certificate/certificate.pem');
const keyPath = path.resolve(process.cwd(), 'src/Data/appleWallet/certificate/private.key');
const wwdrCertificatePath = path.resolve(process.cwd(), 'src/Data/appleWallet/certificate/WWDR.pem');

const passTemplatePath = path.resolve(process.cwd(), 'src/Data/appleWallet/template.pass');
console.log("certificatePath", certificatePath);
console.log("keyPath", keyPath);
console.log("wwdrCertificatePath", wwdrCertificatePath);
console.log("passTemplatePath", passTemplatePath);
console.log("process.env.CERTIFICATE_PASSPHRASE", process.env.CERTIFICATE_PASSPHRASE);
console.log("process.cwd()", process.cwd());

// async function createPassObject(req: NextRequest, res: NextResponse) {
//   const { email, name, id } = await req.json();

//   if (!email || !name || !id) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   const pass = await PKPass.from(
//     {
//     model: passTemplatePath,
    
//     certificates: {
//       wwdr: fs.readFileSync(wwdrCertificatePath),
//       signerCert: fs.readFileSync(certificatePath),
//       signerKey: fs.readFileSync(keyPath),
//       signerKeyPassphrase: process.env.CERTIFICATE_PASSPHRASE,
//     }
//   },{
//     serialNumber :`pass-${Date.now()}`
//   });

 
//   pass.setBarcodes({
//     format: 'PKBarcodeFormatQR',
//     message: `https://hushhconnect.vercel.app/profile/${id}/threads`,
//     messageEncoding: 'iso-8859-1'
//   });


//   pass.primaryFields.push({ key: 'name', label: 'Name', value: name });
//   pass.secondaryFields.push({ key: 'points', label: 'Points', value: '1234' });
//   pass.secondaryFields.push({ key: 'contacts', label: 'Contacts', value: '20' });
//   pass.localize('en', { name, id, email });
  
//   const buffer = await pass.getAsBuffer();
//   // pass.addBuffer('icon.svg',buffer);
//   // pass.addBuffer('icon.svg',fs.readFileSync(path.resolve(process.cwd(), 'src/Data/appleWallet/template.pass/logo.svg')));


//   res.headers.set('Content-Type', 'application/vnd.apple.pkpass');
//   res.headers.set('Content-Disposition', 'attachment; filename=hushh_wallet.pkpass');
  
//   return new NextResponse(buffer);
// }




async function createPassObject(req: NextRequest, res: NextResponse) {
  const { email, name, id } = await req.json();

  if (!email || !name || !id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const pass = await PKPass.from({
      model: passTemplatePath,
      certificates: {
        wwdr: Buffer.from(process.env.APPLE_WWDR_CERTIFICATE || '', 'utf-8'),
        signerCert: Buffer.from(process.env.APPLE_SIGNER_CERTIFICATE || '', 'utf-8'),
        signerKey: Buffer.from(process.env.APPLE_SIGNER_KEY || '', 'utf-8'),
        signerKeyPassphrase: process.env.CERTIFICATE_PASSPHRASE,
      }
    }, {
      serialNumber: `pass-${Date.now()}`,
      description: "Hushh Connect Pass",
      organizationName: "Hushh AI",
      passTypeIdentifier: "pass.com.hushhconnect.ai",
      teamIdentifier: "Technology",
      barcodes: [{
        format: 'PKBarcodeFormatQR',
        message: `https://hushhconnect.vercel.app/profile/${id}/threads`,
        messageEncoding: 'iso-8859-1'
      }],
    } as any); // Use 'as any' to bypass TypeScript checks

    // Set fields after pass creation
    pass.primaryFields.push(
      { key: 'name', label: 'Name', value: name }
    );
    pass.secondaryFields.push (
      { key: 'points', label: 'Points', value: '1234' },
      { key: 'contacts', label: 'Contacts', value: '20' }
    );

    pass.localize('en', { name, id, email });

    const buffer = await pass.getAsBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': 'inline; filename=hushh_wallet.pkpass'
      }
    });
  } catch (error) {
    console.error('Error creating pass:', error);
    return NextResponse.json({ error: 'Error creating pass,', message: error }, { status: 500 });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    return await createPassObject(req, res);
  } catch (error) {
    console.error('Error creating pass:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export default function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}