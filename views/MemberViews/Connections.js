import React from 'react'

import MembersDisplay from '../../components/MembersDisplay'

function Connections(props) {
  return (
    <MembersDisplay members={props.connections} />
  )
  
}

export default Connections