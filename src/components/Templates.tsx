import React from 'react';
import { graphql } from 'gatsby';
import TemplateListItem from '../components/TemplateListItem';
import { sortBy, filter, flow } from 'lodash/fp';

//@ts-ignore
import statuses from '../../ps/statuses';

interface Props {
    data: any;
}

const Templates: React.FC<Props> = ({ data }) => {
    const { group } = data;

    const columns = flow(
        filter(({ fieldValue }) => statuses.indexOf(fieldValue) > -1),
        sortBy(({ fieldValue }) => statuses.indexOf(fieldValue))
    )(group) as any;

    return (
        <div className="proposal-list-container">
            <div className="shadow-s p-5">
                <h3 className="text-2xl font-semibold mb-1">Templates</h3>
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

export const query = graphql`
    query {
        allMarkdownRemark(
            filter: {
                fileAbsolutePath: { regex: "/Templates/" }
                frontmatter: { qip: { ne: null } }
            }
        ) {
            group(field: { frontmatter: { status: SELECT } }) {
                fieldValue
                totalCount
                nodes {
                    id
                    frontmatter {
                        qip
                        title
                        shortDescription
                        author
                        network
                        type
                        proposal
                        implementor
                        release
                        created
                        updated
                        status
                    }
                }
            }
        }
    }
`;

export default Templates;
