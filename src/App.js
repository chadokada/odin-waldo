import React, { useEffect, useState } from 'react';
import './styles/App.css';
import GameBoard from 'components/GameBoard';
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
  
  // Game state
  
  let [dropDown, setDropDown] = useState(hiddenDropDown)
  let [correctGuesses, setCorrectGuesses] = useState([])
  let [gameEnded, setGameEnded] = useState(false)

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

  const handleMenuClick = (event) => {
    const targetX = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetX'));
    const targetY = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetY'));
    const character = event.target.closest('.dropdown-selection').getAttribute('character');

    setDropDown(hiddenDropDown);
    checkInput(character, targetX, targetY);
  }

  const checkInput = async (character, targetX, targetY) => {
    const selected = await characterSelected(character, targetX, targetY);
    
    if (selected) {
      setCorrectGuesses([...correctGuesses, character]);
    }
  }

  const endGame = () => {
    console.log('you won')
  }


  useEffect(() => {

    if (correctGuesses.length > 0) { 
      const latestGuess = correctGuesses[correctGuesses.length - 1];
      const characterIcon = document.getElementById(`${latestGuess}-icon`);
      characterIcon.style.opacity = 0.3
    };

    if (correctGuesses.length === 3) { 
      endGame()
      setGameEnded(true)
    };
  }, [correctGuesses])


  return (
    <div className="App">
      <GameStatus characters={gameboard.characters} />
      {dropDown}
      
      {
        !gameEnded 
        ? <GameBoard gameboardSrc={gameboard.src} handleGameboardClick={handleGameboardClick}/> 
        : <GameBoard gameboardSrc={gameboard.src}/>
      }

    </div>
  );
}

export default App;
