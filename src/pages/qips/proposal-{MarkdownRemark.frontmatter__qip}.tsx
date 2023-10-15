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
            <div className="flex justify-center mt-30 m-10 mt-[7rem]">
                <div className="justify-center md:w-[70%]">
                    
                    <div>
                        <FrontmatterTable frontmatter={frontmatter} />
                    </div>

                    <div className="markdown-content mt-3">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
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
