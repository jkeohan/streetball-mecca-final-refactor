import { lineRadial } from 'd3';
import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring'

import './styles.css';

const ParkImage = ({ activePark }) => {
  const [index, setIndex] = useState(0)
  const [images,setImages] = useState([
    ({ style }) => <animated.div className='park-image' style={{ ...style, backgroundImage: `url(https://i.imgur.com/7WxnJ1b.jpg)` }}></animated.div>,
    ({ style }) => <animated.div className='park-image' style={{ ...style, backgroundImage: `url(https://i.imgur.com/bxlzGXr.jpg)` }}></animated.div>
  ])

  useEffect(() => {
    const prevImage = images[index]
    if(index){
      setIndex(0)
      setImages([
        images[0] = ({ style }) => <animated.div className='park-image' style={{ ...style, backgroundImage: `url(${activePark.url})` }}></animated.div>,
        images[1] = prevImage
      ])
    } else {
      setIndex(1)
      setImages([
        images[0] = prevImage,
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

  return (
      <>
      <section className='park-info-container'>
      {transitions.map(({ item, props, key }) => {
        const Page = images[item]
        return <Page key={key} style={props} />
      })}
        <div id="title">{activePark.name}</div>
      </section>
      </>
    );

}

export default ParkImage;