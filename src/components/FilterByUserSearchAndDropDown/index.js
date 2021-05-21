import React, { useEffect, useState, useRef } from 'react';
// import { createNoSubstitutionTemplateLiteral } from 'typescript';
import './styles.css';

const Input = ({ activeInput, dispatch, dropDownItems, placeHolder }) => {
	const [inputVal, setInputVal] = useState(activeInput ? activeInput : '');
	const [isDropDownActive, setIsDropDownActive] = useState(false);
	const [filteredDropDownChoices, setFilteredDropDownChoices] = useState(
		dropDownItems
	);
	// console.log('Input - dropDownItems', dropDownItems);
	const ref = useRef();

	useEffect(() => {
		setFilteredDropDownChoices(dropDownItems);
		setInputVal(activeInput ? activeInput : '');
	}, [dropDownItems, activeInput]);

	useEffect(() => {
		document.addEventListener('mousedown', onClickOutsideInputBox);

		return () => {
			document.removeEventListener('mousedown', onClickOutsideInputBox);
		};
	}, [ref]);

	const onClickOutsideInputBox = (event) => {
		console.log('onClickOutsideInputBox - event', event);
		switch (true) {
			case !ref.current && event.target.name === 'name':
				setIsDropDownActive(true);
				break;
			case ref.current && event.target.name === 'name':
				setIsDropDownActive(false);
				break;
			case ref.current && event.target.parentElement.id === 'choice-options':
				setIsDropDownActive(true);
				break;
			default:
				setIsDropDownActive(false);
		}
	};

	const handleUserItemSelection = (item) => {
		dispatch(item);
		setInputVal(item.name);
		setIsDropDownActive(false);
		setFilteredDropDownChoices(dropDownItems);
	};

	const dropDownChoices = filteredDropDownChoices
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.map((item, index) => (
			<div
				key={index}
				className={`choice ${item.code}`}
				style={{ color: item.boroughColor }}
				onClick={() => handleUserItemSelection(item)}>
				{item.name}
			</div>
		));

	// const handleToggleToDisplayParkSelection = () =>
	// 	setIsDropDownActive(!isDropDownActive);

	const handleChange = (event) => {
		const inputVal = event.target.value;
		const filteredDropDownItems = dropDownItems.filter((park) =>
			park.name.toLowerCase().includes(inputVal.toLowerCase())
		);

		setFilteredDropDownChoices(filteredDropDownItems);
		setInputVal(inputVal);
		setIsDropDownActive(true);
	};

	return (
		<>
			<label htmlFor=''>Find A Court - all courts</label>
			<input
				onChange={handleChange}
				name='name'
				value={inputVal}
				type='text'
				placeholder={placeHolder}
			/>
			{isDropDownActive ? (
				<div ref={ref} id='choice-options'>
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
