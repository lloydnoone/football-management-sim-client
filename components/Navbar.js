import React from 'react'

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <div className='navbar__logo'>
          <a><h2>Squadron</h2></a>
        </div>
        <ul className='navbar__links'>
          <li><a><i className="fas fa-users"></i>Members</a></li>
          <li><a><i className="fas fa-file-medical-alt"></i>Activity</a></li>
          <li><a><i className="fas fa-comment-alt"></i>Forums</a></li>
          <li><a><i className="fas fa-user-tag"></i>Market</a></li>
          <li><a><i className="fas fa-futbol"></i>Leagues</a></li>
          <li><a><i className="fas fa-play-circle"></i>Video</a></li>
          <li><a><i className="far fa-newspaper"></i>News</a></li>
          <li><a><i className="fas fa-sign-in-alt"></i>Log In</a></li>
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
            <li ><a className='navbar__links__signup'>Sign up</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar