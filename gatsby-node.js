// const { createFilePath } = require(`gatsby-source-filesystem`)

// //To implement an API, you export a function with the name of the API from gatsby-node.js.
// exports.onCreateNode = ({ node , getNode }) => {
  
//   if (node.internal.type === `MarkdownRemark`) {
//      //console.log(node)
//     //console.log(getNode)
//     const slug = createFilePath({ node, getNode, basePath: `pages` })
//      //console.log(slug)

//      createNodeField({
//         node,
//         name: `slug`,
//         value: slug,
//       })
//   }
// }

//onCreateNode function will be called by Gatsby whenever a new node is created
// URL slugs for markdown pages.
//https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createfilepath

// console.log(node)
// { id: '6278bd30-b461-531b-b451-f931f8e64361',
//   children: [],
//   parent: '2626fb2c-a8a3-599b-892b-9b2057c04c20',
//   internal:
//    { content:
//       'Do Pandas eat bananas? Check out this short video that shows that yes! pandas do\r\nseem to really enjoy bananas!\r\n<iframe width="560" height="315" src="https://www.youtube.com/embed/4SZl1r2O_bY" frameborder="0" allowfullscreen></iframe>',
//      type: 'MarkdownRemark',
//      contentDigest: '0f43db53d118bcb2b067a279ec29f32f',
//      counter: 34,
//      owner: 'gatsby-transformer-remark' },
//   frontmatter: { title: 'Pandas and Bananas', date: '2017-08-21' },
//   excerpt: '',
//   rawMarkdownBody:
//    'Do Pandas eat bananas? Check out this short video that shows that yes! pandas do\r\nseem to really enjoy bananas!\r\n<iframe width="560" height="315" src="https://www.youtube.com/embed/4SZl1r2O_bY" frameborder="0" allowfullscreen></iframe>',
//   fileAbsolutePath:
//    'C:/github_learn/gatsby_learn/pandagatsby/src/pages/pandas-and-bananas.md' }

// console.log(getNode)
//[Function: getNode]

//console.log(slug)
//pandas-and-bananas/ 

// const path = require(`path`)

// const { createFilePath } = require(`gatsby-source-filesystem`)
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: `pages` })

//     //only the original creator of a node can directly modify the node—all other plugins (including your gatsby-node.js) must use createNodeField function to create additional fields.
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// }

// exports.createPages = async ({ graphql, actions }) => {
//     // **Note:** The graphql function call returns a Promise
//     // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

    
//     const result = await graphql(`
//       query {
//         allMarkdownRemark {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `)
//     console.log(JSON.stringify(result, null, 4))


  //he JSON.stringify() method converts a JavaScript object or value to a JSON string
//console.log(JSON.stringify(result, null, 4))
//   {
//     "data": {
//         "allMarkdownRemark": {
//             "edges": [
//                 {
//                     "node": {
//                         "fields": {
//                             "slug": "/pandas-and-bananas/"
//                         }
//                     }
//                 },
//                 {
//                     "node": {
//                         "fields": {
//                             "slug": "/sweet-pandas-eating-sweets/"
//                         }
//                     }
//                 }
//             ]
//         }
//     }

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}