import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
// import useOnClickOutside from '../../hooks/useOnClickOutside';

const Input = ({ dispatch, allParks, activeParks, reset }) => {
	const [state, setState] = useState({
		inputVal: '',
		isOpen: true,
		filteredParks: [],
	});
	const ref = useRef();
	console.log('Input - props', activeParks, state);
	useEffect(() => {
		console.log('Input - useEffect - activeParks', activeParks, state);
		switch (true) {
			case activeParks.length > 2 || reset:
				setState({
					...state,
					filteredParks: activeParks,
					inputVal: '',
				});
				break;
			case activeParks.length === 1:
				setState({
					...state,
					inputVal: activeParks[0].name,
				});
		}
	}, [activeParks, reset]);

	// useEffect(() => {
	// 	document.addEventListener('mousedown', useOnClickOutside);

	// 	return () => {
	// 		document.removeEventListener('mousedown', useOnClickOutside);
	// 	};
	// }, [activeParks]);

	// const useOnClickOutside = (event) => {
	// 	console.log('Input - useOnClickOutside - state', state, activeParks);
	// 	switch (true) {
	// 		case !ref.current && event.target.name === 'park-name':
	// 			console.log('1');
	// 			setState({ ...state, isOpen: true, filteredParks: activeParks });
	// 			break;
	// 		case ref.current && event.target.name === 'park-name':
	// 			console.log('2', state);
	// 			setState({ ...state, isOpen: false});
	// 			break;
	// 		case ref.current && event.target.parentElement.id != 'parkChoices':
	// 			console.log('3');
	// 			setState({ ...state, isOpen: false, filteredParks: activeParks });
	// 			break;
	// 	}
	// };

	const handleUpdateVal = (park) => {
		console.log('handleUpdateVal');
		dispatch({ type: 'FILTER_ACTIVE_PARK', payload: { park } });
		setState({
			...state,
			inputVal: park.name,
			isOpen: false,
		});
	};

	// console.log('Input -  ', state.filteredParks, activeParks);

	const parkChoices = state.filteredParks
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.map((park, index) => (
			<div
				key={index}
				className={`parkChoice ${park.code}`}
				style={{ color: park.boroughColor }}
				onClick={() => handleUpdateVal(park)}>
				{park.name}
			</div>
		));

	const handleChange = (event) => {
		const val = event.target.value;
		const filteredActiveParks = activeParks.filter((activePark) => {
			return activePark.name.toLowerCase().includes(val);
		});

		console.log('Input - handleChange', filteredActiveParks);
		if (val) {
			setState({
				...state,
				filteredParks: filteredActiveParks,
			});
		} else {
			dispatch({ type: 'CLEAR_INPUT_FIELD_ACTIVATED', payload: {} });
			setState({
				...state,
				isOpen: true,
			});
		}
		setState({
			...state,
			inputVal: val,
		});
		// console.log('Input - handleChange - val', filteredActiveParks, val);
	};

	console.log('Input - state', state);
	return (
		<>
			<form>
				<label htmlFor=''>Find A Court - all courts</label>
				<input
					onChange={handleChange}
					name='park-name'
					value={state.inputVal}
					type='text'
					placeholder='park name'
				/>
			</form>
			{state.isOpen ? (
				<div ref={ref} id='parkChoices'>
					{parkChoices}
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
