import React, { useEffect, useState } from 'react';
import { SAMPLETIMES } from 'seedGameData';
import 'styles/App.css';
import formatTime from '../utils/forrmatTime';

const TimeBoard = ( {playerName, time, setShowTimeBoard ,displayedTimes} ) => {
  
  //onsole.table(displayedTimes)
  //console.log('**************************************')

  const testObj = {
    1: 'dddog',
    2: 'cat'
  }

  const newGame = () => {
    
    setShowTimeBoard(false);
  }

  return (
    <div className='timeboard-container'>
      
      <div className='timeboard-title'>
        <div className='timeboard-logo-container'>
          <img className='timeboard-logo' alt='logo' src={require('../assets/logos/ps3logo.png')}></img>
        </div>
        <span>Best Times</span>
      </div>
      
      <div className='timeboard-player-time'>Your Time: {formatTime(time)}</div>

      <table className='timeboard-table'>
        <thead>
          <tr>
            <th className='table-col-1'>#</th>
            <th className='table-col-blank'></th>
            <th className='table-col-2'>Name</th>
            <th className='table-col-blank'></th>
            <th className='table-col-3'>Time</th>
          </tr>
        </thead>
        
        <tbody>
          {displayedTimes.map((playerTime, index) => {
            if(index < 10) {
              var scoreRow = '';
              index % 2 === 0 ? scoreRow = 'even' : scoreRow = 'odd';

              return(
                <tr key={index+1} className={`scoreRow-${scoreRow}`}>
                  <td className='table-col-1'>{index + 1}</td>
                  <th className='table-col-blank'></th>
                  <td className='table-col-2'>{playerTime[1]}</td>
                  <th className='table-col-blank'></th>
                  <td className='table-col-3'>{formatTime(playerTime[0])}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      
      <div className='timeboard-buttons'>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  )
}

export default TimeBoard;


/*


      {Object.keys(displayedTimes).map((time) => {
        const players = displayedTimes[time]
        return(
          players.map((player) => {
            return(
              <div>{formatTime(time)} - {player}</div>
            )
  
          })
        )
      })} 


*/