// console.log(cityGrowths);

// 1. sort cities in descending order of pop growth
// 2. select only top five cities in terms of growth
// 3. create arrays for the city names and their population growth
// 4. use plotly to create bar chart with these arrays

var sortedCities = cityGrowths.sort((a, b) => a.population - b.population).reverse();
console.log(sortedCities);

var topFiveCities = sortedCities.slice(0,7);
// console.log(topFiveCities);

var topFiveCityNames = topFiveCities.map(city => city.City);
// console.log(topFiveCityNames);

var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.population));
// console.log(topFiveCityGrowths);

var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
};

var data = [trace];
var layout = {
    title: "Seven largest Cites",
    xaxis: {title: "City"},
    yaxis: {title: "Population"}
};
Plotly.newPlot("bar-plot", data, layout);