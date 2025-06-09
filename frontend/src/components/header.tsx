import React from 'react';

interface HeaderLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, children, className = '' }) => {
    const isActive = window.location.pathname === href;

    return (
        <a
            href={href}
            className={`relative px-6 py-3 text-white/90 hover:text-white font-medium transition-all duration-300 group ${isActive ? 'text-white' : ''} ${className}`}
        >
            {children}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-300 transform scale-x-0 group-hover:scale-x-50 transition-transform duration-300 ${isActive ? 'scale-x-30' : ''}`}></span>
        </a>
    );
};

interface HeaderProps {
    siteTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle = "WildWhiskers" }) => {
    const handleAdminLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        // Note: In a real React app, you'd use state management instead of localStorage
        // This is just for demonstration purposes
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        } else {
            window.location.href = "/login";
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-100 shadow-xl border-b border-blue-700/30">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-sky-100/85 backdrop-blur-sm"></div>
            <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <img
                            src="/image.png"
                            alt="Vite Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <h2 className="text-2xl font-bold text-white font-sans">
                            <a
                                href="/"
                                className="text-white hover:text-orange-300 transition-colors duration-300 no-underline"
                            >
                                {siteTitle}
                            </a>
                        </h2>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
                        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20">
                            <HeaderLink href="/">Home</HeaderLink>
                            <HeaderLink href="/about">About</HeaderLink>
                        </div>

                        <div className="ml-8">
                            <a
                                href="/login"
                                className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
                                onClick={handleAdminLogin}
                            >
                                <span className="relative z-10">Admin Login</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden">
                        <a
                            href="/login"
                            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
                            onClick={handleAdminLogin}
                        >
                            Login
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;