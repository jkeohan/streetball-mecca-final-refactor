import { formatData, formatNestedData  } from '../services/format/formatters';
import { 
  filterTopParks, 
  filterParksByRating, 
  filterParksByName,
  filterParksByBorough,
  filterParksByNeighborhood,
  resetParkFilter  
} from '../helpers';



const parkReducer = (state, action) => {
 let topParks, activeParks, park, borough, allNestedData, nestedData, neighborhood
 switch(action.type) {
   case 'INITIAL_API_CALL' :
    // const data = formatData(action.payload.data)
    topParks = action.payload.data.filter((d) => filterParksByRating(d, 'Very Good'))
    allNestedData = formatNestedData(action.payload.data)
    return {
      ...state,
      allNestedData,
      nestedData: allNestedData,
      allParks: action.payload.data,
      topParks: filterTopParks(topParks),
      activeParks: action.payload.data,
      activePark: topParks[0]
    };
   case 'FILTER_PARK_RATING' :
     activeParks = state.allParks.filter((d) => filterParksByRating(d, action.payload.rating))
     nestedData = []
     if(state.activeBorough !== 'all') {
      activeParks = activeParks.filter( park => filterParksByBorough(park, state.activeBorough))
     }
      topParks = filterTopParks(activeParks).map(resetParkFilter);

      for(let i = 0; i < state.allNestedData.length; i += 1){
        // console.log('FILTER_PARK_RATING', state.allNestedData[i].value.parks)
        for(let j = 0; j < state.allNestedData[i].value.parks.length; j += 1){
          console.log('FILTER_PARK_RATING', state.allNestedData[i].value.parks[j].rating )
          if(state.allNestedData[i].value.parks[j].rating === action.payload.rating){
            nestedData.push(state.allNestedData[i]) 
            break
          }
        }
      }

      return {
        ...state,
        nestedData,
        topParks,
        activeParks,
        activeRating: action.payload.rating,
        activeNeighborhood: '',
      };
   case 'FILTER_ACTIVE_PARK' :
      park =  action.payload.park
      topParks = state.topParks.map( d => filterParksByName(d,park.name))
      activeParks = state.allParks.filter((d) => d.name === park.name);
      console.log('FILTER_ACTIVE_PARK - park', park)
      nestedData = state.allNestedData
        // .filter( d => d.value.borough === park.borough)
        .filter( d => d.value.parks.includes(park))
      park.active = true;
      return {
        ...state,
        nestedData,
        topParks,
        activeParks,
        activePark: park,
        activeBorough: park.borough,
        activeNeighborhood: '',
      };
   case 'FILTER_ACTIVE_BOROUGH' : 
     borough = action.payload.borough
     if(borough !== 'all') {
      activeParks = state.allParks
      .filter( park => filterParksByBorough(park,borough))
      .filter((d) => filterParksByRating(d, state.activeRating))
      topParks = filterTopParks(activeParks).map(resetParkFilter)
      nestedData = state.allNestedData.filter( d => d.value.borough === borough)
      console.log('FILTER_ACTIVE_BOROUGH - nestedData', nestedData)
    } else {
      activeParks = state.allParks.filter((d) => filterParksByRating(d, state.activeRating))
      topParks = filterTopParks(activeParks).map(resetParkFilter)
      nestedData = state.allNestedData
    }
    return {
      ...state,
      nestedData,
      topParks,
      activeParks,
      activeBorough: borough,
      activeNeighborhood: '',
    };
   case 'FILTER_ACTIVE_NEIGHBORHOOD' :
      neighborhood = filterParksByNeighborhood(state.nestedData, action.payload.neighborhood.key)
      
      return {
        ...state,
        activeParks: neighborhood[0].value.parks,
        activeBorough: action.payload.neighborhood.value.borough,
        activeNeighborhood: action.payload.neighborhood.key
  };
   case 'RESET' :
    // allParks = state.allParks.map(resetParkFilter)
    topParks = filterTopParks(state.allParks).map(resetParkFilter);
    return {
      ...state,
      nestedData: state.allNestedData,
      topParks,
      activeParks: state.allParks,
      activePark: topParks[0],
      activeRating: 'Very Good',
      activeBorough: 'all',
      activeNeighborhood: '',
      reset: false
    };
   default : return state
 }
}

export default parkReducer
