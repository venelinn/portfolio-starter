import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { chunk, sum } from 'lodash'
import { Box, Link, Heading } from 'rebass'
import { config, animated, useTrail, useSpring } from 'react-spring'
import Carousel, { Modal, ModalGateway } from 'react-images'


const Item = styled(animated.a)`
  position: relative;
  overflow: hidden;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
`

type Props = {
  images: {
    map: string,
    id: string,
    src: string,
    srcSet: string,
    fluid: string,
    title: string,
    thumbnail: string,
  },
  itemsPerRow?: number,
  title: string,
  slug: string,
}

const Gallery = ({
  title,
  images,
  itemsPerRow: itemsPerRowByBreakpoints,
}: Props) => {
  const aspectRatios = images.map(image => image.fluid.aspectRatio)
  const rowAspectRatioSumsByBreakpoints = itemsPerRowByBreakpoints.map(
    itemsPerRow =>
      chunk(aspectRatios, itemsPerRow).map(rowAspectRatios =>
        sum(rowAspectRatios)
      )
  )
  const x = useSpring({
    config: {
      mass: 1,
      tension: 500,
      friction: 200
    },
    opacity: 0,
    x: 0,
    width: 400,
    from: { opacity: 0, x: 20, width: 0  },
  })
  console.log(ef);

  const trail = useTrail(images.length, {
    config: {
      mass: 1,
      tension: 210,
      friction: 23,
    },
    from: { opacity: 0  },
    to: { opacity: 1},
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0)

  const closeModal = () => setModalIsOpen(false)
    const openModal = (imageIndex: number) => {
    setModalCurrentIndex(imageIndex)
    setModalIsOpen(true)
  }

  return (
    <Box
      p={[4, 5]}
      mb={[5, 5]}
    >
      <animated.div
        style={{
          transform: ef.interpolate(x => `translate3d(0, 0, ${ef.x}px)`)
        }}>

      </animated.div>

      {trail.map((style, i) => {
          // Grab everything before the first hashtag (because I write my captions like that)
          const image = images[i]

          return (
            <Link key={i} onClick={() =>  openModal(i)}>
              <Item style={style}>
              <Box
                as={Img}
                key={image.id}
                fluid={image.thumbnail}
                title={image.title}
                width={rowAspectRatioSumsByBreakpoints.map(
                  (rowAspectRatioSums, j) => {
                    const rowIndex = Math.floor(i / itemsPerRowByBreakpoints[j])
                    const rowAspectRatioSum = rowAspectRatioSums[rowIndex]
                    return `${(image.fluid.aspectRatio / rowAspectRatioSum) * 100}%`
                  }
                )}
                css={`
                  display: inline-block;
                  vertical-align: middle;
                `}
              />

              </Item>
            </Link>
          )
        })}
      {ModalGateway && (
        <ModalGateway>
          {modalIsOpen && (
            <Modal
              onClose={closeModal}
              styles={{
                blanket: base => ({
                  ...base,
                  backgroundColor: 'rgba(16,11,0,0.95)',
                  zIndex: 900,
                }),
                dialog: base => ({ ...base, width: '100%' }),
                positioner: base => ({ ...base, zIndex: 901 }),
              }}
            >
              <Carousel
                views={images.map(({ fluid }) => ({
                  source: fluid.src,
                }))}
                frameProps={{ autoSize: 'height' }}
                currentIndex={modalCurrentIndex}
                components={{ FooterCount: () => null }}
                styles={{
                  footer: base => ({
                    ...base,
                    background: 'none !important',
                    color: '#666',
                    padding: 0,
                    paddingTop: 20,
                    position: 'static',
                    '& a': { color: 'black' },
                  }),
                  header: base => ({
                    ...base,
                    background: 'none !important',
                    padding: 0,
                    paddingBottom: 10,
                    position: 'static',
                  }),
                  headerClose: base => ({
                    ...base,
                    color: '#666',
                    ':hover': { color: '#DE350B' },
                  }),
                  view: base => ({
                    ...base,
                    overflow: 'hidden',
                    objectFit: 'contain',
                    '& > img': {
                      maxHeight: '75vh',
                      height: 'auto',
                      width: 'auto',
                      margin: '0 auto',
                    },
                  }),
                }}
              />
            </Modal>
          )}
        </ModalGateway>
      )}
    </Box>
  )
}
export default Gallery
