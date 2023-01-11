type DieProps = {
  value: number | string
  isHeld: boolean
  holdDice: () => void
}

export function Die({ value, isHeld, holdDice }: DieProps) {
  return (
    <div className={`die ${isHeld ? "held" : ""}`} onClick={() => holdDice()}>
      <h2>{value}</h2>
    </div>
  )
}
