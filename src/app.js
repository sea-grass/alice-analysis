import "babel-polyfill";

import * as d3 from "d3";
import _ from "lodash";

// include styles for this app
require("./app.css");

var map = {};
map.width = 960;
map.height = 500;

map.search = "";
map.search_bar = d3.select("body")
  .append("label")
  .attr("for", "search")
  .text("Search:")
  .select(function(){return this.parentNode;})
  .append("input")
  .attr("type", "text")
  .attr("id", "search")
  .on("change", function() {
    map.search = this.value;
    console.log("searching: " + this.value);
    map.draw();
  });

map.curr_line = 0;
map.line_picker = d3.select("body")
  .append("label")
  .attr("for", "line")
  .text("Line:")
  .select(function() {return this.parentNode;})
  .append("input")
  .attr("type", "range")
  .attr("id", "line")
  .attr("name", "line")
  .attr("min", 0)
  .attr("max", 100) //we don't know how many pages the book has yet tho
  .on("change", function() {
    console.log("line is now "  + this.value);
    map.curr_line = this.value;
    map.draw();
  });

map.container = d3.select("body")
    .append("div")
    .attr("class", "container");

map.draw = function() {
  map.container.selectAll("p").remove();
  map.container.selectAll("p")
      .data(map.nodes)
      .enter()
      .append("p")
      .style("display", function() {
        const text = arguments[0];
        const i = arguments[1];
        var display_value = "";
        if (map.search.length > 0) {
          if (text.indexOf(map.search) == -1) {
            display_value = "none";
          }
        }
        if (map.curr_line < i) {
          display_value = "none";
        }
        return display_value;
      })
      .text(function(text, i, lines) {
        return i + " - " + text;
      });
};
map.init = function(text) {
  map.nodes = _.map(_.without(text.split(/[\n]+/), ""), function(line) {
    const trimmed_line = _.trim(line);
    return trimmed_line;
  });
  d3.select("#line")
    .attr("max", map.nodes.length - 1);
};

// TODO: how to use import syntax instead of require here?
d3.text(require("file!./alice.txt"), function(err, text) {
  map.init(text);
  map.draw();
  if (err) throw err;
});
