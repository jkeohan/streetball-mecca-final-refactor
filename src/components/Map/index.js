import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi';
import { boroughLegend } from '../../services/legend'
import Circles from './Circles';
import './styles.css';

const Map = (props) => {
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([-73.93, 40.72]).scale(57500));
  const pathRef = useRef();

  let [{ data }] = useDataApi(
    'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json',
    []
  );

  useEffect(() => {
    // console.log('Map - useEffect - data', data)
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;

    projRef.current = d3
      .geoMercator()
      .center([-73.93, 40.72])
      .scale(60000)
      .translate([width / 2, height / 2]);

    pathRef.current = d3.geoPath().projection(projRef.current);
  }, [data]);

  const renderChart = () => {
    // console.log('Map - renderChart - data', data);
    const path = d3.geoPath().projection(projRef.current);
    // return data[0].features.map((d, i) => {
    return data.features.map((d, i) => {
      const featurePath = path(d);
      // console.log('Map - renderChart - data', data)
      return (
        <path
          key={i}
          d={featurePath}
          className={d.properties.name}
          fill={boroughLegend(d.properties.borough)}
        />
      );
    });
  };

  return (
		<>
			<svg id='boroughs-map' ref={svgRef}>
				{data.features && renderChart()}
				{/* {renderChart()} */}
				<Circles {...props} projection={projRef.current} />
			</svg>
			<article id='mapCountyToolTip'></article>
			<button onClick={() => props.dispatch({ type: 'RESET' })} id='reset'>
				Reset
			</button>

			{/* <div id="filters">
        <div id="court">
          <Input {...props} />
        </div>
        <div id="borough">
          <DropDown {...props} />
        </div>
      </div> */}
		</>
	);
};

export default Map;
