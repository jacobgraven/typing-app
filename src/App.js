// import React, { useState, useMemo} from 'react';
// import Header from './components/header/Header';
// import { calculateAccuracy, calculateWPM } from './utils/helpers.js';
// import './App.css';

// function App() {
//   const [settings, setSettings] = useState({
//     mode: 'timed', // 'timed' or 'fixed'
//     timeLimit: 60, // in seconds
//     wordCount: 100,
//     wordBank: 'default', // 'default', 'advanced', etc.
//     theme: 'light' // 'light' or 'dark'
//   });

//   const providerValue = useMemo(() => ({ settings, setSettings }), [settings]);

//   const handleGameEnd = (userInput, timeTaken) => {
//     const accuracy = calculateAccuracy(userInput, null);
//     const wpm = calculateWPM(userInput, timeTaken);
//     // Display statistics and show a restart button
//   };

//   const restartGame = () => {
//     // Reset game state, generate new text, etc.
//   };

//   return (
//     <>
//     <SettingsContext.Provider value={providerValue}>

//     </SettingsContext.Provider>
//     <div className="upper-container">
//       <Header />

//     </div>
//     <div className="lower-container">

//     </div>
//     </>
//     // <AppLogo />
//     // <Settings />
//     // <TypingBox />

//   );
// }

// export default App;
import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Settings from "./components/settings/Settings";
import TypingUI from "./components/typing-ui/TypingUI";
import StatsUI from "./components/stats-ui/StatsUI";
import { calculateWPM } from "./util/helpers";

function App() {
  const [gameState, setGameState] = React.useState("typing");
  const [WPM, setWPM] = React.useState(0);
  const [CPM, setCPM] = React.useState(0);
  const [accuracy, setAccuracy] = React.useState(0);


  // const handleGameEnd = (userInput, timeTaken) => {
  //   setGameState("stats");
  // };

  const handleGameEnd = (acc, wpm, cpm) => {

    setWPM(wpm);
    setCPM(cpm);
    setAccuracy(acc * 100)
    setGameState("stats");

    // setGameState("stats");
  }

  const restartGame = () => {
    setGameState("typing");
  };

  const restartGameFromSettings = () => {
    setGameState("stats");
    setGameState("typing");
  }

  const handleSettingsUpdate = () => {
    // setGameState("typing");
  }

  return (
    <div className="app">
      <div className="upper-container">
        <Header />
        <Settings onChangeTestLength={handleSettingsUpdate}/>
      </div>
      <div className="lower-container">
        {gameState === "typing" ? (
          // <TypingUI onTestComplete={handleGameEnd} testCompleteCallback={handleGameEnd2} />
          // <TypingUI testCompleteCallback={handleGameEnd2} />
          <TypingUI onGameEnd={handleGameEnd} />

        ) : (
          <StatsUI onRestart={restartGame} wpm={WPM} cpm={CPM} accuracy={accuracy} />
        )}
      </div>
    </div>
  );
}

export default App;

