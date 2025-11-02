import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthstore } from "../store/useAuth";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const Homepage = () => {
    const { getUsers, selectedUser } = useChatStore();
    const { onlineUsers } = useAuthstore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="h-screen bg-gray-950 overflow-hidden">
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Chat Container */}
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
        </div>
    );
};

export default Homepage;