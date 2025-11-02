import { useChatStore } from "../store/useChatStore";
import { useAuthstore } from "../store/useAuth";
import { Link } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";

const Sidebar = () => {
    const { users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers, logout } = useAuthstore();

    if (isUsersLoading) {
        return (
            <div className="w-80 border-r border-gray-800 bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400">Loading users...</p>
            </div>
        );
    }

    return (
        <aside className="w-80 border-r border-gray-800 bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Messages</h2>
                <p className="text-sm text-gray-400 mt-1">{users.length} users available</p>
            </div>

            {/* Users List */}
            <div className="overflow-y-auto flex-1">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-800 transition border-b border-gray-800 ${
                            selectedUser?._id === user._id ? "bg-gray-800" : ""
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            {user.profilepic ? (
                                <img
                                    src={user.profilepic}
                                    alt={user.fullName}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {user.fullName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            {/* Online Status */}
                            {onlineUsers.includes(user._id) && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-white">{user.fullName}</p>
                            {onlineUsers.includes(user._id) && (
                                <p className="text-xs text-green-400">Online</p>
                            )}
                        </div>
                    </button>
                ))}

                {users.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                        <p>No users found</p>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-800 p-4 space-y-2">
                <Link
                    to="/settings"
                    className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </Link>
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
