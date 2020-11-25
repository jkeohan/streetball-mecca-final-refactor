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
      duration: 1000,
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
      />
    </>
  );
};

export default Circle;