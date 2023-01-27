import React, { useEffect, useState } from "react"
import { Die } from "./components/Die"
import "./style.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import { Header } from "./components/Header"

type DieType = {
  value: number[]
  isHeld: boolean
  id: string
}

export default function App() {
  const [dice, setDice] = useState(() => allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  
  useEffect(() => {
    const dieValue = dice[0].value.length
    const isValuesTheSame = dice.every(die => die.value.length === dieValue)
    const isNumbersHeld = dice.every(die => die.isHeld)
    if (isValuesTheSame && isNumbersHeld) {
      setTenzies(true)
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

    setDice(prevDice =>
      prevDice.map((die, index) => {
        return die.isHeld ? die : newDice[index]
      })
    )

    setNumberOfRolls(prevNumber => prevNumber + 1)
  }

  function holdDice(id: string) {
    setDice(prevDice =>
      prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function newGame() {
    setDice(allNewDice())
    setTenzies(false)
  }

  const diceElements = dice.map(die => (
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
        <Header numberOfRolls={numberOfRolls} />
        <div className="container">{diceElements}</div>
        {tenzies ? (
          <button onClick={newGame}>New Game</button>
        ) : (
          <button onClick={rollDice}>Roll</button>
        )}
      </div>
    </main>
  )
}
