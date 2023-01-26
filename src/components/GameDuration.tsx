import React, { useEffect, useState } from "react"

function GameDuration() {
  const [timeOfGame, setTimeOfGame] = useState(0)

  useEffect(() => {
    gameDuration(0)
  }, [])

  let lastTime = 0
  let delta = 0
  function gameDuration(time: number) {
    delta = (time - lastTime) / 500
    setTimeOfGame(prevTime => prevTime + delta)
    lastTime = time
    requestAnimationFrame(gameDuration)
  }

  return (
    <div className="time">
      {timeOfGame > 59
        ? `${+(timeOfGame / 60).toFixed(2)}`
        : `0.${timeOfGame.toFixed()}`}
    </div>
  )
}

export default GameDuration
