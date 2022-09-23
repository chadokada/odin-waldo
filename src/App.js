import React, { useState } from 'react';
import './App.css';
import DropDown from './DropDown';

const App = () => {
  const hiddenDropDown = <DropDown 
    targetXY={[0,0]}
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

      {dropDown}
    
      <div>
        <img 
          alt='bowler'
          id='hat-img'
          src={require('./Images/pink_bowler.png')}
          onClick={handleImgClick}
        />
      </div>

    </div>
  );
}

export default App;

//
//
//

let dropDown = document.createElement('select')
dropDown.className = 'character-select-dropdown'

for (let i = 1; i < 4; i++) {
  const option = document.createElement('option');
  option.value = `Option ${i}`;
  option.text = `Option ${i}`;
  dropDown.appendChild(option);
}

