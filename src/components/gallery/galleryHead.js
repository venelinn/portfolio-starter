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
            <Heading>
              ⬅ Back
            </Heading>
          </Link>
        </Box>
        <Heading fontSize={5}>
          {props.title}
        </Heading>
        <Text
          fontSize={2}
          pb={4}
          dangerouslySetInnerHTML={{
            __html: props.body.childMarkdownRemark.html,
          }}
        />
      </Flex>
    </Headroom>
  )
}

export default GalleryHead
