import React from 'react';
import ReactCardFlip from "react-card-flip";
import "./card.component.css";

const CardComponent = props => (
<div>
<ReactCardFlip isFlipped={props.data.open || props.data.matched} flipDirection="vertical">
        <div className="backCard">
        </div>
 
        
          <div>
          <img className="frontCard" src={`assets/candies/${props.data.name}.jpg`} alt={props.data.name}/>
        </div>
      </ReactCardFlip>
</div>
  );

export default CardComponent;
