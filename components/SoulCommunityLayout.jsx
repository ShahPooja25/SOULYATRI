// src/components/SoulCommunityLayout.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    ChatBubbleLeftRightIcon,
    PlusIcon,
    ChartBarIcon,
    UserCircleIcon,
    MagnifyingGlassIcon, // NEW: Import Search Icon
} from '@heroicons/react/24/solid'; // Note: MagnifyingGlassIcon is in solid, not outline

const SoulCommunityLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        if (path === '/community/main' && (currentPath === '/' || currentPath === '/community' || currentPath === '/community/main')) {
            return true;
        }
        if (path === '/community/create' && currentPath === '/community/create') {
            return true;
        }
        // Also consider the public profile route for active state if needed, but typically not for main nav
        if (path === '/community/search' && currentPath === '/community/search') {
            return true;
        }
        return currentPath === path;
    };

    const iconSizeClass = "w-5 h-5";
    const activeIconColor = "text-[#A3BF93]";
    const inactiveIconColor = "text-gray-500";

    const mobileIconWrapperBase = "flex flex-col items-center justify-center flex-1 h-full cursor-pointer";
    const mobileActiveIconWrapperStyle = `${mobileIconWrapperBase} bg-gray-200 p-1.5 rounded-full`;
    const mobileInactiveIconWrapperStyle = `${mobileIconWrapperBase} p-1.5`;

    return (
        <div className="w-full h-full flex">
            {/* Desktop Sidebar Navigation (visible on medium screens and up) */}
            <div className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-4 shadow-lg z-30">
                <div className="mb-8 mt-4 pl-4">
                    <h1 className="text-3xl font-bold text-[#3B2E2A] font-serif">Soul Yatri</h1>
                </div>

                <nav className="flex flex-col gap-2">
                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/profile') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => navigate('/profile')}
                    >
                        <UserCircleIcon className={`${iconSizeClass} ${isActive('/profile') ? activeIconColor : inactiveIconColor}`} />
                        <span>Profile</span>
                    </div>

                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/community/main') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => navigate('/community/main')}
                    >
                        <HomeIcon className={`${iconSizeClass} ${isActive('/community/main') ? activeIconColor : inactiveIconColor}`} />
                        <span>Home</span>
                    </div>

                    {/* NEW: Search Icon for Desktop */}
                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/community/search') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => navigate('/community/search')}
                    >
                        <MagnifyingGlassIcon className={`${iconSizeClass} ${isActive('/community/search') ? activeIconColor : inactiveIconColor}`} />
                        <span>Search</span>
                    </div>

                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/messages') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => alert('Messages')}
                    >
                        <ChatBubbleLeftRightIcon className={`${iconSizeClass} ${isActive('/messages') ? activeIconColor : inactiveIconColor}`} />
                        <span>Messages</span>
                    </div>

                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/community/create') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => navigate('/community/create')}
                    >
                        <PlusIcon className={`${iconSizeClass} ${isActive('/community/create') ? activeIconColor : inactiveIconColor}`} />
                        <span>Create Post</span>
                    </div>

                    <div
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer
                                        ${isActive('/community/discover') ? 'bg-gray-100 text-[#3B2E2A] font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => navigate('/community/discover')}
                    >
                        <ChartBarIcon className={`${iconSizeClass} ${isActive('/community/discover') ? activeIconColor : inactiveIconColor}`} />
                        <span>Filtered Community</span>
                    </div>
                </nav>
            </div>

            {/* Main Content Area */}
            {/* MODIFIED: Added min-h-[calc(100vh-4rem)] for mobile layout height */}
            <div className="flex-1 md:ml-64 relative z-0 flex flex-col">
                <div className="flex-grow min-h-[calc(100vh-4rem)] md:min-h-screen">
                    {children}
                </div>
                <div className="h-20 md:hidden" />
            </div>

            {/* Mobile Bottom Navigation (hidden on medium screens and up) */}
            <div className="fixed bottom-0 left-0 w-full z-20 md:hidden">
                <div className="relative bg-white border-t border-gray-300 px-2 flex justify-around items-center h-16">
                    {/* Home Icon */}
                    <div
                        className={isActive('/community/main') ? mobileActiveIconWrapperStyle : mobileInactiveIconWrapperStyle}
                        onClick={() => navigate('/community/main')}
                    >
                        <HomeIcon className={isActive('/community/main') ? activeIconColor : inactiveIconColor} />
                    </div>

                    {/* Messages Icon */}
                    <div
                        className={isActive('/messages') ? mobileActiveIconWrapperStyle : mobileInactiveIconWrapperStyle}
                        onClick={() => alert('Messages')}
                    >
                        <ChatBubbleLeftRightIcon className={isActive('/messages') ? activeIconColor : inactiveIconColor} />
                    </div>

                    {/* NEW: Search Icon for Mobile */}
                    <div
                        className={isActive('/community/search') ? mobileActiveIconWrapperStyle : mobileInactiveIconWrapperStyle}
                        onClick={() => navigate('/community/search')}
                    >
                        <MagnifyingGlassIcon className={isActive('/community/search') ? activeIconColor : inactiveIconColor} />
                    </div>

                    {/* Center Plus Button (unique styling, no background circle for active) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-5 bg-[#A3BF93] p-2.5 rounded-full shadow-md cursor-pointer"
                        onClick={() => navigate('/community/create')}
                    >
                        <PlusIcon className="w-6 h-6 text-white" />
                    </div>

                    {/* Chart Bar Icon */}
                    <div
                        className={isActive('/community/discover') ? mobileActiveIconWrapperStyle : mobileInactiveIconWrapperStyle}
                        onClick={() => navigate('/community/discover')}
                    >
                        <ChartBarIcon className={isActive('/community/discover') ? activeIconColor : inactiveIconColor} />
                    </div>

                    {/* User Circle Icon */}
                    <div
                        className={isActive('/profile') ? mobileActiveIconWrapperStyle : mobileInactiveIconWrapperStyle}
                        onClick={() => navigate('/profile')}
                    >
                        <UserCircleIcon className={isActive('/profile') ? activeIconColor : inactiveIconColor} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoulCommunityLayout;