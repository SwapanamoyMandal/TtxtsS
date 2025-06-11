import React from 'react';
import { useAppContext } from '../../Context.jsx/AppContext';

const RoomDeleteWarning = () => {
  const { removeRoomWarning, setRemoveRoomWarning } = useAppContext();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[80%] max-w-md p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold text-center text-red-600 mb-4">Room No Longer Exists</h1>
        <p className="text-gray-700 text-sm mb-6 text-center">
          This room has been deleted by the admin. If you'd like to continue chatting, please create a new room and share the code with your friends.
        </p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300"
          onClick={() => setRemoveRoomWarning(false)}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default RoomDeleteWarning;
