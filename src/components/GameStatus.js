import React from 'react';
import '../styles/App.css';
import GameStatusIcon from './GameStatusIcon';

const GameStatus = ({ characters }) => {

  return (
    <div className='game-status-container'>
      <div className='game-status-icons'>
        {characters.map((character) => {
          return(
            <GameStatusIcon character={character}/>
          )
        })}
      </div>
    </div>
  )
}

export default GameStatus;