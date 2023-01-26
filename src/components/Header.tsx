import GameDuration from "./GameDuration"

type HeaderProps = { numberOfRolls: number }

export function Header({ numberOfRolls }: HeaderProps) {
  return (
    <article className="article">
      <h2>Tenzies</h2>
      {numberOfRolls > 0 ? (
        <h1>Number of Rolls {numberOfRolls}</h1>
      ) : (
        <>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </>
      )}
      <GameDuration />
    </article>
  )
}
