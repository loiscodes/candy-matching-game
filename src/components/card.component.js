import React from "react";
import ReactCardFlip from "react-card-flip";
import "./card.component.css";

const CardComponent = (props) => {
    const {card} = props;
    return (
    <React.Fragment>
        <ReactCardFlip isFlipped={card.selected || card.matched} flipDirection={"horizontal"}>
            <div className="backCard"></div>
            <img src={`candies/${card.name}.jpg`} alt={card.name} className="frontCard" />
        </ReactCardFlip>
        </React.Fragment> 
    )
}

export default CardComponent;