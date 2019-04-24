import React from 'react'
import { graphql } from 'gatsby'
import Layout from './../components/general/Layout'
import Hero from './../components/general/Hero'
import HomeList from './../components/home/homeList'

import SEO from './../components/general/SEO'

const Index = ({ data, location }) => {
  const home = data.contentfulHome
  const galleries = data.allContentfulExtendedGallery.edges

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
        <div>
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
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query Index {
    allContentfulExtendedGallery(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY h:mm a")
          heroImage {
            title
            fluid(maxWidth: 1000, quality: 65) {
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
