import React, { useContext } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

import LocalAuth from '../lib/localAuth'
import { profileContext } from '../contexts/profileContext'

function Navbar() {
  const { profile } = useContext(profileContext)
  const { pathname } = useLocation()
  const history = useHistory()

  function handleLogout() {
    LocalAuth.logout()
    history.push('/')
  }

  return (
    <nav className='navbar'>
      <div className='navbar__left'>
        <div className='navbar__logo'>
          <Link to='/'><h2>Squadron</h2></Link>
        </div>
        <ul className='navbar__links'>
          <li>
            <Link to='/members' className='navbar__links__link'>
              <i 
                className={`
              fas fa-users
              ${pathname === '/members' ? 'u-color-visitedblue' : ''}`}></i>
              Members
            </Link>
          </li>
          <li>
            <a>
              <i
                className={`
              fas fa-file-medical-alt navbar__links__link
              ${pathname === '/activity' ? 'u-color-visitedblue' : ''}`}
              >
              </i>Activity
            </a>
          </li>
          <li>
            <a>
              <i 
                className={`
              fas fa-comment-alt navbar__links__link
              ${pathname === '/forums' ? 'u-color-visitedblue' : ''}`}
              >
              </i>Forums
            </a>
          </li>
          <li>
            <a>
              <i 
                className={`
              fas fa-user-tag navbar__links__link
              ${pathname === '/Market' ? 'u-color-visitedblue' : ''}`}
              >
              </i>Market
            </a>
          </li>
          <li>
            <a>
              <i 
                className={`
              fas fa-futbol navbar__links__link
              ${pathname === '/leagues' ? 'u-color-visitedblue' : ''}`}
              >
              </i>Leagues
            </a>
          </li>
          <li>
            <a>
              <i 
                className={`
              fas fa-play-circle navbar__links__link
              ${pathname === '/video' ? 'u-color-visitedblue' : ''}`}
              >
              </i>Video
            </a>
          </li>
          <li>
            <a>
              <i 
                className={`
              far fa-newspaper navbar__links__link
              ${pathname === '/news' ? 'u-color-visitedblue' : ''}`}
              >
              </i>News
            </a>
          </li>
          {!LocalAuth.isAuthenticated() &&
            <li>
              <Link to='/login' className='navbar__links__link'>
                <i 
                  className={`
                    fas fa-sign-in-alt
                    ${pathname === '/login' ? 'u-color-visitedblue' : ''}`}
                >
                </i>Log In
              </Link>
            </li>
          }
          {LocalAuth.isAuthenticated() &&
            <li>
              <a 
                className='navbar__links__link'
                onClick={handleLogout}
              >
                <i className='fas fa-sign-in-alt'></i>Log Out
              </a>
            </li>
          }
        </ul>
      </div>
      <div className='navbar__right'>
        {LocalAuth.isAuthenticated() &&
          <div className='navbar__profile navbar__links'>
            <p className='u-highlight'>{profile.firstName} {profile.lastName}</p>
            <img src={profile.imageUrl} className='navbar__profile__image'/>
          </div>
        }
        <div className='navbar__icon-links'>
          <ul className='navbar__links'>
            <li><i className="fas fa-search"></i></li>
            <li><i className="fas fa-bookmark"></i></li>
          </ul>
        </div>
        {!LocalAuth.isAuthenticated() &&
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
        }
      </div>
    </nav>
  )
}

export default Navbar