import React, { useEffect, useState } from 'react';
import { SAMPLETIMES } from 'seedGameData';
import 'styles/App.css';
import formatTime from '../utils/forrmatTime';

const ScoreBoard = ( {displayedTimes} ) => {
  
  //onsole.table(displayedTimes)
  //console.log('**************************************')

  const testObj = {
    1: 'dddog',
    2: 'cat'
  }

  const showTimes = () => {
    console.log(displayedTimes)
  }

  return (
    <div className='scoreboard-container'>
      <table className='scoreboard-table'>
        <thead>
          <tr>
            <th className='table-col-1'>#</th>
            <th className='table-col-2'>Name</th>
            <th className='table-col-3'>Time</th>
          </tr>
        </thead>
        
        <tbody>
          {displayedTimes.map((time, index) => {
            return(
              <tr key={index+1}>
                <td className='table-col-1'>{index + 1}</td>
                <td className='table-col-2'>{time[1]}</td>
                <td className='table-col-3'>{formatTime(time[0])}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={showTimes}></button>
     
    </div>
  )
}

export default ScoreBoard;


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