import React from 'react'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

import { Flex, Box, Heading, Text } from 'rebass'

const GalleryHead = props => {
  return (
    <Headroom
      className="relativeHeadroom"
      style={{
        position: 'fixed',
        zIndex: '300',
        transition: 'all .5s ease-in-out',
      }}
    >
      <Flex
        p={[4, 5]}
        width={[1]}
        flexWrap="wrap"
        flexDirection="column"
        bg="var(--color-secondary)"
      >
        <Box>
          <Link to={`/`} className="noUnderline">
            <Heading
              color="var(--color-base)"
              css={{ display: 'inline-block' }}
            >
              ⬅ Back
            </Heading>
          </Link>
        </Box>
        <Heading color="var(--color-base)" fontSize={5}>
          {props.title}
        </Heading>
        <Text
          fontSize={2}
          pb={4}
          color="var(--color-base)"
          dangerouslySetInnerHTML={{
            __html: props.body.childMarkdownRemark.html,
          }}
        />
        <Flex
          width={[1]}
          flexWrap="wrap"
          alignContent="center"
          flexDirection="row"
        >
          {props.tags.map(tag => (
            <Box key={tag.id} mr={2} mb={2} className="tag noLinkAccent">
              <Link to={`/tag/${tag.slug}/`}>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Headroom>
  )
}

export default GalleryHead
