import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import localAuth from '../lib/localAuth'

import './style.scss'

function App() {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    axios.get('api/users')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    userData &&
    <>
      <h1>User!</h1>
      {userData.map(user => {
        return <li key={ user._id }>{user.firstName}</li>
      })}
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)