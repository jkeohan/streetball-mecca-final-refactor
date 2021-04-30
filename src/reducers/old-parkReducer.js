import { formatNestedData } from '../services/format/formatters';
import {
	sortTopParks,
	filterParkByRating,
	filterParksByName,
	// filterParksByBorough,
	filterParksByNeighborhood,
	filterNeighborHoodsByRating,
} from '../helpers';

const parkReducer = (state, action) => {
	let topParks,
		parksBasedOnActiveFilterRating,
		activeParks,
		park,
		borough,
		allNestedData,
		nestedData,
		neighborhood;

	switch (action.type) {
		case 'INITIAL_API_CALL':
			// const data = formatData(action.payload.data)
			parksBasedOnActiveFilterRating = action.payload.data.filter((d) =>
				filterParksByRating(d, 'Very Good')
			);
			allNestedData = formatNestedData(action.payload.data);
			// console.log('INITIAL_API_CALL - topParks', topParks);
			return {
				...state,
				allNestedData,
				nestedData: allNestedData,
				allParks: action.payload.data,
				parksBasedOnActiveFilterRating,
				activeParks: action.payload.data,
				activePark: sortTopParks(parksBasedOnActiveFilterRating)[0],
			};

		case 'FILTER_ACTIVE_RATING':
			return filterDashboardByUserSelectedRating();

		case 'FILTER_ACTIVE_PARK':
			park = action.payload.park;
			// topParks = state.topParks.map((d) => filterParksByName(d, park.name));
			activeParks = state.allParks.filter((d) => d.name === park.name);
			console.log('FILTER_ACTIVE_PARK - park', park);
			nestedData = state.allNestedData.filter((d) =>
				d.value.parks.includes(park)
			);

			return {
				...state,
				nestedData,
				// topParks,
				activeParks,
				activePark: park,
				activeBorough: park.borough,
				activeNeighborhood: '',
			};

		case 'FILTER_ACTIVE_BOROUGH':
			return filterDashboardByUserSelectedBorough();

		case 'FILTER_ACTIVE_NEIGHBORHOOD':
			neighborhood = filterParksByNeighborhood(
				state.nestedData,
				action.payload.neighborhood.key
			);

			return {
				...state,
				activeParks: neighborhood[0].value.parks,
				activeBorough: action.payload.neighborhood.value.borough,
				activeNeighborhood: action.payload.neighborhood.key,
			};

		case 'RESET':
			parksBasedOnActiveFilterRating = state.allParks;
			// topParks = sortTopParks(state.allParks);

			return {
				...state,
				nestedData: state.allNestedData,
				// topParks,
				activeParks: state.allParks,
				activePark: sortTopParks(parksBasedOnActiveFilterRating)[0],
				activeRating: '',
				activeBorough: 'all',
				activeNeighborhood: '',
				reset: false,
			};
		default:
			return state;
	}

	function filterDashboardByUserSelectedRating() {
		activeParks = filterParksByRatingAndBorough();
		parksBasedOnActiveFilterRating = activeParks;
		nestedData = filterParksByAllBoroughs();

		return {
			...state,
			nestedData,
			activeParks,
			parksBasedOnActiveFilterRating,
			activeRating: action.payload.rating,
			activeNeighborhood: '',
		};
	}

	function filterDashboardByUserSelectedBorough() {
		activeParks = filterParksByRatingAndBorough();
		parksBasedOnActiveFilterRating = activeParks;
		nestedData = filterParksByAllBoroughs();

		return {
			...state,
			nestedData,
			activeParks,
			parksBasedOnActiveFilterRating,
			activeBorough: action.payload.borough,
			activeNeighborhood: '',
		};
	}

	function filterParksByRatingAndBorough() {
		const rating = action.payload.rating || state.activeRating;
		const borough = action.payload.borough || state.activeBorough;

		const filteredParks = state.allParks
			.filter((d) => filterParkByRating(d, rating))
			.filter((d) => filterParksByBorough(d, borough));
		console.log('filterParksByRatingAndBorough', filteredParks);
		return filteredParks;
	}

	function filterParkByRating(park, filter) {
		return filter === '' ? park : park.rating === filter;
	}

	function filterParksByBorough(park, filter) {
		return filter === 'all' ? park : park.borough == filter;
	}

	function filterParksByAllBoroughs() {
		nestedData = filterNeighborHoodsByRating(
			state.allNestedData,
			action.payload.rating,
			state.activeBorough
		);

		return {
			nestedData,
		};
	}

	function filterParksByRating(rating) {
		activeParks = state.allParks.filter((d) => filterParkByRating(d, rating));
		return sortTopParks(activeParks);
	}
};

export default parkReducer;

// borough = action.payload.borough;
// nestedData = filterNeighborHoodsByRating(
// 	state.allNestedData,
// 	state.activeRating,
// 	borough
// );
// if (borough !== 'all') {
// 	activeParks = state.allParks
// 		.filter((park) => filterParksByBorough(park, borough))
// 		.filter((d) => filterParksByRating(d, state.activeRating));
// 	topParks = sortTopParks(activeParks); //.map(resetParkFilter);
// } else {
// 	activeParks = state.allParks.filter((d) =>
// 		filterParksByRating(d, state.activeRating)
// 	);
// 	topParks = sortTopParks(activeParks); //.map(resetParkFilter);
// }

// return {
// 	...state,
// 	nestedData,
// 	topParks,
// 	activeParks,
// 	activeBorough: borough,
// 	activeNeighborhood: '',
// };
