// console.log(cityGrowths);

// 1. sort cities in descending order of pop growth
// 2. select only top five cities in terms of growth
// 3. create arrays for the city names and their population growth
// 4. use plotly to create bar chart with these arrays

var sortedCities = cityGrowths.sort((a, b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
// console.log(sortedCities);

var topFiveCities = sortedCities.slice(0,5);
// console.log(topFiveCities);

var topFiveCityNames = topFiveCities.map(city => city.City);
// console.log(topFiveCityNames);

var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
// console.log(topFiveCityGrowths);

var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
};

var data = [trace];
var layout = {
    title: "Most Radidly Growing Cites",
    xaxis: {title: "City"},
    yaxis: {title: "Population Growth, 2016-2017"}
};
Plotly.newPlot("bar-plot", data, layout);
