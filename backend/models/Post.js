const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}); 

// Update the updatedAt field on save
/*PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
}); */

module.exports = mongoose.model('Post', PostSchema);