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
            <label>League</label>
            <select
              name='league'
              onChange={handleSearchChange}
            >
              <option value=''>---</option>
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
              <option key={nat} value={nat}>{nat}</option>
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