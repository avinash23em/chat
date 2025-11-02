const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Chat bubble */}
            <path
                d="M20 30C20 24.4772 24.4772 20 30 20H70C75.5228 20 80 24.4772 80 30V55C80 60.5228 75.5228 65 70 65H45L30 75V65H30C24.4772 65 20 60.5228 20 55V30Z"
                fill="url(#gradient1)"
            />
            {/* Inner dots */}
            <circle cx="35" cy="42" r="4" fill="white" />
            <circle cx="50" cy="42" r="4" fill="white" />
            <circle cx="65" cy="42" r="4" fill="white" />
            {/* Gradient definition */}
            <defs>
                <linearGradient id="gradient1" x1="20" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Logo;
