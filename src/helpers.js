// import * as d3 from 'd3'

// export const sortTopParks = (data) => 
// //    data.sort( (a,b) => d3.descending(+a.overall, +b.overall)
//    data.sort( (a,b) => +a.overall > +b.overall
// )

// AN ADDITIONAL STYLE KEY IS BEING ADDED TO EACH PARK AND WILL BE ASSIGNED TO THE INPUT DROP DOWN ITEMS.  
// THIS IS MEANT TO KEEP THE INPUT REUSABLE 
export const addStylesToDropDownItems = (parkData) => parkData.parksFilteredForRatingSection.map(
		(park) => {
			park.style = { color: park.boroughColor };
			return park;
		}
	);