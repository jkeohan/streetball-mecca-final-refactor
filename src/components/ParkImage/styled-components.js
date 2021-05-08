import React from 'react';
//https://www.zacwillmington.com/react-styled-components-improve-ux-with-background-image-fadein/
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
// import styled from 'styled-components';

import './styles.css';

// CREATING THE STYLED COMPONENTS OUTSIDE THE FUNCTIONAL COMPONENT
// WILL PREVENT THE ANIMATIONS

// let fadeInAnimation = keyframes`${fadeIn}`;

// const FadeInImage = styled.div`
//   height: 90%;
//   background-repeat: no-repeat;
//   background-size: cover;
//   animation: 3s ${fadeInAnimation};
//   background-image: ${(props) => `url(${props.url})`};
// `;

// const FadeInImage = styled.div`
//   height: 90%;
//   background-repeat: no-repeat;
//   background-size: cover;
//   animation: 3s ${(props) => props.animation};   
//   background-image: ${(props) => `url(${props.url})`};
// `;

const Title = styled.div`
  background: white;
  line-height: 30px;
  /* font-style: italic; */
  text-align: center;
  font-size: 30px;
  padding: 5px;
  letter-spacing: 4px;
`;

const ParkImage = ({ activePark }) => {
  let fadeInAnimation = keyframes`${fadeIn}`;
  const FadeInImage = styled.div`
    height: 90%;
    background-repeat: no-repeat;
    background-size: cover;
    /* animation: 3s ${fadeInAnimation}; */
    animation: 3s ${(props) => props.animation};   
    background-image: ${(props) => `url(${props.url})`};
  `;

  console.log('ParkImage - activePark', activePark);

  return (
    <section className="park-info-container">
      <FadeInImage 
        animation={fadeInAnimation}
        url={activePark.url}></FadeInImage>
      <Title>{activePark.name}</Title>
    </section>
  );
};

// export default ParkImage;
// const areEqual = (prevProps, nextProps) => true;

function areEqual(prevPark, nextPark) {
  console.log(
    'ParkImage - areEqual',
    prevPark.activePark.code === nextPark.activePark.code
  );
  console.log(
    'ParkImage - areEqual',
    prevPark.activePark.code === nextPark.activePark.code
  );
  return prevPark === nextPark;
}

// const MemoizedParkImage = React.memo(ParkImage, areEqual);
// export default MemoizedParkImage;

// const MemoizedParkImage = React.memo(ParkImage);
// export default MemoizedParkImage;

export default ParkImage;
