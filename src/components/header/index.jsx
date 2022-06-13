import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Header = () => {
  return (
    <header className="header">
      <Link className="header__title" to="/">My Post</Link>
      <Link className="btn header__btn" to="/create">create post</Link>
    </header>
  )
}

export default Header