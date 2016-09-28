/**
 * Sfproduct model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sfproduct from './sfproduct.model';
var SfproductEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SfproductEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Sfproduct.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SfproductEvents.emit(event + ':' + doc._id, doc);
    SfproductEvents.emit(event, doc);
  };
}

export default SfproductEvents;
