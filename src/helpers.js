import * as d3 from 'd3'

export const filterTopParks = (data) => 
   data.sort( (a,b) => d3.descending(+a.overall, +b.overall)
)
export const filterParksByRating = (park, filter) => park.rating === filter
export const resetParkFilter = park => { park.active = false; return park }
export const filterParksByName = (park, parkName) => { 
    park.name === parkName ? park.active = true : park.active = false
    return park
}
export const filterParksByBorough = (park, filter) => park.borough === filter 
export const filterParksByNeighborhood = (nestedData, filter) => {
  const neighborhood = nestedData.filter( d => d.key === filter)
  return neighborhood
  console.log('filterParksByNeighborhood - neighborhood', neighborhood, filter)
}
