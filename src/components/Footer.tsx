import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 mt-auto">
            <div className="wrapper px-3 py-7 flex flex-col md:flex-row md:items-center justify-between">
                <div className="w-full md:w-1/6">
                    <h2 className="text-2xl font-bold mb-4">QIPs</h2>
                </div>

                <div className="w-full md:w-1/2 md:mx-10">
                    <p className="mb-4">
                        Qi Dao Improvement Proposals (QIPs) describe standards
                        for the Qi Dao platform, including core protocol
                        specifications, client APIs, and contract standards.
                    </p>
                </div>

                <div className="w-full md:w-1/3 text-lg font-semibold flex flex-col items-center md:items-start">
                    <p className="mb-4">Contact</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
