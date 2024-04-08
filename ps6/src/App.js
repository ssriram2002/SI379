import logo from './logo.svg';
import './App.css';
//import './ColorPicker.css';
//import Slider from './Slider';
import React from "react";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;



const MIN = 0;
const MAX = 255;


function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Slider(props) {;
    const { min, max, onChange, startingValue } = props;

    const [value, setValue] = React.useState(startingValue);

    const handleChange = React.useCallback(event => {
        const value = parseInt(event.target.value);
        setValue(value);
        onChange(value);
    }, [onChange]);


    return <>
            <input type="number" min={min} max={max} value={value} onChange={handleChange} />
            <input type="range"  min={min} max={max} value={value} onChange={handleChange} />
        </>;
};

function App(){
  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [guessRed, setGuessRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessGreen, setGuessGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessBlue, setGuessBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));


  const [cheatingMode, setCheatingMode] = React.useState(false);
  const [showingFeedback, setShowingFeedback] = React.useState(false);

  const doGuess = React.useCallback(() => {
    setShowingFeedback(true);
  }, []);

  const onKeyDown = React.useCallback((e) => {
    if (e.key === "Enter") {
      doGuess();
    }
  }, [doGuess]);

  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);

  const doAdvance = React.useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    setGuessRed(MIN);
    setGuessGreen(MIN);
    setGuessBlue(MIN);
    setShowingFeedback(false);
  }, []);

  return (
    <div className="App">
      <div> Problem Set 6 </div>
      <label id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onClick={onChangeCheatingMode} /></label>
      <p>Guess the color of the rectangle below</p>
      <div id="color-to-guess" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`} }/>

      {cheatingMode &&  <div id="color-preview" style={{backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`} }/>} 
      
      
      {!showingFeedback&&
        <div id="color-picker">
          <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`  }}>Red:</span>
            <Slider min={MIN} max={MAX} startingValue={MIN} onChange={r => setGuessRed(r)} />
          </div>
          <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
            <Slider min={MIN} max={MAX} startingValue={MIN} onChange={g => setGuessGreen(g)} />
          </div>
          <div className="row">
            <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
            <Slider min={MIN} max={MAX} startingValue={MIN} onChange={b => setGuessBlue(b)} />
          </div>
        </div>
      }

      <div>
        {showingFeedback && <p>Your guess: Red: {guessRed}, Green: {guessGreen}, Blue: {guessBlue}. <strong> Actual: Red: {red}, Green: {green}, Blue: {blue}</strong></p> }

        {!showingFeedback && <button onClick={doGuess}>Guess</button> }
        {showingFeedback && <button onClick={doAdvance}>Next</button>}
      </div>
    </div>
  );
};

export default App;