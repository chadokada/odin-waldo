import React, { useState } from 'react';
import './styles/App.css';
import GameStatus from './components/GameStatus';
import DropDown from './components/DropDown';
import gameData from 'seedGameData';

const App = () => {

  const ps4 = gameData['ps4']

  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
    menuXY={[0, 0]} 
    visibility='hidden'
    characters={ps4.characters}

    //menuXY={[600,200]}
    //visibility='visible'
  />
  
  let [dropDown, setDropDown] = useState(hiddenDropDown)

  const hideDropDown = () => {
    setDropDown(hiddenDropDown)
  }

  const handleImgClick = (event) => {
    const targetX = event.pageX - event.target.offsetLeft;
    const targetY = event.pageY - event.target.offsetTop
    const menuX = event.pageX;
    const menuY = event.pageY;

    setDropDown(
      <DropDown 
        targetXY={[targetX, targetY]} 
        menuXY={[menuX, menuY]} 
        visibility='visible'
        characters={ps4.characters}
        hideDropDown={hideDropDown}
        />
    )
  }

  return (
    <div className="App">
      <GameStatus />
      {dropDown}
      
      
      <div>
        <img 
          alt='bowler'
          id='hat-img'
          src={ps4.gameboard.src}
          onClick={handleImgClick}
        />
      </div>

    </div>
  );
}

export default App;
