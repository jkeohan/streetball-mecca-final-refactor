import React, {useEffect, useRef} from 'react';
import {useSpring, animated} from 'react-spring'
// import { preProcessFile } from 'typescript';

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
			<animated.circle
				{...style}
				r={4}
				transform={`translate(${props.proj})`}
				fill={props.color}
				data-code={props.code}
				data-park={props.park.name}
				className={props.isShowing ? 'active' : ''}
				onClick={(e, d) => {
					console.log('Circle - d', props.park);
					props.dispatch({
						type: 'FILTER_ACTIVE_PARK',
						payload: { item: props.park },
					});
				}}
			/>
		</>
	);
};

export default Circle;