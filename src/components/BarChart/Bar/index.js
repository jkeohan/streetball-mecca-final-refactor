import React, { useState } from 'react';
import './styles.css';
import ToolTip from './ToolTip/index'


const Bar = ({ width, neighborhood }) => {
  // console.log('Bar - neighborhood', neighborhood);
  const [toolTipCoords, setToolTipCoords] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleMouseOut = () => setIsActive(false);

  const handleMouseOver = (e) => {
    const top = e.nativeEvent.offsetY - 60;
    const left = e.nativeEvent.offsetX;
    setToolTipCoords({ top, left });
    setIsActive(true);
  };

  return (
    <>
      <div
        className="bar"
        style={{ width: width }}
        onMouseMove={(e) => handleMouseOver(e)}
        onMouseOut={() => handleMouseOut()}
      ></div>
      {isActive && (
        <ToolTip coords={toolTipCoords} neighborhood={neighborhood} />
      )}
    </>
  );
};

export default Bar;
