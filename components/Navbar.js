import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <div className='navbar__logo'>
          <Link to='/'><h2>Squadron</h2></Link>
        </div>
        <ul className='navbar__links'>
          <li><a><i className="fas fa-users navbar__links__link"></i>Members</a></li>
          <li><a><i className="fas fa-file-medical-alt navbar__links__link"></i>Activity</a></li>
          <li><a><i className="fas fa-comment-alt navbar__links__link"></i>Forums</a></li>
          <li><a><i className="fas fa-user-tag navbar__links__link"></i>Market</a></li>
          <li><a><i className="fas fa-futbol navbar__links__link"></i>Leagues</a></li>
          <li><a><i className="fas fa-play-circle navbar__links__link"></i>Video</a></li>
          <li><a><i className="far fa-newspaper navbar__links__link"></i>News</a></li>
          <li>
            <Link to='/login' className='navbar__links__link'>
              <i className="fas fa-sign-in-alt"></i>Log In
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar__right'>
        <div className='navbar__icon-links'>
          <ul className='navbar__links'>
            <li><i className="fas fa-search"></i></li>
            <li><i className="fas fa-bookmark"></i></li>
          </ul>
        </div>
        <div className='navbar__login-signup'>
          <ul className='navbar__links'>
            <li><a>Sign in</a></li>
            <li>
              <Link to='/register' className='btn'>
                <span>Sign up</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)