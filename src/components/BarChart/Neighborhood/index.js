import React, { useState, useEffect } from 'react';
import './styles.css';
import Bar from '../Bar';
import Circle from '../Circle';

const Neighborhood = ({
  parks,
  width,
  xScale,
  title,
  dispatch,
  neighborhood,
  activeNeighborhood
}) => {
  // console.log('Neighborhood - neighborhood', neighborhood)
  const [active, setActive] = useState(false);

  useEffect(() => {
    activeNeighborhood === title ? setActive(true) : setActive(false);
  }, [activeNeighborhood, title]);

  const circles = parks.map((d, i) => {
    return (
      <Circle
        key={i}
        dispatch={dispatch}
        color={d.color}
        park={d}
        left={xScale(+d.overall) - 5}
      />
    );
  });

  return (
    <div
      className="neighborhood"
      style={{ background: active ? 'lightyellow' : '' }}
      onClick={() =>
        dispatch({
          type: 'FILTER_ACTIVE_NEIGHBORHOOD',
          payload: { neighborhood }
        })
      }
    >
      <div style={{ color: parks[0].boroughColor }} className="title">
        {title}
      </div>
      <div className="bar-group">
        <Bar width={width} neighborhood={neighborhood}   
        activeNeighborhood={  activeNeighborhood}/>
        {circles}
      </div>
    </div>
  );
};

export default Neighborhood;
