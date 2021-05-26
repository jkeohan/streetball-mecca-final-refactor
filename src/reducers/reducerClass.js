import * as d3 from 'd3';
import { nest } from 'd3-collection';

class ParkReducer {
	constructor(state) {
		this.state = state;
		this.activePark = state.activePark;
		this.parksFilteredForMap = state.parksFilteredForMap;
		this.allNestedData = state.allNestedData;
		this.activeBorough = state.activeBorough;
		this.activeNeighborhood = state.activeNeighborhood;
		this.activeRating = state.activeRating;
		this.allParks = state.allParks;
		this.parksFilteredForRatingSection = state.parksFilteredForRatingSection;
		this.neighborhood = state.neighborhood;
		this.nestedData = state.nestedData;
		this.reset = state.reset;
	}
	// 'INITIAL_API_CALL'
	initializeDashboard(initialData) {
		this.nestedData = this.formatNestedData(initialData);
		this.activePark = this.sortParksByRating(initialData)[0];
		this.parksFilteredForMap = initialData;
		this.allNestedData = this.formatNestedData(initialData);
		this.allParks = initialData;
		this.parksFilteredForRatingSection = initialData;

		return this.updatedState();
	}
	// 'FILTER_ACTIVE_RATING_OR_BOROUGH'
	filterDashboardByActiveRatingAndBorough(payload) {
		this.setRatingAndBorough(payload);
		this.setParksFilteredForMapAndRatingSection();
		this.filterNeighborhoodsByRatingAndBorough();
		this.activeNeighborhood = '';
		return this.updatedState();
	}
	// 'FILTER_ACTIVE_PARK'
	filterDashboardByActivePark(payload) {
		this.activePark = payload.item;
		this.filterParksByParkRatingSectionOrInputChoice();

		return this.updatedState();
	}
	// 'FILTER_ACTIVE_PARK_BY_INPUT'
	filterDashboardByInput(payload) {
		this.activePark = payload.item;
		this.filterParksByParkRatingSectionOrInputChoice();
		this.parksFilteredForRatingSection = this.nestedData[0].value.parks;

		return this.updatedState();
	}
	// 'CLEAR_INPUT_FIELD_ACTIVATED'
	filterDashboardByActiveNeighborhood(payload) {
		this.activeNeighborhood = payload.neighborhood.key;
		this.parksFilteredForMap = this.filterParksByNeighborhood()[0].value.parks;
		this.parksFilteredForRatingSection = this.filterParksByNeighborhood()[0].value.parks;
		this.activeBorough = payload.neighborhood.value.borough;
		this.activeRating = '';

		return this.updatedState();
	}
	// SUPPORTING FILTER METHODS
	filterNeighborhoodsByRatingAndBorough() {
		let activeNeighborhoods = Array.from(
			new Set(this.parksFilteredForMap.map((d) => d.neighborhood))
		);

		this.nestedData = this.allNestedData.filter((d) =>
			activeNeighborhoods.includes(d.key)
		);
	}

	filterParksByRatingAndBorough = () =>
		this.allParks
			.filter((park) =>
				this.activeRating === '' ? park : park.rating === this.activeRating
			)
			.filter((park) =>
				this.activeBorough === 'all'
					? park
					: park.borough === this.activeBorough
			);

	filterParksByParkRatingSectionOrInputChoice = () => {
		this.parksFilteredForMap = [this.activePark];
		this.activeBorough = this.activePark.borough;
		this.activeNeighborhood = this.activePark.neighborhood;
		this.nestedData = this.filterParksByNeighborhood();
		this.parksFilteredForRatingSection = this.setSelectedParkToActive();
	};

	filterParksByNeighborhood = () =>
		this.allNestedData.filter((d) => d.key === this.activeNeighborhood);

	resetDashboard() {
		this.parksFilteredForRatingSection = this.allParks.map((d) => {
			d.active = false;
			return d;
		});
		this.nestedData = this.allNestedData;
		this.parksFilteredForMap = this.state.allParks;
		this.activePark = this.sortParksByRating(
			this.parksFilteredForRatingSection
		)[0];
		this.activeRating = '';
		this.activeBorough = 'all';
		this.activeNeighborhood = '';
		this.reset = false;

		return this.updatedState();
	}

	setRatingAndBorough(payload) {
		this.activeRating = payload.rating || this.activeRating;
		this.activeBorough = payload.borough || this.activeBorough;
	}

	setParksFilteredForMapAndRatingSection = () =>
		(this.parksFilteredForMap = this.parksFilteredForRatingSection =
			this.filterParksByRatingAndBorough());

	setSelectedParkToActive = () =>
		this.parksFilteredForRatingSection.map((d) => {
			d.active = d.name === this.activePark.name ? true : false;
			return d;
		});

	formatNestedData = (data) =>
		nest()
			.key((d) => d.neighborhood)
			.rollup((l) => ({
				parks: l,
				avg: d3.mean(l, (d) => d.overall),
				borough: l[0].borough,
				code: l[0]['code'],
				ratings: l.map((d) => d.rating),
			}))
			.entries(data);

	// SUPPORTING SORTING METHODS
	sortParksByRating = (parksArray) =>
		parksArray.sort((a, b) => d3.descending(+a.overall, +b.overall));

	updatedState = () => {
		let activePark = this.activePark;
		let parksFilteredForMap = this.parksFilteredForMap;
		let allNestedData = this.allNestedData;
		let activeBorough = this.activeBorough;
		let activeNeighborhood = this.activeNeighborhood;
		let activeRating = this.activeRating;
		let allParks = this.allParks;
		let parksFilteredForRatingSection = this.parksFilteredForRatingSection;
		let neighborhood = this.neighborhood;
		let nestedData = this.nestedData;
		let reset = this.reset;

		return {
			activePark,
			parksFilteredForMap,
			activeBorough,
			activeNeighborhood,
			activeRating,
			allNestedData,
			allParks,
			parksFilteredForRatingSection,
			neighborhood,
			nestedData,
			reset,
		};
	};
}

export default ParkReducer;
