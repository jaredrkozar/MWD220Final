// set the dimensions and margins of the graph
var margin = {top: 300, right: 20, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;
var countObj = {};

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text(function (console, numGames) {
        console.log("Console: " + console);
        console.log("Number of Games: " + numGames);

        return console, numGames;
    });

var svg = d3.select("body").append("svg")
    .attr("width", margin.left + margin.right + width)
    .attr("height", margin.top + margin.bottom + height)
    .append("g")
    .attr("transform",
        "translate(100,100)");

var pie = d3.pie();

// Creating arc
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 4);

d3.csv("/vgsales.csv").then(function(data) {
    let consoles = "DS Wii PS3 PS4 GB Xbox"

    // count how much each city occurs in list and store in countObj
    data.forEach(function(d) {
        var platform = d.Platform;
        if(countObj[platform] === undefined) {
            countObj[platform] = 0;
        } else {
            if (d.Year == "1988") {
                countObj[platform] = countObj[platform] + 1;
            }
        }
    })

    //creating a group
    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //select all arcs in the grou
    var arcs = g.selectAll("arc")
        .data(pie(Object.values(countObj)))
        .enter()

    arcs.append("path")
        .attr("fill", (data, i)=>{
            return d3.schemeSet3[i];
        })
        .attr("d", arc)

});