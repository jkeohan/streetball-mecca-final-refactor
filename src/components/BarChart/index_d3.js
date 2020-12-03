import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles.css';
import * as d3 from 'd3';
let margin = { top: 20, left: 25 };

const BarChart = (props) => {
  console.log('BarChart - props', props);
  const [height, setHeight] = useState('');
  const svgRef = useRef();
  const xAxisRef = useRef();

  let yScale = d3.scaleBand().padding(0.1);

  let xScale = d3.scaleLinear().domain([0, 100]).range([0, 1100 - margin.left])

  // useCallback used as per Reacts advices after adding xAxis as dependency to useEffect
  let xAxis = useCallback( (g) =>
    g
      .attr('transform', 'translate(200,0)')
      .call(d3.axisBottom(xScale))
      .call((g) => {g.select('.domain').remove()}),[xScale]);

  useEffect(() => {
    d3.select(xAxisRef.current).style('font-size', 14).call(xAxis);
  }, [xAxis]);

  useEffect(() => {
    renderChart(props.nestedData);
    setHeight(props.nestedData.length * 28.75);
  }, [props.nestedData]);

  const circleToolTip = (e, d) => {
    console.log('this is circleToolTip e,d: ', e, d);
    let top = e.pageY - 80;
    let left = e.pageX + 10;
    let tooltip = d3.select('.circleToolTip');
    console.log('circleToolTip - tooltip', tooltip);
    d3.select('.circleToolTip .title').text(d.name);
    d3.select('.circleToolTip .neighborhood').text(
      `${d.neighborhood}, ${d.borough}`
    );
    d3.select('.circleToolTip .avg').text(
      (elem) => `Overall: ${d.overall}/100`
    );
    tooltip
      .style('top', top + 'px')
      .style('left', left + 'px')
      .style('opacity', 1)
      .style('display', 'block');
  };

  function removeCircleToolTip() {
    let tooltipBar = d3.select('.circleToolTip');
    let tooltip = d3.select('.circleToolTip');
    tooltip.style('opacity', 0);
    tooltipBar.style('opacity', 0).style('display', 'none');
  }

  function rectToolTip(e, d) {
    console.log('this is rectToolTip e,d', e, d);
    let top = e.pageY - 80;
    let left = e.layerX + 200;
    let tooltip = d3.select('.rectToolTip');
    d3.select('.title').text(d.key);
    d3.select('.avg')
      .text(`Avg. Overall Rating: ${Math.floor(d.value.avg)}/100`);
    tooltip
      .style('top', top + 20 + 'px')
      .style('left', left + 'px')
      .style('opacity', 1)
      .style('display', 'block');
  }

  function removeRectToolTip() {
    let tooltip = d3.select('.rectToolTip');
    tooltip.style('opacity', 0).style('display', 'none');
  }

  const renderChart = (data) => {
    console.log('BarChart - renderChart - data', data);
    let gBottom = d3.select(svgRef.current);
    yScale.domain(data.map((d, i) => i));
    yScale.range([0, data.length]);

    let neighborhoods = gBottom
      .selectAll('svg.neighborhood')
      .data(data, (d) => d.key);

    const neighborhood = neighborhoods
      .enter()
      .append('svg')
      .attr('height', '28.84px')
      .classed('neighborhood', true)
      .attr('id', (d) => {
        return d.value.NTA;
      })
      .attr('transform', (d, i) => `translate(0,${yScale(i)})`)
      .attr('opacity', 0);

    neighborhood
      .transition()
      .duration(1000)
      .attr('transform', (d, i) => `translate(0,${yScale(i)})`)
      .attr('opacity', 1);

    // LABEL TEXT
    neighborhood
      .append('text')
      .text((d) => d.key)
      .attr('dy', '1.2em')
      .attr('class', (d) => {
        return `barText ${d.key}`;
      })
      .attr('fill', (d) => d.value.parks[0].boroughColor);

    // BARS
    neighborhood
      .append('rect')
      .attr('x', 200)
      .attr('width', (d) => xScale(d.value.avg))
      // .attr("height", yScale.bandwidth())
      .attr('height', '28.84px')
      .style('fill', '#d4d1d1')
      .attr('class', (d) => `${d.key}`)
      .on('mousemove', (e, d) => rectToolTip(e, d))
      .on('mouseout', (e, d) => removeRectToolTip(e, d));

    // CIRCLES
    neighborhood
      .selectAll('circle')
      .data((d) => d.value.parks)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(+d.overall) + 200)
      .attr('cy', (d, i) => {
        let mid = yScale.bandwidth() / 2 + 15;
        return mid;
      })
      .attr('r', 7)
      .attr('fill', (d) => d.color)
      .attr('stroke', 'black')
      .attr('class', (d, i) => `rect-circle parks park${d.id}`)
      .on('mouseover', (e, d) => circleToolTip(e, d))
      .on('mouseout', (e, d) => removeCircleToolTip(d));

    // UPDATE
    if (data.length === 1) {
      neighborhoods.attr('transform', (d, i) => `translate(0,${yScale(i)})`);
    } else {
      neighborhoods
        .transition()
        .duration(1000)
        .attr('transform', (d, i) => `translate(0,${yScale(i)})`);
    }

    // EXIT
    neighborhoods.exit().remove();

    d3.selectAll('svg.neighborhood').on('click', (e, d) => {
      console.log('svg.neighborhood - click - e,d', e.target, d);
      props.dispatch({
        type: 'FILTER_ACTIVE_NEIGHBORHOOD',
        payload: { neighborhood: d }
      });
      d3.selectAll('svg.neighborhood').style('background', 'none');
      d3.select(e.target.parentNode).style('background', 'beige');
      d3.select('#chart > div').style('background', 'none');
    });
  };

  const svgStyles = {
    height: `${height}px`
  };

  return (
    <>
      <div id="axis">
        <svg style={{ height: '20px', width: '100%' }}>
          <g ref={xAxisRef} style={{ fontSize: '14px' }}></g>
        </svg>
      </div>
      <div id="chart">
        <div style={svgStyles} ref={svgRef}></div>
      </div>
    </>
  );
};

export default BarChart;
