import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { Box as Base, Text, Heading } from 'rebass'

export const Box = styled(Base)`
  &:hover div {
    @supports (object-fit: cover) {
      opacity: 1;
      visibility: visible;
    }
  }
`
const BlogList = props => {
  return (
      <Box
        width={props.grid}
        px={[3, 4]}
        pb={[3, 4]}
        pt={0}
        flexWrap="wrap"
        flexDirection="column"
      >
        <div>
          <Link key={props.id} to={`/blog/${props.slug}/`}>
            <Img fluid={props.image.fluid} />
          </Link>
        </div>
        <Heading fontSize={[3, 4]}>
          <Link key={props.id} to={`/blog/${props.slug}/`}>{props.title}</Link>
        </Heading>
        <Heading fontSize={1}>
          Published: {props.date} | Reading time: {props.time} min
        </Heading>
        <Text
          width={1}
          dangerouslySetInnerHTML={{
            __html: props.excerpt
          }}
        />
      </Box>

  )
}

export default BlogList
