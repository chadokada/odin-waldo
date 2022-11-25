import React from 'react';
import 'styles/allleaders.css'

const LeaderboardSelection = ({game, setGame}) => {

  const handleClick = () => {
    setGame(game);
  }

  return (
    <div className='lb-selection-container' game={game} onClick={handleClick}>
      <div className='lb-selection-row'></div>
      <div className='lb-img-container'>
        <img 
            className='lb-img' 
            alt={`${game}`} 
            src={require(`assets/gameboards/${game}.jpg`)}
        />
      </div>
      <div className='lb-selection-row'>{game}</div>
    </div>
  )
};

export default LeaderboardSelection;