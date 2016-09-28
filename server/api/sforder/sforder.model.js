'use strict';

import mongoose from 'mongoose';

var SforderSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Sforder', SforderSchema);
