import React from 'react';
import 'styles/header.css';
import Timer from './Timer';
import GameStatusIcons from './GameStatusIcon';

const GameStatus = ({ time, characters, setStartGame, setTimerRunning }) => {

  const formatTime = (milliseconds) => {
    // Takes milliseconds and returns a string forrmatted mm:ss:sss
    const mm = ("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2);
    const ss = ("0" + Math.floor((milliseconds / 1000) % 60)).slice(-2);
    const sss = ("0" + ((milliseconds / 10) % 100)).slice(-2);

    return `${mm}:${ss}:${sss}`;
  }

  const handleHome = () => {
    setTimerRunning(false);
    setStartGame(false);
  }

  return (
    <div className='game-status-container'>

      <div className='blank'>
        <button className='home-btn' onClick={handleHome}>Home</button>
      </div>

      <div className='game-status-icons'>
        <GameStatusIcons characters={characters} />
        {/*
        characters.map((character) => {
          return(
            <GameStatusIcons key={character.name} character={character}/>
          )
        })
        */}
      </div>

      <div className='timer'>
        <Timer time={time} />
      </div>

    </div>
  )
}

export default GameStatus;