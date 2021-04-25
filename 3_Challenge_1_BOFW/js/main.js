/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);

var buildings = d3.json("data/buildings.json").then((data)=>{

    console.log(data);
    var rect = svg.selectAll("rect")
        .data(data);
    rect.enter()
        .append("rect")
            .attr("x",(d,i)=>{
                console.log(d)
                return (i*20)+20*i/2
            })
            .attr("y",(d) => {
                return 500 - d.height/2;
            })
            .attr("width",10)
            .attr("height",(d)=>{
                return d.height/2
            })
            .attr("fill","grey")

}).catch((error)=>{
    console.log(error);
});
