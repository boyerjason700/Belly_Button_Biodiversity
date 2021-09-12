const url= "https://api.spacexdata.com/v2/launchpads";

var data = d3.json(url).then(recievedData => console.log(recievedData));
console.log(data)

var data1 = d3.select(data).map(data.location[latitude]);
consol.log(data1);
