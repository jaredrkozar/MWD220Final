// set the dimensions and margins of the graph
var consoles = [{consoleName: '', games: []}]

var margin = {top: 300, right: 20, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;
var countObj = {};

var svg = d3.select("body").append("svg")
    .attr("width", margin.left + margin.right + width)
    .attr("height", margin.top + margin.bottom + height)
    .append("g")
    .attr("transform",
        "translate(100,100)")


svg.append("text")
    .text("Top Selling Video Games")
    .attr("x", 500)
    .attr("y", 20)
    .attr("font-weight",900)
    .attr("font-family", "Inter")
    .style("font-size", "34px");

var rect = d3.select("body").append("svg")
    .attr('x', 800)
    .attr('y', 120)
    .attr('width', 4000)
    .attr('height', 600)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');

var pie = d3.pie()
    .sort(null);

// Creating arc
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 4)

var textGroup = svg.append("g")

var header = textGroup
d3.csv("/vgsales.csv").then(function(data) {

    // count how much each city occurs in list and store in countObj
    data.forEach(function(d) {
        var platform = d.Platform;
        if(countObj[platform] === undefined) {
            countObj[platform] = 0;
        } else {
            if (d.Year == "1988") {

                const result = consoles.filter(singleConsole => singleConsole.consoleName === d.Platform);

                if (result.length > 0) {
                    result[0].games.push(d.Name)
                } else {
                    consoles.push({consoleName: d.Platform, games: [d.Name]})
                }
            }
        }
    })

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .data(consoles)
    //select all arcs in the grou
console.log(consoles)
    var consoleLengths = [];
    for(i=1;i<consoles.length;i++){
        console.log(consoles[i].games.length)
        consoleLengths.push(consoles[i].games.length)
    }

    //select all arcs in the group
    var arcs = g.selectAll("arc")
        .data(pie(consoleLengths))
        .enter()

    arcs.append("path")
        .attr("fill", (data, i)=>{
            return d3.schemeSet3[i];
        })
        .attr("d", arc)
        .on("mousedown", (data, i)=>{
            headerText.text("ldldldldldl")
        })
})
