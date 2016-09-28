/**
 * Sfaccount model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sfaccount from './sfaccount.model';
var SfaccountEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SfaccountEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Sfaccount.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SfaccountEvents.emit(event + ':' + doc._id, doc);
    SfaccountEvents.emit(event, doc);
  };
}

export default SfaccountEvents;
