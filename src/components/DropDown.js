import React from 'react';
import 'styles/App.css';
import DropDownSelection from './DropDownSelection';

import { getXY } from '../firebase/dbFunctions'


const DropDown = ({targetXY, menuXY, visibility, characters, hideDropDown}) => {

  const divStyle = {
    position: 'absolute',
    left: `${menuXY[0]}px`,
    top: `${menuXY[1]}px`,
    visibility: visibility
  }

  // This needs to be bubbled up into a parent component
  const handleMenuClick = (event) => {
    const targetX = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetX'))
    const targetY = parseInt(event.target.closest('.character-select-dropdown').getAttribute('targetY'))
    const character = event.target.closest('.dropdown-selection').getAttribute('character')

    hideDropDown();
    checkInput(character, targetX, targetY)
  }

  // This needs to be bubbled up into a parent component
  const checkInput = async (character, targetX, targetY) => {
    const charCoords = await getXY(character);
    const xMin = charCoords['x-min']
    const xMax = charCoords['x-max']
    const yMin = charCoords['y-min']
    const yMax = charCoords['y-max']

    if(xMin <= targetX && xMax >= targetX && yMin <= targetY && yMax >= targetY){
      console.log('You correctly selected: ', character)
    } else {
      console.log('This was not: ', character)
    }
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