import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { profileContext } from '../contexts/profileContext'
import LocalAuth from '../lib/localAuth'

function ConnectButton(props) {
  const { profile, getProfile } = useContext(profileContext)
  const [errors, setErrors] = useState([])
  const [requestStatus, setRequestStatus] = useState(false)

  useEffect(() => {
    if (profile.sentRequests) setRequestStatus(profile.sentRequests.includes(props.memberId))
  }, [profile])

  function handleClick(e) {
    // if member already has sent request then delete it from user and member
    e.preventDefault()

    if (!requestStatus) {
      axios.post(`/api/connection-request/from/${profile._id}/to/${props.memberId}`)
        .then(res => {
          console.log('data from friend request: ', res.data)
          //update profile
          getProfile()
        })
        .then(() => {
          setRequestStatus(profile.sentRequests.includes(props.memberId))
        })
        .catch(err => {
          console.log('err in send request', err.response.data.message)
          setErrors([err.response.data])
        })
    } else {
      axios.delete(`/api/connection-request/from/${profile._id}/to/${props.memberId}`)
        .then((res) => {
          console.log('data from friend request: ', res.data)
          //update profile
          getProfile()
        })
        .then(() => {
          setRequestStatus(profile.sentRequests.includes(props.memberId))
        })
        .catch(err => {
          console.log('err in delete request: ', err.response.data.message)
          setErrors([err.response.data])
        })
    }
    
  }

  return (
    <div className='connectBtn' onClick={handleClick}>
      {profile.sentRequests && LocalAuth.isAuthenticated() && 
        <>
          {!requestStatus ? 
            <i className="fas fa-user-plus"></i> 
            : 
            <i className="fas fa-user-times"></i>
          }
        </>
      }
      {errors && errors.map(err => <p key={ err.message } className='u-validationError'>{ err.message }</p>)}
    </div>
  )
}

export default ConnectButton