import React, { useEffect, useRef, useState } from "react"

type GameDurationProps = {
  isStarted: boolean
}

function GameDuration({ isStarted }: GameDurationProps) {
  const [timeOfGame, setTimeOfGame] = useState(0)
  const [minutes, setMinutes] = useState(0)

  let timerId = useRef(0)

  useEffect(() => {
    if (!isStarted) {
      window.clearInterval(timerId.current)
      return
    }
    setTimeOfGame(0)

    function increaseTime() {
      setTimeOfGame((prevTime) => {
        if (prevTime + 1 === 60) {
          setMinutes((prevMinutes) => prevMinutes + 1)
          return 0
        }
        return prevTime + 1
      })
    }

    timerId.current = window.setInterval(increaseTime, 1000)

    return () => window.clearInterval(timerId.current)
  }, [isStarted])

  return (
    <div className="time">
      {minutes < 1 ? `0.${timeOfGame}` : `${minutes}.${timeOfGame}`}
    </div>
  )
}

export default GameDuration
