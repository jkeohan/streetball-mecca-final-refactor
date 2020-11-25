import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi'
import DropDown from '../DropDown'
import Input from '../InputBox';
import BoroughMap from './BoroughMap'
import Circles from './Circles'
import './styles.css';

const Map = (props) => {
  // console.log('Map - props', props)
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([-73.93, 40.72]).scale(57500));
  const pathRef = useRef()

  let [{ data }] = useDataApi(
    'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json',
    []
  );

  useEffect(() => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;        

    projRef.current = d3.geoMercator().center([-73.93, 40.68]).scale(60000)
    .translate([width / 2, height / 2 + 20 + 13]);

    pathRef.current = d3.geoPath().projection(projRef.current);
  }, [data]);

  return (
		<div id='map'>
			<svg id='boroughs-map' ref={svgRef}>
        {data.length ? <BoroughMap data={data[0].features} geoPath={pathRef.current} /> : ''}
				<Circles {...props} projection={projRef.current} />
			</svg>
			<article id='mapCountyToolTip'></article>
			<button onClick={() => props.dispatch({ type: 'RESET' })} id='reset'>
				Reset
			</button>

			<div id='filters'>
				<div id='court'>
					<Input {...props} />
				</div>
				<div id='borough'>
					<DropDown {...props} />
				</div>
			</div>
		</div>
	);
};

export default Map;
