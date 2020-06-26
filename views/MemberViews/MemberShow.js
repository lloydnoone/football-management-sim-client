import React, { useEffect, useState } from 'react'
import { useParams, Switch, Link, Route, useRouteMatch } from 'react-router-dom'
import axios from 'axios'

import MemberSocial from '../../components/MemberSocial'
import Profile from '../../components/Profile'

function MemberShow() {
  const { id } = useParams()
  const [member, setMember] = useState()
  //path to build route paths relative to parent route,
  //url to build relative links
  const { path, url } = useRouteMatch()

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(res => setMember({ ...res.data }))
      .catch(err => console.log(err))
  }, [])

  if (!member) return null
  const { firstName, lastName, userType, username, createdAt, imageUrl, playerData } = member
  // use player type instead if it is a player
  const displayType = playerData ? playerData.type : userType

  return (
    <div className='memberShow'>
      {console.log(member)}
      <MemberSocial />
      <div className='memberShow__userInfo'>
        <div className='memberShow__userInfo__top'>
          <img className='memberShow__userInfo__top__dashImage'/>
          <div className='memberShow__userInfo__top__header'>
            <div className='memberShow__userInfo__top__header__profilePic'>
              <img 
                className='memberShow__userInfo__top__header__profilePic__img'
                src={imageUrl}
              />
            </div>
            <div className='memberShow__userInfo__top__header__info'>
              <div className='memberShow__userInfo__top__header__info__nameAndType'>
                <h1 className='memberShow__userInfo__top__header__info__nameAndType__name'>
                  {firstName} {lastName}
                </h1>
                <p className='memberShow__userInfo__top__header__info__nameAndType__type'>
                  <span className='notification-userType'>{displayType}</span>
                </p>
              </div>
              <p className='memberShow__userInfo__top__header__info__usernameAndDate'>
                @{username} . Joined {new Date(createdAt).toDateString()}
              </p>
            </div>
          </div>
          <div className='memberShow__userInfo__top__profileNav'>
            <ul>
              <li>
                <Link to={`${url}/profile`}>Profile</Link>
              </li>
              <li>Location</li>
              <li>Timeline</li>
              <li>
                <Link to={`${url}/connections`}>Connections</Link>
              </li>
              <li>Groups</li>
              <li>Forums</li>
              <li>Photos</li>
            </ul>
          </div>
        </div>
        <div>
          <Switch>
            <Route path={`${path}/profile`}>
              <Profile member={member}/>
            </Route>
            <Route path={`${path}/connections`}>
              <h3>connections stuff goes here. </h3>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default MemberShow