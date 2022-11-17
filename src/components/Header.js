import React, {useState, useEffect} from 'react';
import 'styles/gameselection.css'

const Header = () => {



  return (
    <div className='game-selection-header-container'>
      <div className='header-blank-left'>
        <button>Button</button>
      </div>
      <span>Find Waldo</span>
      <div className='header-blank-right'>
        <span>Blank</span>
      </div>
    </div>
  )
};

export default Header;