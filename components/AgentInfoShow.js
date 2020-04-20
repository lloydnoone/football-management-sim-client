import React from 'react'

function AgentInfoShow(props) {
  const { transfers, agentData } = props.member
  return (
    <>
      <h3>Player Transfers</h3>
      {transfers.length === 0 && <p>None</p>}
      {transfers.length && transfers.map(trans => {
        const { player: { firstName, lastName }, _id, from, to, type, fee } = trans
        console.log('trans: ', trans)
        return (
          <div key={_id} className='memberShow__userInfo__bottom__split'>
            <div className='memberShow__userInfo__bottom__split__labels'>
              <ul>
                <li>Player Name</li>
                <li>Transfered From</li>
                <li>Transfered To</li>
                <li>Transfer Date</li>
                <li>Transfer Type</li>
                <li>Transfer Fee</li>
              </ul>
            </div>
            <div className='memberShow__userInfo__bottom__split__data'>
              <ul>
                <li>{firstName} {lastName}</li>
                <li>{from.name}</li>
                <li>{to.name}</li>
                <li>{new Date(trans.createdAt).toDateString()}</li>
                <li>{type}</li>
                <li>£{fee}</li>
              </ul>
            </div>
          </div>
        )
      })}
      <h3>Current Players</h3>
      {agentData && agentData.players.length === 0 && <p>None</p>}
      {agentData && agentData.players.length && agentData.players.map(player => {
        const { firstName, lastName, _id, playerData: { currentClub, contractEnd } } = player
        console.log('player: ', player)
        return (
          <div key={_id} className='memberShow__userInfo__bottom__split'>
            <div className='memberShow__userInfo__bottom__split__labels'>
              <ul>
                <li>Player Name</li>
                <li>Current Club</li>
                <li>Contract End</li>
              </ul>
            </div>
            <div className='memberShow__userInfo__bottom__split__data'>
              <ul>
                <li>{firstName} {lastName}</li>
                <li>{currentClub.name}</li>
                <li>{new Date(contractEnd).toDateString()}</li>
              </ul>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AgentInfoShow