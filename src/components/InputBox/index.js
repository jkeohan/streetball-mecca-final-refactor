import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Input = ({dispatch,allParks,activeParks, reset}) => {
	// console.log('Input - props', activeParks, reset)
	const [val, setVal] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const [filteredParks, setFilteredParks] = useState(activeParks);
	const ref = useRef();
	const backupActiveParks = useRef(activeParks);

	useOnClickOutside(ref, () => setOpen(false));

	const handleUpdateVal = (park) => {
		dispatch({ type: 'FILTER_ACTIVE_PARK', payload: { park } });
		setVal(park.name);
		setOpen(false);
	};

	console.log('Input -  ', filteredParks, activeParks);

	const parkChoices = filteredParks
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

	// THIS HANDLES THE MANUAL TOGGLING OF THE DROP DOWN
	const handleToggle = () => {
		setIsVisible(!isVisible);
		setOpen(true);
	};

	const handleChange = (event) => {
		const val = event.target.value;
		const filteredActiveParks = activeParks.filter((activePark) => {
			return activePark.name.toLowerCase().includes(val);
		});

		setVal(val);
		val ? setFilteredParks(filteredActiveParks) : setFilteredParks(activeParks);
		console.log('Input - handleChange ', filteredActiveParks, val);
	};

	useEffect(() => {
		setIsVisible(false);
		if (activeParks.length > 2 || reset) {
      setFilteredParks(activeParks)
			setVal('');
		} else if (activeParks.length === 1) {
			setVal(activeParks[0].name);
		}
	}, [activeParks, reset]);

	// useEffect(() => {
	// 	setIsVisible(false);
	// 	if (filteredParks.length > 2 || reset) {
	// 		setVal('');
	// 	} else if (filteredParks.length === 1) {
	// 		setVal(filteredParks[0].name);
	// 	}
	// }, [filteredParks, reset]);

	return (
		<>
			<form>
				<label htmlFor=''>Find A Court - all courts</label>
				<input
					onChange={handleChange}
					name='park-name'
					value={val}
					onClick={handleToggle}
					type='text'
					placeholder='park name'
				/>
			</form>
			{isOpen ? (
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
export default Input

// function areEqual(prevPark, nextPark) {
//   console.log('ParkImage - areEqual', prevPark.activeParks, nextPark.activeParks)
//   console.log('ParkImage - areEqual', prevPark.activeParks !== nextPark.activeParks)
//   return prevPark.activeParks === nextPark.activeParks
// }


// const MemoizedInput = React.memo(Input, areEqual);
// export default MemoizedInput
