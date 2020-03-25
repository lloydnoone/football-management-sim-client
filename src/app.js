import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Home from '../views/Home'
import Register from '../views/authViews/Register'
import Login from '../views/authViews/Login'
import Members from '../views/Members'
import { ProfileProvider } from '../contexts/profileContext'

import './styles/main.scss'

function App() {
  return (
    <BrowserRouter>
      <main>
        <ProfileProvider>
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
        </ProfileProvider>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)