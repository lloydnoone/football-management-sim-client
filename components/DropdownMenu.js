import React from 'react'

//container element must be position relative
function DropdownMenu(props) {

  return (
    <div className={`dropdownMenu--container ${props.visible ? 'openDropdown' : ''}`}>
      <div className='dropdownMenu'>
        <h3 className='dropdownMenu__header'>Notifications</h3>
        <div className='dropdownMenu__item'>
          <img src='https://vignette.wikia.nocookie.net/anchorman/images/1/10/Ron_burgundy.jpg/revision/latest/scale-to-width-down/340?cb=20120329160125' className='dropdownMenu__item__image'/>
          <div className='dropdownMenu__item__info'>
            <p className='dropdownMenu__item__info__text'>Squadron Pro sent you an invitation to connect</p>
            <p className='dropdownMenu__item__info__timeStamp'>6 hours, 26 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu