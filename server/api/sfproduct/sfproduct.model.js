'use strict';

import mongoose from 'mongoose';

var SfproductSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Sfproduct', SfproductSchema);
