// set the dimensions and margins of the graph
var consoles = [{consoleName: '', games: []}]
var body = d3.select('body')

function selectYear(){

    var inputVal = document.getElementById("yearInput").value;

    if (1988 <= inputVal <= 2017) {
        titleText.text("View games released in " + inputVal)
        updateChart(inputVal);
    } else {
        alert("Enter a year between 1988 and 2017")
    }
}

updateChart(1988);
var margin = {top: 300, right: 20, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

var svg = body.append("svg")
    .attr("width", margin.left + margin.right + width + 300)
    .attr("height", margin.top + margin.bottom + height + 100)
    .append("g")

var titleText = svg.append("text")
    .text("View games released in 1988")
    .attr("x", 500)
    .attr("y", 20)
    .attr("font-weight",600)
    .attr("font-family", "Inter")
    .style("font-size", "38px")
    .attr("transform",  "translate(0,30)");

var headerText = svg.append("text")
    .text("Select an area from the left to view the games released for that console this year")
    .attr("x", 620)
    .attr("y", 50)
    .attr("font-weight",600)
    .attr("font-family", "Inter")
    .style("font-size", "34px")
    .attr("transform",  "translate(0,150)");

var pie = d3.pie()
    .sort(null);

// Creating arc
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 4)

var textGroup = svg.append("g")

var header = textGroup

function updateChart(year) {
    console.log("dld")
    consoles = [];
    d3.csv("/vgsales.csv").then(function(data) {

        // count how much each city occurs in list and store in countObj
        data.forEach(function(d) {
            if (d.Year == year && d.Platform != undefined) {

                const result = consoles.filter(singleConsole => singleConsole.consoleName === d.Platform);

                if (result.length > 0) {
                    result[0].games.push(d.Name)
                } else {
                    consoles.push({consoleName: d.Platform, games: [d.Name]})
                }
            }
        })

        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .data(consoles)
        //select all arcs in the grou

        var consoleLengths = [];
        for(i=0;i<consoles.length;i++){
            consoleLengths.push(consoles[i].games.length)
        }

        //select all arcs in the grou
        var arcs = g.selectAll("arc")
            .data(pie(consoleLengths))
            .enter()

        arcs.append("path")
            .attr("transform",  "translate(0,150)")
            .attr("fill", (data, i)=>{
                return d3.schemeSet3[i];
            })
            .attr("d", arc)
            .on("mousedown", (data, i)=>{
                document.getElementById("gamesText").innerHTML = consoles[i.index].games.join("<br>")
                headerText.text("There were " + consoles[i.index].games.length + " " + consoles[i.index].consoleName + " games released in " + year)
            })
    })

}