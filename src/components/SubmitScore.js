import React, { useEffect } from 'react';
import 'styles/submitscore.css';
import formatTime from '../utils/forrmatTime';
import { addCompletionTime } from '../firebase/dbFunctions'

const SubmitScore = ({
  time, 
  setPlayerName, 
  selectedGame, 
  scrollPosition, 
  setShowSubmitScore, 
  setShowLeaderBoard
}) => {
  
  const centerSubmitScore = () => {
    const windowHeight = window.innerHeight;
    const submitScoreDiv = document.querySelector('.submitscore-container');
    const submitScoreTopY = (windowHeight - submitScoreDiv.offsetHeight) / 2 + scrollPosition;
    submitScoreDiv.style.top = `${submitScoreTopY}px`;
  };

  const handleCancel = () => {
    setShowSubmitScore(false);
  }

  const handleSubmit = () => {
    const playerName = document.querySelector('#player-name').value;
    addCompletionTime(selectedGame, playerName, time);
    setShowSubmitScore(false);
    setShowLeaderBoard(true);
  }

  useEffect(() => {
    centerSubmitScore();
    document.querySelector('body').style.overflow = 'hidden';
  })

  return (
    <div className='submitscore-container'>
      <div className='submitscore-header'>
        <h3>You finished in {formatTime(time)}!</h3>
      </div>      

      <div className='submitscore-form'>
        <h4>Enter your name and submit your score to the global leaderboard!</h4>
        <label htmlFor='player-name'>Name:</label>
        <input id='player-name'></input>
      </div>

      <div className='submitscore-buttons'>
        <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
        <button className='submit-btn' onClick={handleSubmit}>Submit Score</button>
      </div>

    </div>
  )
}

export default SubmitScore;
