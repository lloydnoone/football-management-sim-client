import React from 'react'

import PlayerInfoShow from '../../components/PlayerInfoShow'
import AgentInfoShow from '../../components/AgentInfoShow'
import OfficialInfoShow from '../../components/OfficialInfoShow'

//container element must be position relative
function Profile(props) {

  const { member } = props
  const { firstName, lastName, userType, username, nationality } = member

  return (
    <div className='memberShow__userInfo__bottom'>
      <h2>Profile</h2>
      <h3>Basic Info</h3>
      <div className='memberShow__userInfo__bottom__split'>
        <div className='memberShow__userInfo__bottom__split__labels'>
          <ul>
            <li>First Name</li>
            <li>Last Name</li>
            <li>User Name</li>
            <li>Profile Type</li>
            <li>Nationality</li>
          </ul>
        </div>
        <div className='memberShow__userInfo__bottom__split__data'>
          <ul>
            <li>{firstName}</li>
            <li>{lastName}</li>
            <li>{username}</li>
            <li>{userType}</li>
            <li>{nationality}</li>
          </ul>
        </div>
      </div>
      {userType === 'Player' &&
        <PlayerInfoShow member={member} />
      }
      {userType === 'Agent' &&
        <AgentInfoShow member={member} />
      }
      {userType === 'Official' &&
        <OfficialInfoShow member={member} />
      }
    </div>
  )
}

export default Profile