import React, { useEffect, useState } from 'react';
import 'styles/App.css';
import { test, getBestTimes } from '../firebase/dbFunctions'

const ScoreBoard = ( {displayedTimes} ) => {
  
  //onsole.table(displayedTimes)
  //console.log('**************************************')

  const testObj = {
    1: 'dddog',
    2: 'cat'
  }

  const showTimes = () => {
    Object.keys(displayedTimes).map((time) => {
      const players = displayedTimes[time];
      players.map((player) => {
        console.log(time, player)
      })
    })
  }

  return (
    <div>
      {Object.keys(displayedTimes).map((time) => {
        const players = displayedTimes[time]
        return(
          players.map((player) => {
            return(
              <div>{time} - {player}</div>
            )
  
          })
        )
      })}  
      
     
    </div>
  )
}

export default ScoreBoard;