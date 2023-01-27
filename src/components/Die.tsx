import { ReactElement } from "react"

type DieProps = {
  value: number[] | string[]
  isHeld: boolean
  holdDice: () => void
}

export function Die({ value, isHeld, holdDice }: DieProps) {
  let dotClass: string = `dot${value.length}`

  function createDots() {
    let dotElements: ReactElement[] | ReactElement

    switch (dotClass) {
      case "dot1":
      case "dot2":
      case "dot3":
        dotElements = value.map((v) => <span key={v} className="dot"></span>)
        return dotElements
      case "dot4":
        dotElements = [1, 2].map((column) => (
          <div className="column" key={column}>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ))
        return dotElements
      case "dot5":
        dotElements = (
          <>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
            </div>
            <div className="column">
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </>
        )
        return dotElements
      case "dot6":
        dotElements = [1, 2].map((column) => (
          <div className="column" key={column}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ))
        return dotElements
    }
  }

  return (
    <div className={`die ${isHeld ? "held" : ""}`} onClick={() => holdDice()}>
      <h2 className={`dots ${dotClass}`}>{createDots()}</h2>
    </div>
  )
}
