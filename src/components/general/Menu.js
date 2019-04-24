import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { stack as Menu } from 'react-burger-menu'

import { FiHome, FiBook, FiUser } from 'react-icons/fi'

import Logo from '../general/Logo'

import { Flex as Base, Heading, Box } from 'rebass'

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

const NavBar = styled.nav`
  display: none;
  @media screen and (min-width: 52em) {
    display: block;
  }
`

export const MenuTabBar = styled(Base)`
  background: var(--color-secondary);
  border-top: 3px solid var(--color-tertiary);
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  @media screen and (min-width: 52em) {
    display: none;
  }
  div {
    border-right: 2px solid var(--color-tertiary);
    &:last-child {
      border-right: 0px solid var(--color-tertiary);
    }
  }
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
        <NavBar>
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
        </NavBar>
        <MenuTabBar justifyContent="space-evenly">
          <Box width={1 / 3}>
            <StyledLink
              to="/"
              className="MenuTabBarHover"
              activeStyle={{
                boxShadow: 'inset 0 4px 0px 0px var(--color-highlight)',
              }}
            >
              <FiHome size={'2em'} color={'var(--color-tertiary)'} />
            </StyledLink>
          </Box>
          <Box width={1 / 3}>
            <StyledLink
              to="/blog"
              className="MenuTabBarHover"
              activeStyle={{
                boxShadow: 'inset 0 4px 0px 0px var(--color-highlight)',
              }}
            >
              <FiBook size={'2em'} color={'var(--color-tertiary)'} />
            </StyledLink>
          </Box>
          <Box width={1 / 3}>
            <StyledLink
              to="/contact"
              className="MenuTabBarHover"
              activeStyle={{
                boxShadow: 'inset 0 4px 0px 0px var(--color-highlight)',
              }}
            >
              <FiUser size={'2em'} color={'var(--color-tertiary)'} />
            </StyledLink>
          </Box>
        </MenuTabBar>
      </>
    )
  }
}

export default Navigation
