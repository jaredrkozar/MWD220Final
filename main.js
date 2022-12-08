// set the dimensions and margins of the graph
var consoles = [{consoleName: '', games: []}]

var margin = {top: 300, right: 20, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;
var countObj = {};

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "blue")
    .text("a simple tooltip");

var svg = d3.select("body").append("svg")
    .attr("width", margin.left + margin.right + width)
    .attr("height", margin.top + margin.bottom + height)
    .append("g")
    .attr("transform",
        "translate(100,100)")

var pie = d3.pie();

// Creating arc
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 4)


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

    var consoleLengths = [];
    for(i=1;i<consoles.length;i++){
        console.log(consoles[i].games.length)
        consoleLengths.push(consoles[i].games.length)
    }

    //select all arcs in the grou
    var arcs = g.selectAll("arc")
        .data(pie(consoleLengths))
        .enter()

    arcs.append("path")
        .attr("fill", (data, i)=>{
            return d3.schemeSet3[i];
        })
        .attr("d", arc)
        .on("mouseover", (data, i)=>{
            console.log(i)
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(event, d){
            console.log(consoles[d.index].games.length);
        })
        .on("mouseout", function(d){tooltip.text(d); return tooltip.style("visibility", "hidden");})
})

