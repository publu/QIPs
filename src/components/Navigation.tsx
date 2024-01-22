import React from 'react';

// Navigation component
const Navigation = () => {
    return (
        <nav className="navbar bg-gray-200 w-full fixed top-0 p-4 flex justify-center items-center z-50">
            <div className="flex justify-center w-[50%]">
                <span>
                    <img src="/icons/icon-48x48.png" />
                </span>
                <span className="mt-2">
                    <a href="/" className="ml-2 text-xl font-bold">
                        Proposals
                    </a>
                </span>
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