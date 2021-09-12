function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples
    var metaArray = data.metadata
    // console.log(metaArray)

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    
    //  5. Create a variable that holds the first sample in the array.
    var filterSample = sampleArray.filter(sampleObject => sampleObject.id == sample)[0];
    // console.log(filterSample);
    // console.log(data.metadata)
    //-------------//
    // Gauge //
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataArray = metaArray.filter(sampleObject => sampleObject.id == sample)[0];
    // console.log(metadataArray);
    //-------------//
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_Ids = filterSample.otu_ids;
    var otu_labels = filterSample.otu_labels;
    var sampleValues = filterSample.sample_values;
    // console.log(otu_ids);
    // console.log(otu_labels);
    // console.log(sampleValues);

    //-------------//
    // Gauge //
    // 3. Create a variable that holds the washing frequency.
    var washfreq = metadataArray.wfreq;
    // console.log(washfreq);
    //-------------//

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
  
    var yticks = otu_Ids.slice(0, 10).map(out_Ids => `OTU ${out_Ids}`).reverse();
    // console.log(yticks);

    // // 8. Create the trace for the bar chart. 
    var barData = [{
      x : sampleValues.slice(0, 10).reverse(),
      y : yticks,
      type : "bar",
      text : otu_labels.slice(0, 10).reverse(),
      orientation : "h" 
    }];
    // // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "<b>Top 10 Bacteria Cultures Found<b>",
     font: {
       family: "Nunito Sans",
       size: 14
     }
    };

    // // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, {displayModeBar: false});
    

    // Bubble chart
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x : otu_Ids,
      y : sampleValues,
      text : otu_labels,
      mode : "markers",
      marker : {
        size : sampleValues,
        color : otu_Ids,
        colorscale : "earth"
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Species per Sample<b>",
      xaxis: {title: "OTU ID"},
      hovermode: "closest",
      font: {
        family: "Nunito Sans",
        size: 18
      }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, {scrollZoom: true}, {displayModeBar: false}); 
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        value: washfreq,
        title: { text: "<b>Belly Button Washing Frequency<b>" 
          + "<br>Scrubs per week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          bar: {color: "black"},
          axis: {range: [null, 10]},
          steps: [
            {range: [0, 2], color: "red"},
            {range: [2, 4], color: "orange"},
            {range: [4, 6], color: "yellow"},
            {range: [6, 8], color: "lightgreen"},
            {range: [8, 10], color: "green"}]
        }
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, 
      height: 500, 
      margin: { t: 0, b: 0 },
      font: {
        family: "Nunito Sans",
        size: 20
      }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout, {displayModeBar: false});
  });
}
