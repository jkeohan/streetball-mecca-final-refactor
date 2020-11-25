import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi';
import DropDown from '../DropDown';
import Input from '../InputBox';
import './styles.css';

const Map = (props) => {
  console.log('Map - props', props)
  const mapRef = useRef();
  const svgRef = useRef();
  const [dims, setDims] = useState({ width: '', height: '' });
  let [{ data }] = useDataApi(
    'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json',
    []
  );
  console.log('Map  - data', data)
  let projectionRef = useRef();

  useEffect(() => {
    const height = mapRef.current.clientHeight;
    const width = mapRef.current.clientWidth;
    setDims({ height, width });
  }, [data]);

  useEffect(() => {
    projectionRef.current = d3
      .geoMercator()
      .center([-73.93, 40.68])
      .scale(60000)
    .translate([dims.width / 2, dims.height / 2 + 20 + 13]);

    const path = d3.geoPath().projection(projectionRef.current);
    if (data.length) {
      renderChart(data[0], path);
      renderParks(props.activeParks);
    }
  }, [data]);

  useEffect(() => {
    if (data.length) {
      renderParks(props.activeParks);
    }
  }, [props.activeParks]);

  const renderChart = (nyc, path) => {
    const boroughs = {
      Brooklyn: 'rgba(48,106,156,.2)',
      Manhattan: 'rgba(109,176,153,.3)',
      Bronx: 'rgba(247,129,84,.3)',
      Queens: 'rgba(234,156,53,.3)',
      'Staten Island': 'rgba(205,125,151,.4)'
    };

    d3.select(svgRef.current)
      .attr('id', 'boroughs')
      .selectAll('.state')
      .data(nyc.features)
      .enter()
      .append('path')
      .attr('class', (d) => d.properties.name)
      .attr('d', path)
      .attr('fill', (d) => boroughs[d.properties.borough]);
  };

  const renderParks = (parks) => {
    const projection = projectionRef.current;
    const circles = d3
      .select(svgRef.current)
      .selectAll('.parks')
      .data(parks, (d) => d.name);

    circles
      .enter()
      .append('circle')
      .attr(
        'transform',
        (d) => 'translate(' + projection([+d.lon, +d.lat]) + ')'
      )
      .attr('r', 4)
      .attr('class', (d, i) => `parks park-${d.code}`)
      .attr('fill', (d) => d.color)
      .style('opacity', 0)
      .transition()
      .duration(1500)
      .style('opacity', 1);

    circles.exit().transition().duration(1500).style('opacity', 0).remove();
  };

  return (
    <div id="map" ref={mapRef}>
      <svg id="boroughs-map" ref={svgRef}></svg>
      <article id="mapCountyToolTip"></article>
      <button onClick={() => props.dispatch({ type: 'RESET' })} id="reset">
        Reset Filters
      </button>
      <div id="filters">
        <div id="court">
         <Input 
         {...props}
         />
        </div>
        <div id="borough">
          <DropDown
          {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
