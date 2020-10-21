import React from 'react';
import CardComponent from "./card.component";
import candyData from "../utils/data.json";
import "./main-playing-pad.component.css";

    //
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
    }

     

class MainPlayingPadComponent extends React.Component{
    constructor(props){
      super(props);
        this.state = {
          deck: this.createDeck(4),
          openedCards: [],
          level: 4
        };
    }

    componentDidUpdate(){
      console.log(this.state.openedCards);
  if(this.state.openedCards.length === 2){
    const match = this.checkOpenedCardsForMatch(this.state.openedCards);
        
    console.log(match);
      if(match){
      const updatedDeck = [...this.state.deck].map((deck, index) => {
        if(this.state.openedCards.map(deckVal => deckVal.key).includes(index)){
          return {...deck, matched: true}
        }
        return deck;
      });
      this.setState({...this.state, deck: [...updatedDeck], openedCards: []});



  }else{
this.closeDeck();
  }
  return;
  }

};

closeDeck(){
  setTimeout(()=>{
    this.setState({...this.state, deck: this.state.deck.map(candy => ({...candy, open: false})), openedCards: []});
  }, 1500)
}

setLevel(level){
  this.setState({...this.state, deck: this.createDeck(level), openedCards: [], level });
;
}

resetGame(){
  this.setState({...this.state, deck: this.state.deck.map(candy => ({...candy, open: false, matched: false})), openedCards: [] }); 
  this.createDeck(this.state.level);
}
    createDeck(level){
      const deck = shuffle(candyData).slice(0,(level));
      return shuffle([...deck, ...deck]).map((candy,index) => ({...candy, key:index}));
    }

    checkOpenedCardsForMatch(openedCards){
      return openedCards.length && openedCards[0]?.name === openedCards[1]?.name;
    }

    handleClick(candy, index){

      if(this.state.openedCards.length === 2){
        return;
      }
      const updatedDeck = [...this.state.deck];
      updatedDeck[index] = {...candy, open: true};
      this.setState({...this.state, deck: [...updatedDeck], openedCards: [...this.state.openedCards, updatedDeck[index]]});


    }

  render() {
      return(
        <div className="playground">
{this.state.deck.map( (candy, index) => (
  <span key={index} onClick={() => this.handleClick(candy, index)} className="card" >
    {/* This needs a click event open */}
    <CardComponent data={candy} />
    </span>
))}
<button onClick={() => this.resetGame()}> Reset</button>
<button onClick={() => this.setLevel(4)}> Easy</button>
<button onClick={() => this.setLevel(8)}> Medium</button>
<button onClick={() => this.setLevel(16)}> Hard</button>

   </div> 

  )
};
}

export default MainPlayingPadComponent;
