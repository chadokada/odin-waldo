import React, { useEffect, useState } from 'react';
import Header from './Header';
import LeaderBoard from './LeaderBoard';
import LeaderboardSelection from './LeaderboardSelection';
import { useNavigate } from "react-router-dom";
import { getBestTimes } from '../firebase/dbFunctions';
import {SAMPLETIMES} from 'seedGameData';
import 'styles/allleaders.css';

const AllLeaders = ({selectedGame, playerName, time}) => {
  const navigate = useNavigate();

  const [game, setGame] = useState(selectedGame);
  const [displayedTimes, setDisplayedTimes] = useState({});

  const resetTransform = () => {
    const allTransformed = document.querySelectorAll('.lb-selection-container-scaled');
    for (const transformed of allTransformed){
      transformed.className = 'lb-selection-container';
    }
  };

  useEffect(() => {
    if (game !== '') {
      resetTransform();
      const boardSelctor = document.querySelector(`[game="${game}"]`);
      boardSelctor.className = 'lb-selection-container-scaled';
      getBestTimes(game).then((displayedTimes) => {setDisplayedTimes(displayedTimes)});
    }
  }, [game]);

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
        <LeaderboardSelection game='ps2' setGame={setGame} />
        <LeaderboardSelection game='ps3' setGame={setGame} />
        <LeaderboardSelection game='ps4' setGame={setGame} />
      </div>
      <div className='lb-outer-container'>
        {game !== '' && Object.keys(displayedTimes).length !== 0
          ? <LeaderBoard
            player={{name: playerName, time: time}} 
            displayedTimes={displayedTimes}
            />
          : null
        }
      </div>
    </div>
  )
};

export default AllLeaders;