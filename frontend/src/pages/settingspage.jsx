import { useState } from "react";
import { useAuthstore } from "../store/useAuth";
import { Camera, User } from "lucide-react";
import toast from "react-hot-toast";

const Settingspage = () => {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthstore();
    const [fullName, setFullName] = useState(authUser?.fullName || "");

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilepic: base64Image });
        };
    };

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if (!fullName.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        if (fullName === authUser.fullName) {
            toast.error("Please enter a different name");
            return;
        }

        await updateProfile({ fullName });
    };

    return (
        <div className="min-h-screen bg-gray-950 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                        <p className="text-gray-400">Customize your profile</p>
                    </div>

                    <div className="space-y-6">
                        {/* Profile Picture Section */}
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Camera className="w-5 h-5" />
                                Profile Picture
                            </h3>
                            
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    {authUser?.profilepic ? (
                                        <img
                                            src={authUser.profilepic}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl border-4 border-gray-700">
                                            {authUser?.fullName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition cursor-pointer inline-block">
                                        Upload Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={isUpdatingProfile}
                                        />
                                    </label>
                                    <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF (Max 5MB)</p>
                                </div>
                            </div>
                        </div>

                        {/* Update Name Section */}
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Display Name
                            </h3>
                            <form onSubmit={handleUpdateName} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-gray-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isUpdatingProfile}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUpdatingProfile ? "Updating..." : "Update Name"}
                                </button>
                            </form>
                        </div>

                        {/* Info */}
                        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 p-4 rounded-lg">
                            <p className="text-sm text-blue-300">
                                Your profile changes will be visible to all users in the chat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settingspage;