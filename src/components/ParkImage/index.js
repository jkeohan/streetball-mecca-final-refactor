import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './styles.css';

const ParkImage = ({ activePark }) => {
  const [transitionActive, setTransitionActive] = useState(true);
  // const [image, setImage] = useState({
  //   backgroundImage: ``
  // })

  useEffect(() => {
    // style.backgroundImage = `url(${activePark.url})`
    setTransitionActive(!transitionActive) 
    // setImage({backgroundImage:`url(${activePark.url}`})
  }, [activePark]);

  const style = {
    backgroundImage: `url(${activePark.url}`
  }

  return (
    <>
    <section className='park-info-container'>
      <CSSTransition 
        in={transitionActive} 
        style={style} 
        timeout={3000} 
        classNames="show">
        <div id="image" ></div>
      </CSSTransition>
      <div id="title">{activePark.name}</div>
    </section>
    </>
  );
};

export default ParkImage;

// CSSTransitions DIDNT" WORK

// BACKGROUND IMAGE PACKAGE DIDN"T WORK AS NEEDED
// <BackgroundImage transitionTime="1000ms" id="image" src={activePark.url}>
//   Look at me i'm a paragraph.
// </BackgroundImage>
