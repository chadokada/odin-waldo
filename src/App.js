import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import {SAMPLETIMES} from 'seedGameData';
import { test, getBestTimes } from './firebase/dbFunctions'



import TimeBoard from './components/TimeBoard';


const App = () => {

  test()

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [playerName, setPlayerName] = useState('Player');
  const [showTimeBoard, setShowTimeBoard] = useState(false);
  const [timeBoardTop, setTimeBoardTop] = useState(0);
  const [displayedTimes, setDisplayedTimes] = useState({})


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

  const updatePlayerName = (event) => {
    setPlayerName(event.target.value)
  }

  const endGameTimer = () => {
    setTimerRunning(false);
    setTime(0);
  }

  const displayTimeBoard = (currentTop, display=true) => {
    setShowTimeBoard(display);
    setTimeBoardTop(currentTop);
  }

  //getBestTimes('ps2').then((times) => {setDisplayedTimes(times)})

  return (
    <div>
      {showTimeBoard
        ? <TimeBoard 
            playerName='Juan Doe' 
            time='6420' 
            setShowTimeBoard={setShowTimeBoard}
            displayedTimes={SAMPLETIMES}/>
        : null
      }
      
      {
        !startGame 
        ? <GameSelection chooseGame={chooseGame} playerName={playerName} updatePlayerName={updatePlayerName} />
        : <Game 
            time={time} 
            selectedGame={selectedGame} 
            endGameTimer={endGameTimer} 
            playerName={playerName}
            displayTimeBoard={displayTimeBoard}
            setStartGame={setStartGame}
          />
      }
      

    </div>
  );
}

export default App;
