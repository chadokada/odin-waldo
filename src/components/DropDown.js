import React from 'react';
import '../styles/App.css';

import { getXY } from '../firebase/dbFunctions'

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

  // This needs to be bubbled up into a parent component
  const handleClick = (event) => {
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
      <div className='dropdown-selection' onClick={handleClick} character='Big Boss'>
        <div className='selection-img-container'>
          <img className='selection-img' alt='Big Boss' src={require('../assets/characters/bigboss.png')}/>
        </div>
        <div>Big Boss</div>
      </div>
      <div className='dropdown-selection' onClick={handleClick} character='Arthur Morgan'>
        <div className='selection-img-container'>
          <img className='selection-img' alt='Arthur Morgan' src={require('../assets/characters/arthurmorgan.png')}/>
        </div>
        <div>Arthur Morgan</div>
      </div>
      <div className='dropdown-selection' onClick={handleClick} character='Ryu'>
        <div className='selection-img-container'>
          <img className='selection-img' alt='Ryu' src={require('../assets/characters/ryu.png')}/>
        </div>
        <div>Ryu</div>
      </div>
    </div>
  )
}

export default DropDown;