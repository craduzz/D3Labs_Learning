/*
*    main.js
*/
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




d3.json("data/revenues.json").then((data)=>{


    var m_list = data.map((d) => {return d.month;});

    var max = d3.max(data,(d)=>{return d.revenue});
    console.log(max);

    var x = d3.scaleBand()
        .domain(m_list)
        .range([0,width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([max,0])
        .range([0,height]);

    var rect = svg.selectAll("rect")
        .data(data);

    rect.enter()
        .append("rect")
        .attr("x",(d)=>{
            return x(d.month)+margin.left;
        })
        .attr("y",(d) => {
            return y(d.revenue);
        })
        .attr("width",x.bandwidth())
        .attr("height",(d)=>{
            return height-y(d.revenue)+margin.top;
        })
        .attr("fill","orange");

    var bottomAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class","bottom axis")
        .attr("transform","translate(0, "+height+")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("text-anchor","middle");

    var leftAxis = d3.axisLeft(y)
        .ticks(12)
        .tickFormat((d)=>{
            console.log(d);
            return "$" + d + "K";
        });
    g.append("g")
        .attr("class","left axis")
        .call(leftAxis)
        .selectAll("text");

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width/2)
        .attr("y", height +50)
        .attr("font-size","20px")
        .attr("text-anchor","middle")
        .text("Month");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Revenue (dlls.)");

}).catch((error)=>{
    console.log(error);

});

