import { Children, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()

    const [joinRoomPage, setJoinRoomPage] = useState(false)
    const [createRoomPage, setCreateRoomPage] = useState(false)
    const [username, setUserName] = useState(null)
    const [quantity, setQuantity] = useState()

    const [lockRoom, setLockRoom] = useState(false);
    const [id, setId] = useState(null)
    const [reqCode, setReqCode] = useState('');

    const [isLoading,setIsLoading] = useState(false)

    const [membersCount,setMembersCount] = useState(0)

    const [removeRoomWarning,setRemoveRoomWarning] = useState(false)

    const socket = io('http://localhost:3001');

    const handleCopy = async (id) => {
        try {
            await navigator.clipboard.writeText(id);
            toast.success("code copid")
        } catch (error) {
            toast.error("failed to copy code")
        }
    };

    const value = { joinRoomPage, setJoinRoomPage, username, setUserName, createRoomPage, setCreateRoomPage, lockRoom, setLockRoom, io, id, setId, navigate, socket, reqCode, setReqCode, handleCopy,membersCount,setMembersCount,isLoading,setIsLoading,removeRoomWarning,setRemoveRoomWarning }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}