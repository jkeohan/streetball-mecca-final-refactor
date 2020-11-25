import React from 'react';
import * as d3 from 'd3';
import { boroughLegend } from '../../../services/legend'

const Map = ({data, geoPath}) => {
    const paths = data.map((d,i) => {
        const featurePath = `${geoPath(d)}`;
        return (
        <path
            key={i}
            d={featurePath}
            fill={boroughLegend(d.properties.borough)}
        />
    );
    })

    return <>{paths}</>

}

export default Map 
