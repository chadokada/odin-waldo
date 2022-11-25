import React from 'react';
import formatTime from '../utils/forrmatTime';
import 'styles/leaderboard.css';

const LeaderBoard = ({
  player, 
  displayedTimes
}) => {

  return (
    <div className='leaderboard-container'>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th className='table-col-1'>#</th>
            <th className='table-col-2'>Name</th>
            <th className='table-col-3'>Time</th>
          </tr>
        </thead>
        <tbody>
          {displayedTimes.map((playerTime, index) => {
            if(index < 20) {
              var scoreRow = '';
              index % 2 === 0 ? scoreRow = 'even' : scoreRow = 'odd';
              var animationStyle = {};
              
              if(playerTime[1] === player.name && parseInt(playerTime[0]) === player.time){
                animationStyle = {
                  animationName: 'playertime',
                  animationDelay: '0.25s',
                  animationDuration: '3s',
                } 
              } 
            }

            return(
              <tr key={index+1} className={`scoreRow-${scoreRow}`} style={animationStyle}>
                <td className='table-col-1'>{index + 1}</td>
                <td className='table-col-2'>{playerTime[1]}</td>
                <td className='table-col-3'>{formatTime(playerTime[0])}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard;