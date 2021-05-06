import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Input = ({ dispatch, activeParks, parksBasedOnActiveFilterRating }) => {
	const [inputVal, setInputVal] = useState('');
	const [isDropDownActive, setIsDropDownActive] = useState(false);
	const [filteredDropDownChoices, setFilteredDropDownChoices] = useState(
		parksBasedOnActiveFilterRating
	);
	const ref = useRef();

	useEffect(() => {
		switch (true) {
			case activeParks.length > 2:
				setFilteredDropDownChoices(parksBasedOnActiveFilterRating);
				setInputVal('');
				break;
			case activeParks.length === 1:
				setInputVal(activeParks[0].name);
				break;
		}
	}, [activeParks]);

	useEffect(() => {
		document.addEventListener('mousedown', useOnClickOutside);

		return () => {
			document.removeEventListener('mousedown', useOnClickOutside);
		};
	}, [ref]);

	const useOnClickOutside = (ref, (event) => {
		switch (true) {
			case !ref.current && event.target.name === 'park-name':
				console.log('1');
				setIsDropDownActive(true);
				break;
			case ref.current && event.target.name === 'park-name':
				console.log('2');
				setIsDropDownActive(false);
				break;
			case ref.current && event.target.parentElement.id == 'parkChoices':
				console.log('3');
				setIsDropDownActive(true);
				break;
			default:
				setIsDropDownActive(false);
		}
	});

	const handleUserParkSelection = (park) => {
		dispatch({ type: 'FILTER_ACTIVE_PARK', payload: { park } });
		setInputVal(park.name);
		setIsDropDownActive(false);
		setFilteredDropDownChoices(parksBasedOnActiveFilterRating);
	};

	const dropDownChoices = filteredDropDownChoices
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.map((park, index) => (
			<div
				key={index}
				className={`parkChoice ${park.code}`}
				style={{ color: park.boroughColor }}
				onClick={() => handleUserParkSelection(park)}>
				{park.name}
			</div>
		));

	const handleToggleToDisplayParkSelection = () =>
		setIsDropDownActive(!isDropDownActive);

	const handleChange = (event) => {
		const inputVal = event.target.value;
		const filteredActiveParks = parksBasedOnActiveFilterRating.filter((park) =>
			park.name.toLowerCase().includes(inputVal.toLowerCase())
		);

		setFilteredDropDownChoices(filteredActiveParks);
		setInputVal(inputVal);
		setIsDropDownActive(true);
	};

	return (
		<>
			<form>
				<label htmlFor=''>Find A Court - all courts</label>
				<input
					onChange={handleChange}
					name='park-name'
					value={inputVal}
					type='text'
					placeholder='park name'
				/>
			</form>
			{isDropDownActive ? (
				<div ref={ref} id='parkChoices'>
					{dropDownChoices}
				</div>
			) : (
				''
			)}
		</>
	);
};

// export default MemoizedInput= memo(Input)
export default Input;

// function areEqual(prevPark, nextPark) {
//   console.log('ParkImage - areEqual', prevPark.activeParks, nextPark.activeParks)
//   console.log('ParkImage - areEqual', prevPark.activeParks !== nextPark.activeParks)
//   return prevPark.activeParks === nextPark.activeParks
// }

// const MemoizedInput = React.memo(Input, areEqual);
// export default MemoizedInput
