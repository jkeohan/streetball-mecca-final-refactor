import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import * as d3 from 'd3'
import { formatNestedData } from '../../services/format/formatters'

let margin = { top: 20, left: 25 };

// let yScale = d3.scaleBand().padding(0.1)

// let xScale = d3.scaleLinear().domain([0, 100]).range([0,1100 - margin.left]);


// let xAxis = g => g.attr("transform", "translate(200,0)")
//     .call(d3.axisBottom(xScale)).call(g => { g.select(".domain").remove()});

const BarChart = (props) => {
  console.log('BarChart - props', props)
  const [data, setData] = useState([])
  const [height, setHeight] = useState('')
  const svgRef = useRef();
  const gRef = useRef()
  const xAxisRef = useRef()
  const svgHeight = useRef();

  let yScale = d3.scaleBand().padding(0.1)

let xScale = d3.scaleLinear().domain([0, 100]).range([0,1100 - margin.left]);


let xAxis = g => g.attr("transform", "translate(200,0)")
    .call(d3.axisBottom(xScale)).call(g => { g.select(".domain").remove()});

  useEffect(() => {
      d3.select(xAxisRef.current).style('font-size', 14).call(xAxis)
  },[])

  useEffect(() => {
    // if(props.nestedData.length) {
      renderChart(props.nestedData)
      setHeight((props.nestedData.length * 28.75) )
    // }
  },[props.nestedData])

  if(!props.activeNeighborhood) {
    d3.selectAll('svg.neighborhood').style('background','none')
  }

  const circleToolTip = (e,d) => {
    console.log('this is circleToolTip e,d: ', e,d)
     let top = e.pageY - 80
     let left = e.pageX + 10;
    //  let top = e.layerY;
    //  let left = e.layerX + 10;
     let tooltip = d3.select('.circleToolTip')
    console.log('circleToolTip - tooltip', tooltip)
     let title = d3.select('.circleToolTip .title').text(d.name)
     let neighborhood = d3.select('.circleToolTip .neighborhood').text(`${d.neighborhood}, ${d.borough}`)
     let avg = d3.select('.circleToolTip .avg').text(elem => `Overall: ${d.overall}/100`)
     tooltip
       .style('top', (top) + 'px')
       .style('left', left + 'px')
       .style('opacity',1)
       .style('display','block')
   }

   function removeCircleToolTip() {
    let tooltipBar = d3.select('.circleToolTip')
    let tooltip = d3.select('.circleToolTip')
    tooltip.style('opacity',0)
    tooltipBar.style('opacity',0).style('display','none')
  }

  function rectToolTip(e,d) {
    console.log('this is rectToolTip e,d', e,d)
    let top = e.pageY - 80
    let left = e.layerX + 200
    // let top = event.offsetY;
    // let left = event.offsetX;
    let tooltip = d3.select('.rectToolTip')
    let title = d3.select('.title').text(d.key)
    let avg = d3.select('.avg').text(`Avg. Overall Rating: ${Math.floor(d.value.avg)}/100`)
    tooltip
      .style('top', (top + 20) + 'px')
      .style('left', left + 'px')
      .style('opacity',1)
      .style('display','block')
  }


   function removeRectToolTip() {
    let tooltip = d3.select('.rectToolTip')
    tooltip.style('opacity',0)
    .style('display','none')
  }
 

  const renderChart = (data) => {
    console.log('BarChart - renderChart - data', data)
      let gBottom = d3.select(svgRef.current)
      // let gBottom = d3.select(gRef.current)
      yScale.domain(data.map((d, i) => i))
      yScale.range([0, data.length])

      // yScale.range([0, data.length * 38.75 ])

      data.sort( (a,b) => { return d3.descending(+a.value.avg, +b.value.avg)})

      let neighborhoods = gBottom.selectAll('svg.neighborhood').data(data, d => d.key)
      // let neighborhoods = gBottom.selectAll('g.neighborhood').data(data, d => d.key)

      const neighborhood = neighborhoods.enter()
        .append('svg').attr("height", '28.84px').classed('neighborhood', true)
        .attr('id', d  => { return d.value.NTA})
        .attr('transform', (d,i) => `translate(0,${yScale(i)})`)
        .attr('opacity',0)
     
      neighborhood.transition().duration(1000)
        .attr('transform', (d,i) => `translate(0,${yScale(i)})`)
        .attr('opacity',1)
       
       // LABEL TEXT
      neighborhood.append('text').text(d => d.key)
        .attr("dy", "1.2em")
        .attr('class', d => { return `barText ${d.key}`})
        .attr('fill', d => d.value.parks[0].boroughColor)
     
        // BARS
      neighborhood.append('rect')
        .attr("x", 200)
        .attr("width", d => xScale(d.value.avg))
        // .attr("height", yScale.bandwidth())
        .attr("height", '28.84px')
        .style("fill", "#d4d1d1")
        .attr('class', d => `${d.key}`)
        .on('mousemove', (e,d) => rectToolTip(e,d))
        .on('mouseout', (e,d) => removeRectToolTip(e,d))

       // CIRCLES
      neighborhood.selectAll('circle').data(d => d.value.parks)
        .enter().append('circle')
        .attr("cx", d => xScale(+d.overall) + 200)
        .attr("cy", (d, i) => {
          let mid = (yScale.bandwidth() / 2 + 15) 
          // let mid = (yScale.bandwidth() / 2) - 2.5;
          return mid;
        })
        .attr("r", 7)
        .attr('fill', d =>  d.color)
        // .attr('fill', d =>  legend(d['Overall court grouping']))
        .attr('stroke','black')
        .attr('class', (d,i) => `rect-circle parks park${d.id}`)
        // .on("click", filterPark)
        .on('mouseover', (e,d) => circleToolTip(e,d))
        .on('mouseout', (e,d) => removeCircleToolTip(d))

        // UPDATE
          if(data.length === 1) {
            neighborhoods.attr('transform', (d,i) => `translate(0,${yScale(i)})` )
          } else {
            neighborhoods.transition().duration(1000)
              .attr('transform', (d,i) => `translate(0,${yScale(i)})` )
          }
        // EXIT
      neighborhoods.exit().remove()

         d3.selectAll('svg.neighborhood').on('click', (e,d) => {
         console.log('svg.neighborhood - click - e,d', e.target,d)
         props.dispatch( {type: 'FILTER_ACTIVE_NEIGHBORHOOD', payload: {neighborhood: d} })
         d3.selectAll('svg.neighborhood').style('background','none')
         d3.select(e.target.parentNode).style('background','beige')
         d3.select('#chart > div').style('background','none')
     
        })
  }

  const svgStyles = {
    height: `${height}px`
  }
  // console.log('BarChart - svgStyles', svgStyles, svgHeight.current)
  const gStyles = {
    transform: "translate(10,0)"
  }

  return (
    <>
    <div id="axis">
      <svg style={{height: '20px', width: '100%'}}>
          <g ref={xAxisRef} style={{fontSize: '14px'}}></g>
      </svg>
    </div>
    <div id="chart">
      <div style={svgStyles} ref={svgRef}>
        {/* <g style={gStyles} ref={gRef} className='bottom'></g> */}
      </div>
    </div>
    </>
    )
}

