// 'use client'
// import { MultiFileDropzoneUsage } from "@/components/Post/MainFileUpload";
// import ReactPlayer from 'react-player/lazy'

import AudioRecorder from "@/components/AudioRecoder";



// export default function Page() {
//   return (
//     <div>
//       <MultiFileDropzoneUsage/>
//       {/* <ReactPlayer url={'https://files.edgestore.dev/r5mk8liyue68uor3/publicFiles/_public/fda33ecf-5d06-48b5-aed4-5e95f1b246e7.mp4'}/> */}
//       <iframe src="https://files.edgestore.dev/r5mk8liyue68uor3/publicFiles/_public/fda33ecf-5d06-48b5-aed4-5e95f1b246e7.mp4" 
//       ></iframe>
//     </div>
//   )
// }

export default function Page() {
  return (
    <div>
      <h1>Speech to text</h1>
      <AudioRecorder/>
    </div>
  )
}

