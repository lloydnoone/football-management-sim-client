import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import LocalAuth from '../../lib/localAuth'
import useToggle from '../../hooks/useToggle'

function Register(props) {

  const [formData, setFormData] = useState({})
  const [userType, setUserType] = useState('')
  const [errors, setErrors] = useState({})
  const [playerHide, togglePlayerHide] = useToggle(false)

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
      .then((res) => {
        LocalAuth.setToken(res.data.token)
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

  function setTypeDefaults(type) {
    if (!formData.playerData && type === 'player') setFormData({ ...formData, playerData: {}, agentData: null, officialData: null })
    if (!formData.agentData && type === 'agent') setFormData({ ...formData, agentData: {}, playerData: null, officialData: null })
    if (!formData.officialData && type === 'official') setFormData({ ...formData, officialData: {}, playerData: null, agentData: null })

    return true
  }

  return (
    <div className='register'>
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
            placeholder='First Name'
            onChange={handleChange}
          />
          {errors && errors.firstName && <p className='u-validationError'>First name is required. </p>}
          <label>Last Name</label>
          <input
            name='lastName'
            placeholder='Last Name'
            onChange={handleChange}
          />
          {errors && errors.lastName && <p className='u-validationError'>Last name is required. </p>}
          <label>Username</label>
          <input
            name='username'
            placeholder='Username'
            onChange={handleChange}
          />
          {errors && errors.username && <p className='u-validationError'>username is required. </p>}
          <label>Gender</label>
          <select
            name='gender'
            onChange={handleChange}
          >
            <option value=''>---</option>
            <option value='male'>Male</option>
            <option value='agent'>Female</option>
            <option value='dont assume my gender!!'>dont assume my gender!!</option>
          </select>
          <label>Nationality</label>
          <input
            name='nationality'
            placeholder='Nationality'
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name='email'
            placeholder='name@email.com'
            onChange={handleChange}
          />
          {errors && errors.email && <p className='u-validationError'>Email is required. </p>}
          <label>Are you a player, agent or club official?</label>
          <select
            name='userType'
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value=''>---</option>
            <option value='player'>Player</option>
            <option value='agent'>Agent</option>
            <option value='official'>Club Official</option>
          </select>
          {errors && errors.userType && <p className='u-validationError'> You must choose a profile. </p>}
          {userType === 'agent' && setTypeDefaults(userType)}
          {userType === 'official' && setTypeDefaults(userType)}
          {userType === 'player' && setTypeDefaults(userType) && !playerHide &&
            <>
              <p 
                className='formWrapper__link u-highlight' 
                onClick={() => togglePlayerHide()}
              >
                Fill player info later?
              </p>
              <label>Position</label>
              <select
                name='position'
                placeholder='Position'
                onChange={handlePlayerChange}
              >
                <option value='Defender'>Defender</option>
                <option value='Centre back'>Centre back</option>
                <option value='Sweeper'>Sweeper</option>
                <option value='Full back'>Full back</option>
                <option value='Wing back'>Wing back</option>
                <option value='Midfield'>Midfield</option>
                <option value='Centre midfield'>Centre midfield</option>
                <option value='Defensive midfield'>Defensive midfield</option>
                <option value='Attacking midfield'>Attacking midfield</option>
                <option value='Wide midfield'>Wide midfield</option>
                <option value='Striker'>Striker</option>
                <option value='Centre forward'>Centre forward</option>
                <option value='Second striker'>Second striker</option>
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
              <label>Agent</label>
              <select
                name='agent'
                onChange={handlePlayerChange}
              >
                <option value='None' >---</option>
                <option value='None' >None</option>
              </select>
              <label>Official</label>
              <select
                name='official'
                onChange={handlePlayerChange}
              >
                <option value='None'>---</option>
                <option value='None'>None</option>
              </select>
              <label>Current Club</label>
              <select
                name='currentClub'
                onChange={handlePlayerChange}
              >
                <option value='None'>---</option>
                <option value='None'>None</option>
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
                <option value='semi-professional'>semi-professional</option>
                <option value='professional'>professional</option>
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