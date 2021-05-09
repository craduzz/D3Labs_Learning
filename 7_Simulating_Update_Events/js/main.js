/*
*    main.js
*/
var margin = {top:10, bottom:100, left:100, right: 10};
var width = 600;
var height = 400;
var flag = true;

var svg = d3.select("#chart-area").append("svg")
    .attr("width",width + margin.right + margin.left)
    .attr("height",height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform","translate( "+ margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
    .attr("class","x axis")
    .attr("transform","translate(0 "+height+")");

var yAxisGroup = g.append("g")
    .attr("class","left axis");

var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");

var x = d3.scaleBand()
    .range([0,width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    //.domain([max,0])
    .range([0,height]);


d3.json("data/revenues.json").then((data)=>{

    data.forEach((d)=> {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    d3.interval(()=>{
        update(data);
        flag =! flag;
    },1000);

    update(data);

}).catch((error)=>{
    console.log(error);
});

function update(data){
    var valueString = flag ? "revenue":"profit";
    var m_list = data.map((d) => {return d.month;});

    var max = d3.max(data,(d)=>{return d[valueString]});
    console.log(max);

    x.domain(m_list);

    y.domain([max,0]);

    var bars = g.selectAll("rect").data(data);

    bars.exit().remove();

    bars.attr("x",(d) =>{
        return x(d.month);
    })
        .attr("y",(d)=>{
            return y(d[valueString]);
        })
        .attr("width",x.bandwidth())
        .attr("height",(d)=>{
            return height - y(d[valueString]);
        });

    bars.enter().append("rect")
        .attr("x",(d) =>{
        return x(d.month);
        })
        .attr("y",(d)=>{
            return y(d[valueString]);
        })
        .attr("width",x.bandwidth())
        .attr("height",(d)=>{
            return height - y(d[valueString]);
        })
        .attr("fill","orange");


    var bottomAxis = d3.axisBottom(x);
    xAxisGroup.call(bottomAxis)
        .selectAll("text")
        .attr("text-anchor","middle");

    var leftAxis = d3.axisLeft(y)
        .ticks(12)
        .tickFormat((d)=>{
            return "$" + d + "K";
        });

    yAxisGroup.call(leftAxis);

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width/2)
        .attr("y", height +50)
        .attr("font-size","20px")
        .attr("text-anchor","middle")
        .text("Month");




    yLabel.text(valueString);

}

