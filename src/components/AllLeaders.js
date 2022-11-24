import React, {useEffect} from 'react';
import Header from './Header';
import LeaderBoard from './LeaderBoard';
import LeaderboardSelection from './LeaderboardSelection';
import { useNavigate } from "react-router-dom";
import {SAMPLETIMES} from 'seedGameData';
import debounce from '../utils/debounce';
import 'styles/allleaders.css'

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
      <div className='selection-container'>
        <LeaderboardSelection game='ps2'/>
        <LeaderboardSelection game='ps3'/>
        <LeaderboardSelection game='ps4'/>
      </div>
      
      <div className='lb-outer-container'>
        <LeaderBoard
          player={{name: 'John Doe', time: 1001}} 
          selectedGame={'ps2'}
          displayedTimes={SAMPLETIMES['ps2']}
        />

      </div>


    </div>
  )
};

export default AllLeaders;