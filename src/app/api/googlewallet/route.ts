// // src/app/api/create-pass/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { createJwt } from '@/lib/createJWT';
// import { User } from '@prisma/client'; // Adjust the import based on your actual User model location

import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { name, email, id } = await req.json();

//   // Ensure the necessary fields are provided
//   if (!name || !email || !id) {
//     return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//   }

//   // Create a User object
//   const userDetails :{id:string , name:string , email:string}= {
//     id,
//     name,
//     email,
//   }

//   try {
//     const jwt = createJwt(userDetails);
//     return NextResponse.json({
//       url: `https://pay.google.com/gp/v/save/${jwt}`,
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Error creating JWT:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  return NextResponse.json({ saveUrl: 'Not implemented' }, { status: 200 });
}