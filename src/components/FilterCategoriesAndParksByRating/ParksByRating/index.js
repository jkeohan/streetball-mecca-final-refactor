import React from 'react';
import ParkRating from '../ParkByRating'
import ParkFilters from '../FilterCategories'
import { circleLegend } from '../../../services/legend'
import './styles.css';

const TopParks = ({
	parksBasedOnActiveFilterRating,
	handleUpdateActivePark,
	handleUpdateParkRating,
	activeRating,
	dispatch,
}) => {
	const parkFilters = circleLegend.domain().map((d, i) => {
		return (
			<ParkFilters
				name={d}
				color={circleLegend(d)}
				activeRating={activeRating}
				handleUpdateParkRating={handleUpdateParkRating}
				dispatch={dispatch}
				className={d.toLocaleLowerCase()}
				key={i}>
				{d}
			</ParkFilters>
		);
	});
  
	const renderParks =  parksBasedOnActiveFilterRating
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
