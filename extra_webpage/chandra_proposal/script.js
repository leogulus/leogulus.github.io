// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
// var parseTime = d3.timeParse("%y");
// var formatTime = d3.timeFormat("%e %B");

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLog().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Time); });

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// ============================= Main =============================
d3.csv("chandra_proposal/chandra_proposal_data.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      // d.Year = parseTime(d.Year);
      // d.Year = +d.Year;
      d.Time = +d.Time;

  });

  // scale the range of the data
  x.domain([1998,2021]);

  // d3.extent(data, function(d) { return d.Year; }));
  y.domain([1, d3.max(data, function(d) { return d.Time; })]);

  // add the dots with tooltips
  svg.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 4)
     .attr("cx", function(d) { return x(d.Year); })
     .attr("cy", function(d) { return y(d.Time); })
     .style("fill","turquoise")
     .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(d.PI_Name + "<br/>" + "<br/>" + d.Title + "<br/><br/>" + d.Time + "ks" + " (" + d.Year +")")
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

  // gridlines in x axis function
  function make_x_gridlines() {
    return d3.axisBottom(x)
    .ticks(5)
  };

  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y)
    .ticks(5)
  };

  // add the X Axis
  svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat(""));

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

  // add the Y Axis
  svg.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat(""));
  svg.append("g")
      .call(d3.axisLeft(y));
      // text label for the y axis

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Time (ks)");

    });