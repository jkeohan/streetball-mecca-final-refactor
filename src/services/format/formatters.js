import { circleLegend, colorLegendForParkText } from '../legend';

const formatAPIData = (data) => {

  return data.map((d, i) => {
    console.log(
			'formatAPIData',
			colorLegendForParkText(d.gsx$borough.$t),
			d.gsx$borough.$t
		);
    return {
			code: d.gsx$ntacode.$t,
			name: d.gsx$name.$t,
			borough: d.gsx$borough.$t,
			// no color is being applied here
			boroughColor: colorLegendForParkText(d.gsx$borough.$t),
			style: {color: colorLegendForParkText(d.gsx$borough.$t)},
			overall: d.gsx$overall.$t,
			url: d.gsx$url.$t,
			lon: d.gsx$lon.$t,
			lat: d.gsx$lat.$t,
			rating: d.gsx$overallcourtgrouping.$t,
			neighborhood: d.gsx$neighborhood.$t,
			id: i,
			color: circleLegend(d.gsx$overallcourtgrouping.$t),
			active: false,
		};
  });
};


export { formatAPIData };
