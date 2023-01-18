import React, { useEffect, useState } from "react"
import { Die } from "./components/Die"
import "./style.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

type DieType = {
  value: number[]
  isHeld: boolean
  id: string
}

export default function App() {
  const [dice, setDice] = useState(() => allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const dieValue = dice[0].value.length
    const isValuesTheSame = dice.every(die => die.value.length === dieValue)
    const isNumbersHeld = dice.every(die => die.isHeld)
    if (isValuesTheSame && isNumbersHeld) {
      setTenzies(true)
      console.log("You won")
    }
  }, [dice])

  function allNewDice() {
    const newDicesArray: DieType[] = []

    //Create Dice
    for (let i = 0; i < 10; i++) {
      const newValue = Math.ceil(Math.random() * 6)

      // Create Amount of Dots for every Die
      const diceDots = []
      for (let j = 0; j < newValue; j++) {
        diceDots.push(j)
      }

      newDicesArray.push({ value: diceDots, isHeld: false, id: nanoid() })
    }
    return newDicesArray
  }

  function rollDice() {
    const newDice = allNewDice()

    setDice(prevDice =>
      prevDice.map((die, index) => {
        return die.isHeld ? die : newDice[index]
      })
    )
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
  //https://codepen.io/LandonSchropp/pen/KpzzGo
  return (
    <main className="main">
      {tenzies && <Confetti />}
      <div>
        <article className="article">
          <h2>Tenzies</h2>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </article>
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
