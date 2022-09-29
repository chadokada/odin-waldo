import React from 'react';
import 'styles/App.css';
import DropDownSelection from './DropDownSelection';

import { getXY } from '../firebase/dbFunctions'


const DropDown = ({targetXY, menuXY, visibility, characters, handleMenuClick}) => {

  const divStyle = {
    position: 'absolute',
    left: `${menuXY[0]}px`,
    top: `${menuXY[1]}px`,
    visibility: visibility
  }

  return (
    <div className='character-select-dropdown' style={divStyle} targetX={targetXY[0]} targetY={targetXY[1]} >
      {characters.map((character) => {
        return(
          <DropDownSelection 
            key={character.name}
            name={character.name}
            src={character.src}
            handleMenuClick={handleMenuClick}
          />
        )
      })}
    </div>
  )
}

export default DropDown;