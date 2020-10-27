import React, { useEffect } from "react";
import candyData from "../data/listOfCandies.json";
import CardComponent from "./card.component";
import "./gameboard.component.css";

const GameboardComponent = () => {
    const initalState = {
        level: 4,
        deck: [],
        selectedCards: []
    };

    const [game, setGame] = React.useState(initalState);

    const shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var copied = array[i];
            array[i] = array[j];
            array[j] = copied;
        }
        return array;
    }

    const createDeck = (level) => {
        const deck = shuffle(candyData).slice(0, level);
        const fullDeck = shuffle([...deck, ...deck]);
        return fullDeck;
    };

    const initGame = () => setGame((previousState)=>({...initalState, level: previousState.level, deck: createDeck(previousState.level)}));

    const onClickEventHandler = (card, index) => {
        if(card.selected || card.matched){
            return;
        }
        const copiedDeck = [...game.deck];
        copiedDeck[index] = {...card, selected: true};
        setGame((previousState) => ({...previousState, deck: copiedDeck, selectedCards: [...previousState.selectedCards, copiedDeck[index]]}));
    };
const checkSelectedCardsForAMatch = (selection) => selection.length && selection[0]?.name === selection[1]?.name;

const resetGame = () => {
    setGame((previousState) => ({
        ...previousState,
        deck: previousState.deck.map((card) =>({
            name: card.name,
            selected: false,
            matched: false
        }))
    }))
    setTimeout(initGame, 300);
};

const setLevel = (level) => {
    resetGame();
    setGame((previousState) => ({...previousState, level}));
    
}

useEffect(initGame,[]);

useEffect(()=>{
    if(game.selectedCards.length === 2){
    // if matches
    if(checkSelectedCardsForAMatch(game.selectedCards)){
       const copiedDeck = [...game.deck].map((card)=>{
           if(game.selectedCards.map(candy => candy.name).includes(card.name)){
               return {name: card.name, selected: false, matched: true};
           }
           return card;
       })
       setGame((previousState) => ({...previousState, deck: copiedDeck, selectedCards:[] }));

    }else{
        setTimeout(()=>{
        setGame((previousState) => ({...previousState, deck: game.deck.map(card => ({...card, selected:false})), selectedCards:[]}))
        }, 1500);
    }
    //when it doesn't match
    }
},[game]);


    return (
        <React.Fragment>
            <div className="gamebar">
        <button className="resetBtn" onClick={()=>resetGame()}>Reset Game</button>
        <button onClick={()=> setLevel(4)}>Easy</button>
        <button onClick={()=> setLevel(8)}>Medium</button>
        <button onClick={()=> setLevel(16)}>Hard</button>

            </div>
            <div className="gameboard">
                {game.deck.map((card, index) => (
                    <span key={index} className="card" onClick={() => onClickEventHandler(card, index)} > 
                    <CardComponent card={card} />
                    </span>
                ))}

            </div>
        </React.Fragment>
    )
}

export default GameboardComponent;