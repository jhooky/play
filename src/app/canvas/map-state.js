/*global exports */
/**
 * map.js - a canvasState
 */
'use strict';

exports.initialize = function(options) {

};

exports.activate = function(test) {
  console.log('This is a test of canvasState#activate', test);
};

exports.mouseDrag = function(x, y) {
  console.log('drag', x, y);
};

exports.mouseDown = function(x, y) {
  console.log('down', x, y);
};

exports.mouseMove = function(x, y) {
  console.log('move', x, y);
};

exports.arrowUp = function() {
  console.log('jump');
};
