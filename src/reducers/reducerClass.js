import * as d3 from 'd3';
import { nest } from 'd3-collection';

class ParkReducer {
	constructor(state) {
		this.state = state;
	}

	// 'INITIAL_API_CALL'
	initializeDashboard(initialData) {
		this.state.activePark = this.sortParksByRating(initialData)[0];
		this.state.activeParks = initialData;
		this.state.allNestedData = this.formatNestedData(initialData);
		this.state.allParks = initialData;
		this.state.nestedData = this.state.allNestedData;
		this.state.parksBasedOnActiveFilterRating =
			this.sortParksByName(initialData);

		return { ...this.state };
	}
	// 'FILTER_ACTIVE_RATING_OR_BOROUGH'
	filterDashboardByActiveRatingOrBorough(payload) {
		this.setRatingAndBorough(payload);
		this.state.activeParks = this.filterParksByRatingAndBorough();
		this.state.parksBasedOnActiveFilterRating = this.state.activeParks;
		this.state.nestedData = this.filterNeighborhoodsByRatingOrBorough(
			this.state.activeParks
		);

		return { ...this.state };
	}
	// 'FILTER_ACTIVE_PARK'
	filterDashboardByActivePark(item) {
		console.log('filterDashboardBySelectedPark - item', item);
		this.state.activePark = item;
		this.state.activeParks = this.state.allParks.filter(
			(d) => d.name === item.name
		);

		this.nestedData = this.state.allNestedData.filter((d) =>
			d.value.parks.includes(item.name)
		);

		this.parksBasedOnActiveFilterRating = this.setSelectedParkToActive();
		this.parksBasedOnActiveFilterRating.sort((a, b) =>
			a.name > b.name ? 1 : -1
		);
		this.state.activeBorough = item.borough;
		this.state.activeNeighborhood = '';

		return {
			...this.state,
		};
	}
	// 'CLEAR_INPUT_FIELD_ACTIVATED'
	filterDashboardByActiveNeighborhood(payload) {
		console.log(
			'filterParksByNeighborhood',
			this.neighborhood,
			payload.neighborhood
		);
		this.state.neighborhood = this.filterParksByNeighborhood(
			payload.neighborhood.key
		);

		this.state.activeParks = this.state.neighborhood[0].value.parks;
		this.state.parksBasedOnActiveFilterRating = this.state.activeParks;
		this.state.activeBorough = payload.neighborhood.value.borough;
		this.state.activeNeighborhood = payload.neighborhood.key;
		this.state.activeRating = '';

		return { ...this.state };
	}

	// SUPPORTING FILTER METHODS
	filterParksByNeighborhood = (filter) => {
		console.log(
			'neighborhood',
			this.state.allNestedData,
			this.state.nestedData,
			filter
		);
		const neighborhood = this.state.nestedData.filter((d) => d.key === filter);
		return neighborhood;
	};

	filterNeighborhoodsByRatingOrBorough(activeParks) {
		let activeNeighborhoods = Array.from(
			new Set(this.state.activeParks.map((d) => d.neighborhood))
		);
		// console.log('neighborhood', this.activeParks, this.allNestedData, this.nestedData, this.state);
		return this.state.allNestedData.filter((d) =>
			activeNeighborhoods.includes(d.key)
		);
	}

	filterParksByRatingAndBorough() {
		return this.state.allParks
			.filter((d) => this.filterParksByRating(d, this.state.activeRating))
			.filter((d) => this.filterParksByBorough(d, this.state.activeBorough));
	}

	filterParksByRating(park, filter) {
		return filter === '' ? park : park.rating === filter;
	}

	filterParksByBorough(park, filter) {
		return filter === 'all' ? park : park.borough === filter;
	}

	resetDashboard() {
		this.parksBasedOnActiveFilterRating = this.state.allParks.map((d) => {
			d.active = false;
			return d;
		});

		return {
			...this.state,
			nestedData: this.state.allNestedData,
			parksBasedOnActiveFilterRating: this.parksBasedOnActiveFilterRating,
			activeParks: this.state.allParks,
			activePark: this.sortParksByRating(
				this.parksBasedOnActiveFilterRating
			)[0],
			activeRating: '',
			activeBorough: 'all',
			activeNeighborhood: '',
			reset: false,
		};
	}

	setRatingAndBorough(payload) {
		this.state.activeRating = payload.rating || this.state.activeRating;
		this.state.activeBorough = payload.borough || this.state.activeBorough;
	}

	setSelectedParkToActive() {
		return (this.parksBasedOnActiveFilterRating =
			this.state.parksBasedOnActiveFilterRating.map((d) => {
				d.active = d.name === this.state.activePark.name ? true : false;
				return d;
			}));
	}

	formatNestedData = (data) => {
		// l in .rollup(l) is the nested array returned by .key()
		return nest()
			.key((d) => d.neighborhood)
			.rollup((l) => ({
				parks: l,
				avg: d3.mean(l, (d) => d.overall),
				borough: l[0].borough,
				code: l[0]['code'],
				ratings: l.map((d) => d.rating),
			}))
			.entries(data);
	};

	// SUPPORTING SORTING METHODS
	sortParksByRating = (parksArray) =>
		parksArray.sort((a, b) => d3.descending(+a.overall, +b.overall));

	sortParksByName = (parksArray) =>
		parksArray.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export default ParkReducer;

// this.activeBorough = state.activeBorough;
// this.activeNeighborhood = state.activeNeighborhood;
// this.activePark = state.activePark;
// this.activeParks = state.activeParks;
// this.activeRating = state.activeRating;
// this.allNestedData = state.allNestedData;
// this.allParks = state.allParks;
// // this.park = state.park;
// this.parksBasedOnActiveFilterRating = state.parksBasedOnActiveFilterRating;
// this.neighborhood = state.neighborhood;
// this.nestedData = state.nestedData;
// this.reset = state.reset;

// return {
// 	...this.state,
// 	// activeBorough: this.activeBorough,
// 	// activePark: this.activePark,
// 	// activeParks: this.activeParks,
// 	// activeNeighborhood: this.activeNeighborhood,
// 	// activeRating: this.activeRating,
// 	// parksBasedOnActiveFilterRating: this.parksBasedOnActiveFilterRating,
// 	// nestedData: this.nestedData,
// 	//
// 	// allNestedData: this.allNestedData,
// 	// allParks: this.allParks,
// 	// park: this.park,
// 	// neighborhood: this.neighborhood,
// 	// reset: this.reset,
// };
