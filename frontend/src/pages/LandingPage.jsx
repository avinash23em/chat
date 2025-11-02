import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { MessageCircle, Users, Shield } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-20">
                    {/* Logo and Brand */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Logo className="w-20 h-20" />
                        <h1 className="text-6xl font-bold text-white">ChitChat</h1>
                    </div>
                    <p className="text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Connect instantly with friends and family. Simple, fast, and secure messaging.
                    </p>
                    <Link
                        to="/auth"
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Features Section */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Why ChitChat?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition">
                            <div className="bg-blue-500 bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <MessageCircle className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Real-time Messaging</h3>
                            <p className="text-gray-400 text-lg">
                                Send and receive messages instantly with real-time updates powered by Socket.io.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition">
                            <div className="bg-purple-500 bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Online Status</h3>
                            <p className="text-gray-400 text-lg">
                                See who's online and available to chat right now with live status updates.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-green-500 transition md:col-span-2">
                            <div className="bg-green-500 bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                <Shield className="w-7 h-7 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3 text-center">Secure Authentication</h3>
                            <p className="text-gray-400 text-lg text-center max-w-2xl mx-auto">
                                Sign in securely with your Google account. No passwords to remember, just simple and safe authentication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Chatting?</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Join ChitChat today and connect with your friends instantly.
                    </p>
                    <Link
                        to="/auth"
                        className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                    >
                        Sign in with Google
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
