import React, { useMemo } from 'react';
import * as d3 from 'd3';

const Axis = () => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, 1075]);
    return xScale.ticks().map((value) => ({
      value,
      xOffset: xScale(value)
    }));
  }, []);

  return (
    <svg style={{height: '20px'}}>
      <g transform={'translate(200,0)'}>
        {/* <path d="M 9.5 0.5 H 290.5" stroke="currentColor" /> */}
        {ticks.map(({ value, xOffset }) => (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            {/* <line y2="6" stroke="currentColor" /> */}
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
