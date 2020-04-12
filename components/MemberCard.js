import React from 'react'
import { Link } from 'react-router-dom'

import ConnectButton from '../components/ConnectButton'

function MemberCard({ _id, imageUrl, firstName, lastName, userType }) {
  return (
    <div className='panelWrapper members__display__list__member' key={_id}>
      <Link to={`/members/${_id}`}>
        <img
          className='members__display__list__member__image'
          src={imageUrl}
        />
      </Link>
      <div className='members__display__list__member__info'>
        <Link to={`/members/${_id}`}>
          <p className='u-highlight members__display__list__member__info__name'>
            {firstName} {lastName}
          </p>
        </Link>
        <p className='members__display__list__member__info__type'>
          {userType}
        </p>
      </div>
      <div className='members__display__list__member__connect'>
        <ConnectButton memberId={_id} name={firstName} />
      </div>
    </div>
  )
}

export default MemberCard