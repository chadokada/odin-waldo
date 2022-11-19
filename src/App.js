import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import LeaderBoard from './components/LeaderBoard';
import SubmitScore from './components/SubmitScore';
//import {SAMPLETIMES} from 'seedGameData';
import { getBestTimes } from './firebase/dbFunctions'

const App = () => {

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState(''); //set to blank when done
  const [time, setTime] = useState(0);                     // set to 0 when done
  const [timerRunning, setTimerRunning] = useState(false);
  const [playerName, setPlayerName] = useState('Your Name');
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

  //const updatePlayerName = (event) => {
  //  setPlayerName(event.target.value)
  //};

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
    if (showSubmitScore === false && time !== 0){
      getBestTimes(selectedGame).then((times) => {setDisplayedTimes(times)});
    }
  }, [showSubmitScore]);

  useEffect(() => {
    if (showSubmitScore === false && time !== 0){
      setShowLeaderBoard(true);
    }
  }, [displayedTimes]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            exact 
            element={
              <>
                
                <Navigate to="character-finder/select-game"/>
            
                <Outlet />
              </>
            }

            /*
            render={() => {
              return (
                ! startGame ?
                  <Navigate to="/character-finder/select-game"/> :
                  null
              )
            }}
            */
          
          >
            <Route path="character-finder/" element={<Outlet />}>
              <Route path="select-game" element={<GameSelection chooseGame={chooseGame}/>}/>
              <Route path="game" element={
                  <Game 
                    time={time} 
                    selectedGame={selectedGame} 
                    setStartGame={setStartGame}
                    setTimerRunning={setTimerRunning} 
                    setShowSubmitScore={setShowSubmitScore}
                    setShowLeaderBoard={setShowLeaderBoard}
                    setScrollPosition={setScrollPosition}
                  />
                }
              /> 
            </Route>

          




          </Route>



        </Routes>
      </BrowserRouter>
      {/* 
      {showSubmitScore
        ? <SubmitScore 
            time={time}
            playerName={playerName}
            setPlayerName={setPlayerName}
            selectedGame={selectedGame}
            scrollPosition={scrollPosition}
            setShowSubmitScore={setShowSubmitScore}
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
        ? <GameSelection 
            chooseGame={chooseGame} 
          />
        : <Game 
            time={time} 
            selectedGame={selectedGame} 
            setStartGame={setStartGame}
            setTimerRunning={setTimerRunning} 
            setShowSubmitScore={setShowSubmitScore}
            setShowLeaderBoard={setShowLeaderBoard}
            setScrollPosition={setScrollPosition}
          />
      }
      */}
    </div>
  );
}

export default App;
