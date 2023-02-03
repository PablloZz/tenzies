import GameDuration from "./GameDuration"

type HeaderProps = {
  numberOfRolls: number
  isStarted: boolean
}

export function Header({ numberOfRolls, isStarted }: HeaderProps) {
  return (
    <section className="section">
      <h2>Tenzies</h2>
      {numberOfRolls > 0 ? (
        <h1>Number of Rolls {numberOfRolls}</h1>
      ) : (
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      )}
      <GameDuration isStarted={isStarted} />
    </section>
  )
}
