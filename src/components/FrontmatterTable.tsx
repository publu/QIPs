import React from 'react';
import { format } from 'date-fns';
import { graphql } from 'gatsby';

import Author from './Author';

interface Props {
    frontmatter: any;
}

const FrontmatterTable: React.FC<Props> = ({ frontmatter }) => {
    return (
        <table className="border border-collapse bg-gray-50 min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <th className="py-3 px-6 text-left font-bold">Author</th>
                    <td className="py-3 px-6">
                        <Author author={frontmatter.author} />
                    </td>
                </tr>
                <tr>
                    <th className="py-3 px-6 text-left font-bold">Status</th>
                    <td className="py-3 px-6">{frontmatter.status}</td>
                </tr>
                {frontmatter.type && (
                    <tr>
                        <th className="py-3 px-6 text-left font-bold">Type</th>
                        <td className="py-3 px-6">{frontmatter.type}</td>
                    </tr>
                )}
                {frontmatter.network && (
                    <tr>
                        <th className="py-3 px-6 text-left font-bold">
                            Network
                        </th>
                        <td className="py-3 px-6">{frontmatter.network}</td>
                    </tr>
                )}
                <tr>
                    <th className="py-3 px-6 text-left font-bold">
                        Implementor
                    </th>
                    <td className="py-3 px-6">
                        {frontmatter.implementor || 'TBD'}
                    </td>
                </tr>
                <tr>
                    <th className="py-3 px-6 text-left font-bold">Release</th>
                    <td className="py-3 px-6">
                        {frontmatter.release || 'TBD'}
                    </td>
                </tr>
                {frontmatter.proposal && (
                    <tr>
                        <th className="py-3 px-6 text-left font-bold">
                            Proposal
                        </th>
                        <td className="py-3 px-6">{frontmatter.proposal}</td>
                    </tr>
                )}
                {frontmatter.created && (
                    <tr>
                        <th className="py-3 px-6 text-left font-bold">
                            Created
                        </th>
                        <td className="py-3 px-6">
                            {format(
                                new Date(frontmatter.created),
                                'yyyy-MM-dd'
                            )}
                        </td>
                    </tr>
                )}
                {frontmatter.updated && (
                    <tr>
                        <th className="py-3 px-6 text-left font-bold">
                            Updated
                        </th>
                        <td className="py-3 px-6">
                            {format(
                                new Date(frontmatter.created),
                                'yyyy-MM-dd'
                            )}
                        </td>
                    </tr>
                )}
            </tbody>

            <tfoot>
                <tr className="bg-gray-50">
                    
                </tr>
            </tfoot>
        </table>
    );
};

// export const query = graphql`
//     query ($frontmatter__qip: Int) {
//         markdownRemark(frontmatter: { qip: { eq: $frontmatter__qip } }) {
//             fileAbsolutePath
//             frontmatter {
//                 qip
//                 title
//                 author
//                 network
//                 type
//                 proposal
//                 implementor
//                 release
//                 created
//                 updated
//                 status
//             }
//             html
//         }
//     }
// `;

export default FrontmatterTable;
