/*global define exports*/
/**
 * input.js
 */
'use strict';

var HANDLER;
var CONTEXT;
var CONTAINER;
var MOUSEDOWN;

var keyup;
var keydown;
var mouseup;
var mousemove;
var mousedown;
var activate;
var deactivate;

keyup = function(e) {

};

keydown = function(e) {
  switch (e.which) {
  case 32: //space
    HANDLER.call(CONTEXT, 'space');
    break;
  case 87: // w
    HANDLER.call(CONTEXT, 'arrowUp');
    break;
  case 38: // arrow up
    HANDLER.call(CONTEXT, 'arrowUp');
    break;
  case 65: // a
    if (e.ctrlKey) {
      HANDLER.call(CONTEXT, 'C-a'); // note to self: can use e.ctrlKey
    } else {
      HANDLER.call(CONTEXT, 'arrowLeft');
    }
    break;
  case 37: // left arrow
    HANDLER.call(CONTEXT, 'arrowLeft');
    break;
  case 83: // s
    HANDLER.call(CONTEXT, 'arrowDown');
    break;
  case 40: // arrow down
    HANDLER.call(CONTEXT, 'arrowDown');
    break;
  case 68: // d
    HANDLER.call(CONTEXT, 'arrowRight');
    break;
  case 39: // arrow right
    HANDLER.call(CONTEXT, 'arrowRight');
    break;
  default:
    break;
  }
};

mousemove = function(e) {
  var x = e.clientX - CONTAINER.offsetLeft;
  var y = e.clientY - CONTAINER.offsetLeft;
  if (MOUSEDOWN === true) {
    HANDLER.call(CONTEXT, 'mouseDrag', x, y);
  } else {
    HANDLER.call(CONTEXT, 'mouseMove', x, y);
  }
};

mousedown = function(e) {
  var x = e.clientX - CONTAINER.offsetLeft;
  var y = e.clientY - CONTAINER.offsetLeft;
  MOUSEDOWN = true;
  HANDLER.call(CONTEXT, 'mouseDown', x, y);
  e.preventDefault();
};

mouseup = function(e) {
  MOUSEDOWN = false;
};

activate = function() {
  window.addEventListener('keyup', keyup);
  window.addEventListener('keydown', keydown);
  CONTAINER.addEventListener('mousemove', mousemove, false);
  CONTAINER.addEventListener('mousedown', mousedown, false);
  CONTAINER.addEventListener('mouseup', mouseup, false);
  CONTAINER.addEventListener('mouseout', mouseup, false);
};

deactivate = function() {
  window.removeEventListener('keyup', keyup);
  window.removeEventListener('keydown', keydown);
  CONTAINER.removeEventListener('mousemove', mousemove, false);
  CONTAINER.removeEventListener('mousedown', mousedown, false);
  CONTAINER.removeEventListener('mouseup', mouseup, false);
  CONTAINER.removeEventListener('mouseout', mouseup, false);
};

exports.activate = function(container, handler, context) {
  CONTAINER = container;
  CONTEXT = context;
  HANDLER = handler;
  activate();
};

exports.deactivate = function() {
  deactivate();
};
