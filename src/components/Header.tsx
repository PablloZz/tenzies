type HeaderProps = {
  numberOfRolls: number
  getTimeOfGame: () => string
}

export function Header({ numberOfRolls, getTimeOfGame }: HeaderProps) {
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
      <div className="time">{getTimeOfGame()}</div>
    </section>
  )
}
