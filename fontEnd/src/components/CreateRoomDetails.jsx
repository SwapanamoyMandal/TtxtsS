import React from 'react';
import { FaPerson } from "react-icons/fa6";
import { useAppContext } from '../Context.jsx/AppContext';
import Switch from './Switch';
import MembersQunatity from './MembersQunatity'
import { api } from '../Api/api'
import toast from 'react-hot-toast';
import LoadingPage from './roomComponents/LoadingPage'
const CreateRoomDetails = () => {
    const { setCreateRoomPage, username, setUserName, navigate, setId, lockRoom, quantity, isLoading, setIsLoading } = useAppContext()



    function generateID() {
        let length = 6
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const handelCreateRoom = async (roomId) => {
        try {
            setIsLoading(true)
            // console.log({ username, id: roomId, lockRoom, quantity })
            const res = await api.post('/room/saveroominfo', { username, id: roomId, lock: lockRoom, roomtime: quantity })
            // console.log("post api checked")
            toast.success('room created successfully')
        } catch (error) {
            navigate('/')
            console.log(error)
            toast.error('room created failed')
        } finally {
            setIsLoading(false)
        }
    }


    const onSubmitHandel = async (e) => {
        e.preventDefault()

        // console.log('checked')
        const roomId = generateID();
        // console.log("button caked")
        await handelCreateRoom(roomId);
        await setId(roomId);
        navigate(`/Admin/${roomId}`);
    }

    return (
        <>
            <div onClick={() => setCreateRoomPage(false)} className='flex justify-center items-center h-screen bg-black/60 fixed top-0 left-0 right-0 bottom-0'>
                <div onClick={(e) => e.stopPropagation()} >
                    <form onSubmit={(e) => onSubmitHandel(e)} className="sm:w-70 w-70  text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                        <h1 className="text-gray-900 text-3xl mt-10 font-medium"><span className='text-red-500 font-medium'>C</span>reate</h1>
                        <p className="text-gray-500 text-sm mt-2">enter your room for chating</p>

                        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <FaPerson className='text-gray-600' />
                            <input
                                type="text"
                                placeholder="your name"
                                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                                required
                                maxLength={20}
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row justify-center items-center   gap-5 sm:gap-10 mt-6'>
                            <Switch />
                            <MembersQunatity />
                        </div>


                        <button
                            type='submit'
                            className="my-8 w-30 h-11 rounded-full text-white bg-red-500 hover:opacity-90 transition-opacity">
                            Create
                        </button>

                    </form>
                </div>
            </div>
            {isLoading ? <div className='absolute top-0 right-0 w-full h-full z-50'  >
                <LoadingPage  />
            </div> : ''}
        </>
    );
};

export default CreateRoomDetails;
