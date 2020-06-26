import React from 'react'

//container element must be position relative
function DropdownMenu({ visible, connectionRequests }) {

  return (
    <div className={`dropdownMenu--container ${visible ? 'openDropdown' : ''}`}>
      <div className='dropdownMenu'>
        <h3 className='dropdownMenu__header'>Notifications</h3>
        {connectionRequests && connectionRequests.length === 0 &&
          <>
            <div className='dropdownMenu__item'>
              <div className='dropdownMenu__item__noNotifications'>
                <p className='dropdownMenu__item__noNotifications__text'>No new notifications!</p>
              </div>
            </div>
          </>
        }
        {connectionRequests && connectionRequests.length > 0 &&
          connectionRequests.map(conReq => {
            return (
              <div className='dropdownMenu__item' key={conReq._id}>
                <img src={conReq.fromUser.imageUrl} className='dropdownMenu__item__image' />
                <div className='dropdownMenu__item__info'>
                  <p className='dropdownMenu__item__info__text'>{conReq.fromUser.firstName} {conReq.fromUser.lastName} sent you an invitation to connect</p>
                  <p className='dropdownMenu__item__info__timeStamp'>6 hours, 26 minutes ago</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DropdownMenu