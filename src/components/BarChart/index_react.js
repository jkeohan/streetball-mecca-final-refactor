import React from 'react';
import './styles.css';
import * as d3 from 'd3';
import XAxis from './XAxis';
import Neighborhoods from './Neighborhoods'

const BarChart = (props) => {
  // console.log('BarChart - props', props)

  const margin = { right: 25 };

  const xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 1100 - margin.right]);

  return (
    <>
      <div id="axis">
        <XAxis xScale={xScale}/>
      </div>
      <div id="bar-chart">
        <Neighborhoods {...props} xScale={xScale} />
      </div>
    </>
  );
};

export default BarChart;
