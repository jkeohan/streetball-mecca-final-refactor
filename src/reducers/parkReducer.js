import { formatNestedData } from '../services/format/formatters';
import { colorLegendForParkText } from '../services/legend';
import {
	sortTopParks,
	filterParksByNeighborhood,
} from '../helpers';

const parkReducer = (state, action) => {
	let allParks,
		parksBasedOnActiveFilterRating,
		activeParks,
		park,
		allNestedData,
		nestedData,
		neighborhood;

	switch (action.type) {
		case 'INITIAL_API_CALL':
			return setInitialState();

		case 'FILTER_ACTIVE_RATING_OR_BOROUGH':
			return filterDashboardBySelectedRatingOrBorough();

		case 'FILTER_ACTIVE_PARK':
			return filterDashboardBySelectedPark();

		case 'FILTER_ACTIVE_NEIGHBORHOOD':
			return filterDashboardBySelectedNeighborhood();

		case 'RESET':
			return resetDashboard();

		default:
			return state;
	}

	function setInitialState() {
		allParks = setParkTextColorToBoroughColor();
		parksBasedOnActiveFilterRating = allParks;
		allNestedData = formatNestedData(action.payload.data);

		return {
			...state,
			allNestedData,
			nestedData: allNestedData,
			allParks,
			parksBasedOnActiveFilterRating,
			activeParks: allParks,
			activePark: sortTopParks(parksBasedOnActiveFilterRating)[0],
		};
	}

	function setParkTextColorToBoroughColor() {
		return action.payload.data.map((d) => {
			d.boroughColor = colorLegendForParkText(d.borough);
			return d;
		});
	}

	function filterDashboardBySelectedNeighborhood() {
		neighborhood = filterParksByNeighborhood(
			state.nestedData,
			action.payload.neighborhood.key
		);
		activeParks = neighborhood[0].value.parks;
		console.log(
			'filterDashboardBySelectedNeighborhood - neighborhood',
			neighborhood
		);
		return {
			...state,
			activeParks,
			parksBasedOnActiveFilterRating: activeParks,
			activeBorough: action.payload.neighborhood.value.borough,
			activeNeighborhood: action.payload.neighborhood.key,
		};
	}

	function filterDashboardBySelectedPark() {
		park = action.payload.park;
		activeParks = state.allParks.filter((d) => d.name === park.name);

		nestedData = state.allNestedData.filter((d) =>
			d.value.parks.includes(park)
		);

		parksBasedOnActiveFilterRating = setSelectedParkToActive();

		return {
			...state,
			nestedData,
			parksBasedOnActiveFilterRating,
			activeParks,
			activePark: park,
			activeBorough: park.borough,
			activeNeighborhood: '',
		};
	}

	function filterDashboardBySelectedRatingOrBorough() {
		const { rating, borough } = setRatingAndBorough();
		activeParks = filterParksByRatingAndBorough();
		parksBasedOnActiveFilterRating = activeParks;
		nestedData = filterNeighborhoodsByRatingOrBorough(activeParks);

		return {
			...state,
			nestedData,
			activeParks,
			parksBasedOnActiveFilterRating,
			activeRating: rating,
			activeBorough: borough,
			activeNeighborhood: '',
		};
	}

	function filterNeighborhoodsByRatingOrBorough(activeParks) {
		let activeNeighborhoods = Array.from(
			new Set(activeParks.map((d) => d.neighborhood))
		);

		return state.allNestedData.filter((d) =>
			activeNeighborhoods.includes(d.key)
		);
	}

	function filterParksByRatingAndBorough() {
		const { rating, borough } = setRatingAndBorough();

		return state.allParks
			.filter((d) => filterParksByRating(d, rating))
			.filter((d) => filterParksByBorough(d, borough));
	}

	function filterParksByRating(park, filter) {
		return filter === '' ? park : park.rating === filter;
	}

	function filterParksByBorough(park, filter) {
		return filter === 'all' ? park : park.borough === filter;
	}

	function setRatingAndBorough() {
		return {
			rating: action.payload.rating || state.activeRating,
			borough: action.payload.borough || state.activeBorough,
		};
	}

	function setSelectedParkToActive() {
		return (parksBasedOnActiveFilterRating = state.parksBasedOnActiveFilterRating.map(
			(d) => {
				if (d.name === park.name) {
					console.log('FILTER_ACTIVE_PARK - d', d, d.name, park.name);
				}
				if (d.name === park.name) {
					d.active = true;
				} else {
					d.active = false;
				}
				return d;
			}
		));
	}

	function resetDashboard() {
		parksBasedOnActiveFilterRating = state.allParks.map((d) => {
			d.active = false;
			return d;
		});

		return {
			...state,
			nestedData: state.allNestedData,
			parksBasedOnActiveFilterRating,
			activeParks: state.allParks,
			activePark: sortTopParks(parksBasedOnActiveFilterRating)[0],
			activeRating: '',
			activeBorough: 'all',
			activeNeighborhood: '',
			reset: false,
		};
	}
};

export default parkReducer;
