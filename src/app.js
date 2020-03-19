import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Home from '../views/Home'
import Register from '../views/authViews/Register'
import Login from '../views/authViews/Login'
import Members from '../views/members'

import './styles/main.scss'

function App() {
  const [userData, setUserData] = useState({})
  useEffect(() => {
    axios.get('api/users')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/members" component={Members} />
          {/* <Route exact path="/cigars/:id/edit" component={CigarEdit} />
            <Route exact path="/cigars/new" component={CigarNew} />
            <Route exact path="/cigars/:id" component={CigarShow} />
            <Route exact path="/cigars" component={CigarIndex} />*/}
        </Switch>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)