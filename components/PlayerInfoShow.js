import React from 'react'

function PlayerInfoShow(props) {
  const { position, height, weight, currentClub, age } = props.member.playerData
  const { nationality, gender } = props.member
  return (
    <>
      <h3>Player Information</h3>
      <div className='memberShow__userInfo__bottom__split'>
        <div className='memberShow__userInfo__bottom__split__labels'>
          <ul>
            <li>Age</li>
            <li>Gender</li>
            <li>Nationality</li>
            <li>Position</li>
            <li>Height</li>
            <li>Weight</li>
            <li>Current Club</li>
          </ul>
        </div>
        <div className='memberShow__userInfo__bottom__split__data'>
          <ul>
            <li>{age}</li>
            <li>{gender}</li>
            <li>{nationality}</li>
            <li>{position}</li>
            <li>{height}</li>
            <li>{weight}</li>
            <li>{currentClub.name}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default PlayerInfoShow