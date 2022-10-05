import React from 'react';
import '../styles/App.css';
import GameStatusIcon from './GameStatusIcon';

const GameStatus = ({ characters }) => {

  return (
    <div className='game-status-container'>
      <div className='blank'>
      </div>
      <div className='game-status-icons'>
        {characters.map((character) => {
          return(
            <GameStatusIcon key={character.name} character={character}/>
          )
        })}
      </div>
      <div className='timer'>
        1:20
      </div>
    </div>
  )
}

export default GameStatus;