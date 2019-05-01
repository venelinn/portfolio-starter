import React from 'react'
import { graphql } from 'gatsby'
import Layout from './../components/general/Layout'
import Hero from './../components/general/Hero'
import HomeList from './../components/home/homeList'
import BlogLists from './../components/blog/blogList'

import { Flex } from 'rebass'

import SEO from './../components/general/SEO'

const Index = ({ data, location }) => {
  const home = data.contentfulHome
  const galleries = data.allContentfulExtendedGallery.edges
  const posts = data.allContentfulPost.edges

  return (
    <Layout location={location}>
      <SEO image={home.shareImage} />
      <div>
        <Hero image={home.heroImage} />
      </div>
      <div>
        <article
          dangerouslySetInnerHTML={{
            __html: home.body.childMarkdownRemark.html,
          }}
        />
        <Flex flexWrap="wrap" mb={[5, 0]} className="changeDirection">
          {galleries.map(({ node: gallery }) => (
            <HomeList
              key={gallery.id}
              slug={gallery.slug}
              image={gallery.heroImage}
              title={gallery.title}
              date={gallery.publishDate}
              excerpt={gallery.body}
            />
          ))}
        </Flex>
        <Flex flexWrap="wrap" mb={[5, 0]}>
          {posts.map(({ node: post }) => (
            <BlogLists
              key={post.id}
              slug={post.slug}
              image={post.heroImage}
              title={post.title}
              date={post.publishDate}
              time={post.body.childContentfulRichText.timeToRead}
              excerpt={post.metaDescription.childMarkdownRemark.rawMarkdownBody}
              grid={[1/5]}
            />
          ))}
        </Flex>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Index {
    site{
      siteMetadata{
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allContentfulExtendedGallery(
      limit: 3
      sort: { fields: [publishDate], order: ASC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY h:mm a")
          heroImage {
            title
            fluid(maxWidth: 500, quality: 65) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 140)
            }
          }
        }
      }
    }
    allContentfulPost(
      limit: 3
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
            fluid(maxWidth: 500, quality: 65) {
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
    contentfulHome {
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
        childMarkdownRemark {
          html
        }
      }
      metaDescription {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }

  }
`

export default Index
