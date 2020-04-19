import React, { useState, useContext, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import LocalAuth from '../../lib/localAuth'
import useToggle from '../../hooks/useToggle'
import { profileContext } from '../../contexts/profileContext'

import nationalites from '../../data/nationalities.json'

function Register(props) {
  const { profile, getProfile } = useContext(profileContext)
  const [formData, setFormData] = useState({})
  const [userType, setUserType] = useState('')
  const [errors, setErrors] = useState({})
  const [playerHide, togglePlayerHide] = useToggle(false)
  const [agents, setAgents] = useState([])
  const [agentId, setAgentId] = useState('')
  const [officials, setOfficials] = useState([])
  const [officialId, setOfficialId] = useState('')
  const [clubs, setClubs] = useState([])
  const [clubId, setClubId] = useState([])

  useEffect(() => {
    axios.get('/api/agents')
      .then((res) => {
        setAgents(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
    
    axios.get('/api/officials')
      .then((res) => {
        setOfficials(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
    
    axios.get('/api/clubs')
      .then((res) => {
        setClubs(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
  }, [])

  function handleChange(e) {
    const data = { ...formData, [e.target.name]: e.target.value }
    setFormData(data)
  }

  function handlePlayerChange(e) {
    let { value } = e.target
    const { name } = e.target
    //allow null values
    if (value === 'None') value = null
    const data = { 
      ...formData, 
      playerData: { 
        ...formData.playerData, 
        [name]: value
      } 
    }
    setFormData(data)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validateUserType()) return
    axios.post('/api/register', formData)
      .then(res => {
        LocalAuth.setToken(res.data.token)
        getProfile()
      })
      .then(() => {
        if (profile.userType === 'Player') {
          console.log('inside player setters')
          console.log('ids: ', agentId, officialId, clubId)
          if (agentId) setPlayersAgent()
          if (officialId) setPlayersOfficial()
          if (clubId) setPlayersClub()
        }
        props.history.push('/')
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
  }

  function validateUserType() {
    if (userType === '') {
      setErrors({ userType: true })
      console.log(errors)
      return false
    } else {
      return true
    }
  }

  function setPlayersAgent() {
    axios.post(`/api/player/${profile._id}/in/agent/${agentId}`)
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
  }

  function setPlayersOfficial() {
    axios.post(`/api/player/${profile._id}/in/official/${officialId}`)
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
  }

  function setPlayersClub() {
    axios.post(`/api/player/${profile._id}/in/club/${clubId}`)
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data.errors)
      })
  }

  function setTypeDefaults(type) {
    if (!formData.playerData && type === 'Player') setFormData({ ...formData, playerData: {}, agentData: null, officialData: null })
    if (!formData.agentData && type === 'Agent') setFormData({ ...formData, agentData: {}, playerData: null, officialData: null })
    if (!formData.officialData && type === 'Official') setFormData({ ...formData, officialData: {}, playerData: null, agentData: null })

    return true
  }

  return (
    <div className='register'>
      {console.log('agentId: ', !agentId)}
      <div className='panelWrapper'>
        <form className='formWrapper' onSubmit={handleSubmit}>
          <div className='formWrapper__header'>
            <h2 className='formWrapper__h2'>Create an Account</h2>
            <p className='formWrapper__link'>or 
              <Link to='/login' className='u-highlight'> sign in</Link>
            </p>
          </div>
          
          <label>First Name</label>
          <input
            name='firstName'
            placeholder='John'
            onChange={handleChange}
          />
          {errors && errors.firstName && <p className='u-validationError'>First name is required. </p>}
          <label>Last Name</label>
          <input
            name='lastName'
            placeholder='Smith'
            onChange={handleChange}
          />
          {errors && errors.lastName && <p className='u-validationError'>Last name is required. </p>}
          <label>Username</label>
          <input
            name='username'
            placeholder='johnsmith'
            onChange={handleChange}
          />
          {errors && errors.username && <p className='u-validationError'>username is required. </p>}
          <label>Gender</label>
          <select
            name='gender'
            onChange={handleChange}
          >
            <option value=''>---</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='dont assume my gender!!'>dont assume my gender!!</option>
          </select>
          <label>Nationality</label>
          <select
            name='nationality'
            placeholder='Nationality'
            onChange={handleChange}
          >
            <option key='blankNat' value=''>---</option>
            {nationalites.map(nat => {
              return (
                <option key={nat} value={nat}>{nat}</option>
              )
            })}
          </select>
          <label>Email</label>
          <input
            name='email'
            placeholder='name@email.com'
            onChange={handleChange}
          />
          <label>Post Code</label>
          <input
            name='postCode'
            placeholder='E11 0bz'
            onChange={handleChange}
          />
          {errors && errors.email && <p className='u-validationError'>Email is required. </p>}
          <label>Are you a player, agent or club official?</label>
          <select
            name='userType'
            onChange={(e) => {
              handleChange(e)
              setUserType(e.target.value)
            }}
          >
            <option value=''>---</option>
            <option value='Player'>Player</option>
            <option value='Agent'>Agent</option>
            <option value='Official'>Club Official</option>
          </select>
          {errors && errors.userType && <p className='u-validationError'> You must choose a profile. </p>}
          {userType === 'Agent' && setTypeDefaults(userType)}
          {userType === 'Official' && setTypeDefaults(userType)}
          {userType === 'Player' && setTypeDefaults(userType) && !playerHide &&
            <>
              <p 
                className='formWrapper__link u-highlight' 
                onClick={() => togglePlayerHide()}
              >
                Fill player info later?
              </p>
              <label>Agent</label>
              <select
                name='agent'
                placeholder='Agent'
                onChange={(e) => setAgentId(e.target.value)}
              >
                <option value='None'>---</option>
                {agents && agents.map(agent => 
                  <option 
                    key={agent._id} 
                    value={agent._id}
                  >
                    {agent.firstName} {agent.lastName}
                  </option>
                )}
              </select>
              <label>Position</label>
              <select
                name='position'
                placeholder='Position'
                onChange={handlePlayerChange}
              >
                <option value='Not Specified'>---</option>
                <option value='Defender'>Defender</option>
                <option value='Centre Back'>Centre back</option>
                <option value='Sweeper'>Sweeper</option>
                <option value='Full Back'>Full back</option>
                <option value='Wing Back'>Wing back</option>
                <option value='Midfield'>Midfield</option>
                <option value='Centre Midfield'>Centre midfield</option>
                <option value='Defensive Midfield'>Defensive midfield</option>
                <option value='Attacking Midfield'>Attacking midfield</option>
                <option value='Wide Midfield'>Wide midfield</option>
                <option value='Striker'>Striker</option>
                <option value='Centre Forward'>Centre forward</option>
                <option value='Second Striker'>Second striker</option>
                <option value='Winger'>Winger</option>
              </select>
              <label>Height</label>
              <input
                name='height'
                placeholder='Height'
                onChange={handlePlayerChange}
              />
              <label>Weight</label>
              <input
                name='weight'
                placeholder='Weight'
                onChange={handlePlayerChange}
              />
              <label>Age</label>
              <input
                name='age'
                placeholder='Age'
                onChange={handlePlayerChange}
              />
              <label>Official</label>
              <select
                name='official'
                placeholder='Official'
                onChange={(e) => setOfficialId(e.target.value)}
              >
                <option value='None'>---</option>
                {officials && officials.map(official => 
                  <option 
                    key={official._id} 
                    value={official._id}
                  >
                    {official.firstName} {official.lastName}
                  </option>
                )}
              </select>
              <label>Current Club</label>
              <select
                name='currentClub'
                placeholder='Current Club'
                onChange={(e) => setClubId(e.target.value)}
              >
                <option value='None'>---</option>
                {clubs && clubs.map(club => 
                  <option 
                    key={club._id} 
                    value={club._id}
                  >
                    {club.name}
                  </option>
                )}
              </select>
              <label>League</label>
              <select
                name='league'
                onChange={handlePlayerChange}
              >
                <option value='None'>---</option>
                <option value='None'>None</option>
                <option value='Premier League'>Premier League</option>
                <option value='Champions League'>Champions League</option>
              </select>
              <label>Contract End</label>
              <input
                type='date'
                name='contractEnd'
                placeholder='Date'
                onChange={handlePlayerChange}
              />
              <label>Contract type</label>
              <select
                name='type'
                onChange={handlePlayerChange}
              >
                <option value='Semi-Professional'>Semi-Professional</option>
                <option value='Professional'>Professional</option>
                <option value='Amateur'>Amateur</option>
              </select>
              <label>Price</label>
              <input
                name='price'
                placeholder='price'
                onChange={handlePlayerChange}
              />
              <label>Match Bonus</label>
              <input
                name='matchBonus'
                placeholder='Match Bonus'
                onChange={handlePlayerChange}
              />
              <label>Goal Bonus</label>
              <input
                name='goalBonus'
                placeholder='Goal Bonus'
                onChange={handlePlayerChange}
              />
            </>
          }
          <label>Image URL</label>
          <input
            name='imageUrl'
            placeholder='image URL'
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name='password'
            placeholder='Password'
            type='password'
            onChange={handleChange}
          />
          {errors && errors.passwordConfirmation && <p className='u-validationError'>Passwords do not match. </p>}
          <label>Password Confirmation</label>
          <input
            name='passwordConfirmation'
            placeholder='Password Confirmation'
            type='password'
            onChange={handleChange}
          />
          <p className='smallPrint'>
            By creating an account you are agreeing to the 
            <span className='u-highlight'> Terms of Service </span> 
            and
            <span className='u-highlight'> Privacy Policy. </span>
          </p>
          <button type='submit' className='btn'>Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Register)