export default BarChart

// let margin = { top: 20, left: 10 };
// let barChartContainer = d3.select('#chart').node()
// let mainWidth = barChartContainer.clientWidth



// let xAxis = g =>
//   g.attr("transform", "translate(210,0)")
//     .call(d3.axisBottom(xScale))
//     .call(g => {
//       g.select(".domain").remove();
//     });

// let svg = d3.select("#chart").append("svg");
// let gBottom = svg.append("g").attr("transform", "translate(10,0)").attr('class','bottom')

// let svgAxis = d3.select('#axis').append('svg')
//   .attr('width', '100%').attr('height', 20)
// svgAxis.append('g').style('font-size', 14).call(xAxis)

// function renderBarChart(data) {

// //console.log('this is data from renderBarChart', data)

// yScale.domain(allData.map((d, i) => i))

// let height = data.length * 33
// svg.style('height', `${height}px`)

// data.sort( (a,b) => { return d3.descending(+a.value.avg, +b.value.avg)})
// let neighborhoods = gBottom.selectAll('g .neighborhood').data(data, d => d.key)

// let neighborhood = neighborhoods
// .enter().append('g').classed('neighborhood', true)
//   .attr('id', d  => { return d.value.NTA})
//   .attr('transform', (d,i) => `translate(0,${yScale(i)})`)

// neighborhood.append('text')
//   .text(d => d.key)
//   .attr("dy", "1em")
//   .attr('class', d => { return `barText ${d.key}`})

// neighborhood.append('rect')
//   .attr("x", 200)
//   .attr("width", d => xScale(d.value.avg))
//   .attr("height", yScale.bandwidth())
//   .style("fill", "ccc")
//   .attr('class', d => `${d.key}`)
//   .on('mousemove', d => rectToolTip(d))
//   .on('mouseout', removeRectToolTip)

// neighborhood.selectAll('circle').data(d => d.value.parks)
//   .enter().append('circle')
//   .attr("cx", d => xScale(+d.Overall) + 200)
//   .attr("cy", (d, i) => {
//     let mid = yScale.bandwidth() / 2;
//     return mid;
//   })
//   .attr("r", 5)
//   .attr('fill', d =>  legend(d['Overall court grouping']))
//   .attr('stroke','black')
//   .attr('class', (d,i) => `rect-circle parks park${d.id}`)
//   .on("click", filterPark)
//   .on('mouseover', circleToolTip)
//   .on('mouseout', removeCircleToolTip)

// // UPDATE
// neighborhoods
//   //.transition().duration(1000)
//   .attr('transform', (d,i) => `translate(0,${yScale(i)})`)

// // EXIT
// neighborhoods.exit().remove()
// }
