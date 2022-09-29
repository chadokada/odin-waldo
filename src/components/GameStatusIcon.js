import React from 'react';
import 'styles/App.css';


const GameStatusIcon = ({ character }) => {

  return (
    <div className='game-status-icon-container'>
      <img className='game-status-icon' alt={character.name} src={character.src}/>
    </div>
  )
};

export default GameStatusIcon;