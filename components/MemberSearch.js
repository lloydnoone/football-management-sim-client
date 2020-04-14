import React from 'react'

import nationalites from '../data/nationalities.json'

function MemberSearch(props) {
  const { searchParams, handleSearchChange } = props

  return (
    <div className='member__search panelWrapper'>
      <h1>Search</h1>
      <form className='formWrapper'>
        <label>Player, Agent or Official?</label>
        <select
          name='userType'
          onChange={handleSearchChange}
        >
          <option value=''>---</option>
          <option value='Player'>Player</option>
          <option value='Agent'>Agent</option>
          <option value='Official'>Official</option>
        </select>
        {searchParams && searchParams.userType === 'Player' &&
          <>
            <label>Position</label>
            <select
              name='position'
              placeholder='Position'
              onChange={handleSearchChange}
            >
              <option value=''>---</option>
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
          </>
        }
        <label>Age</label>
        <input
          name='age'
          placeholder='Age'
          onChange={handleSearchChange}
        />
        <label>Nationality</label>
        <select
          name='nationality'
          placeholder='Nationality'
          onChange={handleSearchChange}
        >
          <option key='blankNat' value=''>---</option>
          {nationalites.map(nat => {
            return (
              <option key={nat} value={nat[0].toLowerCase() + nat.slice(1)}>{nat}</option>
            )
          })}
        </select>
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
  )
}

export default MemberSearch