/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);


var circle = svg.append("circle")
    .attr("cx",100)
    .attr("cy",250)
    .attr("r",70)
    .attr("fill","blue");

var rect = svg.append("rect")
    .attr("x",20)
    .attr("y",20)
    .attr("width",200)
    .attr("height",20)
    .attr("fill","red")

var line = svg.append("line")
    .attr("x1",10)
    .attr("y1",30)
    .attr("x2",30)
    .attr("y2",300)
    .attr("stroke","green")
