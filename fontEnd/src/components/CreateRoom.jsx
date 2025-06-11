import React from 'react'
import { useAppContext } from '../Context.jsx/AppContext'

const CreateRoom = () => {
  const {createRoomPage , setCreateRoomPage, navigate} = useAppContext()
  return (
    <div>
      <div >
        <button onClick={()=>setCreateRoomPage(true)} className='hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer group hover:border-red-600 hover:text-black border-2 border-black  text-pruple-700 px-6 py-2 rounded-lg flex items-center text-2xl font-medium gap-3 justify-center'>
          <span className=' text-2xl sm:text-4xl'>create <span className='text-red-500'>room</span> </span>
        </button>
      </div>
    </div>
  )
}

export default CreateRoom