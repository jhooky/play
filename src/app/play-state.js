/*global exports */
/**
 * play-state.js - an app State
 */
'use strict';

var $ = require('../lib/query');
var input = require('../lib/input');
var State = require('../lib/State');

var map = require('./canvas/map-state');

var width;
var height;
var $canvas;
var $parent;
var context;
var moduleName;
var switchState;
var canvasState;
var abstractStateCallback;

width = 640;
height = 480;
moduleName = 'play';

$canvas = $('<canvas>').
  attr({
    'id' : moduleName + '-canvas',
    'class' : 'app-layer',
    'width' : width + 'px',
    'height': height + 'px'
  });

context = $canvas.el.getContext('2d');

canvasState = new State()
  .attach('map', map)
  .activate('map', 'does this get printed');

switchState = function(concreteState, options) {
  abstractStateCallback(concreteState, options);
};

exports.initialize = function(options) {
  abstractStateCallback = options.callback;
  $parent = options.$container;
  $canvas.hide()
};

exports.activate = function(options) {
  window.location.hash = '#/' + moduleName;
  input.activate($canvas.el, canvasState.command, canvasState);
  $canvas.show();
  $parent.append($canvas);
};

exports.deactivate = function() {
  $canvas.hide();
  input.deactivate();
};
