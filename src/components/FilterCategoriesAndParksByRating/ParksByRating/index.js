import React from 'react';
import ParkRating from './ParkByRating'
import ParkFilters from '../FilterCategories'
import { circleLegend } from '../../../services/legend'
import './styles.css';

import { DataContext } from '../../App';

const TopParks = ({
	parksFilteredForRatingSection,
	handleUpdateActivePark,
	activeRating,
	dispatch,
}) => {
	
	const parkFilters = circleLegend.domain().map((d, i) => {
		return (
			<ParkFilters
				name={d}
				color={circleLegend(d)}
				activeRating={activeRating}
				dispatch={dispatch}
				className={d.toLocaleLowerCase()}
				key={i}>
				{/* {d} */}
			</ParkFilters>
		);
	});

	const renderParks = parksFilteredForRatingSection
		.sort((a, b) => +b.overall - +a.overall)
		.map((d, i) => {
			return (
				<ParkRating
					handleUpdateActivePark={handleUpdateActivePark}
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
