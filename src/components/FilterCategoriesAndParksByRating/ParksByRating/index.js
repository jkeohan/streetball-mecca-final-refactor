import React, {useContext} from 'react';
import ParkRating from './ParkByRating'
import ParkFilters from '../FilterCategories'
import { circleLegend } from '../../../services/legend'
import './styles.css';

import { DataContext } from '../../App';

const TopParks = () => {

	// const context = useContext(DataContext);
	const {parkData, dispatch} = useContext(DataContext);

	const parkFilters = circleLegend.domain().splice(0,3).map( (d, i) => {
		// console.log('FilterCategoriesAndParksByRating - d', d, parkData)
		return (
			<ParkFilters
			    activeRating={parkData.activeRating}
				name={d}
				color={circleLegend(d)}
				dispatch={dispatch}
				key={i} 
			/>
		);
	});

	const renderParks = parkData.parksFilteredForRatingSection
		.sort((a, b) => +b.overall - +a.overall)
		.map((d, i) => {
			return (
				<ParkRating
					dispatch={dispatch}
					key={i}
					item={d}
					active={d.active}
				/>
			);
		});

	return (
		<>
			<div className='park-rating_filters'> {parkFilters} </div>
			<ul> {renderParks} </ul>
		</>
	);
};

export default TopParks
