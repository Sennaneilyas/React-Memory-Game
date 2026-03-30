import { Header } from "./components/Header"
import { Card } from "./components/Card"
import { useEffect, useState } from "react"

const cardValues = [
  '🥩', '🛴', '💫', '🕳️', '🧲', '👽', '🦾', '🥷', '🥩', '🛴', '💫', '🕳️', '🧲', '👽', '🦾', '🥷'
]


function App() {

  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)


  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues)
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false
    }))
    setCards(finalCards)
    setMoves(0)
    setScore(0)
    setMatchedCards([])
    setFlippedCards([])
    setIsLocked(false)
  }

  const handleClick = (card) => {
    // disable clicking on flipped, matched card
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length == 2) {
      return;
    }
    // update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c
      }
    })
    setCards(newCards)

    const newFlippedCards = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards)

    //check two flipped card are matched ?
    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]]
      setIsLocked(true)
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards(prev => [...prev, firstCard.id, card.id])
          setScore(prev => prev + 1)
          const newMatchedCards = cards.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true }
            } else {
              return c
            }
          })

          setCards((prev) => prev.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true }
            } else {
              return c
            }
          }))
          setFlippedCards([])
          setIsLocked(false)
        }, 500);

      } else {
        //flip back card 1, card 2
        setTimeout(() => {
          const flippedBackCard = newCards.map(c => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false }
            } else {
              return c;
            }
          })
          setCards(flippedBackCard)
          setFlippedCards([])
          setIsLocked(false)
        }, 1000);
      }

      setMoves(prev => prev + 1)

    }

  }

  useEffect(() => {
    initializeGame()
  }, [])


  return (
    <div className="app" onLoad={initializeGame}>
      <Header score={score} moves={moves} onReset={initializeGame} />
      <div className="cards-grid">
        {cards.map(card => (
          <Card card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default App
