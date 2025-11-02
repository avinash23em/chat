import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthstore } from "../store/useAuth";
import { Smile, Image, X } from "lucide-react";
import toast from "react-hot-toast";

const CHAT_EMOJIS = ["😀", "😂", "😍", "🥰", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "✨", "💯", "👋", "🙌", "💪", "🎊"];

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        sendMessage,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
        isMessagesLoading,
    } = useChatStore();

    const { authUser } = useAuthstore();
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        // Only scroll if messages are loaded
        if (messages.length > 0 && !isMessagesLoading) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, isMessagesLoading]);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
        };
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            // Show loading toast if sending image
            if (imagePreview) {
                toast.loading("Uploading image...", { id: "upload" });
            }
            
            await sendMessage({ 
                text: text.trim(),
                image: imagePreview 
            });
            
            // Dismiss loading toast
            if (imagePreview) {
                toast.dismiss("upload");
                toast.success("Image sent!");
            }
            
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            toast.dismiss("upload");
            toast.error("Failed to send message");
            console.log(error);
        }
    };

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-950">
                <p className="text-gray-400">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-950">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 bg-gray-900">
                <div className="flex items-center space-x-3">
                    {selectedUser.profilepic ? (
                        <img
                            src={selectedUser.profilepic}
                            alt={selectedUser.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {selectedUser.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-white">{selectedUser.fullName}</h3>
                        <p className="text-sm text-gray-400">Online</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`flex ${
                            message.senderId === authUser._id ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                message.senderId === authUser._id
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    : "bg-gray-800 text-white border border-gray-700"
                            }`}
                        >
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="attachment"
                                    className="rounded-lg mb-2 max-w-full"
                                    onError={(e) => {
                                        console.error("Image failed to load:", message.image);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                            {message.text && <p className="break-words">{message.text}</p>}
                            <p
                                className={`text-xs mt-1 ${
                                    message.senderId === authUser._id
                                        ? "text-blue-100"
                                        : "text-gray-400"
                                }`}
                            >
                                {new Date(message.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />

                {messages.length === 0 && (
                    <div className="text-center text-gray-400 mt-8">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900">
                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-3 relative inline-block">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="relative">
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl z-10">
                            <div className="grid grid-cols-8 gap-2">
                                {CHAT_EMOJIS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => {
                                            setText(text + emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                        className="text-2xl hover:bg-gray-700 p-2 rounded transition"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="bg-gray-800 text-gray-400 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <Smile className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gray-800 text-gray-400 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <Image className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={!text.trim() && !imagePreview}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChatContainer;
