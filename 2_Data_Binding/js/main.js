/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width",700)
    .attr("height",400);

var data = [25,20,15,10,5,30,18,15,1,21,19,13,3];

var rect = svg.selectAll("rect")
    .data(data);

rect.enter()
    .append("rect")
        .attr("x",(d, i)=>{return (i*50)+25})
        .attr("y",(d)=>{
            return 400 - d*10;
        })
        .attr("width",20)
        .attr("height",(d)=>{return d*10})
        .attr("fill","blue");