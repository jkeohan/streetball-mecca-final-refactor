import React, {useContext} from 'react';
import ParkRating from './ParkByRating'
import ParkFilters from '../FilterCategories'
import { circleLegend } from '../../../services/legend'
import './styles.css';

import { DataContext } from '../../App';

const TopParks = () => {

	const context = useContext(DataContext);

	const parkFilters = circleLegend.domain().map((d, i) => {
		return (
			<ParkFilters
			    activeRating={context.parkData.activeRating}
				name={d}
				color={circleLegend(d)}
				dispatch={context.dispatch}
				key={i} 
			/>
		);
	});

	const renderParks = context.parkData.parksFilteredForRatingSection
		.sort((a, b) => +b.overall - +a.overall)
		.map((d, i) => {
			return (
				<ParkRating
					dispatch={context.dispatch}
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
