import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Game from './components/Game';
import GAMEDATA from 'seedGameData';


const App = () => {

  const gameData = GAMEDATA['ps4'] //pass as prop

  return (
    <Game gameData={gameData}/>
  );
}

export default App;
