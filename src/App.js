import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameSelection from 'components/GameSelection';
import Game from './components/Game';
import GAMEDATA from 'seedGameData';

import Timer from 'components/Timer';


const App = () => {

  ///const gameData = GAMEDATA['ps4'] //pass as prop

  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  const chooseGame = (event) => {
    setSelectedGame(event.target.getAttribute('alt'));
    setStartGame(true);
    document.querySelector('.game-selection-container').setAttribute('visibility', 'hidden')
    
  }

  return (
    <div>
      <Timer />
      {/*
        !startGame 
        ? <GameSelection chooseGame={chooseGame} />
        : <Game selectedGame={selectedGame} />
      */}
      

    </div>
  );
}

export default App;
