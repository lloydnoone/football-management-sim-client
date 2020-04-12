import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function MemberShow() {
  const { id } = useParams()
  const [member, setMember] = useState()

  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then(res => setMember({ ...res.data }))
      .catch(err => console.log(err))
  }, [])

  if (!member) return null
  const { firstName, lastName, userType, username, createdAt } = member
  return (
    <div className='memberShow'>
      <div className='memberShow__social'>
        <div className='panelWrapper memberShow__social__panel'>
          <h4>WHO&apos;S ONLINE</h4>
        </div>
        <div className='panelWrapper memberShow__social__panel'>
          <h4>RECENTLY ACTIVE MEMBERS</h4>
        </div>
        <div className='panelWrapper memberShow__social__panel'>
          <h4>MEMBERS CONNECTIONS</h4>
        </div>
        <div className='panelWrapper memberShow__social__panel'>
          <h4>OTHER</h4>
        </div>
      </div>
      <div className='memberShow__userInfo'>
        <div className='memberShow__userInfo__top'>
          <img className='memberShow__userInfo__top__dashImage'/>
          <div className='memberShow__userInfo__top__header'>
            <div className='memberShow__userInfo__top__header__profilePic'>
              <img className='memberShow__userInfo__top__header__profilePic__img'/>
            </div>
            <div className='memberShow__userInfo__top__header__info'>
              <div className='memberShow__userInfo__top__header__info__nameAndType'>
                <h1 className='memberShow__userInfo__top__header__info__nameAndType__name'>
                  {firstName} {lastName}
                </h1>
                <p className='memberShow__userInfo__top__header__info__nameAndType__type'>
                  {userType}
                </p>
              </div>
              <p className='memberShow__userInfo__top__header__info__nameAndType'>
                @{username} . Joined {createdAt}
              </p>
            </div>
          </div>
          <div className='memberShow__userInfo__top__profileNav'>
            <ul>
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
          <ul>
            <li>Name</li>
            <li>User Type</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MemberShow