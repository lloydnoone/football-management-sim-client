import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MemberSocial() {
  const [members, setMembers] = useState([])
  const [now, setNow] = useState('')

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setMembers([...res.data]))
      .catch(err => console.log(err))
    // get now and serialize into number for calc
    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hours = date.getHours()
    const mins = date.getMinutes()
    console.log(`mins: ${mins} hours: ${hours} day: ${day} month: ${month} year: ${year}`)
    setNow(Number(`${mins}${hours}${day}${month}${year}`))
    
  }, [])

  function online() {
    return members.filter(member => {
      // serialize into number for calc
      console.log(member.firstName)
      const active = Number(member.lastActivity)
      console.log('now: ', now)
      console.log('active: ', active)
      console.log('diff: ', now - active)
      if (now - active < 500000000) return true
    })
  }

  function recentlyActive() {
    return members.filter(member => {
      // serialize into number for calc
      const active = Number(member.lastActivity)
      if (now - active < 9000000000) return true
    })
  }

  return (
    <>
      {console.log('online: ', online())}
      <div className='memberSocial'>
        <div className='panelWrapper memberSocial__panel'>
          <h4>WHO&apos;S ONLINE</h4>
          <div className='memberSocial__panel__images'>
            {members && members.length > 0 &&
              online().map(member => {
                const { _id, imageUrl } = member
                return (
                  <Link key={_id} to={`/members/${_id}`}>
                    <img
                      className='memberSocial__panel__images__img'
                      src={imageUrl}
                    />
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className='panelWrapper memberSocial__panel'>
          <h4>RECENTLY ACTIVE MEMBERS</h4>
          <div className='memberSocial__panel__images'>
            {members && members.length > 0 &&
              recentlyActive().map(member => {
                const { _id, imageUrl } = member
                return (
                  <Link key={_id} to={`/members/${_id}`}>
                    <img
                      className='memberSocial__panel__images__img'
                      src={imageUrl}
                    />
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className='panelWrapper memberSocial__panel'>
          <h4>MEMBERS CONNECTIONS</h4>
        </div>
        <div className='panelWrapper memberSocial__panel'>
          <h4>OTHER</h4>
        </div>
      </div>
    </>
  )
}

export default MemberSocial