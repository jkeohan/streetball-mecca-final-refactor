import React  from 'react';
import './styles.css'


const ToolTip = ({ coords, neighborhood }) => {
  console.log('ToolTip - neighborhood', neighborhood, coords);

  return (
    <article 
      className="rectToolTip"
      style={coords}
      >
      <p className="title">{neighborhood.key}</p>
      <p className="avg">Avg. Overall Rating: {Math.round(neighborhood.value.avg)}/100</p>
    </article>
  );
};

export default ToolTip;
