import { useState } from "react";
import { useAuthstore } from "../store/useAuth";

const Profilepage = () => {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthstore();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
                        <p className="text-gray-600">Manage your profile information</p>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl overflow-hidden">
                                {authUser.profilepic && authUser.profilepic.trim() !== "" ? (
                                    <img
                                        src={selectedImage || authUser.profilepic}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    authUser.fullName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                            Click the icon to upload a new profile picture
                        </p>
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                                {authUser.fullName}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                                {authUser.email}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Type
                            </label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                                {authUser.authProvider === "google" ? (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        Google Account
                                    </span>
                                ) : (
                                    "Email/Password"
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Member Since
                            </label>
                            <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                                {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </div>

                    {isUpdatingProfile && (
                        <div className="mt-6 text-center text-blue-600">
                            Updating profile...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profilepage;