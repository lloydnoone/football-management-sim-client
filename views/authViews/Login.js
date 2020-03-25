import React, { useState, useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import LocalAuth from '../../lib/localAuth'
import useFormState from '../../hooks/useFormState'
import { profileContext } from '../../contexts/profileContext'

function Login(props) {
  const { getProfile } = useContext(profileContext)
  const [errors, setErrors] = useState([])
  const [formData, handleChange] = useFormState({})

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', formData)
      .then((res) => {
        LocalAuth.setToken(res.data.token)
        getProfile()
        props.history.push('/')
      })
      .catch(err => {
        console.log('response data', err.response.data.message)
        setErrors([err.response.data])
      })
  }

  return (
    <div className='login'>
      <div className='panelWrapper'>
        <form className='formWrapper' onSubmit={handleSubmit}>
          <div className='formWrapper__header'>
            <h2 className='formWrapper__h2'>Login</h2>
            <p className='formWrapper__link'>or 
              <Link to='/register' className='u-highlight'> Create an Account </Link>
            </p>
          </div>
          
          <label>Email</label>
          <input
            name='email'
            placeholder='name@email.com'
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name='password'
            placeholder='Password'
            type='password'
            onChange={handleChange}
          />
          {errors && errors.map(err => <p key={ err.message } className='u-validationError'>{ err.message }</p>)}
          <p className='smallPrint'>
            By creating an account you are agreeing to the 
            <span className='u-highlight'> Terms of Service </span> 
            and
            <span className='u-highlight'> Privacy Policy. </span>
          </p>
          <button type='submit' className='btn'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login)