import React from 'react'
import { GridLoader, RiseLoader, SyncLoader } from 'react-spinners'
const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center bg-gray-500/25 h-screen w-screen'>
      <RiseLoader
        size={25} color={'#d50909'}  />
    </div>
  )
}

export default LoadingPage