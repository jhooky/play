/*global exports */
/**
 * load-state.js - an app State
 */
'use strict';

var q  = require('../lib/query');
var loader = require('../lib/loader');

var $parent;
var $loading;
var $element;

var level;
var moduleName;
var switchState;
var abstractStateCallback;

moduleName = 'load';

$loading = q('<div>')
  .attr({
    'id' : 'load-message'
  });

$element = q('<div>')
  .attr({
    'id' : moduleName + '-screen',
    'class' : 'app-layer'
  })
  .append($loading);


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
  level = options.level;
  $element.show();
  $parent.append($element);
  $loading.html('loading level ' + options.number);
  console.log(options.data)
}; 

exports.deactivate = function() {
  $element.hide();
};
