import React, { memo } from 'react';
import './styles.css';

const ParkRating = memo(({
  park,
  handleUpdateActivePark,
  handleUpdateParkRating,
  dispatch
}) => {
  // console.log('ParkRating', park)
  const backgroundStyle = {
    background: park.active ? 'rgba(155,155,155,.1)' : 'white'
  };

  const parkColor = {
    color: park.boroughColor
  };

  return (
    <li
      style={backgroundStyle}
      onClick={() => {
        dispatch({ type: 'FILTER_ACTIVE_PARK', payload: { park } });
        // handleUpdateActivePark({type: 'FILTER_ACTIVE_PARK', payload: { park }})
      }}
      className="must-see"
    >
      <span className="parkName" style={parkColor}>
        {park.name}
      </span>
      {/* <span className="rating" style={{ borderColor: 'rgb(0, 128, 0)' }}> */}
      <span className="rating" style={{ borderColor: park.color }}>
        {park.overall}
      </span>
    </li>
  );
});

export default ParkRating
