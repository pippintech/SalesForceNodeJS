/**
 * Sforder model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sforder from './sforder.model';
var SforderEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SforderEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Sforder.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SforderEvents.emit(event + ':' + doc._id, doc);
    SforderEvents.emit(event, doc);
  };
}

export default SforderEvents;
