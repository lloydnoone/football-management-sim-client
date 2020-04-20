import React from 'react'

function OfficialInfoShow(props) {
  const { currentClub } = props.member.officialData
  return (
    <>
      <h3>Official Information</h3>
      <div className='memberShow__userInfo__bottom__split'>
        <div className='memberShow__userInfo__bottom__split__labels'>
          <ul>
            <li>Current Club</li>
          </ul>
        </div>
        <div className='memberShow__userInfo__bottom__split__data'>
          <ul>
            <li>{currentClub.name}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default OfficialInfoShow