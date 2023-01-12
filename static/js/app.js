
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// 1. Use the D3 library to read in samples.json from the URL:

// //  https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.




const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// // 2 .Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//  // 2.1 Use sample_values as the VALUES for the BAR CHART
// // 2.2 Use otu_ids as the LABELS for the BAR CHART
// // 2.3 Use otu_labels as the HOVERTEXT for the BAR CHART

function graph(samplesID) {
  d3.json(url).then((data) => {
    var samples = data.samples;
    var test = samples.filter((sample) => sample.id == samplesID)[0];

    //print the function
    console.log(test);

    //
    var otu_ids = test.otu_ids;
    var otu_labels = test.otu_labels;
    var sample_values = test.sample_values;

// create trace for bar graoh

    var trace1 = {
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map((otuID) => `OTU ${otuID}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    
   
    var data = [trace1];
   
        var layout = {
          title: 'Top 10 Microbial Species',
          margin: {t: 40, l: 150},
          height: 400,
        };

// plot bar graph 

    Plotly.newPlot("bar", data, layout);


// // 3. Create a BUBBLE CHART that displays each sample
// // Use otu_ids for the x values
// //Use sample_values for the y values
// //Use sample_values for the marker size
// // Use otu_ids for the marker colours
// // Use otu_labels for the text values

// create trace for bubble graph
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,       
        colorscale: "Jet",
        },
        text: otu_labels,
    };

// idebtify daata and configure layout
    var data = [trace1];
    var layout = {
      xaxis: { title: "Microbial Species ID" },
      automargin: true,
      autosize: true,
     };

// print bubble graph
    Plotly.newPlot("bubble", data, layout);
  });
}


// 4. Display the sample metadata, i.e., an individual's demographic information.



function ddmenu(samplesID) {
    d3.json(url).then((data) => {
      var info = data.metadata;
      var test = info.filter((sample) => sample.id == samplesID)[0];
      var demographics = d3.select("#sample-metadata");

      // clear the demographics box
      demographics.html("");


// 5. Display each key-value pair from the metadata JSON object somewhere on the page

      Object.entries(test).forEach(([key, value]) => {
        demographics.append("h5").text(`${key}: ${value}`)});
    });
  };

  //6. Update all plots when a new sample is selecyed - can display any way you want
 
 function optionChanged(updateSample) {
    graph(updateSample);
    ddmenu(updateSample);
  };

// initialise the function - print graphs, ddmenu, demograophics box

  function init() {
    d3.json(url).then(function (data) {
     
      let menu = d3.select(`#selDataset`);

      data.names.forEach((name) => {menu.append(`option`).text(name).property(`value`, name)});
     
      var initialID = data.names [0];
      graph(initialID);
      ddmenu(initialID);
    });
  };

  
  init();



////////////////////////////////////////////////////////////////////////////////////////
