/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")
    .attr("width",500)
    .attr("height",500);




var buildings = d3.json("data/buildings.json").then((data)=>{

    //must add the word return or else is undefined
    var n_list = data.map((d) => {return d.name;});

    console.log(n_list);

    var x = d3.scaleBand()
        .domain(n_list)
        .range([0,400])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    var y = d3.scaleLinear()
        .domain([0,828])
        .range([0,400]);

    var colour = d3.scaleOrdinal()
        .domain(n_list)
        .range(d3.schemeSet3);

    var rect = svg.selectAll("rect")
        .data(data);

    rect.enter()
        .append("rect")
            .attr("x",(d,i)=>{
                return x(d.name);
            })
            .attr("y",(d) => {
                return 500-y(d.height);
            })
            .attr("width",x.bandwidth())
            .attr("height",(d)=>{
                return y(d.height);
            })
            .attr("fill",(d) =>{
                return colour(d.name);
            })
}).catch((error)=>{
    console.log(error);

});
