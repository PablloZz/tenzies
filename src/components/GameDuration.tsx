import React, { useEffect, useState } from "react"

function GameDuration() {
  const [timeOfGame, setTimeOfGame] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    function increaseTime() {

      setTimeOfGame((prevTime) => {

        if ((prevTime + 1) === 60) {
          setMinutes(prevMinutes => prevMinutes + 1)
          return 0
        } 
        return prevTime + 1
      })
    }

    let timerId = window.setInterval(increaseTime, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  return <div className="time">{(minutes < 1) ? `0.${timeOfGame}` : `${minutes}.${timeOfGame}`}</div>
}

export default GameDuration
