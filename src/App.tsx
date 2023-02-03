import React, { useEffect, useState } from "react"
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

  useEffect(() => {
    const dieValue = dice[0].value.length
    const isValuesTheSame = dice.every((die) => die.value.length === dieValue)
    const isNumbersHeld = dice.every((die) => die.isHeld)
    if (isValuesTheSame && isNumbersHeld) {
      setTenzies(true)
      setIsGameStarted(false)
      alert("You won")
    }
  }, [dice])

  function allNewDice() {
    const newDiceArray: DieType[] = []

    //Create Dice
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

  function rollDice() {
    const newDice = allNewDice()

    setDice((prevDice) =>
      prevDice.map((die, index) => {
        return die.isHeld ? die : newDice[index]
      })
    )

    setNumberOfRolls((prevNumber) => prevNumber + 1)
  }

  function holdDice(id: string) {
    if(!isGameStarted) return

    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function startGame() {
    setIsGameStarted(true)
    setNumberOfRolls(0)
  }

  function newGame() {
    setDice(allNewDice())
    setNumberOfRolls(0)
    setIsGameStarted(true)
    setTenzies(false)
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
      <div>
        <Header numberOfRolls={numberOfRolls} isStarted={isGameStarted}/>
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
