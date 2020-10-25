import React from "react";
import ReactCardFlip from "react-card-flip";
import "./card.component.css";

const CardComponent = (props) => (
  <div>
    <ReactCardFlip
      isFlipped={props.card.selected || props.card.matched}
      flipDirection="vertical"
    >
      <div className="backCard"></div>

      <div>
        <img
          className="frontCard"
          src={`candies/${props.card.name}.jpg`}
          alt={props.card.name}
        />
      </div>
    </ReactCardFlip>
  </div>
);

export default CardComponent;
