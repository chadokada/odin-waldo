/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {GAMEDATA} from 'seedGameData';
import { characterSelected } from '../firebase/dbFunctions';
import GameBoard from 'components/GameBoard';
import Header from './Header';
import GameStatusIcons from './GameStatusIcon';
import Timer from './Timer';
import SubmitScore from './SubmitScore';
import DropDown from 'components/DropDown';
import debounce from '../utils/debounce';
import 'styles/App.css';

const Game = ({ 
  time, 
  selectedGame, 
  setTimerRunning, 
  playerName,
  setPlayerName
  }) => {
  
  const gameData = GAMEDATA[selectedGame];
  const DEFAULT_BOARD_WIDTH = 1080;

  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
    menuXY={[0, 0]} 
    visibility='hidden'
    characters={gameData.characters}
  />;

  // Game state
  const [dropDown, setDropDown] = useState(hiddenDropDown);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [conversionFactor, setConversionFactor] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = useNavigate();
  
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

    console.log(targetX, targetY, conversionFactor)
  };

  const checkInput = async (character, targetX, targetY) => {
    const selected = await characterSelected(selectedGame, character, targetX, targetY);

    if (selected) {
      setCorrectGuesses([...correctGuesses, character]);
    }
  };

  const endGame = () => {
    setGameEnded(true)
    setTimerRunning(false);
  };

  const handleHome = () => {
    setTimerRunning(false);
    navigate("/character-finder/select-game");
  };

  useEffect(() => {
    if (correctGuesses.length > 0) { 
      const latestGuess = correctGuesses[correctGuesses.length - 1];
      const characterIcon = document.getElementById(`${latestGuess}-icon`);
      characterIcon.style.opacity = 0.3
    };

    if (correctGuesses.length === 3) { 
      endGame()
    };
  }, [correctGuesses]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => { //Sets initial conversion factor upon inital page render
    const currentBoardWidth = document.querySelector('#gameboard-img').clientWidth
    setConversionFactor(DEFAULT_BOARD_WIDTH / currentBoardWidth);
  }, [])

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
      {dropDown}
      {
        !gameEnded 
        ? <GameBoard gameboardSrc={gameData.src} handleGameboardClick={handleGameboardClick}/> 
        : <GameBoard gameboardSrc={gameData.src}/>
      }
      { 
        gameEnded 
        ? <SubmitScore 
            time={time}
            playerName={playerName}
            setPlayerName={setPlayerName}
            selectedGame={selectedGame}
            scrollPosition={scrollPosition}
          />
        : null
      }
    </div>
  );
}

export default Game;
