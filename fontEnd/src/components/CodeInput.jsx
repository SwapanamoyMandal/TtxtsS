import React, { useState } from 'react'
import { ImEnter } from "react-icons/im";
import { useAppContext } from '../Context.jsx/AppContext';
import { api } from '../Api/api'
import toast from 'react-hot-toast'
import LoadingPage from './roomComponents/LoadingPage';

const CodeInput = () => {

  const { joinRoomPage, setJoinRoomPage, reqCode, setReqCode, isLoading, setIsLoading } = useAppContext()

  const handelJoinRoom = async () => {
    try {
      setIsLoading(true)
      const res = await api.post("/room/joininroom", { id: reqCode })

      if (res.data.success) {
        toast.success("vaild code")
        setJoinRoomPage(true);
      }
      else {
        console.log("user enter invaild id")
        toast.error("invaild code")
      }
    } catch (error) {
      toast.error("invaild code")
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <div>
          <h1 className='text-2xl sm:text-4xl font-medium'>enter <span className='text-red-600 font-bold'>Code</span></h1>
        </div>

        <div className='mt-3 flex justify-center items-center gap-3'>
          <input maxLength={6} className='text-xl sm:text-2xl border border-gray-600 w-45 sm:w-60 p-3 rounded-2xl focus:ring-2 ring-red-600' placeholder='enter code' type='text' value={reqCode} onChange={(e) => setReqCode(e.target.value)} />

          <div className={`${reqCode.length < 6 ? "hidden" : ""}`} >
            <button onClick={() => { handelJoinRoom() }} className=" text-white rounded-2xl transition duration-300">
              <ImEnter className='text-red-500 text-3xl sm:text-4xl' />
            </button>
          </div>

        </div>
      </div>
      {isLoading ? <div className='absolute top-0 right-0 h-full w-full z-50'  >
        <LoadingPage />
      </div> : ''}
    </>
  )
}

export default CodeInput