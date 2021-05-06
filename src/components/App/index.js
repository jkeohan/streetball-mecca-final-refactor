import React, { useEffect, useReducer } from 'react';
import './styles.css';
// COMPONENTS
import TopParks from '../ParkInfo/TopParks';
import ParkImage from '../ParkInfo/ParkImage/image-spring';
import Title from '../Title';
import Map from '../Map';
import BarChart from '../BarChart/index_react'
import DropDown from '../DropDown';
import Input from '../InputBox';
// import BarChart from '../BarChart/index_d3'
// HELPERS
import { formatData } from '../../services/format/formatters'
// CUSTOM HOOKS
import useDataApi from '../../hooks/useDataApi';
// REDUCERS
import parkReducer from '../../reducers/parkReducer';

const initialState = {
	activePark: {},
	activeParks: [],
	activeRating: '',
	activeBorough: 'all',
	allParks: [],
	allNestedData: [],
	nestedData: [],
	parksBasedOnActiveFilterRating: [],
	reset: false,
};

export default function App() {
  const [parkData, dispatch] = useReducer(parkReducer, initialState);

  const [{ data, isLoading }] = useDataApi(
    'https://spreadsheets.google.com/feeds/list/1EJ5k2hkdldEz7yrvWSvkCs3Hm6aCU4Po4zBH6nVYvhU/od6/public/values?alt=json'
  );

  useEffect(() => {
    if (data.length) {
      dispatch({
        type: 'INITIAL_API_CALL',
        payload: { data: formatData(data[0].feed.entry) }
      });
    }
  }, [data]);

  return (
		<div className='App'>
			<main>
				<Title />
				<section id='left'>
					<article id='left-top'>
						<TopParks {...parkData} dispatch={dispatch} />
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
										<Input {...parkData} dispatch={dispatch} />
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
							<span className='gray'>average neighborhood rating, </span>circles
							are individual court ratings
						</p>
					</div>
					<BarChart {...parkData} dispatch={dispatch} />
					{/* <article className="rectToolTip">
            <p className='title'>Central Park</p>
            <p className='avg'>Avg. Overall Rating: 83/100</p>
          </article>
          <article className='circleToolTip'>
            <p className='title'>Central Park (Great Lake)</p>
            <p className='neighborhood'>Central Park, Manhattan</p>
            <p className='avg'>Overall: 83/100</p>
          </article> */}
				</section>
			</main>
		</div>
	);
}
