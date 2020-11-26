import React from 'react';
import './styles.css';


const ParkFilter = (props) => {
  let style = {
    background: props.activeRating === props.name ? 'rgba(155,155,155,.2)' : '',
    color: props.color,
    borderRadius: '10px',
    border: props.activeRating === props.name ? `1px solid ${props.color}` : ''
  }
  

  return (
    <h3 
    style={style}
    onClick={() => {
      console.log('ParkFilter clicked')
      props.dispatch({type: 'FILTER_PARK_RATING' , payload: {rating: props.name}})
      // props.handleUpdateParkRating({type: 'FILTER_PARK_RATING' , payload: {rating: props.name}})
      }  
    }
    className={props.name.toLocaleLowerCase()}>
      {props.name}
    </h3>
  );
};

export default ParkFilter;