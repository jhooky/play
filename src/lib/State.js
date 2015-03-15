/*global exports */
/**
 * State.js
 */
'use strict';

var State = function() {
  this._states = {};
  this.active = null;
};

State.prototype.attach = function(name, state, options) {
  this._states[name] = state;
  if(state.hasOwnProperty('initialize')) {
    this._states[name].initialize(options);
  }
  return this;
};

State.prototype.activate = function(state, options) {
  var active = this.active;
  var toActivate = this._states[state] || null;
  if (toActivate) {
    if (active) {
      active.deactivate();
    }
    this.active = toActivate;
    this.active.activate(options);
  } else {
    this.active = active;
  }
  return this;
};

State.prototype.command = function(name) {
  if (!(typeof name !== 'string') && !(this.active[name])) { return; }
  var args;
  args = Array.prototype.slice.call(arguments, 1);
  this.active[name].apply(this.active, args);
};

module.exports = State;
