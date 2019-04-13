const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
