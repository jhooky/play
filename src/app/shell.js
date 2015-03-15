/*global exports require */
/**
 * shell.js
 */
'use strict';

var query = require('../lib/query');
var State = require('../lib/State');
var nav   = require('./nav-shell');
// load concreteStates
var play  = require('./play-state');
var load  = require('./load-state');
var start = require('./start-state');
var levels = require('./levels-state');

var appState;
var stateData;
var moduleName;
var stateCallback;

var $container;

moduleName = 'shell';

$container = query('<div>')
  .attr({ 'id' : 'app-' + moduleName});

appState = new State();

stateCallback = appState.activate.bind(appState);

stateData = {
  $container: $container,
  callback: stateCallback};

appState
  .attach('load', load, stateData)
  .attach('start', start, stateData)
  .attach('levels', levels, stateData)
  .attach('play', play, stateData)
  .activate('start');

global.appState = appState;

exports.initialize = function($parent) {
  nav.initialize($parent);
  $parent.append($container);
};
