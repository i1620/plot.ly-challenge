function getPlot(id) {

    d3.json("samples.json").then((data)=> {
        console.log(data)

        var washfreq = data.metadata.map(d => d.washfreq)
        console.log(`Washing Frequency: ${washfreq}`)

        var samples = data.samples.filters(s => s.id.toString() === id)[0];
        console.log(samples)

        var svalues = samples.sample_values.slice(0,10).reverse();

        var OTU_top = (samples.otu_ids.slice(0,10)).reverse();

        var OTU_id = OTU_top.map(d=> "OTU" + d)

        var labels = samples.otu_labels.slice(0,10);

        var trace = {
            x: svalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(142,124,195)'},
            type:"bar",
            orientation: "h"
        };

        var data = [trace];

        var layout = {
            title:"Top 10 OTU",
            yaxis: {
                tickmode:"linear"
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };

        Plotly.newPlot("bar",data,layout);
    });
}
