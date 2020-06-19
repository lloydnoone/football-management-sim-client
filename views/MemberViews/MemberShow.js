import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import PlayerInfoShow from '../../components/PlayerInfoShow'
import AgentInfoShow from '../../components/AgentInfoShow'
import OfficialInfoShow from '../../components/OfficialInfoShow'
import MemberSocial from '../../components/MemberSocial'

function MemberShow() {
  const { id } = useParams()
  const [member, setMember] = useState()

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(res => setMember({ ...res.data }))
      .catch(err => console.log(err))
  }, [])

  if (!member) return null
  const { firstName, lastName, userType, username, createdAt, imageUrl, playerData, nationality } = member
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
              <li>Profile</li>
              <li>Location</li>
              <li>Timeline</li>
              <li>Connections</li>
              <li>Groups</li>
              <li>Forums</li>
              <li>Photos</li>
            </ul>
          </div>
        </div>
        <div className='memberShow__userInfo__bottom'>
          <h2>Profile</h2>
          <h3>Basic Info</h3>
          <div className='memberShow__userInfo__bottom__split'>
            <div className='memberShow__userInfo__bottom__split__labels'>
              <ul>
                <li>First Name</li>
                <li>Last Name</li>
                <li>User Name</li>
                <li>Profile Type</li>
                <li>Nationality</li>
              </ul>
            </div>
            <div className='memberShow__userInfo__bottom__split__data'>
              <ul>
                <li>{firstName}</li>
                <li>{lastName}</li>
                <li>{username}</li>
                <li>{userType}</li>
                <li>{nationality}</li>
              </ul>
            </div>
          </div>
          {userType === 'Player' &&
            <PlayerInfoShow member={member} />
          }
          {userType === 'Agent' &&
            <AgentInfoShow member={member} />
          }
          {userType === 'Official' &&
            <OfficialInfoShow member={member} />
          }
        </div>
      </div>
    </div>
  )
}

export default MemberShow