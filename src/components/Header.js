import React, {useState, useEffect} from 'react';
import 'styles/gameselection.css'

const Header = ({leftButton, middleElement, rightElement}) => {



  return (
    <div className='header-container'>

      <div className='header-left'>
        {
          leftButton ? 
          <button onClick={leftButton.function}>{leftButton.name}</button> :
          'Blah'
        }
        
      </div>

      <div className='header-center'>
        {middleElement}
      </div>

      <div className='header-right'>
        {rightElement}
      </div>

    </div>
  )
};

export default Header;