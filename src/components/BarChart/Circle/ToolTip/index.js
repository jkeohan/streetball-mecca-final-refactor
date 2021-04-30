import React from 'react';
import './styles.css';

const ToolTip = ({ coords, park }) => {
  // console.log('ToolTip - neighborhood', park, coords);
  return (
    <article 
      className="circleToolTip"
      style={coords}
    >
      <p className="circle-title">{park.name}</p>
      <p className="circle-neighborhood">{park.neighborhood}, {park.borough}</p>
      <p className="avg">Overall: {Math.round(park.overall)}/100</p>
    </article>
  );
};

export default ToolTip;
