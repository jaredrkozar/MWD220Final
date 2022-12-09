// set the dimensions and margins of the graph
var consoles = [{consoleName: '', games: []}]
var body = d3.select('body')

function selectYear(){
    //gets user input from text box and passes it to updateChart function if its between the min and max years of the dataset
    var inputVal = document.getElementById("yearInput").value;

    if (1988 <= inputVal <= 2017) {
        titleText.text("View games released in " + inputVal)
        updateChart(inputVal);
    } else {
        alert("Enter a year between 1988 and 2017")
    }
}

//calls updateCHart when the page loads
updateChart(1988);
var margin = {top: 300, right: 20, bottom: 50, left: 300},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

var svg = body.append("svg")
    .attr("width", margin.left + margin.right + width + 300)
    .attr("height", margin.top + margin.bottom + height + 100)
    .append("g")

//defines the title at top of the page
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

//pie chart
var pie = d3.pie()
    .sort(null);

// creating the arc
var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(width / 4)

function updateChart(year) {
    //updates the chart when button is pressed
    consoles = [];
    d3.csv("/vgsales.csv").then(function(data) {

        // count how much each city occurs in list and store in countObj
        data.forEach(function(d) {
            if (d.Year == year && d.Platform != undefined) {
                //if the year of the current row matches the year the user entered...

                //putgames into array
                const result = consoles.filter(singleConsole => singleConsole.consoleName === d.Platform);

                //if the same console name is found in the array, push the current games title to that arrays console, and if there is no console in the consoles array with that platform, then creae a new console with the game title
                if (result.length > 0) {
                    result[0].games.push(d.Name)
                } else {
                    consoles.push({consoleName: d.Platform, games: [d.Name]})
                }
            }
        })

            //the group to store the arcs
        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .data(consoles)

        //gets number of console games released for each console
        var consoleLengths = [];
        for(i=0;i<consoles.length;i++){
            consoleLengths.push(consoles[i].games.length)
        }

        //select all arcs in the group and gives the data to them
        var arcs = g.selectAll("arc")
            .data(pie(consoleLengths))
            .enter()

        //the path to fill in the arc with color, add mouse events etc
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