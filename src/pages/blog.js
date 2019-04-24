import React from 'react'
import { graphql } from 'gatsby'
import Layout from './../components/general/Layout'
import Hero from './../components/general/Hero'
import BlogLists from './../components/blog/blogList'

import { Flex, Box } from 'rebass'

import SEO from './../components/general/SEO'

const MainBlog = ({ data, location }) => {
  const posts = data.allContentfulPost.edges
  const blog = data.contentfulBlog
  return (
    <Layout location={location}>
      <SEO
        title="BLOG"
        image={blog.shareImage}
        description="A sporadic collection of thoughts mostly about the web"
      />
      <Flex flexWrap="wrap" mb={[5, 0]} className="changeDirection">
        <Box p={[3, 4]} width={[1, 1, 1 / 2, 1 / 3]}>
          <Box p={[3, 4]} width={[1]}>
            <article
              dangerouslySetInnerHTML={{
                __html: blog.body.childContentfulRichText.html,
              }}
            />
          </Box>
          <Flex width={[1]} flexWrap="wrap" flexDirection="row">
            {posts.map(({ node: post }) => (
              <BlogLists
                key={post.id}
                slug={post.slug}
                image={post.heroImage}
                title={post.title}
                date={post.publishDate}
                time={post.body.childContentfulRichText.timeToRead}
                excerpt={post.metaDescription.childMarkdownRemark.rawMarkdownBody}
              />
            ))}
          </Flex>
        </Box>
        <Box p={0} className="hide" width={[1, 1, 1 / 2, 2 / 3]}>
          <Hero image={blog.heroImage} />
        </Box>
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY")
          heroImage {
            title
            fluid(maxWidth: 1000, quality: 65) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childContentfulRichText {
              timeToRead
            }
          }
          metaDescription {
            childMarkdownRemark {
              rawMarkdownBody
              timeToRead
            }
          }
        }
      }
    }
    contentfulBlog {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1000, quality: 65) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      shareImage {
        ogimg: resize(width: 1200, quality: 65) {
          src
          width
          height
        }
      }
      body {
        childContentfulRichText {
          html
        }
      }
    }
  }
`

export default MainBlog
