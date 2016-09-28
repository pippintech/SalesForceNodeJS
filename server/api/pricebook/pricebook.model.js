'use strict';

import mongoose from 'mongoose';

var PricebookSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Pricebook', PricebookSchema);
