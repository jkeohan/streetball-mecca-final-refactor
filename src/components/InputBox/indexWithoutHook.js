import React, { useEffect, useState  } from 'react';
import './styles.css';

const Input = ({dispatch,allParks,activeParks, reset}) => {
  console.log('Input - props', activeParks, reset)
  const [val, setVal] = useState('');
  const [isVisible, setIsVisible] = useState(false)

  const handleUpdateVal = (park) => {
    dispatch({type: 'FILTER_ACTIVE_PARK', payload: { park }})
    setVal(park.name)
  }

  const parkChoices = allParks.map( (park, index) => {
    // console.log('Input - parkChoices() - park',park )
      return ( 
        <div 
        className={`parkChoice ${park.code}`}
        style={{color: park.boroughColor}}
        onClick={() => handleUpdateVal(park)}
        >{park.name}

        </div> 
        )
    }
  )

  // THIS HANDLES THE MANUAL TOGGLING OF THE DROP DOWN
  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    setIsVisible(false)
    if(activeParks.length > 2 || reset) {
        setVal('')
    } else if(activeParks.length == 1) {
      setVal(activeParks[0].name)
    }
    // setVal('')
  }, [activeParks])

  // useEffect(() => {
  //   setVal()
  // }, [val])

  const styles = {
    display: isVisible ? 'block' : 'none'
  }
  
  return (
    <>
    <form>
      <label htmlFor="">Find A Court - all courts</label>
      <input
        value={val}
        onClick={handleToggle}
        type="text"
        placeholder="court name"
      />
    </form>

      <div id="parkChoices" style={styles}>
        {parkChoices}
        {/* 
          <div class="parkChoice park0">100% Playground</div>
          <div class="parkChoice park189">24 Sycamores Playground</div>
        */}
      </div>
    </>
  );
};


// export default MemoizedInput= memo(Input)
export default Input