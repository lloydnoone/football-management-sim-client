import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import localAuth from '../lib/localAuth'

import Navbar from '../components/Navbar'

import './styles/main.scss'

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
    <main>
      <Navbar />
      {userData &&
      <>
        <h1>User!</h1>
        {userData.map(user => {
          return <li key={ user._id }>{user.firstName}</li>
        })}
      </>}
    </main>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)