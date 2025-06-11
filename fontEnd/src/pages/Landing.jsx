import React from 'react'
import CodeInput from '../components/CodeInput'
import CreateRoom from '../components/CreateRoom'
import { useAppContext } from '../Context.jsx/AppContext'
import JoinRoomDetails from '../components/JoinRoomDetails'
import CreateRoomDetails from '../components/CreateRoomDetails'

const Landing = () => {
  const { joinRoomPage, setJoinRoomPage, createRoomPage, setCreateRoomPage } = useAppContext()
  return (
    <>
      <main className='bg-gray-400 h-screen flex justify-center items-start sm:items-center px-10 py-10 sm:px-0 sm:py-0'>
        <div className='bg-white shadow-2xl shadow-blue-100/50 container mx-auto w-2xl sm:w-4xl md:w-6xl lg:w-8xl  border-2 rounded-2xl '>
          <div className='grid grid-cols-1 items-center sm:grid-cols-2'>

            <Left />
            <Right />
          </div>
        </div>
        {joinRoomPage ? (<JoinRoomDetails />) : ''}
        {createRoomPage ? (<CreateRoomDetails />) : ''}
      </main>
    </>
  )
}

const Left = () => {
  return (<>
    <div className='bg-gradient-to-l to-black from-red-700 rounded-t-2xl  sm:rounded-l-2xl h-auto'>
      <div className='px-5 py-10 sm:py-15 lg:py-30 md:py-25 space-y-5 sm:space-y-0'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl text-white font-bold uppercase'>
          TtxtsS
        </h1>
        <h4 className='text-lg sm:text-xl md:text-2xl text-white font-medium px-3 sm:px-5px md:px-10 mt-2'>
          Temporary texting Service
        </h4>
        <p className='text-white sm:mt-6 md:mt-10'>Create a secure, private chat room. Share the code, chat in real-time, and delete when done. ⚠️ Don’t refresh the page after joining a room.</p>
      </div>
    </div>
  </>)
}

const Right = () => {

  return (<>
    <div>
      <div className='flex flex-col items-center gap-10 sm:gap-20 sm:py-0 py-20'>
        <div  >
          <CodeInput />
        </div>
        <div >
          <CreateRoom />
        </div>
      </div>
    </div>
  </>)
}
export default Landing