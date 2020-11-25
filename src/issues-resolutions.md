# formatters

ERROR: TypeError: d3.nest is not a function at formatNestedData (formatters.js? [sm]:40)
ISSUE: d3.nest is no longer included as part of the base library in v6...the previous version of this was using 5.7
RESOLUTION: import {nest} from 'd3-collection';

SECTION: BarChart
ERROR:  When using .on('mouseover', d => d) d now changes to be the event so in order to actually pass the value we need to do:  .on('mouseover', (e,d) => circleToolTip(e,d)) where e is the event and d is the object


SECTION: APP
WARNING: 
<img src="https://i.imgur.com/1cdkmZS.png" />
RESOLUTION: refactor setParkData to be a functional update

**From This:**
```js
setParkData({
  ...parkData,
  allParks: formattedData,
  activeParks: formattedData,
});
```

**To This**

```js
setParkData( prevState => ({
  ...prevState,
  allParks: formattedData,
  activeParks: formattedData,
}));
```