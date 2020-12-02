import { circleLegend } from '../legend';
import * as d3 from 'd3';
import { nest } from 'd3-collection';

const formatData = (data) => {
  // MIGHT NEED TO CREATE AN ARRAY WITH SINGLE INSTANCE BOROUGH NAMES
  // const boroughs = data.reduce( (acc,d) => {
  //   if(!acc.includes(d.gsx$borough.$t)) {
  //     acc.push(d.gsx$borough.$t)
  //   }
  //   return acc
  // },[])

  const boroughColors = {
    Brooklyn: '#306A9C',
    Manhattan: '#6DB099',
    Bronx: '#F78154',
    Queens: '#EAC435',
    'Staten Island': '#CD7998'
  };

  console.log('formatData - data[0]', data[0]);
  return data.map((d, i) => {
    return {
      code: d.gsx$ntacode.$t,
      name: d.gsx$name.$t,
      borough: d.gsx$borough.$t,
      boroughColor: boroughColors[d.gsx$borough.$t],
      overall: d.gsx$overall.$t,
      url: d.gsx$url.$t,
      lon: d.gsx$lon.$t,
      lat: d.gsx$lat.$t,
      rating: d.gsx$overallcourtgrouping.$t,
      neighborhood: d.gsx$neighborhood.$t,
      id: i,
      color: circleLegend(d.gsx$overallcourtgrouping.$t),
      active: false
    };
  });
};

const formatNestedData = (data) => {
  return nest()
    .key((d) => d.neighborhood)
    .rollup((l) => ({
      parks: l,
      avg: d3.mean(l, (d) => d.overall),
      borough: l[0].borough,
      code: l[0]['code']
    }))
    .entries(data)
};

// ORIGINAL FORMATNESTEDDATA FUNCTION
// const formatNestedData = (data) => {
//   // console.log('(f):nestingData - data', data)
//   let nested = nest()
//     .key( d => d.neighborhood)
//    .rollup( l => ({
//      'parks': l,
//      'total': d3.sum(l, d =>  d.overall),
//      'avg': d3.mean(l, d =>  d.overall),
//      'borough': l[0].borough,
//      'neighborhood' : l[0].neighborhood,
//      'NTA': l[0]['NTA Code']
//    })).entries(data)
//   console.log('this is nested', nested)
//   return nested
// }

export { formatData, formatNestedData };
