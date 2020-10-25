import React, { useState, useEffect } from "react";
import CardComponent from "./card.component";
import candyData from "../data/listOfCandies.json";
import "./gameboard.component.css";

const initialState = {
  level: 4,
  deck: [],
  selectedCards: [],
  gameCompleted: false,
};

const shuffle = (array) => {
  // want to get a list of candies randomly selected from the list
  const copied = [...array];
  for (var i = copied.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = copied[i];
    copied[i] = copied[j];
    copied[j] = temp;
  }
  return copied;
};

const createDeck = (level) => {
  const deck = shuffle(candyData).slice(0, level);
  return shuffle([...deck, ...deck]).map((candy, index) => ({
    ...candy,
    key: index,
  }));
};

const checkSelectedCardsForAMatch = (selectedCards) =>
  selectedCards.length && selectedCards[0]?.name === selectedCards[1]?.name;

const GameboardComponent = () => {
  const [game, setGame] = useState(initialState);
  const initGame = () =>
    setGame((previousGame) => ({
      ...initialState,
      deck: createDeck(previousGame.level),
    }));

  // const deselectedCards = () =>

  const handleClickEvent = (candy, index) => {
    if (game.deck[index].selected || game.deck[index].matched) {
      return;
    }
    const copieddDeck = [...game.deck];
    copieddDeck[index] = { ...candy, selected: true };
    setGame((previousGame) => ({
      ...previousGame,
      deck: [...copieddDeck],
      selectedCards: [...previousGame.selectedCards, copieddDeck[index]],
    }));
  };

  const resetGame = () => {
    setGame((previousGame) => ({
      ...previousGame,
      level: previousGame.level,
      deck: previousGame.deck.map((card) => ({
        name: card.name,
        selected: false,
        matched: false,
      })),
    }));
    setTimeout(initGame, 300);
  };
  const setGameLevel = (level) => {
    //     // set a delay
    resetGame();
    setGame((previousGame) => ({ ...previousGame, level }));
  };

  // initial start of the game
  useEffect(initGame, []);

  useEffect(() => {
    const match = checkSelectedCardsForAMatch(game.selectedCards);
    if (game.selectedCards.length === 2) {
      if (match) {
        const updatedDeck = [...game.deck].map((deck, index) => {
          if (
            game.selectedCards.map((deckVal) => deckVal.key).includes(index)
          ) {
            return { ...deck, selected: false, matched: true };
          }
          return deck;
        });
        setGame((previousGame) => ({
          ...previousGame,
          deck: [...updatedDeck],
          selectedCards: [],
        }));
      } else {
        setTimeout(() => {
          setGame(() => ({
            ...game,
            deck: game.deck.map((candy) => ({ ...candy, selected: false })),
            selectedCards: [],
          }));
        }, 1500);
      }

      return;
    }
  }, [game]);

  return (
    <React.Fragment>
      <div className="gamebar">
        <button className="resetBtn" onClick={() => resetGame()}>
          {" "}
          Reset
        </button>
        <button onClick={() => setGameLevel(4)}> Easy</button>
        <button onClick={() => setGameLevel(8)}> Medium</button>
        <button onClick={() => setGameLevel(16)}> Hard</button>
      </div>
      <div className="gameboard">
        {game.deck.map((card, index) => (
          <span
            key={index}
            onClick={() => handleClickEvent(card, index)}
            className="card"
          >
            <CardComponent card={card} />
          </span>
        ))}
      </div>
    </React.Fragment>
  );
};

export default GameboardComponent;
