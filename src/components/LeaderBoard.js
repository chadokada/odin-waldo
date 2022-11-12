import React, { useEffect } from 'react';
import 'styles/leaderboard.css';
import formatTime from '../utils/forrmatTime';

const LeaderBoard = ({
  player, 
  selectedGame, 
  displayedTimes, 
  setStartGame, 
  setShowLeaderBoard, 
  scrollPosition
}) => {

  const newGame = () => {
    setShowLeaderBoard(false);
    setStartGame(false);
  };

  const centerLeaderBoard = () => {
    const windowHeight = window.innerHeight;
    const LeaderBoardDiv = document.querySelector('.leaderboard-container');
    const LeaderBoardTopY = (windowHeight - LeaderBoardDiv.offsetHeight) / 2 + scrollPosition;
    LeaderBoardDiv.style.top = `${LeaderBoardTopY}px`;
  };

  useEffect( () => {
    centerLeaderBoard();
  })

  return (
    <div className='leaderboard-container'>
      <div className='leaderboard-title'>
        <div className='leaderboard-logo-container'>
          <img className='leaderboard-logo' alt='logo' src={require(`../assets/logos/${selectedGame}logo.png`)}></img>
        </div>
        <span>Leaderboard</span>
      </div>
      <table className='leaderboard-table'>
        <thead>
          <tr>
            <th className='table-col-1'>#</th>
            {/*
            th className='table-col-blank'></th>
            */}
            <th className='table-col-2'>Name</th>
            {/* 
            <th className='table-col-blank'></th>
            */}
            <th className='table-col-3'>Time</th>
          </tr>
        </thead>
        <tbody>
          {displayedTimes.map((playerTime, index) => {
            if(index < 20) {
              var scoreRow = '';
              index % 2 === 0 ? scoreRow = 'even' : scoreRow = 'odd';

              var animationStyle = {};
              if(playerTime[1] === player.name && playerTime[0] === player.time){
                animationStyle = {
                  animationName: 'playertime',
                  animationDelay: '0.25s',
                  animationDuration: '3s',
                }
              } 
              return(
                <tr key={index+1} className={`scoreRow-${scoreRow}`} style={animationStyle}>
                  <td className='table-col-1'>{index + 1}</td>
                  {/*
                  <td className='table-col-blank'></td>
                  */}
                  <td className='table-col-2'>{playerTime[1]}</td>
                  {/*
                  <td className='table-col-blank'></td>
                  */}
                  <td className='table-col-3'>{formatTime(playerTime[0])}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      
      <div className='leaderboard-buttons'>
        <button onClick={newGame}>New Game</button>
      </div>
    </div>
  )
}

export default LeaderBoard;