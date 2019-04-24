import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'


const HomeContent = props => {
  return (
    <div>
      <div>
      <Link key={props.id} to={`/${props.slug}/`}>
        <Img fluid={props.image.fluid} />
      </Link>
      </div>
      <div>
        <div>
          <Link key={props.id} to={`/${props.slug}/`}>
            {props.title}
          </Link>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: props.excerpt.childMarkdownRemark.excerpt,
          }}
        />
      </div>
    </div>
  )
}

export default HomeContent
