// ./src/Header.jsx
import React from 'react'
import logo from './assets/opencage-white.svg'
import './Header.css'

function Header() {
    return (
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          OpenCage <b>Geocoding</b> API
        </p>
      </header>
    )
}

export default Header
