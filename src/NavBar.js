import React from 'react'
import { Link } from '@reach/router'
import { css, keyframes } from '@emotion/react'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const NavBar = () => {
  return (
    <header
      css={css`
      background-color: #333;
      padding: 15px;
    `}>
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
        font-size: 60px;
        display: inline-block;

        &:hover {
          animation: 1s ${spin} linear infinite;
        }
      `}
        aria-label="logo"
        role="img"
        >
        🐶
    </span>
    </header>
  )
}

export default NavBar
