import React from 'react';
import './styles.css';
import * as d3 from 'd3';

const Axis = ({xScale}) => {

  // const margin = { left: 200}
  // const xScale = d3.scaleLinear().domain([0,100])
  //   .range([0, 1100 - margin.left - 8])
  
  const ticks = xScale.ticks().map((value) => ({
    value,
    xOffset: xScale(value) 
  }));

  // console.log('Axis - ticks', ticks);

  return (
    // <>
    //   {ticks.map( (d,i) => {
    //     const style = {
    //       'transform': `translate(${d.xOffset}px , 0)`
    //     }

    //     return (<div className='tick' style={style}>{d.value}</div>)
    //   })}
    // </>
    // </div>
    <svg style={{ height: '20px' }}>
      <g transform={'translate(200,0)'}>
        {/* <path d="M 1.0 0.5 H 1075" stroke="black" /> */}
        {ticks.map(({ value, xOffset }) => (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            {/* <line y2="6" stroke="black" /> */}
            <text
              key={value}
              style={{
                fontSize: '14px',
                textAnchor: 'middle',
                transform: 'translateY(20px)'
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Axis;

// const ticks = () => {
//   const xScale = d3.scaleLinear().domain([0, 100]).range([0, 1075]);
//   return xScale.ticks().map((value) => ({
//     value,
//     xOffset: xScale(value)
//   }));
// }

// const ticks = useMemo(() => {
//   const xScale = d3.scaleLinear().domain([0, 100]).range([0, 1075]);
//   return xScale.ticks().map((value) => ({
//     value,
//     xOffset: xScale(value)
//   }));
// }, []);
