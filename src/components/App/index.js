import React, { useEffect, useReducer, createContext } from 'react';
import './styles.css';
// COMPONENTS
import ParksByRating from '../FilterCategoriesAndParksByRating/ParksByRating';
import ParkImage from '../ParkImage/image-spring';
import Title from '../DashboardTitle';
import Map from '../Map';
import BarChart from '../BarChart/index_react';
import DropDown from '../FilterByBoroughDropDown';
import Input from '../FilterByUserSearchAndDropDown';
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
	parksFilteredForRatingSection: [],
	neighborhood: [],
	nestedData: [],
	reset: false,
};

// CONTEXT
export const DataContext = createContext();

export default function App() {
	const [parkData, dispatch] = useReducer(parkReducer, initialState);
	const store = { parkData, dispatch };

	const [{ data, isLoading } ] = useDataApi(
		'https://sheets.googleapis.com/v4/spreadsheets/1EJ5k2hkdldEz7yrvWSvkCs3Hm6aCU4Po4zBH6nVYvhU/values/Sheet1?alt=json&key=AIzaSyBxGxWMipV5iwKgX3IXdBRvL3bUw9Vch7A'
	);

	// const [{ data, isLoading }] = useDataApi(
	// 	'https://spreadsheets.google.com/feeds/list/1EJ5k2hkdldEz7yrvWSvkCs3Hm6aCU4Po4zBH6nVYvhU/od6/public/values?alt=json'
	// );

	useEffect(() => {
		console.log('App - useEffect - data', data)
		if (data.values.length) {
			console.log('App - data', data);
			dispatch({
				type: 'INITIAL_API_CALL',
				payload: { data: data.values }
				// payload: { data: data[0].feed.entry },
			});
		}
	}, [data]);

	const handleUserItemSelection = (item) => {
		dispatch({ type: 'FILTER_ACTIVE_PARK_BY_INPUT', payload: { item } });
	};

	return (
		<DataContext.Provider value={store}>
			<div className='App'>
				<main>
					<Title />
					<section id='left'>
						<article id='left-top'>
							<ParksByRating />
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
												dropDownItems={parkData.parksFilteredForRatingSection}
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
