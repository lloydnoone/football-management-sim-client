import React from 'react'

import useToggle from '../hooks/useToggle'
import useFormState from '../hooks/useFormState'

import MemberCard from '../components/MemberCard'
import MemberFilters from '../components/MemberFilters'

function MemberDisplay(props) {
  const { members, searchParams } = props
  const [filterData, handleChange] = useFormState({ userType: 'allTypes', userOrder: 'recentlyActive' })
  const [grid, toggleGrid] = useToggle(true)

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
        if (member.playerData) return (member.playerData.type === filterData.userType)
        return (member.userType === filterData.userType)
      })
    
    //check if user has entered search data if not return unfiltered
    if (!searchParams) return QFMembers
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
    <div className='members__display'>
      <MemberFilters
        handleChange={handleChange}
        toggleGrid={toggleGrid}
      />
      <div
        className={`members__display__list ${grid === true ? 'u-grid' : 'u-list'}`}
      >
        {members && filterMembers()
          .sort((a, b) => sortMembers(a, b))
          .map(member => {
            return (
              <MemberCard key={member._id} {...member} />
            )
          })}
      </div>
    </div>
  )
}

export default MemberDisplay