import React from 'react';
import { graphql } from 'gatsby';
import { getGithubLink } from '../../utils';
import Layout from '../../layout';
import FrontmatterTable from '../../components/FrontmatterTable';

interface Props {
    frontmatter__qip: number;
    data: any;
}

const Template: React.FC<Props> = ({ data }) => {
    const { markdownRemark } = data;
    const { frontmatter, html, fileAbsolutePath } = markdownRemark;
    const githubLink = getGithubLink(fileAbsolutePath);
    return (
        <Layout>
            <div className="container max-w-full">
                <div className="content mt-30 overflow-y-auto h-screen flex justify-center items-start">
                    <div
                        id="content-center"
                        className="relative w-full pl-0 lg:w-3/4 lg:pl-5 mt-20"
                    >
                        <div className="">
                            
                            <div className='flex justify-center sm:m-0 m-3'>
                                <FrontmatterTable frontmatter={frontmatter} />
                            </div>

                            <div className="markdown-content mt-3 p-3 md:p-none">
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Template;

export const pageQuery = graphql`
    query ($frontmatter__qip: Int) {
        markdownRemark(frontmatter: { qip: { eq: $frontmatter__qip } }) {
            fileAbsolutePath
            frontmatter {
                qip
                title
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
            html
        }
    }
`;
