import React from 'react';
import './styles.css';
import Neighborhood from '../Neighborhood';

const Neighborhoods = ({
  nestedData,
  dispatch,
  activeNeighborhood,
  xScale
}) => {
  
  const neighborhoods = nestedData.sort((a,b) => b.value.avg - a.value.avg).map((d, i) => {
    return (
      <Neighborhood
        key={i}
        title={d.key}
        parks={d.value.parks}
        width={xScale(d.value.avg)}
        xScale={xScale}
        neighborhood={d}
        dispatch={dispatch}
        activeNeighborhood={activeNeighborhood}
      />
    );
  });
  
  return (
    <>
     {neighborhoods}
    </>
  )
};

export default Neighborhoods;
