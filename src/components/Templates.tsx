import React from 'react';

const Templates = () => {
    return (
        <div className="proposal-list-container">
            <div className="shadow-s p-5">
                <h3 className="text-2xl font-semibold mb-1">Templates</h3>
            </div>
            <div className="mb-3 block px-7 text-skin-text sm:px-7">
               <ul className="">
                <li className='mb-1'><a target="_blank" className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://github.com/publu/QIPs/blob/main/General-QIP-Template.md">General-QIP-Template</a></li>
                <li className='mb-1'><a target='_blank' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://github.com/publu/QIPs/blob/main/New-Asset-Template.md">New-Asset-Template</a></li>
                <li className='mb-1'><a target='_blank' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://github.com/publu/QIPs/blob/main/QIP-Procedures.md">QIP-Procedures</a></li>
               </ul>
            </div>
        </div>
    );
};

export default Templates;
