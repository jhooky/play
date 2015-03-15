/*global exports */
/**
 * levels-state.js - an app State
 */
'use strict';

var q = require('../lib/query');

var $parent;
var $element;

var i;
var len;
var data;
var level;
var moduleName;
var switchState;
var levelButtons = [];
var abstractStateCallback;

moduleName = 'levels';

data = [
  {  // first level
    foreground : 'desert-foreground',
    background : 'clouds-background',
    entities   : []
  },
  {  // second level
    foreground : 'desert-foreground',
    background : 'clouds-background',
    entities   : []
  }
];

$element = q('<div>')
  .attr({
    'id' : moduleName + '-screen',
    'class' : 'app-layer'
  });

for (i = 0, len = data.length; i < len; i++) {
  level = i+1;
  levelButtons[i] = q('<input>')
    .attr({
      'type' : 'button',
      'value': '' + level
    })
    .click(function(e) {
      var value = this.value;
      console.log('loading level ' + this.value);
      switchState('load', {
        number : value,
        data : data[value - 1]
      });
    });
  $element.append(levelButtons[i]);
}

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
