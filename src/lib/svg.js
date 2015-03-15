/*global exports require */
/**
 * svg.js
 */
'use strict';

var calc = require('./calc');

var svg = function(tag, objectMap) {
  // returns a new svg xml element
  var element = null;
  var keys = null;
  var key = null;
  
  element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  if (objectMap !== null) {
    keys = Object.keys(objectMap);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (key === 'class') {  // class works differently
        element.className.baseVal = objectMap[key];
      } else if (key === 'textContent') { // textContent does too
        element.textContent = objectMap[key];
      } else {
        element.setAttribute(key, objectMap[key]);
      }
    }
  }

  return element;
};

var verticesToSvgPoints = function(vertices) {
  // vertices array -> a string of points formated for svg polygon
  return calc.reduceVertices(vertices, '', function(memo, x, y, i) {
    if (i === vertices.length - 2) { // dont add the space on the last one
      return memo + x + ',' + y;
    } else {
      return memo + x + ',' + y + ' ';
    }
  });
};

var verticesToSvgPath = function(vertices) {
  // vertices array ->  string of points formated for svg path
  return calc.reduceVertices(vertices, '', function(memo, x, y, i) {
    if (i === 0) {
      return memo + 'M ' + x + ' ' + y;
    } else if (i === vertices.length - 2) {
      return memo + ' L ' + x + ' ' + y + ' z';
    } else {
      return memo + ' L ' + x + ' ' + y;
    }
  });
};

exports.svg = svg;
exports.verticesToSvgPath = verticesToSvgPath;
exports.verticesToSvgPoints = verticesToSvgPoints;

