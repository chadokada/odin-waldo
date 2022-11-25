import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addCompletionTime } from '../firebase/dbFunctions';
import formatTime from '../utils/forrmatTime';
import 'styles/submitscore.css';

const SubmitScore = ({
  time, 
  playerName,
  setPlayerName, 
  selectedGame, 
  scrollPosition, 
  }) => {

  const navigate = useNavigate();
  
  const centerSubmitScore = () => {
    const windowHeight = window.innerHeight;
    const submitScoreDiv = document.querySelector('.submitscore-container');
    const submitScoreTopY = (windowHeight - submitScoreDiv.offsetHeight) / 2 + scrollPosition;
    submitScoreDiv.style.top = `${submitScoreTopY}px`;
  };

  const handleCancel = () => {
    navigate("/character-finder/select-game");
  };

  const handleSubmit = () => {
    const playerNameValue = document.querySelector('#player-name').value;
    setPlayerName(playerNameValue);
    addCompletionTime(selectedGame, playerNameValue, time);
    navigate("/character-finder/leaderboards");
  };

  useEffect(() => {
    centerSubmitScore();
    document.querySelector('body').style.overflow = 'hidden';
  });

  return (
    <div className='submitscore-container'>
      <div className='submitscore-header'>
        <h3>You finished in {formatTime(time)}!</h3>
      </div>      
      <div className='submitscore-form'>
        <h4>Enter your name and submit your score to the global leaderboard!</h4>
        <label htmlFor='player-name'>Name:</label>
        <input id='player-name' defaultValue={playerName}></input>
      </div>
      <div className='submitscore-buttons'>
        <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
        <button className='submit-btn' onClick={handleSubmit}>Submit Score</button>
      </div>
    </div>
  )
}

export default SubmitScore;
