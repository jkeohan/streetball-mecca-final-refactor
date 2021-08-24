import { circleLegend, colorLegendForParkText } from '../legend';


const formatAPIData = (data) => {
	return data.slice(1).map((d, i) => {
		// console.log(
		// 		'formatAPIData',
		// 		colorLegendForParkText(d.gsx$borough.$t),
		// 		d.gsx$borough.$t
		// 	);
		console.log(
				'formatAPIData',
				d[14]
			);

		return {
			code: d[9],
			name: d[10],
			borough: d[16],
			// no color is being applied here
			boroughColor: colorLegendForParkText(d[16]),
			style: { color: colorLegendForParkText(d[16]) },
			overall: d[14],
			url: d[21],
			lon: d[8],
			lat: d[6],
			rating: d[2],
			neighborhood: d[11],
			id: i,
			color: circleLegend(d[2]),
			active: false,
		};
	});
};


// const formatAPIData = (data) => {

//   return data.map((d, i) => {
//     // console.log(
// 	// 		'formatAPIData',
// 	// 		colorLegendForParkText(d.gsx$borough.$t),
// 	// 		d.gsx$borough.$t
// 	// 	);
//     return {
// 			code: d.gsx$ntacode.$t,
// 			name: d.gsx$name.$t,
// 			borough: d.gsx$borough.$t,
// 			// no color is being applied here
// 			boroughColor: colorLegendForParkText(d.gsx$borough.$t),
// 			style: {color: colorLegendForParkText(d.gsx$borough.$t)},
// 			overall: d.gsx$overall.$t,
// 			url: d.gsx$url.$t,
// 			lon: d.gsx$lon.$t,
// 			lat: d.gsx$lat.$t,
// 			rating: d.gsx$overallcourtgrouping.$t,
// 			neighborhood: d.gsx$neighborhood.$t,
// 			id: i,
// 			color: circleLegend(d.gsx$overallcourtgrouping.$t),
// 			active: false,
// 		};
//   });
// };


export { formatAPIData };
