import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // SHUFFLE CARDS FUNCTION
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // HANDLE CHOICE FUNCTION
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // COMPARE CHOSEN CARDS FUNCTION
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      // CARDS MATCH?
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          // ITERATE THROUGH CARDS ARRAY
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              // RETURN CARD WITH MATCHED = TRUE
              return { ...card, matched: true };
            } else {
              // RETURN CARD AS IS
              return card;
            }
          })
        })
        // RESET TURN
        setTimeout(() => resetTurn(), 1000);
      } else {
        // RESET TURN
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // RESET TURN FUNCTION
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // START NEW GAME WHEN PAGE LOADS
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>React memory game</h1>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="counter">
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;