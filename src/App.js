import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import AllLeaders from 'components/AllLeaders';
import './styles/App.css';

const App = () => {

  const [selectedGame, setSelectedGame] = useState(''); //set to blank when done
  const [time, setTime] = useState(0);                     // set to 0 when done
  const [timerRunning, setTimerRunning] = useState(false);
  const [playerName, setPlayerName] = useState('Your Name');

  const chooseGame = (event) => {
    setSelectedGame(event.target.getAttribute('alt'));
    setTime(0);
    setTimerRunning(true);
    document.querySelector('.game-selection-container').setAttribute('visibility', 'hidden'); 
    document.querySelector('body').style.overflow = 'auto';
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

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Navigate to="character-finder/select-game"/>} />
          <Route path="/character-finder/" element={<Outlet />} >
            <Route path="select-game" element={<GameSelection chooseGame={chooseGame}/>} />
            <Route path="game" element={
                <Game 
                  time={time} 
                  selectedGame={selectedGame} 
                  setTimerRunning={setTimerRunning} 
                  playerName={playerName}
                  setPlayerName={setPlayerName}
                />
              } 
            /> 
            <Route path="leaderboards" element={
                <AllLeaders 
                  selectedGame={selectedGame}
                  playerName={playerName}
                  time={time}
                />
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
