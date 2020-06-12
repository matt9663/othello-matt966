import React, { useState } from "react";
import PageTitle from "../PageTitle/PageTitle";
import Gameboard from "../Gameboard/Gameboard.component";
import Scoreboard from "../Scoreboard/Scoreboard";

import "./App.styles.scss";

function App() {
  const [score, setScore] = useState([0, 0]);
  function updateScore(score) {
    setScore(score);
  }
  return (
    <div className="App">
      <PageTitle />
      <div className="main-container">
        <Scoreboard score={score} />
        <Gameboard size={8} updateScore={updateScore} />
      </div>
    </div>
  );
}

export default App;
