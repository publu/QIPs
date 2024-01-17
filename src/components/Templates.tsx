import React from 'react';
import TemplateListItem from '../components/TemplateListItem';
import { sortBy, filter, flow } from 'lodash/fp';

//@ts-ignore
import statuses from '../../ps/statuses';

interface Props {
    data: any;
}

const Templates: React.FC<Props> = ({ data }) => {
    
    console.log(data)
    const { group } = data;

    const columns = flow(
        filter(({ fieldValue }) => statuses.indexOf(fieldValue) > -1),
        sortBy(({ fieldValue }) => statuses.indexOf(fieldValue))
    )(group) as any;

    return (
        <div className="proposal-list-container">
            <div className="shadow-s p-5">
                <h3 className="text-2xl font-semibold mb-1 text-orange-600">Template</h3>
            </div>

            {columns.map((column: any) => {
                const templates = sortBy('frontmatter.qip')(
                    column.nodes
                );
                return (
                    <div
                        key={column.fieldValue}
                        className="proposal-list-container"
                    >
                        {/* <div className="shadow-s p-5">
                            <h3 className="text-2xl font-semibold mb-3">
                                {column.fieldValue}
                            </h3>
                        </div> */}

                        <TemplateListItem templates={templates} />
                    </div>
                );
            })}
        </div>
    );
};

export default Templates;
