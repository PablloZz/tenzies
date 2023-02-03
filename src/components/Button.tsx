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
    return (button = <button onClick={startGame}>Start Game</button>)
  } else if (tenzies && !isStarted) {
    return (button = <button onClick={newGame}>New Game</button>)
  } else {
    <button onClick={rollDice}>Roll</button>
  }

  return (
    <>
      {tenzies ? (
        <button onClick={newGame}>New Game</button>
      ) : (
        <button onClick={rollDice}>Roll</button>
      )}
    </>
  )
}
