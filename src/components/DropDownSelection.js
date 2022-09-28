import React from 'react';
import 'styles/App.css';

const DropDownSelection = ({ name, src, handleMenuClick }) => {

  return (
    <div className='dropdown-selection' onClick={handleMenuClick} character={name}>
      <div className='selection-img-container'>
        <img className='selection-img' alt={name} src={src}/>
      </div>
      <div>{name}</div>
    </div>
  )
};

export default DropDownSelection;