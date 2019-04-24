import React from 'react'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

import { Flex, Box, Heading } from 'rebass'

const PostHead = props => {
  return (
    <Headroom
      className="relativeHeadroom"
      style={{
        position: 'fixed',
        zIndex: '300',
        transition: 'all .5s ease-in-out',
      }}
      downTolerance='300'
    >
      <Box
        p={[4, 5]}
        width={[1]}
        flexWrap="wrap"
        flexDirection="column"
        bg="var(--color-secondary)"
      >
        <Box>
          <Link to={`/blog/`} className="invert noUnderline">
            <Heading
              css={{
                display: 'inline-block',
              }}
            >
              ⬅ Back
            </Heading>
          </Link>
        </Box>
        <Heading color="var(--color-base)" fontSize={5}>
          {props.title}
        </Heading>
        <Heading color="var(--color-base)" fontSize={3}>
          Published: {props.date} <br /> Reading time: {props.time} min
        </Heading>
        <Flex
          width={[1]}
          flexWrap="wrap"
          alignContent="center"
          flexDirection="row"
        >
        </Flex>
      </Box>
    </Headroom>
  )
}

export default PostHead
