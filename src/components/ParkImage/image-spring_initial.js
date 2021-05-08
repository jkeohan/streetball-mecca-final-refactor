/* RESOURCES
- https://alligator.io/react/advanced-react-spring/
- 
*/
import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring'

import './styles.css';

const ParkImage = ({ activePark }) => {
  const [index, setIndex] = useState(0)
  const [images,setImages] = useState([
    ({ style }) => <animated.div 
      className='park-image' style={{ ...style, backgroundImage: `url(https://i.imgur.com/7WxnJ1b.jpg)` }}></animated.div>,
    ({ style }) => <animated.div 
      className='park-image' style={{ ...style, backgroundImage: `url(https://i.imgur.com/bxlzGXr.jpg)` }}></animated.div>
  ])

  useEffect(() => {
    if(index){
      setIndex(0)
      setImages(() => [
        images[0] = ({ style }) => <animated.div className='park-image' style={{ ...style, backgroundImage: `url(${activePark.url})` }}></animated.div>,
        images[1] = images[index]
      ])
    } else {
      setIndex(1)
      setImages(() => [
        images[0] = images[index],
        images[1] = ({ style }) => <animated.div className='park-image' style={{ ...style, backgroundImage: `url(${activePark.url})` }}></animated.div>
      ])
    }
  },[activePark])

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0},
    enter: { opacity: 1},
    leave: { opacity: 0},
    config: {
      duration: 500,
    },
  })

  // console.log('ParkImage - transitions', transitions)
  
  return (
      <>
      <section className='park-info-container'>
      {transitions.map(({ item, props, key }) => {
        const Image = images[item]
        return <Image key={key} style={props} />
      })}
        <div id="title">{activePark.name}</div>
      </section>
      </>
    );

}

export default ParkImage;