import React from 'react';
import Circle from  '../Circle'

const Circles= (props) => {
  // console.log('Circles - props', props)
  return (
    <>
      {props.allParks.map( (d,i) => {
        const proj = props.projection([+d.lon, +d.lat])

       return (
          <Circle  
           {...props}
           {...d}
            park={d}
            key={i}
            proj={proj}
            isShowing={props.activeParks.includes(d)}
          />
       )
      })}
    </>
  )
}

export default Circles