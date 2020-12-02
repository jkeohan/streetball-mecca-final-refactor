import * as d3 from 'd3'

export const sortTopParks = (data) => 
   data.sort( (a,b) => d3.descending(+a.overall, +b.overall)
)
export const resetParkFilter = park => { park.active = false; return park }

export const filterParksByRating = (park, filter) => park.rating === filter

export const filterParksByName = (park, parkName) => { 
    park.name === parkName ? park.active = true : park.active = false
    return park
}
export const filterParksByBorough = (park, filter) => park.borough === filter 
export const filterParksByNeighborhood = (nestedData, filter) => {
  const neighborhood = nestedData.filter( d => d.key === filter)
  return neighborhood
}

export const filterNeighborHoodsByRating = (allNestedData, activeRating, activeBorough) => {
  console.log('filterNeighborHoodsByRating', allNestedData, activeRating, activeBorough)
  const nestedData = []
  for (let i = 0; i < allNestedData.length; i += 1) {
    for (let j = 0; j < allNestedData[i].value.parks.length; j += 1) {
      if(activeBorough === 'all' && allNestedData[i].value.parks[j].rating === activeRating ) {
        nestedData.push(allNestedData[i]);
        break
      } else if (
        allNestedData[i].value.parks[j].rating === activeRating && 
        allNestedData[i].value.borough === activeBorough
      ) {
        nestedData.push(allNestedData[i]);
        break;
      }
    }
  }
  return nestedData
}
