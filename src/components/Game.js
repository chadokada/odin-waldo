import React, { useEffect, useState } from 'react';
import 'styles/App.css';
import GameBoard from 'components/GameBoard';
import GameStatus from 'components/GameStatus';
import DropDown from 'components/DropDown';
import {GAMEDATA} from 'seedGameData';

import { characterSelected } from '../firebase/dbFunctions'

const Game = ({ time, selectedGame, setTimerRunning, setShowSubmitScore, setScrollPosition }) => {

  const gameData = GAMEDATA[selectedGame];

  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
    menuXY={[0, 0]} 
    visibility='hidden'
    characters={gameData.characters}
  />;

  // Game state

  let [dropDown, setDropDown] = useState(hiddenDropDown);
  let [correctGuesses, setCorrectGuesses] = useState([]);
  let [gameEnded, setGameEnded] = useState(false);
  
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
        characters={gameData.characters}
        handleMenuClick={handleMenuClick}
        />
    )
  }
  
  const handleScroll = () =>{
    const position = window.pageYOffset;
    setScrollPosition(position);    
  };

  // ***********************************************************************************
  // DELETE WHEN DONE TESTING
  
  const formatTime = (milliseconds) => {
    // Takes milliseconds and returns a string forrmatted mm:ss:sss
    const mm = ("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2);
    const ss = ("0" + Math.floor((milliseconds / 1000) % 60)).slice(-2);
    const sss = ("0" + ((milliseconds / 10) % 100)).slice(-2);

    return `${mm}:${ss}:${sss}`;
  }

  // ***********************************************************************************

  // Methods for DropDown

  const handleMenuClick = (event) => {
    const targetX = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetX'));
    const targetY = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetY'));
    const character = event.target.closest('.dropdown-selection').getAttribute('character');

    setDropDown(hiddenDropDown);
    checkInput(character, targetX, targetY);
  }

  const checkInput = async (character, targetX, targetY) => {
    const selected = await characterSelected(selectedGame, character, targetX, targetY);
    //const selected = true;
    if (selected) {
      setCorrectGuesses([...correctGuesses, character]);
    }
  }

  const endGame = () => {
    setTimerRunning(false);
    setShowSubmitScore(true);   
  };

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="game">
      <GameStatus time={time} characters={gameData.characters} />
      {dropDown}
      
      {
        !gameEnded 
        ? <GameBoard gameboardSrc={gameData.src} handleGameboardClick={handleGameboardClick}/> 
        : <GameBoard gameboardSrc={gameData.src}/>
      }

    </div>
  );
}

export default Game;
