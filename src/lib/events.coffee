slice = Array.prototype.slice
toString = Object.prototype.toString

exports.on = (name, callback, context) ->
  try
    channels = @channels || (@channels = {})
    channel = channels[name] || (chanels[name] = [])
    channel.push callback: callback, context: context || this
  catch error
    console.log error
  this

exports.off = (name, callback, context) ->
  try
    channels = @channels || (@channels = {})
    channel = channels[name] || (channels[name] = [])
    if channel
      for e, index in channel
        channel.splice index, 1 if e.callback is callback # e is event
  catch error
    console.log error
  this

exports.once = (name, callback, context) ->
  try
    eventOff = @off.bind this;
    modified = ->
      callback.apply this, arguments
      eventOff name, modified
      null
    @on name, modified, context
  catch error
    console.log error
  this

exports.trigger = (name) ->
  try
    args = slice.call(arguments, 1)
    channels = @channels || (@channels = {})
    channel = channels[name] || (channels[name] = [])
    if channel
      queue = channel.slice();
      for e in queue
        e.callback.apply(e.context, args) # e is event
  catch error
    console.log error
  this

exports.listen = (obj, name, callback, context) ->
  try
    obj.on name, callback, context
  catch error
    console.log error
  this

exports.stopListening = (obj, name, callback) ->
  try
    obj.off name, callback
  catch error
    console.log error
  this

exports.listenOnce = (obj, name, callback, context) ->
  try
    stopListening = @stopListening.bind(this);
    modified = ->
      callback.apply this, arguments
      stopListening obj, name, modified
    @listen obj, name, modified, context
  catch error
    console.log(error)
  this
