import { Link } from "react-router-dom";
import { useAuthstore } from "../store/useAuth";
import Logo from "./Logo";

const Navbar = () => {
    const { authUser } = useAuthstore();

    return (
        <nav className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <Logo className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">ChitChat</span>
                    </Link>

                    {/* User Info - Simple Display */}
                    {authUser && (
                        <div className="flex items-center space-x-3">
                            {authUser.profilepic ? (
                                <img
                                    src={authUser.profilepic}
                                    alt={authUser.fullName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    {authUser.fullName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="text-sm font-medium text-white hidden sm:block">
                                {authUser.fullName}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;