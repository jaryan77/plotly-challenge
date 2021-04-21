function readData(sample) {
    d3.json("../../data/samples.json").then((data) => {
        var metadata = data.metadata;
        var outputArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var output = outputArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html("");
        Object.entries(output).forEach(([key,val]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${val}`);
        });
    });
}

function visuals(sample) {
    d3.json("../../data/samples.json").then((data) => {
        var samples = data.samples;
        var outputArray = samples.filter(sampleObject => sampleObject.id == sample);
        var output = outputArray[0];
        var sample_values = output.sample_values;
        var otu_ids = output.otu_ids;
        var otu_labels = output.otu_labels;
        var barData = [
            {
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                type: 'bar',
                text: otu_labels.slice(0,10).reverse(),
                orientation: 'h'
            }
        ];
        var barLayout = {
            title: 'Top 10 OTUs',
            margin: {t:20,l:100}
        };
        Plotly.newPlot("bar", barData, barLayout);
        //Bubble
        var bubbleData = [
            {
                x: sample_values,
                y: otu_ids,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids
            }
            }];
        var bubbleLayout = {
            title: 'OTUs Bubble Chart',
            xaxis: {title: 'OTU ID'},
            hovermode: 'closest'
        };          
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);    
        
    });
}

function init() {
    var dropDown = d3.select('#selDataset');
    d3.json("../../data/samples.json").then((data) => {
        var names = data.names
        data.names.forEach((sample) => {
            dropDown.append('option').text(sample).property('value');
        });
        var defaultSample = names[0];
        visuals(defaultSample);
        readData(defaultSample);
    });
}

function selectData(nextSample) {
    visuals(nextSample);
    readData(nextSample);
}

init();