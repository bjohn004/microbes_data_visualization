// This code was inspired by the Tutorials provided by Dom in class/office hours on 9/27/2022

function drawBarGraph(sampleId)
{

    console.log(`drawBarGraph(${sampleId})`);

};

function drawBubbleChart(sampleId)
{

    console.log(`drawBubbleChart(${sampleId})`);

};

function drawGauge(sampleId)
{
    console.log(`drawGauge(${sampleId})`);
}

function showMetaData(sampleId)
{

    console.log(`showMetaData(${sampleId})`);

};

function InitDashboard()
{
    console.log("InitDashboard")

    // Get a handle to the dropdown
    let selector = d3.select("#selDataset")
    let sample = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    d3.json(sample).then(function(data) {
        console.log("Here's the data", data);

        let sampleNames = data.names;
        console.log(sampleNames);
        // populate dropdown
        for (let i = 0; sampleNames.length; i++) {
            let sampleId = sampleNames[i];
            console.log(`sampleId = ${sampleId}`);
            selector.append("option").text(sampleId).property("value", sampleId);
        };
        // Read current value from dropdown
        let initialId = selector.property("value");
        console.log(`initialId = ${initialId}`);
        // draw bargraph from selected value
        drawBarGraph(initialId);
        // draw bubblechart for selected sample id
        drawBubbleChart(initialId);
        // show metadata for selected sample id
        showMetaData(initialId);



    });

}


// ----------------------------------------------------------------------------------------------------

console.log("Assignment 14") 
let sample = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(sample).then(function(data) {
    let dataSamples = Object.values(data.samples);
    console.log(dataSamples);
    let idNumber =[]
    let otuIDList = [];
    let sampleValues = [];

    for (i = 0; i < dataSamples.length; i++) {
        let item = dataSamples[i];
        let z = idNumber.push(item.id);
        let y = otuIDList.push(item.otu_ids);
        let x = sampleValues.push(item.sample_values);   
    };
    console.log("ids", idNumber);
    console.log("otus", otuIDList);
    console.log("samples", sampleValues);
    function init() {
        let data = [{
            x: x[0],
            y: y[0],
            text: z[0],
            name: "Top 10 Biomes Per Patient",
            type: "bar",
            orientation: "h"
        }];

        let layout = {
            height: 600,
            width: 800
        };

        Plotly.newPlot("bar", data, layout)
        
    };
    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", getData);

    // Function called by DOM changes
    function getData() {
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a letiable
        let dataset = dropdownMenu.property("value");
        // Initialize an empty array for the country's data
        let data = [];

        for (i = 0; i < dataSamples.length; i++) {

            if (dataset == z[0]) {
                data = australia;
            }
            else if (dataset == 'brazil') {
                data = brazil;
            }   
   
    // Call function to update the chart
    updatePlotly(data);
        };
    };
});

// // horizontal bar chart
// // ------------------------------------
// let trace1 = {
//     x: reversedData.map(object => object.greekSearchResults),
//     y: reversedData.map(object => object.greekName),
//     text: reversedData.map(object => object.greekName),
//     name: "Greek",
//     type: "bar",
//     orientation: "h"
//   };
// // ------------------------------------


// // drop down
// // ------------------------------------
// // Initializes the page with a default plot
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
  
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     let dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     let x = [];
//     let y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     else if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   init();
// // ------------------------------------


// // looping
// // ------------------------------------
// for (let i = 0; i < searchResults.length; i++) {
//     row = searchResults[i];
//     names.push(row.pair);
//     greekNames.push(row.greekName);
//     romanNames.push(row.romanName);
//     greekSearchResults.push(row.greekSearchResults);
//     romanSearchResults.push(row.romanSearchResults);
//   }
// // ------------------------------------


// // Functions and built in functions
// // ------------------------------------
// function doubleAddition(c, d) {
//     let total = addition(c, d) * 2;
  
//     return total;
//   }
  
//   // Log results of doubleAddition function
//   console.log(doubleAddition(3, 4));
  
  
//   // Javascript built in functions
//   let longDecimal = 112.34534454;
//   let roundedDecimal = Math.floor(longDecimal);
//   console.log(roundedDecimal);
// // ------------------------------------



// // plotting
// // ------------------------------------
// let trace1 = {
//     x: books,
//     y: timesRead,
//     type: 'bar'
//   };
  
//   let data = [trace1];
  
//   let layout = {
//     title: title
//   };
  
//   Plotly.newPlot("plot", data, layout);
//   // ------------------------------------