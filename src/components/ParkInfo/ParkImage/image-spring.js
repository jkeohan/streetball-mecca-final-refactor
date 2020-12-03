/* RESOURCES
- https://alligator.io/react/advanced-react-spring/
- 
*/
import React from 'react';
import { useTransition, animated } from 'react-spring';

import './styles.css';

const ParkImage = ({ activePark }) => {

  const transitions = useTransition(activePark, (image) => image.code, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 1000
    }
  });

  console.log('ParkImage - transitions', transitions);


  return (
    <>
      <section className="park-info-container">
        {activePark.code &&
          transitions.map(({ item, props, key }) => {
            console.log('transition.map - item, props, key', item, props, key);
            return (
              <animated.div
                key={key}
                className="park-image"
                style={{ ...props, backgroundImage: `url(${item.url})` }}
              />
            );
          })}
        <div id="title">{activePark.name}</div>
      </section>
    </>
  );
};

export default ParkImage