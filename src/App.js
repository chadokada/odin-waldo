import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import {SAMPLETIMES} from 'seedGameData';
import { test, getBestTimes } from './firebase/dbFunctions'



import TimeBoard from './components/TimeBoard';

const App = () => {

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [playerName, setPlayerName] = useState('Player');
  const [showTimeBoard, setShowTimeBoard] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [displayedTimes, setDisplayedTimes] = useState({});


  const chooseGame = (event) => {
    setSelectedGame(event.target.getAttribute('alt'));
    setStartGame(true);
    setTime(0);
    setTimerRunning(true);
    document.querySelector('.game-selection-container').setAttribute('visibility', 'hidden'); 
  };

  const updatePlayerName = (event) => {
    setPlayerName(event.target.value)
  };

  const centerTimeBoard = () => {
    const windowHeight = window.innerHeight;
    const timeBoardDiv = document.querySelector('.timeboard-container');
    const timeBoardTopY = (windowHeight - timeBoardDiv.offsetHeight) / 2 + scrollPosition;
    timeBoardDiv.style.top = `${timeBoardTopY}px`;
  };

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

  useEffect(() => {
    if (showTimeBoard === true) {
      centerTimeBoard();
    }

  }, [showTimeBoard]);


  getBestTimes(selectedGame).then((times) => {setDisplayedTimes(times)})

  return (
    <div>
      {showTimeBoard
        ? <TimeBoard 
            player={{
              name : playerName,
              time : time
            }} 
            selectedGame={selectedGame} 
            displayedTimes={displayedTimes}
            setStartGame={setStartGame}
            setShowTimeBoard={setShowTimeBoard}
            />
        : null
      }
      
      {
        !startGame 
        ? <GameSelection chooseGame={chooseGame} playerName={playerName} updatePlayerName={updatePlayerName} />
        : <Game 
            time={time} 
            selectedGame={selectedGame} 
            setTimerRunning={setTimerRunning} 
            playerName={playerName}
            setShowTimeBoard={setShowTimeBoard}
            setScrollPosition={setScrollPosition}
          />
      }
      

    </div>
  );
}

export default App;
