import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import GAMEDATA from 'seedGameData';

import Timer from 'components/Timer';


const App = () => {

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);



  const chooseGame = (event) => {
    setSelectedGame(event.target.getAttribute('alt'));
    setStartGame(true);
    setTimerRunning(true);
    document.querySelector('.game-selection-container').setAttribute('visibility', 'hidden') 
  }

  return (
    <div>
      
      {
        !startGame 
        ? <GameSelection chooseGame={chooseGame} />
        : <Game time={time} selectedGame={selectedGame} setTimerRunning={setTimerRunning}/>
      }
      

    </div>
  );
}

export default App;
