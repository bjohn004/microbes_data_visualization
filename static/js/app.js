// **** This code was inspired by the Tutorials provided by Dom in class/office hours on 9/27/2022 ****
// //Define global variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//--- BAR GRAPH FUNCTION START-----------
function drawBarGraph(sampleId)
{
    // console.log to test
    console.log(`drawBarGraph(${sampleId})`);
    // run d3 on json to get data and analyze
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
    // run d3 on json to get data and analyze
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
    // run d3 on json to get data and analyze
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
    // consoloe.log to test
    console.log(`drawGauge(${sampleId})`);
    // run d3 on json to get data and analyze
    d3.json(url).then(data => {
        let samples = data.metadata;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        let id = result.id;
        let wfreq = result.wfreq;
        let gaugeData = {
           type: "indicator",
           mode: "gauge+number",
           value: wfreq,
           title: {text: "Belly Button Washing Frequency", font: {size: 18} },   
               
           gauge: {
            bgcolor: "black",
            bordercolor: "black",
            color: {gradient: true, ranges: {"tan": [0,3], "yellow":[3-6], "green":[6-9]}},
            bar: { color: "lightblue", thickness: 0.25, line: {color: "blue", width: 1}},
            axis: {range: [null, 9], dtick: 1, showticklabels: true },
            steps: [ 
                { range: [0,1], color: 'rgb(200,200,200'},
                { range: [1,2], color: 'rgb(175,175,175)'},
                { range: [2,3], color: 'rgb(150,150,150)'},
                { range: [3,4], color: 'rgb(125,125,125)'},
                { range: [4,5], color: 'rgb(120,120,120)'},
                { range: [5,6], color: 'rgb(115,115,115)'},
                { range: [6,7], color: 'rgb(100,100,100)'},
                { range: [7,8], color: 'rgb(85,85,85)'},
                { range: [8,9], color: 'rgb(75,75,75)'},
                
            ]
           }
        };
        let gaugeArray = [gaugeData];
        let gaugeLayout = {
            width: 600,
            height: 450,
            margin: { t: 0, b: 0}
        };
        Plotly.newPlot("gauge", gaugeArray, gaugeLayout);
    });
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
        // show gauge plot from selected value
        drawGauge(initialId);
    });
}
//--- DASHBOARD FUNCTION END -----------

// Call Dashboard Function
InitDashboard()

