// **** This code was inspired by the Tutorials provided by Dom in class/office hours on 9/27/2022 ****
// //Define global variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//--- BAR GRAPH FUNCTION START-----------
function drawBarGraph(sampleId)
{
    // console.log to test
    console.log(`drawBarGraph(${sampleId})`);
    // evaluate json for results
    d3.json(url).then(data => {
        console.log(data);
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        // set up y ticks
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        // Create trace object
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"

        };
        // put trace object into an array
        let barArray = [barData];
        // create layout object
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found"
        }
        // call plotly function
        Plotly.newPlot("bar", barArray, barLayout)
    });
}
//--- BAR GRAPH FUNCTION END-----------

//--- BUBBLE CHART FUNCTION START-----------
function drawBubbleChart(sampleId)
{
    // consoloe.log to test
    console.log(`drawBubbleChart(${sampleId})`);
    // evaluate json for results
    d3.json(url).then(data => {
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        // Create trace object
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "earth"
            }            
        };
        // put trace object into an array
        let bubbleArray = [bubbleData];
        // create layout object
        let bubbleLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: { title: "OTU ID"}
        }
        // call plotly function
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout)
    })
}
//--- BUBBLE CHART FUNCTION END-----------

//--- SHOW METADATA FUNCTION START-----------
function showMetaData(sampleId)
{
    // consoloe.log to test
    console.log(`showMetaData(${sampleId})`);
    let metaData = d3.select("#sample-metadata")
    // let selector = d3.select("#sample-metadata")
    d3.json(url).then(data => {
        let samples = data.metadata;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        let id = result.id;        
        let ethnicity = result.ethnicity;
        let gender = result.gender;
        let age = result.age;        
        let location = result.location;
        let bbtype = result.bbtype;
        let wfreq = result.wfreq;
        metaData.text(`id: ${id}`)
        metaData.append("li").text(`ethnicity: ${ethnicity}`)
        metaData.append("li").text(`gender: ${gender}`)
        metaData.append("li").text(`age: ${age}`)
        metaData.append("li").text(`location: ${location}`)
        metaData.append("li").text(`bbtype: ${bbtype}`)
        metaData.append("li").text(`wfreq: ${wfreq}`)     
        d3.selectAll("li").style("list-style-type", "none")
    })
    

}
//--- SHOW METADATA FUNCTION END-----------

//--- GAUGE FUNCTION START-----------
function drawGauge(sampleId)
{
    console.log(`drawGauge(${sampleId})`);
}
//--- GAUGE FUNCTION END-----------

//--- CHANGING VALUE FUNCTION START -----------
function optionChanged(sampleId)
{
    console.log(`optionChanged, new value: ${sampleId}`);
    drawBarGraph(sampleId);
    drawBubbleChart(sampleId);
    showMetaData(sampleId);
    drawGauge(sampleId);
}
//--- CHANGING VALUE FUNCTION START -----------

//--- DASHBOARD FUNCTION START -----------
function InitDashboard()
{
    console.log("InitDashboard")

    // Get a handle to the dropdown
    let selector = d3.select("#selDataset")
   
    d3.json(url).then(function(data) {
        console.log("Here's the data", data);
        let sampleNames = data.names;
        console.log(sampleNames);
        // populate dropdown
        for (let i = 0; i < sampleNames.length; i++) {
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
//--- DASHBOARD FUNCTION END -----------

// Call Dashboard Function
InitDashboard()





// ----------------------------------------------------------------------------------------------------

// console.log("Assignment 14") 
// let sample = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// d3.json(sample).then(function(data) {
//     let dataSamples = Object.values(data.samples);
//     console.log(dataSamples);
//     let idNumber =[]
//     let otuIDList = [];
//     let sampleValues = [];

//     for (i = 0; i < dataSamples.length; i++) {
//         let item = dataSamples[i];
//         let z = idNumber.push(item.id);
//         let y = otuIDList.push(item.otu_ids);
//         let x = sampleValues.push(item.sample_values);   
//     };
//     console.log("ids", idNumber);
//     console.log("otus", otuIDList);
//     console.log("samples", sampleValues);
//     function init() {
//         let data = [{
//             x: x[0],
//             y: y[0],
//             text: z[0],
//             name: "Top 10 Biomes Per Patient",
//             type: "bar",
//             orientation: "h"
//         }];

//         let layout = {
//             height: 600,
//             width: 800
//         };

//         Plotly.newPlot("bar", data, layout)
        
//     };
//     // On change to the DOM, call getData()
//     d3.selectAll("#selDataset").on("change", getData);

//     // Function called by DOM changes
//     function getData() {
//         let dropdownMenu = d3.select("#selDataset");
//         // Assign the value of the dropdown menu option to a letiable
//         let dataset = dropdownMenu.property("value");
//         // Initialize an empty array for the country's data
//         let data = [];

//         for (i = 0; i < dataSamples.length; i++) {

//             if (dataset == z[0]) {
//                 data = australia;
//             }
//             else if (dataset == 'brazil') {
//                 data = brazil;
//             }   
   
//     // Call function to update the chart
//     updatePlotly(data);
//         };
//     };
// });
