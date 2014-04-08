// Initialise global vars
var times = 0; 
var today = new Date();
var dd = today.getDate();
var clock = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .attr('class', 'arc');
var pi = Math.PI;

// Read data from csv file
d3.json('data.py', function(error, json) {
  if (error) return console.warn(error);
  times = json;
  init();
});

// Auxiliary functions
function timeToRad(time) {
  var t = time.split(":");
  var h = t[0];
  var decimal_m = t[1]/60*100;
  var newtime = h.concat(".", decimal_m);
  return parseFloat(newtime)/12 * pi 
}

function drawArc(start, end, inner, outer, colour) {
  var start = timeToRad(start);
  var end = timeToRad(end);
  arc = d3.svg.arc()
      .innerRadius(inner)
      .outerRadius(outer)
      .startAngle(start)
      .endAngle(end);
  clock.append("path")
      .attr("d", arc)
      .attr("fill", colour)
      .attr("transform", "translate(300,300)");
}

function init() {
  for (day in times) {
    var span = dd - day;
    var inner = 200 - 20*span;
    var outer = 180 - 20*span;
    if (times.hasOwnProperty(day) && span < 10) {
      var colour = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
      for (seg in times[day]) {
        if (times[day].hasOwnProperty(seg)) {
          start = times[day][seg]["start"];
          end = times[day][seg]["end"];
          drawArc(start, end, inner, outer, colour);
        }
      }
    }
  }
}
