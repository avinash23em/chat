import Logo from "./Logo";
import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-950">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <Logo className="w-20 h-20" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to ChitChat!</h2>
                <p className="text-gray-400 mb-6">Select a user from the sidebar to start chatting</p>
                <div className="flex items-center justify-center gap-2 text-gray-500">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">Your messages will appear here</span>
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;
