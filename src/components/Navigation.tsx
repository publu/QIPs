import React from 'react';

// Navigation component
const Navigation = () => {
    return (
        <nav className="navbar bg-gray-200 w-full fixed top-0 p-4 flex justify-center items-center z-50">
            <div className="flex justify-center w-[50%]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-skin-link"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                </svg>
                <a href="/" className="ml-2 text-xl font-bold">Proposals</a>
            </div>
            <div className="flex justify-center w-[50%]">
                <a
                    href="/all-proposals"
                    className="text-skin-link cursor-pointer"
                >
                    All Proposals
                </a>
            </div>
        </nav>
    );
};

export default Navigation