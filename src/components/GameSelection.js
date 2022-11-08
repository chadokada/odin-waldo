import React, {useState, useEffect} from 'react';
import debounce from '../utils/debounce';
import 'styles/App.css';

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
      {/*<div className='game-selection-menu-container'>*/}
        <div className='board-selection-img-container'>
          <img 
            className='board-selection-img' 
            alt='ps2' 
            src={require('assets/gameboards/ps2.jpg')}
            onClick={chooseGame}
          />
          <img 
            className='board-selection-img' 
            alt='ps3' 
            src={require('assets/gameboards/ps3.jpg')}
            onClick={chooseGame}
          />
          <img 
            className='board-selection-img' 
            alt='ps4' 
            src={require('assets/gameboards/ps4.jpg')}
            onClick={chooseGame}
          />
        </div> 
      {/*
      </div>
      <div className='player-name-input-row'>
          <label htmlFor='player-name'>Your Name:</label>
          <input id='player-name' onChange={updatePlayerName} value={playerName}></input>
        </div> 
      */}
    </div>
  )
};

export default GameSelection;