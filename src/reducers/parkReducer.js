import { colorLegendForParkText } from '../services/legend';
import ParkReducerClass from './reducerClass'

const reducer = (state, action) => {

	let ParkReducer = new ParkReducerClass(state);

	switch (action.type) {
		case 'INITIAL_API_CALL':
			const allParks = action.payload.data.map((d) => {
					d.boroughColor = colorLegendForParkText(d.borough);
					return d;
			});
			return  ParkReducer.initializeDashboard(allParks, state);

		case 'FILTER_ACTIVE_RATING_OR_BOROUGH':
			return ParkReducer.filterDashboardByActiveRatingOrBorough(action.payload)

		case 'FILTER_ACTIVE_PARK':
			return ParkReducer.filterDashboardByActivePark(action.payload.item);

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
