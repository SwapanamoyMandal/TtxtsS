import React from 'react';
import { FaPerson } from "react-icons/fa6";
import { useAppContext } from '../Context.jsx/AppContext';
// import { api } from '../Api/api'

const JoinRoomDetails = () => {
    const {setJoinRoomPage, userName,  setUserName,navigate,reqCode} = useAppContext()

    const onSubmitHandel = (e)=>{
        e.preventDefault()
    }
    return (
        <div onClick={()=>setJoinRoomPage(false)} className='flex justify-center items-center h-screen bg-black/60 fixed top-0 left-0 right-0 bottom-0'>
            <div onClick={(e)=>e.stopPropagation()} >
                <form onSubmit={(e)=>onSubmitHandel(e)} className="sm:w-70 w-60  text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                    <h1 className="text-gray-900 text-3xl mt-10 font-medium"><span className='text-red-500 font-medium'>J</span>oin</h1>
                    <p className="text-gray-500 text-sm mt-2">Please enter your name here</p>

                    <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <FaPerson className='text-gray-600' />
                        <input
                            type="text"
                            placeholder="your name"
                            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                            required
                            maxLength={20}
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                    </div>


                    <button  type="submit" onClick={()=>navigate(`Members/${reqCode}`)} className="my-8 w-30 h-11 rounded-full text-white bg-red-500 hover:opacity-90 transition-opacity">
                        enter room
                    </button>

                </form>
            </div>
        </div>
    );
};

export default JoinRoomDetails;
