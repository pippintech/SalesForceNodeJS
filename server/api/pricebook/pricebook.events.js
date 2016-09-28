/**
 * Pricebook model events
 */

'use strict';

import {EventEmitter} from 'events';
import Pricebook from './pricebook.model';
var PricebookEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PricebookEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Pricebook.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PricebookEvents.emit(event + ':' + doc._id, doc);
    PricebookEvents.emit(event, doc);
  };
}

export default PricebookEvents;
