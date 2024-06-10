import React, { useState } from "react";

function DiceGame() {
  // generate random number function
  const generateNumber = function () {
    return Math.trunc(Math.random() * 6) + 1;
  };

  const [displayDice, setDisplayDice] = useState(false);

  const [dice, setDice] = useState(generateNumber());

  const [currentScore, setCurrentScore] = useState(0);

  const [playing, setplaying] = useState(true);

  const [activePlayer, setActivePlayer] = useState(0);

  const [scores, setScores] = useState([0, 0]);

  const [isHolding, setisHolding] = useState(false);

  const [winner, setWinner] = useState(false);

  const handleSwitch = () => {
    setActivePlayer(activePlayer === 0 ? 1 : 0);
    setCurrentScore(0);
  };

  const handleRollDice = () => {
    if (playing) {
      const newDice = generateNumber();
      setDice(newDice);
      setDisplayDice(true);

      if (newDice !== 1) {
        setCurrentScore((prevDice) => prevDice + newDice);
      } else {
        handleSwitch();
      }
    }
  };

  const handleHoldScore = () => {
    if (playing) {
      if (currentScore === 1) return;
      setisHolding(true);

      const newScores = [...scores];
      newScores[activePlayer] += currentScore;
      setScores(newScores);

      setCurrentScore(0);

      if (newScores[activePlayer] >= 100) {
        setWinner(true);
        setplaying(false);
        setDisplayDice(false);
      } else {
        if (currentScore === 0) return;
        handleSwitch();
      }
    }
  };

  const handleReset = () => {
    setCurrentScore(0);
    setWinner(false);
    setScores([0, 0]);
    setisHolding(false);
    setActivePlayer(0);
    setplaying(true);
  };

  return (
    <main>
      <section
        className={
          activePlayer === 0
            ? `player player--0 player--active ${
                activePlayer === 0 && winner ? "player--winner" : ""
              }`
            : "player player--0"
        }
      >
        <h2 className="name" id="name--0">
          Player 1
        </h2>
        <p className="score" id="score--0">
          {activePlayer === 0 || isHolding ? scores[0] : 0}
        </p>

        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">
            {activePlayer === 0 ? currentScore : 0}
          </p>
        </div>
      </section>
      <section
        className={
          activePlayer === 1
            ? `player player--1 player--active ${
                activePlayer === 1 && winner ? "player--winner" : ""
              }`
            : "player player--1"
        }
      >
        <h2 className="name" id="name--1">
          Player 2
        </h2>
        <p className="score" id="score--1">
          {activePlayer === 1 || isHolding ? scores[1] : 0}
        </p>

        <div className={"current"}>
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">
            {activePlayer === 1 ? currentScore : 0}
          </p>
        </div>
      </section>

      <img
        src={`/img/dice-${dice}.png`}
        alt="Playing dice"
        className={!displayDice ? "hidden" : "dice"}
      />
      {!playing ? (
        <button className="btn btn--new" onClick={handleReset}>
          🔄 New game
        </button>
      ) : (
        ""
      )}

      {playing ? (
        <>
          <button className="btn btn--roll" onClick={handleRollDice}>
            🎲 Roll dice
          </button>
          <button className="btn btn--hold" onClick={handleHoldScore}>
            📥 Hold
          </button>
        </>
      ) : (
        ""
      )}
    </main>
  );
}

export default DiceGame;
