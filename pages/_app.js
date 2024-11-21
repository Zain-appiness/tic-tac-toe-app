import "@/styles/globals.css";

import {useState} from 'react';

export function Button({value,OnclickButton}){
  return (<button className="square" onClick= {OnclickButton}> { value} </button>);
  }

  function Board({ xIsNext, squares, onPlay }) 
  {
 function handleClick(i){
  if(calculateWinner(squares) || squares[i]){
    return;
  }
  const nextSquares = squares.slice();
  if(xIsNext){
    nextSquares[i]='X';
  }
  else{
    nextSquares[i]='O';
  }
  onPlay(nextSquares);
 }

 const winner = calculateWinner(squares);
 let status;
 if (winner) {
  status = "Winner: " + winner;
} else if (squares.every(square => square !== null)) {
  status = "It's a Tie!";
} else {
  status = "Next player: " + (xIsNext ? "X" : "O");
}
  return (
    <>
    <div className="status">{status}</div>
    <div className='board-row'>
      
    <Button value={squares[0]} OnclickButton={() => handleClick(0)} />

    <Button value={squares[1]} OnclickButton={() => handleClick(1)} />
    <Button value={squares[2]} OnclickButton={() => handleClick(2)} />
    </div>
    <div className='board-row'>
      
   <Button value={squares[3]} OnclickButton={() => handleClick(3)} />

    <Button value={squares[4]} OnclickButton={() => handleClick(4)} />
    <Button value={squares[5]} OnclickButton={() => handleClick(5)} />
    </div>
    <div className='board-row'>
      
    <Button value={squares[6]} OnclickButton={() => handleClick(6)} />

<Button value={squares[7]} OnclickButton={() => handleClick(7)} />
<Button value={squares[8]} OnclickButton={() => handleClick(8)} />
    </div>
    </>
  );
}


//main component game

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextmove){
    setCurrentMove(nextmove);
    setXIsNext(nextmove % 2 === 0);
  }

  const moves= history.map(
    (squares,move)=>{
      let description;
      if(move > 0){
         description='GO BACK TO MOVE #'+move;
      }
      else{
        description="GO TO START OF THE GAME";
      }

      return(
        <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
       </li>
      );
    }
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (top-left to bottom-right)
    [2, 4, 6], // Diagonal (top-right to bottom-left)
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null; // No winner found
}


