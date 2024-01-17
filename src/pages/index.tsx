import type { HeadFC, PageProps } from 'gatsby';
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layout';

const Home: React.FC<any> = ({data}:{data:any}) => {

    const markdownData = data?.markdownRemark || '';


    return (
        <Layout>
            <div className="container max-w-full">
                <div className="content mt-30 overflow-y-auto h-screen flex justify-center items-start">
                    <div
                        id="content-center"
                        className="relative w-full pl-0 lg:w-3/4 lg:pl-5 mt-20"
                    >
                        <div className="container mx-auto px-4 py-8 markdown-content" dangerouslySetInnerHTML={{ __html: markdownData.html }}>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/Home-Page.md/" }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

export default Home;
