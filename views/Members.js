import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useToggle from '../hooks/useToggle'
import useFormState from '../hooks/useFormState'

import ConnectButton from '../components/ConnectButton'

import nationalites from '../data/nationalities.json'

function Members() {
  const [members, setMembers] = useState([])
  const [errors, setErrors] = useState(null)
  const [filterData, handleChange] = useFormState({ userType: 'allTypes', userOrder: 'recentlyActive' })
  const [grid, toggleGrid] = useToggle(true)
  const [searchParams, handleSearchChange] = useFormState({})

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

   // (
        //   (
        //     ((playerData.position === searchParams.position) || (searchParams.position === null || '')) &&
        //     ((member.nationality === searchParams.nationality) || (searchParams.nationality === null || '')) &&
        //     ((playerData.league === searchParams.league) || (searchParams.league === null || ''))
        // // check for partial matches in fields
        // //RegExp(searchParams.firstName).test(member.firstName)

        //   )
        // ) 

  function filterMembers() {
    //check if user has entered search data if not return unfiltered
    if (Object.values(searchParams).every(val => val === undefined || val === '')) return members
    // if it is filter the agents and officials first
    return members//.filter(member => member.playerData !== null)
      .filter(member => {
        const { playerData } = member
        // convert string input to compare against user data
        if (searchParams.age === 0) searchParams.age = undefined
        if (searchParams.age !== undefined) searchParams.age = Number(searchParams.age)
        //filter using search parameters
        for (const key in searchParams) {
          // parameter is false then dont filter by it
          if (searchParams[key] === undefined || searchParams[key] === '') return true
          // regex for name search
          if (searchParams[key] === 'firstName' || searchParams[key] === 'firstName') {
            console.log('searchParams[key]: ', searchParams[key])
            console.log('member[key]: ', member[key])
            return RegExp(searchParams[key]).test(member[key])
          }
          // filter by generic user data
          if (member[key] && member[key] !== searchParams[key]) return false
          //discern if player data or not
          if (playerData && playerData[key] && playerData[key] !== searchParams[key]) return false //causing error
        }
        return true
      })
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
            {members && filterMembers()//members
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
                    <div className='members__display__list__member__connect'>
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
          {console.log(searchParams)}
          <label>Position</label>
          <select
            name='position'
            placeholder='Position'
            onChange={handleSearchChange}
          >
            <option value='defender'>Defender</option>
            <option value='centre back'>Centre back</option>
            <option value='sweeper'>Sweeper</option>
            <option value='full back'>Full back</option>
            <option value='wing back'>Wing back</option>
            <option value='midfield'>Midfield</option>
            <option value='centre midfield'>Centre midfield</option>
            <option value='defensive midfield'>Defensive midfield</option>
            <option value='attacking midfield'>Attacking midfield</option>
            <option value='wide midfield'>Wide midfield</option>
            <option value='striker'>Striker</option>
            <option value='centre forward'>Centre forward</option>
            <option value='second striker'>Second striker</option>
            <option value='winger'>Winger</option>
          </select>
          <label>Nationality</label>
          <select
            name='nationality'
            placeholder='Nationality'
            onChange={handleSearchChange}
          >
            {nationalites.map(nat => {
              return (
                <option key={nat} value={nat[0].toLowerCase() + nat.slice(1)}>{nat}</option>
              )
            })}
          </select>
          <label>League</label>
          <select
            name='league'
            onChange={handleSearchChange}
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
            onChange={handleSearchChange}
          />
          <label>First Name</label>
          <input
            name='firstName'
            placeholder='First Name'
            onChange={handleSearchChange}
          />
          <label>Last Name</label>
          <input
            name='lastName'
            placeholder='Last Name'
            onChange={handleSearchChange}
          />
          <p className='u-highlight'>Reset</p>
          <button type='submit' className='btn'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Members