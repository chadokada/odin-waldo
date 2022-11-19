import React, { useEffect, useState } from 'react';
import 'styles/App.css';
import GameBoard from 'components/GameBoard';
import Header from './Header';
import GameStatusIcons from './GameStatusIcon';
import Timer from './Timer';
import GameStatus from 'components/GameStatus';
import DropDown from 'components/DropDown';
import debounce from '../utils/debounce';
import {GAMEDATA} from 'seedGameData';
import { Navigate } from "react-router-dom";
import { characterSelected } from '../firebase/dbFunctions';

const Game = ({ time, selectedGame, setStartGame, setTimerRunning, setShowSubmitScore, setScrollPosition }) => {
  const gameData = GAMEDATA[selectedGame];
  const DEFAULT_BOARD_WIDTH = 1080;

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
  let [conversionFactor, setConversionFactor] = useState(0);
  
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
  };
  
  const handleScroll = () =>{
    const position = window.pageYOffset;
    setScrollPosition(position);    
  };

  // Methods for DropDown

  const handleMenuClick = (event) => {
    const targetX = parseInt(
      event.target.closest('.character-select-dropdown').getAttribute('targetX')
      ) * conversionFactor;
    const targetY = parseInt(
      event.target.closest('.character-select-dropdown').getAttribute('targetY')
      ) * conversionFactor;
    const character = event.target.closest('.dropdown-selection').getAttribute('character');

    setDropDown(hiddenDropDown);
    checkInput(character, targetX, targetY);
  };

  const checkInput = async (character, targetX, targetY) => {
    const selected = await characterSelected(selectedGame, character, targetX, targetY);
    if (selected) {
      setCorrectGuesses([...correctGuesses, character]);
    }
  };

  const endGame = () => {
    setTimerRunning(false);
    setShowSubmitScore(true);   
  };

  const handleHome = () => {
    setTimerRunning(false);
    setStartGame(false);
    //<Navigate to="character-finder/select-game"/>;
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
  }, [correctGuesses]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      const currentBoardWidth = document.querySelector('#gameboard-img').clientWidth
      setConversionFactor(DEFAULT_BOARD_WIDTH / currentBoardWidth);
      console.log('User window resized')
    }, 2000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => window.removeEventListener('resize', debouncedHandleResize)
  })

  return (
    <div className="game">
      <Header 
        leftButton = {{function: handleHome, name : 'Home'}}
        middleElement={<GameStatusIcons characters={gameData.characters}/>}
        rightElement={<Timer time={time}/>}
      />
      {/* 
      <GameStatus time={time} characters={gameData.characters} setStartGame={setStartGame} setTimerRunning={setTimerRunning} />
      */}
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
