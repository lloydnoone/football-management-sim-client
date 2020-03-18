import React, { useState } from 'react'
import axios from 'axios'
import LocalAuth from '../../lib/localAuth'

function Login(props) {

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState([])

  function handleChange(e) {
    const data = { ...formData, [e.target.name]: e.target.value }
    setFormData(data)
    console.log(formData)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', formData)
      .then((res) => {
        console.log(res)
        LocalAuth.setToken(res.data.token)
        props.history.push('/')
      })
      .catch(err => {
        console.log('response data', err.response.data.message)
        setErrors([Object.values(err.response.data.message)])
      })
  }

  return (
    <div className='login'>
      <div className='panelWrapper'>
        <form className='formWrapper' onSubmit={handleSubmit}>
          <div className='formWrapper__header'>
            <h2 className='formWrapper__h2'>Login</h2>
            <p className='formWrapper__link'>or 
              <span className='u-highlight'> Create an Account </span>
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

          <p className='smallPrint'>
            By creating an account you are agreeing to the 
            <span className='u-highlight'> Terms of Service </span> 
            and
            <span className='u-highlight'> Privacy Policy. </span>
          </p>
          <button type='submit' className='btn'>Login</button>
        </form>
      </div>
      {errors && 
        errors.map(err => {
          console.log('mapped error: ', err.message)
          return <p key={ err.message }>{ err.message }</p>
        })
      }
    </div>
  )
}

export default Login