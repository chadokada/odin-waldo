import React from 'react';
import 'styles/App.css';

const GameStatusIcons = ({ characters }) => {

  return (
    <div className='game-status-icons'>
      {characters.map((character) => {
        return(
          <div className='game-status-icon-container' key={character.name}>
              <img 
                className='game-status-icon' 
                id={`${character.name}-icon`} 
                alt={character.name} 
                src={character.src}
              />
          </div>
        )
      })}

    </div>

  )
};

export default GameStatusIcons;