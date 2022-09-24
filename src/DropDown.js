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
    const targetX = event.target.closest('.character-select-dropdown').getAttribute('targetX')
    const targetY = event.target.closest('.character-select-dropdown').getAttribute('targetY')
    const character = event.target.closest('.dropdown-selection').getAttribute('character')

    console.log(character)
    console.log(targetX, ", ", targetY)
    console.log('///////////////////////////////')
    
    hideDropDown();
  }

  return (
    <div className='character-select-dropdown' style={divStyle} targetX={targetXY[0]} targetY={targetXY[1]} >
      <div className='dropdown-selection' onClick={handleClick} character='Big Boss'>
        <div className='selection-img-container'>
          <img className='selection-img' src={require('./assets/characters/bigboss.png')}/>
        </div>
        <div>Big Boss</div>
      </div>
      <div className='dropdown-selection' onClick={handleClick} character='Arthur Morgan'>
        <div className='selection-img-container'>
          <img className='selection-img' src={require('./assets/characters/arthurmorgan.png')}/>
        </div>
        <div>Arthur Morgan</div>
      </div>
      <div className='dropdown-selection' onClick={handleClick} character='Ryu'>
        <div className='selection-img-container'>
          <img className='selection-img' src={require('./assets/characters/ryu.png')}/>
        </div>
        <div>Ryu</div>
      </div>
    </div>
  )
}

export default DropDown;