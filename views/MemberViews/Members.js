import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useToggle from '../../hooks/useToggle'
import useFormState from '../../hooks/useFormState'

import MemberCard from '../../components/MemberCard'
import MemberSearch from '../../components/MemberSearch'

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

  function sortMembers(a, b) {
    if (filterData.userOrder === 'recentlyActive') return a.lastActivity - b.lastActivity
    if (filterData.userOrder === 'newestMembers') return a.serializedCreatedAt - b.serializedCreatedAt
    if (filterData.userOrder === 'alphabetical') return a.firstName.localeCompare(b.firstName)
  }

  function filterMembers() {
    //filter members by quick filters first
    const QFMembers = members
      .filter(member => {
        if (filterData.userType === 'allTypes') return true
        //if player then filter by contract type
        if (member.playerData) {
          console.log('playerData: ', member.playerData.type === filterData.userType)
          return (member.playerData.type === filterData.userType)
        }
        return (member.userType === filterData.userType)
      })
    
    //check if user has entered search data if not return unfiltered
    if (Object.values(searchParams).every(val => val === undefined || val === '')) return QFMembers
    // if it is filter the agents and officials first after quick filters
    return QFMembers
      .filter(member => {
        const { playerData } = member
        // convert string input to compare against user data
        if (searchParams.age === 0) searchParams.age = undefined
        if (searchParams.age !== undefined) searchParams.age = Number(searchParams.age)
        //filter using search parameters
        for (const key in searchParams) {
          // parameter is empty then dont filter by it
          if (searchParams[key] === undefined || searchParams[key] === '') {
            //do nothing
          } else {
            // regex for name search
            if (key === 'firstName' || key === 'lastName') {
              return RegExp(`${searchParams[key]}*`,'gi').test(member[key])
            }
            // filter by generic user data
            if (member[key] && member[key] !== searchParams[key]) return false
            // filter by player data if it is a player
            if (playerData && playerData[key] && playerData[key] !== searchParams[key]) return false
          }
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
              <option value='Professional'>Professional</option>
              <option value='Semi-Professional'>Semi-Professional</option>
              <option value='Amateur'>Amateur</option>
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
            {members && filterMembers()
              .sort((a, b) => sortMembers(a, b))
              .map(member => {
                return (
                  <MemberCard key={member._id} { ...member } />
                )
              })}
          </div>
        </div>
        <div>
          {errors && errors.map(err => <p key={ err.message } className='u-validationError'>{ err.message }</p>)}
        </div>
      </div>
      <MemberSearch 
        searchParams={searchParams}
        handleSearchChange={handleSearchChange}
      />
    </div>
  )
}

export default Members