import React, { useState } from 'react';
import './styles.css';
import ToolTip from './ToolTip'
// import { dispatch } from 'rxjs/internal/observable/range';

const Circle = ({ color, left, park, dispatch }) => {
  const [toolTip, setToolTip] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleMouseOut = () => {
    setIsActive(false);
  };

  const handleMouseOver = (e) => {
    e.stopPropagation()
    console.log(
			'e.value',
			e.target,
			e.nativeEvent.clientX,
			e.nativeEvent.pageX,
			e.nativeEvent.offsetX,
			e.nativeEvent.layerX
    );
    
    let top = e.nativeEvent.offsetY - 80;
    // let left = e.nativeEvent.clientX - 620
    let left = e.nativeEvent.layerX


    setIsActive(true);
    setToolTip({ top, left });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'FILTER_ACTIVE_PARK_MAP_ONLY', payload: { park } });
  };

  return (
		<>
			<div
				onClick={(e) => handleClick(e)}
				onMouseMove={(e) => handleMouseOver(e)}
				onMouseOut={() => handleMouseOut()}
				className='circle'
				// style={{ background: color, left: left }}
				style={{
          background: color,
          transform: `translate(${left}px, 0px)`,
        }}
        ></div>
			{isActive && <ToolTip coords={toolTip} park={park} />}
		</>
	);
};

export default Circle;
