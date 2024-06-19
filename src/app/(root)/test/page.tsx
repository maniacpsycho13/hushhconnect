'use client'
import { MultiFileDropzoneUsage } from "@/components/Post/MainFileUpload";
import ReactPlayer from 'react-player/lazy'



export default function Page() {
  return (
    <div>
      <MultiFileDropzoneUsage/>
      {/* <ReactPlayer url={'https://files.edgestore.dev/r5mk8liyue68uor3/publicFiles/_public/fda33ecf-5d06-48b5-aed4-5e95f1b246e7.mp4'}/> */}
      <iframe src="https://files.edgestore.dev/r5mk8liyue68uor3/publi…/_public/60190272-ec39-48cc-8ef4-81674a38b6bb.mp4" 
      ></iframe>
    </div>
  )
}


