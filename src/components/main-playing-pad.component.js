import React from 'react';
import CardComponent from "./card.component";
import candyData from "../utils/data.json";

class MainPlayingPadComponent extends React.Component{
    construtor(props){
        this.props = props;
    }
  render() {
      return(
<div>
{candyData.map( (candy) => (
    <CardComponent data={candy} />
))}
    
</div>
  )
};
}

export default MainPlayingPadComponent;
