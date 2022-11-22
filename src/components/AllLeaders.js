import React, {useEffect} from 'react';
import Header from './Header';
import { useNavigate } from "react-router-dom";
import debounce from '../utils/debounce';
import 'styles/gameselection.css'

const AllLeaders = ({ }) => {
  //ayyyyy
  const navigate = useNavigate();

  return (
    <div className='all-leaders-container'>
      <Header 
        leftButton={
          {
            function: () => navigate("/character-finder/select-game"),
            name:'Home'
          }
        }
        middleElement={'Leaderboards'}
      />
    </div>
  )
};

export default AllLeaders;