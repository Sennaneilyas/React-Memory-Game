import { Header } from "./components/Header"
import { Card } from "./components/Card"
import { WinMessage } from "./components/WinMessage"
import { useGameLogic } from "./hooks/useGameLogic"

const cardValues = [
  '🥩', '🛴', '💫', '🕳️', '🧲', '👽', '🦾', '🥷', '🥩', '🛴', '💫', '🕳️', '🧲', '👽', '🦾', '🥷'
]


function App() {

  const {cards, score, moves, initializeGame, handleClick, matchedCards} = useGameLogic(cardValues)

  return (
    <div className="app" onLoad={initializeGame}>
      <Header score={score} moves={moves} onReset={initializeGame} />
      {matchedCards.length === cardValues.length && <WinMessage moves={moves} /> }
      <div className="cards-grid">
        {cards.map(card => (
          <Card card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default App
