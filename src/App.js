import './App.css';
import DropDown from './DropDown';

const App = () => {

  let dropDown = document.createElement('select')
  dropDown.className = 'character-select-dropdown'

  for (let i = 1; i < 4; i++) {
    const option = document.createElement('option');
    option.value = `Option ${i}`;
    option.text = `Option ${i}`;
    dropDown.appendChild(option);
  }



  const handleImgClick = (event) => {
    const x = event.pageX - event.target.offsetLeft;
    const y = event.pageY - event.target.offsetTop
    //console.log(`X Coordinate: ${x}`);
    //console.log(`Y Coordinate: ${y}`)

    event.target.parentNode.appendChild(dropDown);
    dropDown.style.position = 'absolute';
    dropDown.style.left = `${event.pageX}px`;
    dropDown.style.top = `${event.pageY}px`;
    
    dropDown.size = 3;
    
  }

  const divStyle = {backgroundImage: 'url(./Images/pink_bowler.png)'}


  return (
    <div className="App">
      {/* 
      <select>
        <option value='Option 1'>Option 1</option>
        <option value='Option 2'>Option 2</option>
        <option value='Option 3'>Option 3</option>
      </select>
      */}
      <DropDown />

      {/* 
      <img 
        alt='bowler'
        id='hat-img'
        src={require('./Images/pink_bowler.png')}
        onClick={handleImgClick}
      />
      */}

    </div>
  );
}

export default App;
