import React, { useCallback, useEffect, useRef, useState } from "react"
import { Die } from "./components/Die"
import "./style.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { Header } from "./components/Header"
import Button from "./components/Button"

type DieType = {
  value: number[]
  isHeld: boolean
  id: string
}

export default function App() {
  const [dice, setDice] = useState(() => allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [bestTime, setBestTime] = useState(() =>
    Number(localStorage.getItem("best-time"))
  )
  const [bestRolls, setBestRolls] = useState(() =>
    Number(localStorage.getItem("best-rolls"))
  )

  let timerId = useRef(0)

  useEffect(() => {
    const dieValue = dice[0].value.length
    const isValuesTheSame = dice.every((die) => die.value.length === dieValue)
    const isNumbersHeld = dice.every((die) => die.isHeld)
    if (isValuesTheSame && isNumbersHeld) {
      setEndOfGame()
    }
  }, [dice])

  useEffect(() => {
    if (!isGameStarted) {
      window.clearInterval(timerId.current)
      return
    }
    setSeconds(0)
    setMinutes(0)

    function increaseTime() {
      setSeconds((prevTime) => {
        if (prevTime + 1 === 60) {
          setMinutes((prevMinutes) => prevMinutes + 1)
          return 0
        }
        return prevTime + 1
      })
    }

    timerId.current = window.setInterval(increaseTime, 1000)

    return () => window.clearInterval(timerId.current)
  }, [isGameStarted])

  const startGame = useCallback(() => {
    setIsGameStarted(true)
    setNumberOfRolls(0)
  }, [])

  const newGame = useCallback(() => {
    setDice(allNewDice())
    setNumberOfRolls(0)
    setIsGameStarted(true)
    setTenzies(false)
  }, [])

  const rollDice = useCallback(() => {
    const newDice = allNewDice()

    setDice((prevDice) =>
      prevDice.map((die, index) => {
        return die.isHeld ? die : newDice[index]
      })
    )

    setNumberOfRolls((prevNumber) => prevNumber + 1)
  }, [])

  function allNewDice() {
    const newDiceArray: DieType[] = []

    for (let i = 0; i < 10; i++) {
      const newValue = Math.ceil(Math.random() * 6)
      let diceDots = createDiceDots(newValue)
      newDiceArray.push({ value: diceDots, isHeld: false, id: nanoid() })
    }

    return newDiceArray
  }

  function createDiceDots(value: number) {
    const diceDots: number[] = []

    for (let i = 0; i < value; i++) {
      diceDots.push(i)
    }

    return diceDots
  }

  function holdDice(id: string) {
    if (!isGameStarted) return

    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function getTimeOfGame() {
    let timeFormat = ""
    if (seconds < 10) {
      timeFormat = `0${seconds}`
    } else if (seconds >= 10) {
      timeFormat = `${seconds}`
    }
    let time = minutes < 1 ? "0." + timeFormat : minutes + "." + seconds
    return time
  }

  function setEndOfGame() {
    setTenzies(true)
    setIsGameStarted(false)
    calculateBestTime()
    calculateBestRolls()
    alert("You won")
  }

  function calculateBestTime() {
    let currentBestTime = localStorage.getItem("best-time")
    let currentTime = getTimeOfGame()

    if (!currentBestTime) {
      localStorage.setItem("best-time", JSON.stringify(currentTime))
      return
    }

    let newBestTime =
      +currentBestTime < Number(currentTime) ? +currentBestTime : currentTime
    localStorage.setItem("best-time", JSON.stringify(newBestTime))
    setBestTime(Number(newBestTime))
  }

  function calculateBestRolls() {
    let currentBestRolls = localStorage.getItem("best-rolls")

    if (!currentBestRolls) {
      localStorage.setItem("best-rolls", JSON.stringify(numberOfRolls))
      return
    }

    let newBestRolls =
      +currentBestRolls < numberOfRolls ? +currentBestRolls : numberOfRolls
    localStorage.setItem("best-rolls", JSON.stringify(newBestRolls))
    setBestRolls(newBestRolls)
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div className="best-results">
        <h2>
          Best Time: <span>{bestTime}</span>
        </h2>
        <h2>
          Best Rolls: <span>{bestRolls}</span>
        </h2>
      </div>
      <div className="game-board">
        <Header numberOfRolls={numberOfRolls} getTimeOfGame={getTimeOfGame} />
        <div className="container">{diceElements}</div>
        <Button
          tenzies={tenzies}
          newGame={newGame}
          rollDice={rollDice}
          startGame={startGame}
          isStarted={isGameStarted}
        />
      </div>
    </main>
  )
}
