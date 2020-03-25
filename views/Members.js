import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useToggle from '../hooks/useToggle'
import useFormState from '../hooks/useFormState'

import ConnectButton from '../components/ConnectButton'

function Members() {
  const [members, setMembers] = useState([])
  const [errors, setErrors] = useState(null)
  const [filterData, handleChange] = useFormState({ userType: 'allTypes', userOrder: 'recentlyActive' })
  const [grid, toggleGrid] = useToggle(true)

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setMembers(res.data)
      })
      .catch(err => {
        console.log('response data', err.response.data.message)
        setErrors([err.response.data])
      })
  }, [])

  function getMemberType(member) {
    if (member.playerData) return member.playerData.type
    if (member.agentData) return 'Agent'
    if (member.officialData) return 'Official'
  }

  function sortMembers(a, b) {
    if (filterData.userOrder === 'recentlyActive') return a.lastActivity - b.lastActivity
    if (filterData.userOrder === 'newestMembers') return a.serializedCreatedAt - b.serializedCreatedAt
    if (filterData.userOrder === 'alphabetical') return a.firstName.localeCompare(b.firstName)
  }

  return (
    <div className='members--split'>
      <div className='members'>
        <h1>Members</h1>
        <div>Hero Image</div>
        <h2>All Members
          <span className='notification'>{members && members.length}</span>
        </h2>
        <div className='members__display'>
          <div className='members__display__filters'>
            <select
              name='userType'
              onChange={handleChange}
            >
              <option value='allTypes'>All Types</option>
              <option value='professional'>Professional</option>
              <option value='semi-professional'>Semi-Professional</option>
              <option value='amateur'>Amateur</option>
              <option value='Agent'>Agent</option>
              <option value='Official'>Club Official</option>
            </select>
            <select
              name='userOrder'
              onChange={handleChange}
            >
              <option value='recentlyActive'>Recently Active</option>
              <option value='newestMembers'>Newest Members</option>
              <option value='alphabetical'>alphabetical</option>
            </select>
            <div className='members__display__style'>
              <i className="fas fa-grip-horizontal" onClick={() => toggleGrid()}></i>
              <p>|</p>
              <i className="fas fa-bars" onClick={() => toggleGrid()}></i>
            </div>
          </div>
          <div 
            className={`members__display__list ${grid === true ? 'u-grid' : 'u-list'}`}
          >
            {members && members
              .filter(member => ((getMemberType(member) === filterData.userType) || filterData.userType === 'allTypes'))
              .sort((a, b) => sortMembers(a, b))
              .map(member => {
                return (
                  <div className='panelWrapper members__display__list__member' key={member._id}>
                    <img
                      className='members__display__list__member__image'
                      src={member.imageUrl}
                    />
                    <div className='members__display__list__member__info'>
                      <p className='u-highlight members__display__list__member__info__name'>
                        {member.firstName} {member.lastName}
                      </p>
                      <p className='members__display__list__member__info__type'>
                        {getMemberType(member)}
                      </p>
                    </div>
                    <div>
                      <ConnectButton memberId={member._id} name={member.firstName} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div>
          {errors && errors.map(err => <p key={ err.message } className='u-validationError'>{ err.message }</p>)}
        </div>
      </div>
      <div className='member__search panelWrapper'>
        <h1>Search</h1>
        <form className='formWrapper'>
          <label>Position</label>
          <select
            name='position'
            placeholder='Position'
            //onChange={handlePlayerChange}
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
          <label>Nationality</label>
          <input
            name='nationality'
            placeholder='Nationality'
            onChange={handleChange}
          />
          <label>League</label>
          <select
            name='league'
            //onChange={handlePlayerChange}
          >
            <option value='None'>---</option>
            <option value='None'>None</option>
            <option value='Premier League'>Premier League</option>
            <option value='Champions League'>Champions League</option>
          </select>
          <label>Age</label>
          <input
            name='age'
            placeholder='Age'
            //onChange={handlePlayerChange}
          />
          <label>First Name</label>
          <input
            name='firstName'
            placeholder='First Name'
            onChange={handleChange}
          />
          <label>Last Name</label>
          <input
            name='lastName'
            placeholder='Last Name'
            onChange={handleChange}
          />
          <p className='u-highlight'>Reset</p>
          <button type='submit' className='btn'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Members