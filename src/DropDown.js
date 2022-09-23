import React from 'react';
import './App.css';

//
// x = 239px
// y = 194pxL
//

const DropDown = ({targetXY, menuXY, visibility, hideDropDown}) => {

  const divStyle = {
    position: 'absolute',
    left: `${menuXY[0]}px`,
    top: `${menuXY[1]}px`,
    visibility: visibility
  }

  const handleClick = (event) => {
    console.log(event.target.getAttribute('character'))
    console.log(event.target.parentNode.getAttribute('targetX'))
    console.log(event.target.parentNode.getAttribute('targetY'))
    hideDropDown();
  }

  return (
    <div 
      className='character-select-dropdown' 
      style={divStyle}
      targetX={targetXY[0]}
      targetY={targetXY[1]}
    >
      <div 
        className='dropdown-selection'
        onClick={handleClick}
        character='Option 1'
      >
        Option 1
      </div>
      <div 
        className='dropdown-selection'
        onClick={handleClick}
        character='Option 2'
      >
        Option 2
      </div>
      <div 
        className='dropdown-selection'
        onClick={handleClick}
        character='Option 3'
      >
        Option 3
      </div>
    </div>
  )
}

export default DropDown;