import React from 'react';
import TemplateListItem from '../components/TemplateListItem';
import { sortBy, filter, flow } from 'lodash/fp';

//@ts-ignore
import statuses from '../../ps/statuses';

interface Props {
    templates: any;
}

const Templates: React.FC<Props> = ({templates:{nodes}}) => {
    
    return (
        <div className="proposal-list-container">
            <div className="shadow-s p-5">
                <h3 className="text-2xl font-semibold mb-1">Template</h3>
            </div>
                    <div
                        className="proposal-list-container"
                    >
                        <TemplateListItem templates= {nodes}/>
                    </div>
        </div>
    );
};

export default Templates;
