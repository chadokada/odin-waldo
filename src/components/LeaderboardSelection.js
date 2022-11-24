import React, {useEffect} from 'react';
import 'styles/allleaders.css'

const LeaderboardSelection = ({game}) => {

  return (
    <div className='lb-selection-container'>
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