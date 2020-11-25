import React from 'react';
import ParkRating from '../ParkRating'
import ParkFilters from '../ParkFilters'
import { circleLegend } from '../../../services/legend'
import './styles.css';

const TopParks = ({
    topParks, 
    handleUpdateActivePark, 
    handleUpdateParkRating,
    activeRating,
    dispatch
  }) => {
  
  const parkFilters = circleLegend.domain().map((d, i) => {
    return (
      <ParkFilters
        name={d}
        color={circleLegend(d)}
        activeRating={activeRating}
        // onClick={() => dispatch({type: 'FILTER_PARK_RATING' , payload: {rating: d}})}
        handleUpdateParkRating={handleUpdateParkRating}
        dispatch={dispatch}
        className={d.toLocaleLowerCase()} key={i}>
        {d}
      </ParkFilters>
    );
  });
  
  const renderParks = topParks.map( (d,i) => {
    return <ParkRating 
     handleUpdateActivePark={handleUpdateActivePark}
     dispatch={dispatch}
     key={i} park={d} 
     active={d.active}
    />
  })

  return (
   <>
      <div className="park-rating_filters"> {parkFilters} </div>
      <ul> {renderParks}  </ul>
    </>
  )
};

export default TopParks
