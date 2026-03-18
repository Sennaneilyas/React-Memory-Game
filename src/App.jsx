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

  const initializeGame = () => {
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false
    }))
    setCards(finalCards)
  }

  const handleClick = (card) => {
    // disable clicking on flipped, matched card
    if (card.isFlipped || card.isMatched) {
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
      if (firstCard.value === card.value) {
        setMatchedCards(prev => [...prev, flippedCards.id, card.id])

        const newMatchedCards = cards.map((c) => {
          if (c.id === card.id || c.id === firstCard.id) {
            return { ...c, isMatched: true }
          } else {
            return c
          }
        })

        setCards(newMatchedCards)
        setFlippedCards([])

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
        }, 1000);
      }
    }

  }

  useEffect(() => {
    initializeGame()
  }, [])


  return (
    <div className="app" onLoad={initializeGame}>
      <Header score={2} moves={3}></Header>
      <div className="cards-grid">
        {cards.map(card => (
          <Card card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default App
