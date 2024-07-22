'use client';

import { convertSpeechtoText, getPostbyAI, getPostImagebyAI } from '@/lib/Actions/ai.action';
import Image from 'next/image';
import { startTransition, useState } from 'react';

export default function AudioRecorder({ setCaption, setFileUrl }:any) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    const audioChunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64data: any = reader.result;
        startTransition(async () => {
          const transcriptionRes = await convertSpeechtoText(base64data);
          setTranscription(transcriptionRes.toString());

          const textRes = await getPostbyAI(transcriptionRes.toString());
          if (textRes) {
            setGeneratedText(textRes.toString());
            setCaption(textRes.toString());
          }

          const imageRes = await getPostImagebyAI(transcriptionRes.toString());
          if (imageRes) {
            setGeneratedImage(imageRes.toString());
            setFileUrl(imageRes.toString());
          }
        });
      };
    };

    mediaRecorder.start();
    setIsRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setIsRecording(false);
    }, 5000); // Stop recording after 5 seconds
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      {transcription && <p>Transcription: {transcription}</p>}
      {generatedText && <p>Generated Text: {generatedText}</p>}
      {generatedImage && <div><Image src={generatedImage} alt="Generated Image" width={200} height={200}/></div>}
    </div>
  );
}
