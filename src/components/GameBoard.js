import React, { useEffect, useState } from 'react';
import 'styles/App.css';
import GameStatus from './GameStatus';
import DropDown from './DropDown';

import { characterSelected } from '../firebase/dbFunctions';

const GameBoard = ({ gameboardSrc, handleGameboardClick }) => {

  return(
    <div>
      <img 
        alt='gameboard'
        id='gameboard-img'
        src={gameboardSrc}
        onClick={handleGameboardClick}
      />
    </div>
  )
};

export default GameBoard;