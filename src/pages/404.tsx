import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Go to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
