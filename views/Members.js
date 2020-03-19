import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Members() {
  const [members, setMembers] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setMembers(res.data)
      })
      .catch(err => {
        console.log('response data', err.response.data.message)
        setErrors([err.response.data])
      })
  }, [])

  return (
    <main className='members'>
      <h1>Members</h1>
      <div>Hero Image</div>
      <h3>All Members</h3><span>{}</span>

      <div className='members__list'>
        {members && members.map(member => {
          return (
            <div className='panelWrapper members__list__member' key={ member._id }>
              <img className='members__list__member__image' src={member.imageUrl}/>
              <p className='u-highlight'>{member.firstName} {member.lastName}</p>
            </div>
          )
        })}
      </div>
      <div>
        {errors && console.log(errors)}
      </div>
    </main>
  )
}


export default Members