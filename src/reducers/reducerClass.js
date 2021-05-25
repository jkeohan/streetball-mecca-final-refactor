import * as d3 from 'd3';
import { nest } from 'd3-collection';

class ParkReducer {
	constructor(state) {
		this.state = state;
		this.activePark = state.activePark;
		this.activeParks = state.activeParks;
		this.allNestedData = state.allNestedData;
		this.activeBorough = state.activeBorough;
		this.activeNeighborhood = state.activeNeighborhood;
		this.activeRating = state.activeRating;
		this.allParks = state.allParks;
		this.parksBasedOnActiveFilterRating = state.parksBasedOnActiveFilterRating;
		this.neighborhood = state.neighborhood;
		this.nestedData = state.nestedData;
		this.reset = state.reset;
	}
	// 'INITIAL_API_CALL'
	initializeDashboard(initialData) {
		this.nestedData = this.formatNestedData(initialData);
		this.activePark = this.sortParksByRating(initialData)[0];
		this.activeParks = initialData;
		this.allNestedData = this.formatNestedData(initialData);
		this.allParks = initialData;
		this.parksBasedOnActiveFilterRating = this.sortParksByName(initialData);
		
		return this.updatedState();
	}
	// 'FILTER_ACTIVE_RATING_OR_BOROUGH'
	filterDashboardByActiveRatingOrBorough(payload) {
		this.setRatingAndBorough(payload);
		this.activeParks = this.filterParksByRatingAndBorough();
		this.parksBasedOnActiveFilterRating = this.activeParks;
		this.nestedData = this.filterNeighborhoodsByRatingOrBorough(
			this.activeParks
		);
		return this.updatedState();
	}
	// 'FILTER_ACTIVE_PARK'
	filterDashboardByActivePark(item) {
		this.activePark = item;
		this.activeParks = this.allParks.filter((d) => d.name === item.name);

		this.nestedData = this.allNestedData.filter((d) => {
			return d.value.parks.includes(item);
		});

		this.parksBasedOnActiveFilterRating = this.setSelectedParkToActive();
		this.parksBasedOnActiveFilterRating.sort((a, b) =>
			a.name > b.name ? 1 : -1
		);
		this.activeBorough = item.borough;
		this.activeNeighborhood = '';
		return this.updatedState();
	}
	// 'FILTER_ACTIVE_PARK'
	filterDashboardByInput(item) {
		// console.log('filterDashboardBySelectedPark - item', item);
		this.activePark = item;
		this.activeParks = this.allParks.filter((d) => d.name === item.name);

		this.nestedData = this.allNestedData.filter((d) => {
			console.log(d.value.parks.includes(item.name), item.name, d.value.parks);
			return d.value.parks.includes(item);
		});

		this.parksBasedOnActiveFilterRating = this.nestedData[0].value.parks;
		this.parksBasedOnActiveFilterRating = this.setSelectedParkToActive();
		this.parksBasedOnActiveFilterRating.sort((a, b) =>
			a.name > b.name ? 1 : -1
		);

		this.activeBorough = item.borough;
		this.activeNeighborhood = item.neighborhood;
		// console.log('filterDashboardByActivePark', this.updatedState());
		return this.updatedState();
	}
	// 'CLEAR_INPUT_FIELD_ACTIVATED'
	filterDashboardByActiveNeighborhood(payload) {
		this.activeNeighborhood = payload.neighborhood.key;
		this.neighborhood = this.filterParksByNeighborhood();
		this.activeParks = this.neighborhood[0].value.parks;
		this.parksBasedOnActiveFilterRating = this.activeParks;
		this.activeBorough = payload.neighborhood.value.borough;
		this.activeNeighborhood = payload.neighborhood.key;
		this.activeRating = '';

		return this.updatedState();
	}
	// SUPPORTING FILTER METHODS
	filterParksByNeighborhood = () =>
		this.nestedData.filter((d) => d.key === this.activeNeighborhood);

	filterNeighborhoodsByRatingOrBorough(activeParks) {
		let activeNeighborhoods = Array.from(
			new Set(this.activeParks.map((d) => d.neighborhood))
		);

		console.log(
			'neighborhood',
			this.activeParks,
			this.allNestedData,
			this.nestedData,
			this.state
		);
		return this.allNestedData.filter((d) =>
			activeNeighborhoods.includes(d.key)
		);
	}

	filterParksByRatingAndBorough() {
		return this.allParks
			.filter((d) => this.filterParksByRating(d, this.activeRating))
			.filter((d) => this.filterParksByBorough(d, this.activeBorough));
	}

	filterParksByRating = (park, filter) =>
		filter === '' ? park : park.rating === filter;

	filterParksByBorough = (park, filter) =>
		filter === 'all' ? park : park.borough === filter;

	resetDashboard() {
		this.parksBasedOnActiveFilterRating = this.allParks.map((d) => {
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
		this.activeRating = payload.rating || this.activeRating;
		this.activeBorough = payload.borough || this.activeBorough;
	}

	setSelectedParkToActive() {
		return this.parksBasedOnActiveFilterRating.map((d) => {
			d.active = d.name === this.activePark.name ? true : false;
			return d;
		});
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

	updatedState = () => {
		let activePark = this.activePark;
		let activeParks = this.activeParks;
		let allNestedData = this.allNestedData;
		let activeBorough = this.activeBorough;
		let activeNeighborhood = this.activeNeighborhood;
		let activeRating = this.activeRating;
		let allParks = this.allParks;
		let parksBasedOnActiveFilterRating = this.parksBasedOnActiveFilterRating;
		let neighborhood = this.neighborhood;
		let nestedData = this.nestedData;
		let reset = this.reset;

		return {
			activePark,
			activeParks,
			activeBorough,
			activeNeighborhood,
			activeRating,
			activePark,
			activeParks,
			allNestedData,
			allParks,
			parksBasedOnActiveFilterRating,
			neighborhood,
			nestedData,
			reset,
		};
	};
}

export default ParkReducer;
