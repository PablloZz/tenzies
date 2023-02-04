type ButtonProps = {
  tenzies: boolean
  newGame: () => void
  rollDice: () => void
  startGame: () => void
  isStarted: boolean
}

export default function Button({
  tenzies,
  newGame,
  rollDice,
  startGame,
  isStarted,
}: ButtonProps) {
  let button

  if (!isStarted && !tenzies) {
    button = <button onClick={startGame}>Start Game</button>
  } else if (tenzies && !isStarted) {
    button = <button onClick={newGame}>New Game</button>
  } else {
    button = <button onClick={rollDice}>Roll</button>
  }

  return button
}
