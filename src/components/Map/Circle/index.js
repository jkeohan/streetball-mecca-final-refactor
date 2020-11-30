import React, {useEffect, useRef} from 'react';
import {useSpring, animated} from 'react-spring'

const Circle = (props) => {
  // console.log('Circle - props', props.isShowing)
  const wasShowing = useRef(false)

  useEffect(() => {
    wasShowing.current = props.isShowing
  },[props.isShowing])

  const style = useSpring({
    config: {
      duration: 500,
    },
    // r: props.isShowing ? 6 : 0,
    opacity: props.isShowing ? 1 : 0,
  })

  return (
    <>
      <animated.circle {...style}
        r={4}
        transform={`translate(${props.proj})`}
        fill={props.color}
        code={props.code} 
        onClick={(e,d) => { 
          console.log('Circle - d', props)
          props.dispatch({type: 'FILTER_ACTIVE_PARK', payload: { park:props.park}})
          } 
        }
      />
    </>
  );
};

export default Circle;