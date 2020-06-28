import React, { useEffect, useState } from 'react'
import axios from 'axios'

import useFormState from '../../hooks/useFormState'

import MemberSearch from '../../components/MemberSearch'
import MembersDisplay from '../../components/MembersDisplay'

function Members() {
  const [members, setMembers] = useState([])
  const [errors, setErrors] = useState(null)
  const [searchParams, handleSearchChange] = useFormState({})

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
    <div className='members--split'>
      <div className='members'>
        <h1>Members</h1>
        <div>Hero Image</div>
        <h2>All Members
          <span className='notification'>{members && members.length}</span>
        </h2>
        <MembersDisplay 
          members={members}
          searchParams={searchParams}
        />
        <div>
          {errors && errors.map(err => <p key={ err.message } className='u-validationError'>{ err.message }</p>)}
        </div>
      </div>
      <MemberSearch 
        searchParams={searchParams}
        handleSearchChange={handleSearchChange}
      />
    </div>
  )
}

export default Members