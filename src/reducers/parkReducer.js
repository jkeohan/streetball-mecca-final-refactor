import ParkReducerClass from './reducerClass'
// HELPERS
import { formatAPIData } from '../services/format/formatters';

const reducer = (state, action) => {

	let ParkReducer = new ParkReducerClass(state);

	switch (action.type) {
		case 'INITIAL_API_CALL':
			// console.log('parkReducer - action.payload.data', action.payload.data);
		    return ParkReducer.initializeDashboard(formatAPIData(action.payload.data));

		case 'FILTER_ACTIVE_RATING_OR_BOROUGH':
			// console.log('parkReducer - action.payload.data',action.payload);
			return ParkReducer.filterDashboardByActiveRatingAndBorough(action.payload);

		case 'FILTER_ACTIVE_PARK':
			return ParkReducer.filterDashboardByActivePark(action.payload);

		case 'FILTER_ACTIVE_PARK_BY_INPUT':
			return ParkReducer.filterDashboardByInput(action.payload);

		case 'FILTER_ACTIVE_NEIGHBORHOOD':
			return ParkReducer.filterDashboardByActiveNeighborhood(action.payload);

		case 'CLEAR_INPUT_FIELD_ACTIVATED':
			return ParkReducer.filterDashboardByActiveRatingOrBorough(action.payload);

		case 'RESET':
			return ParkReducer.resetDashboard();

		default:
			return state;
	}
};


export default reducer;
