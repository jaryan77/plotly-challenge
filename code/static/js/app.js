function readData(sample) {
    d3.json('C:\Users\Alex\OneDrive\NU-BootCamp\plotly-challenge\data\samples.json').then((data) => {
        var metadata = data.metadata;
        var outputArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var output = outputArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html("");
        Object.entries(output).forEach(([key,value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

function visuals(sample) {
    d3.json('C:\Users\Alex\OneDrive\NU-BootCamp\plotly-challenge\data\samples.json').then((data) => {
        var metadata = data.metadata;
        var outputArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var output = outputArray[0];
        var sample_values = output.sample_values;
        var otu_ids = output.otu_ids;
        var otu_labels = output.otu_labels;
        var barData = [
            {
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).reverse(),
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
        
    });
}

function init() {
    var dropDown = d3.select('#selDataset');
    d3.json('C:\Users\Alex\OneDrive\NU-BootCamp\plotly-challenge\data\samples.json').then((data) => {
        var names = data.names;
        names.forEach((sample) => {
            dropDown.append('option').text(sample).property('value',sample);
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