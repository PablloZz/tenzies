import { ReactElement } from "react"

type DieProps = {
  value: number[] | string[]
  isHeld: boolean
  holdDice: () => void
}

export function Die({ value, isHeld, holdDice }: DieProps) {
  let dotClass: string = `dot${value.length}`

  function createDots(dots: number) {
    let dotElements: ReactElement[] | ReactElement = []

    if (
      dotClass === "dot1" ||
      dotClass === "dot2" ||
      dotClass === "dot3"
    ) {
      return (dotElements = value.map(v => (
        <span key={v} className="dot"></span>
      )))
    } else if (dotClass === "dot4") {
      dotElements = (
        <>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </>
      )
      return dotElements
    } else if (dotClass === "dot5") {
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
    } else {
      dotElements = (
        <>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </>
      )
      return dotElements
    }
  }

  return (
    <div className={`die ${isHeld ? "held" : ""}`} onClick={() => holdDice()}>
      <h2 className={`dots ${dotClass}`}>{createDots(value.length)}</h2>
    </div>
  )
}
