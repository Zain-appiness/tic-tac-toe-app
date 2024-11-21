import Game from "./_app"; // Make sure the path to Game.js is correct

export default function Home() {
  return (
    <div>
      <h1>Welcome to Tic-Tac-Toe</h1>
      <Game />  {/* Render the Game component here */}
    </div>
  );
}