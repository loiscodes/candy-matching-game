import React from 'react';
import ReactCardFlip from "react-card-flip";
import "./card.component.css";

class CardComponent extends React.Component{
    constructor(props){
        super(props);
        this.props = this.props;
        this.state = {
            open: false,
            matched: false
          };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ open: true }));
      }
  render() {
      return(
<div>
<ReactCardFlip isFlipped={this.state.matched || this.state.open} flipDirection="vertical">
        <div onClick={this.handleClick} className="backCard">
        </div>
 
        
          <div>
          <img className="frontCard" src={`assets/candies/${this.props.data.name}.jpg`} width="150" height="150"/>
        </div>
      </ReactCardFlip>
</div>
  )
};
}

export default CardComponent;
