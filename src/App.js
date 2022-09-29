import React, { useState } from 'react';
import './styles/App.css';
import GameStatus from './components/GameStatus';
import DropDown from './components/DropDown';
import GAMEDATA from 'seedGameData';

import { characterSelected } from './firebase/dbFunctions'

const App = () => {

  const gameboard = GAMEDATA['ps4']

  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
    menuXY={[0, 0]} 
    visibility='hidden'
    characters={gameboard.characters}
    //menuXY={[600,200]}
    //visibility='visible'
  />
  
  let [dropDown, setDropDown] = useState(hiddenDropDown)

  const handleGameboardClick = (event) => {
    const targetX = event.pageX - event.target.offsetLeft;
    const targetY = event.pageY - event.target.offsetTop
    const menuX = event.pageX;
    const menuY = event.pageY;

    setDropDown(
      <DropDown 
        targetXY={[targetX, targetY]} 
        menuXY={[menuX, menuY]} 
        visibility='visible'
        characters={gameboard.characters}
        handleMenuClick={handleMenuClick}
        />
    )
  }

  // Methods for DropDown

  const hideDropDown = () => {
    setDropDown(hiddenDropDown)
  }

  const handleMenuClick = (event) => {
    const targetX = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetX'))
    const targetY = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetY'))
    const character = event.target.closest('.dropdown-selection').getAttribute('character')

    hideDropDown();
    checkInput(character, targetX, targetY)
  }

  const checkInput = async (character, targetX, targetY) => {
    const selected = await characterSelected(character, targetX, targetY)
    console.log(selected)

  }

  return (
    <div className="App">
      <GameStatus characters={gameboard.characters} />
      {dropDown}
      
      
      <div>
        <img 
          alt='gameboard'
          id='gameboard-img'
          src={gameboard.src}
          onClick={handleGameboardClick}
        />
      </div>

    </div>
  );
}

export default App;
