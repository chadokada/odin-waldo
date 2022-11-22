import React, {useEffect} from 'react';
import  { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import debounce from '../utils/debounce';
import 'styles/gameselection.css'

const GameSelection = ({ chooseGame }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const debouncedHandleResize = () => {debounce(function handleResize(){
      console.log(`Current window: ${window.innerWidth}x${window.innerHeight}`) 
    }, 1000)}

    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])
  

  return (
    <div className='game-selection-container'>
      <Header 
        leftButton={
          {
            function: () => navigate("/character-finder/leaderboards"),
            name:'Leaderboards'
          }
        }
        middleElement={'Character Finder!'}
      />
      <div className='board-selection-container'>
        <div className='board-selection-img-container'>
          <Link to='/character-finder/game'>
            <img 
              className='board-selection-img' 
              alt='ps2' 
              src={require('assets/gameboards/ps2.jpg')}
              onClick={chooseGame}
            />
          </Link>
        </div>
        <div className='board-selection-img-container'>
          <Link to='/character-finder/game'>
            <img 
              className='board-selection-img' 
              alt='ps3' 
              src={require('assets/gameboards/ps3.jpg')}
              onClick={chooseGame}
            />
          </Link>
        </div>
        <div className='board-selection-img-container'>
          <Link to='/character-finder/game'>
            <img 
              className='board-selection-img' 
              alt='ps4' 
              src={require('assets/gameboards/ps4.jpg')}
              onClick={chooseGame}
            />
          </Link>
        </div>
      </div> 
    </div>
  )
};

export default GameSelection;