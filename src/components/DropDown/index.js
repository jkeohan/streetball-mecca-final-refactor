import React, { useRef } from 'react';
import './styles.css';

const  DropDown = (props) => {
  const selectRef = useRef();

  const handleChange = () => {
    const borough = selectRef.current.value;
    props.dispatch({
      type: 'FILTER_ACTIVE_BOROUGH',
      payload: { borough }
    });
  };

  return (
    <>
      <label htmlFor="">Select A Borough</label>
      <select
        ref={selectRef}
        value={props.activeBorough}
        onChange={handleChange}
        name="borough"
        id="boroughs"
      >
        <option value="all">(All)</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Manhattan">Manhattan</option>
      </select>
    </>
  );
};

export default DropDown
