import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContextProvider, useAppContext } from '../Context.jsx/AppContext';
import { api } from '../Api/api'
import { FaRegCopy } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useRef } from 'react';
import LoadingPage from '../components/roomComponents/LoadingPage';

const Admin = () => {
  const { id } = useParams();
  const { socket, username, navigate, setCreateRoomPage, handleCopy, membersCount, setMembersCount, isLoading, setIsLoading } = useAppContext()
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);


  //massageing funtions
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", { id, message, username });
      setMessage("");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  useEffect(() => {
    socket.emit("join-room", id);

    socket.on("receive-message", (msg) => {
      setChat((prev) => [...prev, msg]); // CORRECT
    });

    socket.emit('members_count', id)
    socket.on('numbers_of_mumbers', (num) => {
      setMembersCount(num)
    })

    return () => {
      socket.emit("leave-room", id);
      socket.off("receive-message");
    };
  }, [id, socket]);


  const messagesEndRef = useRef(null) // ✅ NEW: Ref for auto-scroll to bottom

  useEffect(() => {
    // ✅ NEW: Scroll to the latest message whenever chat updates
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])



  const removeRoom = async () => {
    try {
      setIsLoading(true)
      const response = await api.post('/room/deleteroom', { id: id })
      if (response.data.success) {
        socket.emit('remove_members', id,);
        navigate('/');
        setCreateRoomPage(false);
      } else {
        navigate('/');
        console.log("error in response please check removeRoom funtion")
      }
    } catch (error) {
      navigate('/');
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center">
        <div className="flex flex-col w-full h-screen bg-white shadow-md"> {/* Full height */}

          {/* Navbar */}
          <div className="bg-red-700/80 p-3 sm:p-4 md:p-5 text-white flex justify-between sticky items-center top-0 z-10">
            <div className='flex justify-between items-center'>
              <div onClick={async () => { await removeRoom() }}>
                <IoExitOutline className='scale-100 sm:scale-150 md:scale-200 ml-1 sm:ml-5 mr-3 sm:mr-10 md:mr-30 -rotate-180' />
              </div>
              <span className="text-md sm:text-3xl md:text-3xl font-sans font-semibold">
                TtxtsS Id - <span className='border border-dashed px-3 py-1 rounded-md'>{id}</span>
              </span>
              <button onClick={() => handleCopy(id)}>
                <FaRegCopy className='scale-100 sm:scale-150 md:scale-200 mx-2 sm:mx-4' />
              </button>
            </div>

            <div>
              <div className='border border-dashed px-3 py-1 font-bold text-sm sm:text-md md:text-xl mx-2 sm:mx-5 rounded-md flex items-center justify-between gap-2'>
                <h1>{membersCount} - </h1>
                <HiMiniUserGroup className='scale-150 mx-2' />
              </div>
            </div>
          </div>

          {/* Chat Area (messages + input) */}
          <div className="flex flex-col flex-1 overflow-hidden ">

            {/* Scrollable Chat Messages */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 space-y-2 no-scrollbar">
              <div className="flex flex-col space-y-2">
                {chat.map((msg, id) => (
                  msg.system ? (
                    <div key={id} className="text-center text-gray-500 text-xl italic">{msg.message}</div>
                  ) : (
                    <div key={id} className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${msg.username === username ? 'bg-red-200' : 'bg-blue-300'} text-black p-2 rounded-lg max-w-[75%] sm:max-w-sm md:max-w-md transition-all duration-300 ease-in-out`}>
                        <span className="block font-semibold text-sm">{msg.username}</span>
                        <span>{msg.message}</span>
                      </div>
                    </div>
                  )
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Field */}
            <div className='border-t bg-white p-3 sm:p-4 md:p-5'>
              <div className="flex items-center w-full">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendMessage()
                  }}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button onClick={() => sendMessage()} className="bg-red-500 text-white rounded-full p-5 ml-3 hover:bg-blue-600">
                  <TbSend className='scale-200' />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
      {isLoading ? <div className='absolute top-0 right-0 h-full w-full z-50'  >
        <LoadingPage />
      </div> : ''}
    </>
  );
};

export default Admin;
