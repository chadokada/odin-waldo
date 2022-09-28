import React, { useState } from 'react';
import './styles/App.css';

import GameStatus from './components/GameStatus';
import DropDown from './components/DropDown';

const App = () => {



  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
    //menuXY={[600,200]}
    //visibility='visible'
    menuXY={[0, 0]} 
    visibility='hidden'
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
          src={require('assets/gameboards/ps4.jpg')}
          //src={require('./assets/gameboards/ps4.jpg')}
          onClick={handleImgClick}
        />
      </div>


    </div>
  );
}

export default App;
