import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import localAuth from '../lib/localAuth'

export const profileContext = createContext()

export function ProfileProvider(props) {
  const [profile, updateProfile] = useState({})
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (localAuth.isAuthenticated()) getProfile()
  }, [])


  function getProfile() {
    axios.get('api/profile', { 
      headers: { Authorization: `Bearer ${localAuth.getToken()}` }
    })
      .then(res => {
        console.log('data in getProfile: ', res.data)
        updateProfile(res.data)
      })
      .catch(err => {
        console.log('err in profileProvider', err.response.data)
        setErrors([err.response.data])
      })
  }

  return (
    <profileContext.Provider value={{ profile, getProfile }}>
      {errors && <h1>Errors loading profile context: {errors.map(err => <p key={err}>{err}</p>)}</h1>}
      {props.children}
    </profileContext.Provider>
  )
}