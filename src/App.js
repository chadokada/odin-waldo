import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import LeaderBoard from './components/LeaderBoard';
import SubmitScore from './components/SubmitScore';
import {SAMPLETIMES} from 'seedGameData';
import { test, getBestTimes } from './firebase/dbFunctions'


const App = () => {

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState(''); //set to blank when done
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [playerName, setPlayerName] = useState('Player');
  const [showLeaderBoard, setShowLeaderBoard] = useState(false); //set to false when done
  const [showSubmitScore, setShowSubmitScore] = useState(false); //set to false when done
  const [scrollPosition, setScrollPosition] = useState(0);
  const [displayedTimes, setDisplayedTimes] = useState({}); //set to empy obj when done

  const chooseGame = (event) => {
    setSelectedGame(event.target.getAttribute('alt'));
    setStartGame(true);
    setTime(0);
    setTimerRunning(true);
    document.querySelector('.game-selection-container').setAttribute('visibility', 'hidden'); 
    document.querySelector('body').style.overflow = 'auto';
  };

  const updatePlayerName = (event) => {
    setPlayerName(event.target.value)
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
    if (showLeaderBoard === true){
      getBestTimes(selectedGame).then((times) => {setDisplayedTimes(times)});
    }
    
    //setDisplayedTimes(SAMPLETIMES[selectedGame])
  }, [showLeaderBoard]);

  return (
    <div className='App'>
      {showSubmitScore
        ? <SubmitScore 
            time={1001}
            setPlayerName={setPlayerName}
            selectedGame={selectedGame}
            scrollPosition={scrollPosition}
            setShowSubmitScore={setShowSubmitScore}
            setShowLeaderBoard={setShowLeaderBoard}
          />
        : null
      }
      {showLeaderBoard
        ? <LeaderBoard 
            player={{
              name : playerName,
              time : time
            }} 
            selectedGame={selectedGame} 
            displayedTimes={displayedTimes}
            setStartGame={setStartGame}
            setShowLeaderBoard={setShowLeaderBoard}
            scrollPosition={scrollPosition}
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
            setShowSubmitScore={setShowSubmitScore}
            setShowLeaderBoard={setShowLeaderBoard}
            setScrollPosition={setScrollPosition}
          />
      }
      

    </div>
  );
}

export default App;
