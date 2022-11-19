import React, {useEffect} from 'react';
import Header from './Header';
import debounce from '../utils/debounce';
import 'styles/gameselection.css'

const AllLeaders = ({ }) => {


  return (
    <div className='all-leaders-container'>
      <Header />
    </div>
  )
};

export default AllLeaders;