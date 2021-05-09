/*
*    main.js
*/
var margin = {top:10, bottom:100, left:100, right: 10};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area").append("svg")
    .attr("width",width + margin.right + margin.left)
    .attr("height",height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform","translate( "+ margin.left + ", " + margin.top + ")");




var buildings = d3.json("data/buildings.json").then((data)=>{


    var n_list = data.map((d) => {return d.name;});

    console.log(n_list);

    var x = d3.scaleBand()
        .domain(n_list)
        .range([0,600])
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
            .attr("x",(d)=>{
                console.log(x(d.name));
                return x(d.name)+100;
            })
            .attr("y",(d) => {
                return height-y(d.height);
            })
            .attr("width",x.bandwidth())
            .attr("height",(d)=>{
                return y(d.height);
            })
            .attr("fill",(d) =>{
                return colour(d.name);
            });

    var bottomAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class","bottom axis")
        .attr("transform","translate(0, "+height+")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("transform","rotate(-20)")
        .attr("x","-5")
        .attr("y","10")
        .attr("text-anchor","end");

    var leftAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat((d)=>{
            return d + "m";
        });
    g.append("g")
        .attr("class","left axis")
        .call(leftAxis)
        .selectAll("text");

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width/2)
        .attr("y", height +140)
        .attr("font-size","20px")
        .attr("text-anchor","middle")
        .attr("transform", "translate(0,-40)")
        .text("The world's tallest buildings");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Height (m)");

}).catch((error)=>{
    console.log(error);

});
