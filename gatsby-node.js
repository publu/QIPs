const fs = require('fs')
const kebabCase = require('lodash/kebabCase')
const statuses = require('./ps/statuses')

const kebabStatuses = statuses.map(kebabCase)

const Frontmatter = `
  fragment Frontmatter on MarkdownRemarkFrontmatter {
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
`

const allQipsQuery = `
${Frontmatter}
query {
    allMarkdownRemark(
        filter: { 
            fileAbsolutePath: { regex: "/QiIPs/"}
            frontmatter: { qip: { ne: null } }
        }
        ) {
        group(field: frontmatter___status) {
            fieldValue
            totalCount
            nodes {
                id
                frontmatter {
                   ...Frontmatter
                }
            }
        }
    }
}
`;

exports.onPostBuild = async ({ graphql }) => {
    const allQips = await graphql(allQipsQuery)
  
    const qipsPath = './public/api/qips'
  
    ;[
      { path: qipsPath, result: allQips },
    ].forEach(({ path, result }) => {
      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
  
      // Initialize all statuses with empty array
      kebabStatuses.forEach((status) =>
        fs.writeFileSync(`${path}/${status}.json`, JSON.stringify([])),
      )
  
      result.data.allMarkdownRemark.group.forEach((group) => {
        const status = kebabCase(group.fieldValue)
        const data = group.nodes.map(({ frontmatter, ...node }) => ({
          ...frontmatter,
          ...node,
        }))
        fs.writeFileSync(`${path}/${status}.json`, JSON.stringify(data))
      })
    })
  }

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type MarkdownRemarkFrontmatter {
        title: String!
        shortDescription: String
        network: String
        author: String!
        type: String
        proposal: String
        implementor: String
        release: String
        created: Date
        updated: Date
        date: Date
        status: String!
      }
    `;
    createTypes(typeDefs);
};
