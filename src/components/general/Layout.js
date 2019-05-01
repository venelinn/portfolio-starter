import React from 'react'
import { ThemeProvider } from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';

import theme from '../../styles/theme'
import GlobalStyle from '../../styles/global'
import Menu from '../general/Menu'
import { pageFade } from '../../styles/pose'

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import fr from 'react-intl/locale-data/fr';
import 'intl/locale-data/jsonp/fr';

// add concatenated locale data
addLocaleData([...en, ...fr]);

const Main = posed('main')(pageFade)

const Layout = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="siteRoot">
        <Helmet>
          <html lang="en" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logos/logo-512.png" />
          <link rel="apple-touch-icon" href="/logos/logo-512.png" />
        </Helmet>
        <GlobalStyle />
        <Menu />
        <PoseGroup animateOnMount preEnterPose="initial">
          <Main key={props.location.pathname} id="content" role="main">
            {children}
          </Main>
        </PoseGroup>
      </div>
    </ThemeProvider>
  )
}

export default Layout
