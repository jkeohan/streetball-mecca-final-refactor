import React, { useEffect, useReducer, createContext} from 'react';
import './styles.css';
// COMPONENTS
import ParksByRating from '../FilterCategoriesAndParksByRating/ParksByRating';
import ParkImage from '../ParkImage/image-spring';
import Title from '../DashboardTitle';
import Map from '../Map';
import BarChart from '../BarChart/index_react';
import DropDown from '../FilterByBoroughDropDown';
import Input from '../FilterByUserSearchAndDropDown';
// import BarChart from '../BarChart/index_d3'
// HELPERS
import { formatData } from '../../services/format/formatters';
// import { colorLegendForParkText } from '../../services/legend';
// CUSTOM HOOKS
import useDataApi from '../../hooks/useDataApi';
// REDUCERS
import parkReducer from '../../reducers/parkReducer';

const initialState = {
	activeBorough: 'all',
	activeNeighborhood: '',
	activePark: {},
	parksFilteredForMap: [],
	activeRating: '',
	allNestedData: [],
	allParks: [],
	// park: {},
	parksFilteredForRatingSection: [],
	neighborhood: [],
	nestedData: [],
	reset: false,
};

export const DataContext = createContext();

export default function App() {
	const [parkData, dispatch] = useReducer(parkReducer, initialState);
	console.log('App - parkData', parkData)

	const [{ data, isLoading }] = useDataApi(
		'https://spreadsheets.google.com/feeds/list/1EJ5k2hkdldEz7yrvWSvkCs3Hm6aCU4Po4zBH6nVYvhU/od6/public/values?alt=json'
	);


	useEffect(() => {
		if (data.length) {
			dispatch({
				type: 'INITIAL_API_CALL',
				payload: { data: formatData(data[0].feed.entry) },
			});
		}
	}, [data]);

	const handleUserItemSelection = (item) => {
		dispatch({ type: 'FILTER_ACTIVE_PARK_BY_INPUT', payload: { item } });
	};

  const addStylesToDropDownItems = parkData.parksFilteredForRatingSection.map( park => {
	 park.style = { color: park.boroughColor }
	 return park
  })

	return (
		<DataContext.Provider value={parkData}>
			<div className='App'>
				<main>
					<Title />
					<section id='left'>
						<article id='left-top'>
							<ParksByRating {...parkData} dispatch={dispatch} />
						</article>
					</section>
					{isLoading ? (
						''
					) : (
						<section id='right'>
							<section id='top'>
								<ParkImage activePark={parkData.activePark} />
								<div id='map'>
									<Map {...parkData} dispatch={dispatch} />
									<div id='filters'>
										<div id='court'>
											<Input
												activeInput={
													parkData.parksFilteredForMap.length === 1
														? parkData.activePark.name
														: ''
												}
												dispatch={handleUserItemSelection}
												dropDownItems={addStylesToDropDownItems}
												label='Find A Court - all courts'
												placeHolderText='park name'
											/>
										</div>
										<div id='borough'>
											<DropDown {...parkData} dispatch={dispatch} />
										</div>
									</div>
								</div>
							</section>
						</section>
					)}
					<section id='bottom'>
						<div id='desc'>
							<h3>Which Neighborhood Has The Best Pickup Games?</h3>
							<p>
								Bars represent{' '}
								<span className='gray'>average neighborhood rating, </span>
								circles are individual court ratings
							</p>
						</div>
						<BarChart {...parkData} dispatch={dispatch} />
					</section>
				</main>
			</div>
		</DataContext.Provider>
	);
}
