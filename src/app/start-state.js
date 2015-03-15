/*global exports */
/**
 * start-state.js - an app State
 */
'use strict';

var q = require('../lib/Query');

var moduleName;
var switchState;

var $parent;
var $element;
var $startButton;
var abstractStateCallback;

moduleName = 'start';

$startButton = q('<img>')
  .attr({
    'src' : 'images/icons/play.png',
    'alt' : 'Play Game',
    'id'  : 'start-button'
  })
  .click(function(e) {
    switchState('levels');
  });

$element = q('<div>')
  .attr({
    'id' : moduleName + '-screen',
    'class' : 'app-layer'})
  .append($startButton);

switchState = function(concreteState, options) {
  abstractStateCallback(concreteState, options);
};

exports.initialize = function(options) {
  abstractStateCallback = options.callback;
  $parent = options.$container;
  $element.hide();
};

exports.activate = function(options) {
  window.location.hash = '#/' + moduleName;
  $element.show();
  $parent.append($element);
}; 

exports.deactivate = function() {
  $element.hide();
};
