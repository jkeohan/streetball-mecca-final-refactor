import { formatNestedData } from '../services/format/formatters';
import {
  sortTopParks,
  filterParksByRating,
  filterParksByName,
  filterParksByBorough,
  filterParksByNeighborhood,
  filterNeighborHoodsByRating 
} from '../helpers';

const parkReducer = (state, action) => {
  let topParks,
    activeParks,
    park,
    borough,
    allNestedData,
    nestedData,
    neighborhood

  switch (action.type) {
    case 'INITIAL_API_CALL':
      // const data = formatData(action.payload.data)
      topParks = action.payload.data.filter((d) =>
        filterParksByRating(d, 'Very Good')
      );
      allNestedData = formatNestedData(action.payload.data);
      console.log('INITIAL_API_CALL - topParks', topParks)
      return {
        ...state,
        allNestedData,
        nestedData: allNestedData,
        allParks: action.payload.data,
        topParks: sortTopParks(topParks),
        activeParks: action.payload.data,
        activePark: topParks[0]
      };
    case 'FILTER_PARK_RATING':
      console.log('FILTER_PARK_RATING  - state', state)
      activeParks = state.allParks.filter((d) => filterParksByRating(d, action.payload.rating));
      nestedData = [];
      if (state.activeBorough !== 'all') {
        activeParks = activeParks.filter((park) => filterParksByBorough(park, state.activeBorough));
        // nestedData = state.allNestedData.filter((d) => d.value.borough === state.activeBorough);
        topParks = sortTopParks(activeParks)//.map(resetParkFilter);
        // THIS FILTERS NEIGHBORHOODS THAT CONTAIN AT LEAST ONE PARK WITH THAT RATING
        nestedData = filterNeighborHoodsByRating(state.allNestedData, action.payload.rating, state.activeBorough) 

      } else {
        nestedData = filterNeighborHoodsByRating(state.allNestedData, action.payload.rating, state.activeBorough) 
        topParks = sortTopParks(activeParks)//.map(resetParkFilter);
      }

      return {
        ...state,
        nestedData,
        topParks,
        activeParks,
        activeRating: action.payload.rating,
        activeNeighborhood: ''
      };
    case 'FILTER_ACTIVE_PARK':
      park = action.payload.park;
      topParks = state.topParks.map((d) => filterParksByName(d, park.name));
      activeParks = state.allParks.filter((d) => d.name === park.name);
      console.log('FILTER_ACTIVE_PARK - park', park);
      nestedData = state.allNestedData.filter((d) => d.value.parks.includes(park))

      return {
        ...state,
        nestedData,
        topParks,
        activeParks,
        activePark: park,
        activeBorough: park.borough,
        activeNeighborhood: ''
      };
    case 'FILTER_ACTIVE_BOROUGH':
      borough = action.payload.borough;
      nestedData = filterNeighborHoodsByRating(state.allNestedData, state.activeRating, borough) 
      if (borough !== 'all') {
        activeParks = state.allParks
          .filter((park) => filterParksByBorough(park, borough))
          .filter((d) => filterParksByRating(d, state.activeRating));
        topParks = sortTopParks(activeParks)//.map(resetParkFilter);
      } else {
        activeParks = state.allParks.filter((d) => filterParksByRating(d, state.activeRating));
        topParks = sortTopParks(activeParks)//.map(resetParkFilter);
      }

      return {
        ...state,
        nestedData,
        topParks,
        activeParks,
        activeBorough: borough,
        activeNeighborhood: ''
      };
    case 'FILTER_ACTIVE_NEIGHBORHOOD':
      neighborhood = filterParksByNeighborhood(
        state.nestedData,
        action.payload.neighborhood.key
      );

      return {
        ...state,
        activeParks: neighborhood[0].value.parks,
        activeBorough: action.payload.neighborhood.value.borough,
        activeNeighborhood: action.payload.neighborhood.key
      };
    case 'RESET':
      topParks = sortTopParks(state.allParks)

      return {
        ...state,
        nestedData: state.allNestedData,
        topParks,
        activeParks: state.allParks,
        activePark: topParks[0],
        activeRating: 'Very Good',
        activeBorough: 'all',
        activeNeighborhood: '',
        reset: false
      };
    default:
      return state;
  }
};

export default parkReducer;
