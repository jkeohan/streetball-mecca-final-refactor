import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Input = ({dispatch,allParks,activeParks, reset}) => {
  // console.log('Input - props', activeParks, reset)
  const [val, setVal] = useState('');
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()
  const [isOpen, setOpen] = useState(false)
  useOnClickOutside(ref, () => setOpen(false))

  const handleUpdateVal = (park) => {
    dispatch({type: 'FILTER_ACTIVE_PARK', payload: { park }})
    setVal(park.name)
    setOpen(false)
  }

  const parkChoices = allParks
      .sort( (a,b) => a.name > b.name ? 1 : -1)
      .map( (park, index) => ( 
        <div 
          key={index}
          className={`parkChoice ${park.code}`}
          style={{color: park.boroughColor}}
          onClick={() => handleUpdateVal(park)}
          >
          {park.name}
         </div> 
      )
  )

  // THIS HANDLES THE MANUAL TOGGLING OF THE DROP DOWN
  const handleToggle = () => {
    setIsVisible(!isVisible)
    setOpen(true)
  }

  useEffect(() => {
    setIsVisible(false)
    if(activeParks.length > 2 || reset) {
        setVal('')
    } else if(activeParks.length === 1) {
      setVal(activeParks[0].name)
    }
    // setVal('')
  }, [activeParks, reset])

  // useEffect(() => {
  //   setVal()
  // }, [val])

  return (
    <>
    <form>
      <label htmlFor="">Find A Court - all courts</label>
      <input
        defaultValue={val}
        onClick={handleToggle}
        type="text"
        placeholder="court name"
      />
    </form>
      {isOpen ? (
      <div ref={ref} id="parkChoices" >
        {parkChoices}
        {/* 
          <div class="parkChoice park0">100% Playground</div>
          <div class="parkChoice park189">24 Sycamores Playground</div>
        */}
      </div> ) : '' }
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



