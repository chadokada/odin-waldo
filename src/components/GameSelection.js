import React, {useState, useEffect} from 'react';
import GameSelectionHeader from './GameSelectionHeader';
import debounce from '../utils/debounce';
import 'styles/gameselection.css'

const GameSelection = ({ chooseGame }) => {

  useEffect(() => {
    const debouncedHandleResize = () => {debounce(function handleResize(){
      console.log(`Current window: ${window.innerWidth}x${window.innerHeight}`) 
    }, 1000)}

    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  })

  return (
    <div className='game-selection-container'>
      <GameSelectionHeader />
      <div className='board-selection-container'>
        <div className='board-selection-img-container'>
          <img 
            className='board-selection-img' 
            alt='ps2' 
            src={require('assets/gameboards/ps2.jpg')}
            onClick={chooseGame}
          />
        </div>
        <div className='board-selection-img-container'>
          <img 
            className='board-selection-img' 
            alt='ps3' 
            src={require('assets/gameboards/ps3.jpg')}
            onClick={chooseGame}
          />
        </div>
        <div className='board-selection-img-container'>
          <img 
            className='board-selection-img' 
            alt='ps4' 
            src={require('assets/gameboards/ps4.jpg')}
            onClick={chooseGame}
          />
        </div>
      </div> 
    </div>
  )
};

export default GameSelection;