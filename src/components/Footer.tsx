import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-200 mt-auto">
        <div className="wrapper px-3 py-7 flex flex-col md:flex-row md:items-center">
          <div className="w-fit md:w-1/6">
            <h2 className="text-2xl font-bold mb-4">QIPs</h2>
          </div>

          <div className="w-full px-10 lg:px-6 md:px-0">
            <p className="w-full  mb-4">
              Qi Dao Improvement Proposals (QIPs) describe standards for the Qi Dao platform, including core protocol specifications, client
              APIs, and contract standards.
            </p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
