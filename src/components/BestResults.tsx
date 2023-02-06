type BestResultsProps = {
  bestTime: number
  bestRolls: number
}

export function BestResults({ bestTime, bestRolls }: BestResultsProps) {
  return (
    <div className="best-results">
      <h2>
        Best Time: <span>{bestTime}</span>
      </h2>
      <h2>
        Best Rolls: <span>{bestRolls}</span>
      </h2>
    </div>
  )
}
