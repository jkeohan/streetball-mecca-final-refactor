import * as d3 from 'd3';

export const circleLegend = d3
  .scaleOrdinal()
  .domain(['Very Good', 'Mediocre', 'Poor'])
  .range(['rgba(23,126,137,1)', 'rgba(255,190,122,1)', 'rgba(219,84,97,1)']);

export const boroughLegend = d3
  .scaleOrdinal()
  .domain('Brooklyn', 'Manhattan', 'Bronx', 'Queens', 'Staten Island')
  .range([
    'rgba(48,106,156,.2)',
    'rgba(109,176,153,.3)',
    'rgba(247,129,84,.3)',
    'rgba(234,156,53,.3)',
    'rgba(205,125,151,.4)'
  ]);

//https://coolors.co/e9d985-177e89-598381-846a6a-db5461
