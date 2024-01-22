import React from 'react';
import { graphql } from 'gatsby';
import ProposalListItem from '../components/ProposalListItem';
import { sortBy, filter, flow } from 'lodash/fp';

//@ts-ignore
import statuses from '../../ps/statuses';
import Layout from '../layout';

import Templates from '../components/Templates';
interface Props {
    data: any;
}

// All Proposals component
const AllProposals: React.FC<Props> = ({
    data: { allMarkdownRemark, templates },
}) => {

    const _statuses = statuses.map((status:any) =>status.toLowerCase());
    const { group } = allMarkdownRemark;
    const columns = flow(
        filter(({ fieldValue }) => _statuses.indexOf(fieldValue.toLowerCase()) > -1),
        sortBy(({ fieldValue }) => statuses.indexOf(fieldValue))
    )(group) as any;

    return (
        <Layout>
            <div className="content mt-30 overflow-y-auto h-screen flex justify-center items-start">
                <div
                    id="content-center"
                    className="relative w-full pl-0 lg:w-3/4 lg:pl-5 mt-20"
                >
                    <div className="mb-3 space-y-3 px-3">
                        <Templates templates={templates} />

                        <div className="mb-16"></div>

                        {columns.map((column: any) => {
                            const proposals = sortBy('frontmatter.qip')(
                                column.nodes
                            );
                            return (
                                <div
                                    key={column.fieldValue}
                                    className="proposal-list-container"
                                >
                                    <div className="shadow-s p-5">
                                        <h3 className="text-2xl font-semibold mb-3">
                                            {column.fieldValue}
                                        </h3>
                                    </div>

                                    <ProposalListItem proposals={proposals} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query {
        allMarkdownRemark(
            filter: {
                fileAbsolutePath: { regex: "/QIP/" }
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

        templates: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/template/" } }) {
            nodes {
                parent {
                    ... on File {
                        base
                    }
                }
                frontmatter {
                    qip
                    title
                    author
                }
                html
            }
        }
        
    }
`;

export default AllProposals;
