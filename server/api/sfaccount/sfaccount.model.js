'use strict';

import mongoose from 'mongoose';

var SfaccountSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Sfaccount', SfaccountSchema);
