import React, { memo } from 'react';
import './styles.css';

const ParkRating = memo(({
  item,
  dispatch
}) => {
  const backgroundStyle = {
    background: item.active ? 'rgba(155,155,155,.4)' : 'white'
  };

  const parkColor = {
    color: item.boroughColor
  };

  return (
    <li
      style={backgroundStyle}
      onClick={() => {
        dispatch({ type: 'FILTER_ACTIVE_PARK', payload: { item } });
      }}
      className="must-see"
    >
      <span className="parkName" style={parkColor}>
        {item.name}
      </span>
      <span className="rating" style={{ borderColor: item.color }}>
        {item.overall}
      </span>
    </li>
  );
});

export default ParkRating
