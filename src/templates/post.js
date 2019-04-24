import React from 'react'
import { graphql } from 'gatsby'
import find from 'lodash/find'
import Layout from './../components/general/Layout'
import PostHead from './../components/post/postHead'
import PostHero from './../components/post/postHero'
import PostArticle from './../components/post/postArticle'
import SEO from './../components/general/SEO'

//const EXCERPT_LENGTH = 140

const PostTemplate = ({ data, location }) => {
  const {
    title,
    id,
    heroImage,
    body,
    publishDate,
    tags,
    slug,
  } = data.contentfulPost

  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://iammatthias.com/blog/${slug}/`
  )}`

  console.log(body);

  // const excerpt = data.body.childContentfulRichText.html.substring(0, EXCERPT_LENGTH) + '…';

  // console.log(excerpt);

  const postIndex = find(
    data.allContentfulPost.edges,
    ({ node: post }) => post.id === id
  )
  return (
    <Layout location={location}>
      <SEO
        title={title}
        image={heroImage}
        description={title}
      />
      <PostHead
        title={title}
        date={publishDate}
        tags={tags}
        time={body.childContentfulRichText.timeToRead}
      />
      <PostHero image={heroImage} />

      <PostArticle
        body={body}
        previous={postIndex.previous}
        next={postIndex.next}
        discussUrl={discussUrl}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      id
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "DD MMM YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        fluid(maxWidth: 1200, quality: 65) {
          ...GatsbyContentfulFluid_withWebp
        }
        ogimg: fluid(maxWidth: 900, quality: 65) {
          ...GatsbyContentfulFluid_withWebp
          src
        }
      }
      body {
        childContentfulRichText {
          html
          timeToRead
        }
      }
    }
    allContentfulPost(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
        }
        previous {
          slug
        }
        next {
          slug
        }
      }
    }
  }
`

export default PostTemplate
