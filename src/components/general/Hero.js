import React from 'react'
import Img from 'gatsby-image'



const HomeHero = props => {
  return (
    <div>
      <Img fluid={props.image.fluid} />
    </div>
  )
}

export default HomeHero
