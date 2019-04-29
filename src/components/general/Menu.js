import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { stack as Menu } from 'react-burger-menu'

//import { FiHome, FiBook, FiUser } from 'react-icons/fi'

import Logo from '../general/Logo'

import { Heading } from 'rebass'

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  display: block;
  margin: 0;
  padding: 0.6em 0 0.5em;
  color: var(--color-base) !important;
  @media screen and (min-width: 52em) {
    padding: 0.5em 0;
    color: var(--color-accent);
    text-align: left;
  }
`
const MenuToggle = styled(Heading)`
  z-index: 900 !important;
  position: fixed;
  margin: 0.75em !important;
  top: 0;
  right: 0.5em;
  width: 3.5em;
  height: 3.5em;
  color: var(--color-base);
  cursor: pointer;
  transition: all 0.3s;
`




class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
  }
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }
  closeMenu() {
    this.setState({ menuOpen: false })
  }
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    return (
      <>
        <Logo />
        <div>
          <MenuToggle onClick={() => this.toggleMenu()}>MENU</MenuToggle>
          <Menu
            right
            isOpen={this.state.menuOpen}
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            noOverlay
            customBurgerIcon={false}
          >
            <StyledLink to="/">
              <Heading>Portfolio</Heading>
            </StyledLink>
            <StyledLink to="/blog">
              <Heading>Blog</Heading>
            </StyledLink>
            <StyledLink to="/contact">
              <Heading>Contact</Heading>
            </StyledLink>
          </Menu>
        </div>
      </>
    )
  }
}

export default Navigation
