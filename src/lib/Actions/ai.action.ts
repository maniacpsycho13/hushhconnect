'use server'

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import OpenAI from 'openai';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function convertSpeechtoText(base64data: string) {
  if (!base64data) {
    return { error: 'Something went wrong' };
  }

  const tempFilePath = path.join('/tmp', `${uuidv4()}.wav`);

  try {
    // Convert Base64 to Buffer
    const buffer = Buffer.from(base64data.split(',')[1], 'base64');

    // Write Buffer to temporary file
    await writeFile(tempFilePath, buffer);

    // Transcribe the audio file
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
      language: 'en',
    });

    console.log(transcription.text);

    // Clean up temporary file
    await unlink(tempFilePath);

    return transcription.text;
  } catch (error) {
    console.error('Error during transcription:', error);

    // Ensure the temporary file is removed in case of error
    await unlink(tempFilePath).catch((err) => console.error('Error removing temp file:', err));

    return { error: 'Something went wrong' };
  }
}


export async function getPostbyAI(content:string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        "role": "system",
        "content": "You are a helpful assistant. You will generate content for Content Creaters . You will help them to write content about there post. Post should be around 20-30 words and can use emojis . No highlighted or bullet points. just a simple caption "
      },
      {
        "role": "user",
        "content": `${content}`
      }
    ],
    model: "gpt-4o-mini",
  });

  return completion.choices[0].message.content
}

export async function getPostImagebyAI(content:string) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `${content}`,
    n: 1,
    size: "1024x1024",
  });
  return  response.data[0].url;

}