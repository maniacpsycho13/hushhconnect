import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='bg-white  flex justify-center items-center z-100'>
        <FadeLoader color="rgba(200, 73, 168, 1)" />
    </div>
  )
}

export default Loader