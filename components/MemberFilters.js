import React from 'react'

function MemberFilters(props) {

  const { handleChange, toggleGrid } = props
  return (
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
  )
}

export default MemberFilters