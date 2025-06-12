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
      filter: {fileAbsolutePath: {regex: "/QIP/"}, frontmatter: {qip: {ne: null}}}
    ) {
      group(field: {frontmatter: {status: SELECT}}) {
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
        qip: Int
        title: String!
        shortDescription: String
        network: String
        author: String
        type: String
        proposal: String
        implementor: String
        release: String
        created: Date
        updated: Date
        date: Date
        status: String
      }
    `;
    createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html" || stage === "develop-ssr") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@coinbase\/wallet-sdk|@safe-global\/safe-gateway-typescript-sdk|@reown\/appkit-ui|@reown\/appkit-scaffold-ui|@reown\/appkit|viem|jsonrpc-ws-connection|@safe-global\/safe-apps-sdk|wagmi|connectkit|family/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }
