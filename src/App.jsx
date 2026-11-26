import { useEffect, useState } from 'react'
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';

function Randomize(arr) {
  const cards = [...arr];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function buildDeck(gunsPool, count) {
  return Randomize(gunsPool)
    .slice(0, count)
    .map((gun) => ({ ...gun, clicked: false }));
}

export default function App() {
  const [allGuns, setAllGuns] = useState([]);
  const [cardCount, setCardCount] = useState(12);
  const [cards, setCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const score = cards.filter(card => card.clicked).length;

  function handleClick(id) {
    const card = cards.find(card => id === card.id);
    card.clicked ? resetScore() : updateScore(id);
  }

  function updateScore(id) {
    setCards( Randomize(cards.map(c => (
      c.id === id ? {...c, clicked: true} : c
    ))));
    checkWinner();
  }

  function resetScore() {
    if (score > bestScore) setBestScore(score);
    setCards( Randomize(cards.map( c => ({...c, clicked: false}))) );
  }

  function checkWinner() {
    if (score+1 === cards.length) {
      resetScore();
      setBestScore(score+1);
    }
  }

  function handleDifficultyChange(newCount) {
    setCardCount(newCount);
    setBestScore(0); 
    setCards(buildDeck(allGuns, newCount));
  }

  useEffect(() => {
    let ignore = false;
    async function fetchCards() {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json'
        );
        const data = await response.json();
        const validGuns = data.filter(
          (item) => !item.name.startsWith('★') && item.image
        );
        const uniqueGunsMap = new Map();
        for (const item of Randomize(validGuns)) {
          const gunName = item.name.split(' |')[0].trim();
          if (!uniqueGunsMap.has(gunName)) {
            uniqueGunsMap.set(gunName, {
              id: item.id,
              name: gunName,
              image: item.image,
              clicked: false,
            });
          }
        }
        const uniquePool = Array.from(uniqueGunsMap.values());
        if (!ignore) {
          setAllGuns(uniquePool);
          setCards(buildDeck(uniquePool, 12));
        }
      } catch (error) {
        alert(`Failed to fetch cards: ${error.message}`);
      }
    }
    fetchCards();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Scoreboard
        score={score}
        bestScore={bestScore}
        cardCount={cardCount}
        maxCards={allGuns.length || 24}
        onDifficultyChange={handleDifficultyChange}/>
      <Board cards={cards} handleClick={handleClick} />
    </>
  )
}
