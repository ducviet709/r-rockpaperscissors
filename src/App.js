import React, { useState } from "react";
import './App.css';
import ChoiceCard from "./components/ChoiceCard";


export const getRandomChoice = () => {
  let choiceNames = Object.keys(CHOICES); 
  let randomIndex = Math.floor(Math.random() * 3); 
  let choiceName = choiceNames[randomIndex];
  return CHOICES[choiceName];
};
export const getRoundOutcome = userChoice => {
  const computerChoice = getRandomChoice().name;
  let result;

  if (userChoice === "rock") {
    result = computerChoice === "scissors" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "paper") {
    result = computerChoice === "rock" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "scissors") {
    result = computerChoice === "paper" ? "Victory!" : "Defeat!";
  }

  if (userChoice === computerChoice) result = "Tie game!";
  return [result, computerChoice];
};

export const CHOICES = {
  scissors: {
    name: "scissors",
    url: "https://shop.harborfreight.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_15284.jpg"
  },
  paper: {
    name: "paper",
    url: "http://pngimagesfree.com/Paper/Thumb/blank-note-paper-free-clipa.png"
  },
  rock: {
    name: "rock",
    url:
      "http://pngimg.com/uploads/stone/stone_PNG13622.png"
  }
};
function App() {
  const [gameHistory, setGameHistory] = useState([]);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [previousWinner, setPreviousWinner] = useState(null);
  

  const onPlayerChoose = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES[playerChoice];
    const newComputerChoice = CHOICES[compChoice];

    setPlayerChoice(newUserChoice);
    setComputerChoice(newComputerChoice);

    if (result === "Victory!") {
      setPreviousWinner("You");
    } else if (result === "Defeat!") {
      setPreviousWinner("Computer");
    } else {
      setPreviousWinner("Tie");
    }

 
    gameHistory.push(result);
    setGameHistory(gameHistory);
  };
  
  return (
    <div className="App">
      <ChoiceCard title="You"  imgURL={playerChoice && playerChoice.url}  previousWinner={previousWinner} />
      <div className="container">
        <button className="btn btn-success btn-lg" onClick={() => onPlayerChoose("rock")}>Rock</button>
        <button className="btn btn-success btn-lg" onClick={() => onPlayerChoose("paper")}>Paper</button>
        <button className="btn btn-success btn-lg" onClick={() => onPlayerChoose("scissors")}>Scissors</button>
        <h3>History</h3>
  <ul>
    {gameHistory.map(result => {
      return <li>{result}</li>;
    })}
  </ul>
      </div>
      <ChoiceCard title="Computer"  imgURL={computerChoice && computerChoice.url}  previousWinner={previousWinner} />
    </div>
  );
}

export default App;
